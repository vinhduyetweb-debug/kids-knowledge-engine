const fs = require("fs");
const path = require("path");
const os = require("os");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const RAW_DIR = path.join(ROOT, "asset-intake", "raw");
const OUTPUT_DIR = path.join(ROOT, "asset-intake", "output");
const DATASET_PATH = path.join(ROOT, "content", "animals", "animals_vi_3_5_mvp_100.json");
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function csvEscape(value) {
  const text = value == null ? "" : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function writeCsv(filePath, headers, rows) {
  const lines = [headers.join(",")];
  rows.forEach((row) => {
    lines.push(headers.map((header) => csvEscape(row[header])).join(","));
  });
  fs.writeFileSync(filePath, `${lines.join("\r\n")}\r\n`, "utf8");
}

function readDataset() {
  const data = JSON.parse(fs.readFileSync(DATASET_PATH, "utf8"));
  if (!Array.isArray(data)) {
    throw new Error("Dataset must be an array.");
  }
  return data;
}

function filenameFromId(id) {
  const match = String(id || "").match(/^animal_(.+)_vi_3_5$/);
  return match ? `${match[1]}.webp` : "";
}

function buildExpectedAssets(data) {
  return data
    .map((item) => ({
      id: item.id || "",
      title: item.title || "",
      answer: item.answer || "",
      expected_filename: filenameFromId(item.id)
    }))
    .filter((item) => item.expected_filename);
}

function readImageSize(filePath, ext) {
  const buffer = fs.readFileSync(filePath);
  try {
    if (ext === ".png") {
      return readPngSize(buffer);
    }
    if (ext === ".jpg" || ext === ".jpeg") {
      return readJpegSize(buffer);
    }
    if (ext === ".webp") {
      return readWebpSize(buffer);
    }
  } catch (error) {
    return { width: "", height: "", error: error.message };
  }
  return { width: "", height: "", error: "Unsupported image extension." };
}

function readPngSize(buffer) {
  const signature = "89504e470d0a1a0a";
  if (buffer.length < 24 || buffer.slice(0, 8).toString("hex") !== signature) {
    throw new Error("Invalid PNG signature.");
  }
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20), error: "" };
}

function readJpegSize(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    throw new Error("Invalid JPEG signature.");
  }

  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return {
        width: buffer.readUInt16BE(offset + 7),
        height: buffer.readUInt16BE(offset + 5),
        error: ""
      };
    }
    offset += 2 + length;
  }

  throw new Error("JPEG size marker not found.");
}

function readWebpSize(buffer) {
  if (buffer.length < 30 || buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP") {
    throw new Error("Invalid WebP signature.");
  }

  const chunk = buffer.toString("ascii", 12, 16);
  if (chunk === "VP8X") {
    return {
      width: 1 + buffer.readUIntLE(24, 3),
      height: 1 + buffer.readUIntLE(27, 3),
      error: ""
    };
  }
  if (chunk === "VP8 ") {
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
      error: ""
    };
  }
  if (chunk === "VP8L") {
    const bits = buffer.readUInt32LE(21);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
      error: ""
    };
  }

  throw new Error(`Unsupported WebP chunk ${chunk}.`);
}

function isRandomName(stem) {
  return UUID_RE.test(stem) || /^[0-9a-f]{20,}$/i.test(stem);
}

function buildInventory(expectedByStem) {
  ensureDir(RAW_DIR);
  ensureDir(OUTPUT_DIR);

  const files = fs.readdirSync(RAW_DIR)
    .filter((name) => IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "en"));

  return files.map((currentFilename, index) => {
    const ext = path.extname(currentFilename).toLowerCase();
    const stem = path.basename(currentFilename, ext).toLowerCase();
    const filePath = path.join(RAW_DIR, currentFilename);
    const stat = fs.statSync(filePath);
    const size = readImageSize(filePath, ext);
    const expectedFilename = expectedByStem.get(stem) || "";
    const shouldReview = !expectedFilename || isRandomName(stem);
    const noteParts = [];
    if (size.error) noteParts.push(size.error);
    if (isRandomName(stem)) noteParts.push("Random/UUID filename. Do not auto-map.");

    return {
      index: index + 1,
      current_filename: currentFilename,
      extension: ext.replace(".", ""),
      width: size.width,
      height: size.height,
      size_kb: Math.round((stat.size / 1024) * 10) / 10,
      suggested_target_filename: shouldReview ? "NEEDS_REVIEW" : expectedFilename,
      status: shouldReview ? "NEEDS_REVIEW" : "AUTO_SUGGESTED",
      notes: noteParts.join(" ")
    };
  });
}

function buildMappingRows(inventory) {
  return inventory.map((item) => ({
    index: item.index,
    current_filename: item.current_filename,
    target_filename: item.status === "AUTO_SUGGESTED" ? item.suggested_target_filename : "",
    confidence: item.status === "AUTO_SUGGESTED" ? "filename_match" : "NEEDS_REVIEW",
    notes: item.status === "AUTO_SUGGESTED"
      ? "Review before applying. Source file will not be renamed."
      : "Fill target_filename manually after visual review."
  }));
}

function createContactSheets(inventory) {
  if (inventory.length === 0) {
    return { ok: true, files: [], message: "No input images; contact sheet not needed." };
  }

  const manifestPath = path.join(OUTPUT_DIR, "contact_sheet_manifest.json");
  const psPath = path.join(os.tmpdir(), `kke-contact-sheet-${Date.now()}.ps1`);
  const images = inventory.map((item) => ({
    index: item.index,
    filename: item.current_filename,
    path: path.join(RAW_DIR, item.current_filename),
    outputDir: OUTPUT_DIR
  }));
  fs.writeFileSync(manifestPath, JSON.stringify(images, null, 2), "utf8");
  fs.writeFileSync(psPath, contactSheetPowerShell(), "utf8");

  const result = spawnSync("powershell", [
    "-NoProfile",
    "-ExecutionPolicy",
    "Bypass",
    "-File",
    psPath,
    manifestPath,
    OUTPUT_DIR
  ], { encoding: "utf8" });

  fs.rmSync(psPath, { force: true });

  if (result.status !== 0) {
    return {
      ok: false,
      files: [],
      message: `${result.stderr || result.stdout || "PowerShell contact sheet generation failed."}`.trim()
    };
  }

  const files = fs.readdirSync(OUTPUT_DIR)
    .filter((name) => /^contact_sheet_\d+\.jpg$/i.test(name))
    .sort();
  return { ok: true, files, message: result.stdout.trim() };
}

function contactSheetPowerShell() {
  return String.raw`
param(
  [Parameter(Mandatory=$true)][string]$ManifestPath,
  [Parameter(Mandatory=$true)][string]$OutputDir
)

Add-Type -AssemblyName System.Drawing

$items = Get-Content -LiteralPath $ManifestPath -Raw | ConvertFrom-Json
$cols = 5
$rows = 4
$cellW = 240
$cellH = 230
$thumbMax = 160
$sheetIndex = 1

for ($start = 0; $start -lt $items.Count; $start += ($cols * $rows)) {
  $bitmap = New-Object System.Drawing.Bitmap ($cols * $cellW), ($rows * $cellH)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.Clear([System.Drawing.Color]::White)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $fontTitle = New-Object System.Drawing.Font "Arial", 18, ([System.Drawing.FontStyle]::Bold)
  $fontName = New-Object System.Drawing.Font "Arial", 9, ([System.Drawing.FontStyle]::Regular)
  $brushText = [System.Drawing.Brushes]::Black
  $brushMuted = [System.Drawing.Brushes]::DimGray
  $pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::LightGray), 1

  for ($slot = 0; $slot -lt ($cols * $rows); $slot++) {
    $idx = $start + $slot
    if ($idx -ge $items.Count) { break }
    $item = $items[$idx]
    $col = $slot % $cols
    $row = [math]::Floor($slot / $cols)
    $x = $col * $cellW
    $y = $row * $cellH
    $graphics.DrawRectangle($pen, $x + 8, $y + 8, $cellW - 16, $cellH - 16)
    $graphics.DrawString(("{0}" -f $item.index), $fontTitle, $brushText, $x + 16, $y + 14)

    try {
      $img = [System.Drawing.Image]::FromFile($item.path)
      $scale = [math]::Min($thumbMax / $img.Width, $thumbMax / $img.Height)
      $drawW = [int]($img.Width * $scale)
      $drawH = [int]($img.Height * $scale)
      $drawX = $x + [int](($cellW - $drawW) / 2)
      $drawY = $y + 48 + [int](($thumbMax - $drawH) / 2)
      $graphics.DrawImage($img, $drawX, $drawY, $drawW, $drawH)
      $img.Dispose()
    } catch {
      $graphics.DrawString("IMAGE LOAD ERROR", $fontName, $brushMuted, $x + 48, $y + 112)
    }

    $name = [string]$item.filename
    if ($name.Length -gt 34) { $name = $name.Substring(0, 31) + "..." }
    $graphics.DrawString($name, $fontName, $brushText, $x + 16, $y + 212)
  }

  $out = Join-Path $OutputDir ("contact_sheet_{0:000}.jpg" -f $sheetIndex)
  $bitmap.Save($out, [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $graphics.Dispose()
  $bitmap.Dispose()
  $sheetIndex += 1
}

Write-Output ("Created {0} contact sheet file(s)." -f ($sheetIndex - 1))
`;
}

function writeInventoryReport(inventory, contactResult) {
  const report = [
    "# Asset Intake Inventory Report",
    "",
    "This report is read-only for raw assets. No source files were renamed, deleted, or overwritten.",
    "",
    `- Total input images: ${inventory.length}`,
    `- Auto-suggested by filename: ${inventory.filter((item) => item.status === "AUTO_SUGGESTED").length}`,
    `- Needs visual review: ${inventory.filter((item) => item.status === "NEEDS_REVIEW").length}`,
    `- Contact sheet status: ${contactResult.ok ? "created" : "failed"}`,
    ""
  ];

  if (contactResult.files.length > 0) {
    report.push("## Contact Sheets", "");
    contactResult.files.forEach((file) => report.push(`- ${file}`));
    report.push("");
  }

  if (!contactResult.ok) {
    report.push("## Contact Sheet Error", "", contactResult.message, "");
  }

  report.push(
    "## Next Step",
    "",
    "Review the contact sheets, fill `asset-intake/output/asset_mapping_template.csv`, then run:",
    "",
    "```bat",
    "node tools\\asset-apply-mapping.js",
    "```",
    "",
    "Rows with blank target filename or `NEEDS_REVIEW` will be skipped."
  );

  fs.writeFileSync(path.join(OUTPUT_DIR, "rename_report.md"), `${report.join("\r\n")}\r\n`, "utf8");
}

function main() {
  ensureDir(RAW_DIR);
  ensureDir(OUTPUT_DIR);

  const expectedAssets = buildExpectedAssets(readDataset());
  const expectedByStem = new Map(
    expectedAssets.map((item) => [path.basename(item.expected_filename, ".webp").toLowerCase(), item.expected_filename])
  );
  const inventory = buildInventory(expectedByStem);
  const mappingRows = buildMappingRows(inventory);

  writeCsv(path.join(OUTPUT_DIR, "expected_asset_filenames.csv"), [
    "id",
    "title",
    "answer",
    "expected_filename"
  ], expectedAssets);
  writeCsv(path.join(OUTPUT_DIR, "asset_inventory.csv"), [
    "index",
    "current_filename",
    "extension",
    "width",
    "height",
    "size_kb",
    "suggested_target_filename",
    "status",
    "notes"
  ], inventory);
  writeCsv(path.join(OUTPUT_DIR, "asset_mapping_template.csv"), [
    "index",
    "current_filename",
    "target_filename",
    "confidence",
    "notes"
  ], mappingRows);

  const contactResult = createContactSheets(inventory);
  writeInventoryReport(inventory, contactResult);

  console.log(`Input images: ${inventory.length}`);
  console.log(`Auto-suggested: ${inventory.filter((item) => item.status === "AUTO_SUGGESTED").length}`);
  console.log(`Needs review: ${inventory.filter((item) => item.status === "NEEDS_REVIEW").length}`);
  console.log("Created:");
  [
    "asset-intake/output/expected_asset_filenames.csv",
    "asset-intake/output/asset_inventory.csv",
    "asset-intake/output/asset_mapping_template.csv",
    "asset-intake/output/rename_report.md",
    ...contactResult.files.map((file) => `asset-intake/output/${file}`)
  ].forEach((file) => console.log(`- ${file}`));
  if (!contactResult.ok) {
    console.log(`Contact sheet warning: ${contactResult.message}`);
  }
  console.log("Raw source files were not renamed, deleted, or overwritten.");
}

main();
