const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const RAW_DIR = path.join(ROOT, "asset-intake", "raw");
const OUTPUT_DIR = path.join(ROOT, "asset-intake", "output");
const PROCESSED_DIR = path.join(ROOT, "asset-intake", "processed-webp");
const STAGING_NEEDS_CONVERSION_DIR = path.join(ROOT, "asset-intake", "processed-needs-conversion");
const FINAL_THUMBNAIL_DIR = path.join(ROOT, "apps", "guess-animal", "assets", "real", "thumbnails");
const MAPPING_PATH = path.join(OUTPUT_DIR, "asset_mapping_template.csv");
const VALID_TARGET_RE = /^[a-z0-9][a-z0-9_-]*\.webp$/;

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function csvEscape(value) {
  const text = value == null ? "" : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
  }

  if (field || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  const headers = rows.shift() || [];
  return rows
    .filter((values) => values.some((value) => value.trim()))
    .map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] || ""])));
}

function writeReport(summary, records) {
  const lines = [
    "# Asset Mapping Apply Report",
    "",
    "Raw source files were not renamed, deleted, or overwritten.",
    "",
    `- Total mapping rows: ${summary.totalRows}`,
    `- Processed: ${summary.processed}`,
    `- Skipped: ${summary.skipped}`,
    `- NEEDS_REVIEW: ${summary.needsReview}`,
    `- Target duplicates/existing: ${summary.targetExists}`,
    `- Errors: ${summary.errors}`,
    `- Converter: ${summary.converter || "none"}`,
    ""
  ];

  if (!summary.converter) {
    lines.push(
      "## Conversion Notice",
      "",
      "No WebP converter was found. Install ImageMagick `magick` or `cwebp`, then rerun this script.",
      "Non-WebP sources are copied only to `asset-intake/processed-needs-conversion/` for manual conversion and are not copied into the app as fake `.webp` files.",
      ""
    );
  }

  lines.push("## Rows", "");
  lines.push("| index | current_filename | target_filename | status | note |");
  lines.push("|---|---|---|---|---|");
  records.forEach((record) => {
    lines.push(`| ${record.index} | ${record.current_filename} | ${record.target_filename} | ${record.status} | ${record.note} |`);
  });

  fs.writeFileSync(path.join(OUTPUT_DIR, "rename_report.md"), `${lines.join("\r\n")}\r\n`, "utf8");
}

function findConverter() {
  const magick = spawnSync("magick", ["-version"], { encoding: "utf8" });
  if (magick.status === 0) {
    return "magick";
  }
  const cwebp = spawnSync("cwebp", ["-version"], { encoding: "utf8" });
  if (cwebp.status === 0) {
    return "cwebp";
  }
  return "";
}

function convertToWebp(sourcePath, targetPath, converter) {
  if (path.extname(sourcePath).toLowerCase() === ".webp") {
    fs.copyFileSync(sourcePath, targetPath);
    return;
  }

  if (converter === "magick") {
    const result = spawnSync("magick", [sourcePath, "-quality", "82", targetPath], { encoding: "utf8" });
    if (result.status !== 0) {
      throw new Error((result.stderr || result.stdout || "ImageMagick conversion failed.").trim());
    }
    return;
  }

  if (converter === "cwebp") {
    const result = spawnSync("cwebp", ["-q", "82", sourcePath, "-o", targetPath], { encoding: "utf8" });
    if (result.status !== 0) {
      throw new Error((result.stderr || result.stdout || "cwebp conversion failed.").trim());
    }
    return;
  }

  throw new Error("No WebP converter available.");
}

function shouldSkipTarget(targetFilename) {
  const value = String(targetFilename || "").trim();
  return !value || value.toUpperCase() === "NEEDS_REVIEW";
}

function main() {
  ensureDir(OUTPUT_DIR);
  ensureDir(PROCESSED_DIR);
  ensureDir(STAGING_NEEDS_CONVERSION_DIR);
  ensureDir(FINAL_THUMBNAIL_DIR);

  if (!fs.existsSync(MAPPING_PATH)) {
    throw new Error("Missing asset-intake/output/asset_mapping_template.csv. Run node tools\\asset-intake-inventory.js first.");
  }

  const rows = parseCsv(fs.readFileSync(MAPPING_PATH, "utf8"));
  const converter = findConverter();
  const summary = {
    totalRows: rows.length,
    processed: 0,
    skipped: 0,
    needsReview: 0,
    targetExists: 0,
    errors: 0,
    converter
  };
  const records = [];

  rows.forEach((row) => {
    const index = row.index || "";
    const currentFilename = String(row.current_filename || "").trim();
    const targetFilename = String(row.target_filename || "").trim().toLowerCase();
    const sourcePath = path.join(RAW_DIR, currentFilename);
    const processedPath = path.join(PROCESSED_DIR, targetFilename);
    const finalPath = path.join(FINAL_THUMBNAIL_DIR, targetFilename);

    const record = {
      index,
      current_filename: currentFilename,
      target_filename: targetFilename,
      status: "skipped",
      note: ""
    };

    try {
      if (shouldSkipTarget(targetFilename)) {
        summary.skipped += 1;
        summary.needsReview += 1;
        record.status = "NEEDS_REVIEW";
        record.note = "Blank or NEEDS_REVIEW target.";
      } else if (!VALID_TARGET_RE.test(targetFilename)) {
        summary.skipped += 1;
        summary.errors += 1;
        record.status = "invalid_target";
        record.note = "Target must be lowercase .webp with no spaces or path separators.";
      } else if (!fs.existsSync(sourcePath)) {
        summary.skipped += 1;
        summary.errors += 1;
        record.status = "missing_source";
        record.note = "Source file not found in asset-intake/raw.";
      } else if (fs.existsSync(processedPath) || fs.existsSync(finalPath)) {
        summary.skipped += 1;
        summary.targetExists += 1;
        record.status = "target_exists";
        record.note = "Skipped to avoid overwrite. Move or back up existing target first.";
      } else if (!converter && path.extname(sourcePath).toLowerCase() !== ".webp") {
        const stagingPath = path.join(STAGING_NEEDS_CONVERSION_DIR, currentFilename);
        if (!fs.existsSync(stagingPath)) {
          fs.copyFileSync(sourcePath, stagingPath);
        }
        summary.skipped += 1;
        summary.errors += 1;
        record.status = "converter_missing";
        record.note = "Copied to processed-needs-conversion; not copied into app because WebP conversion is unavailable.";
      } else {
        convertToWebp(sourcePath, processedPath, converter);
        fs.copyFileSync(processedPath, finalPath);
        summary.processed += 1;
        record.status = "processed";
        record.note = "Converted/copied safely without changing raw source.";
      }
    } catch (error) {
      summary.skipped += 1;
      summary.errors += 1;
      record.status = "error";
      record.note = String(error.message || error).replace(/\|/g, "/");
    }

    records.push(record);
  });

  writeReport(summary, records);

  console.log(`Mapping rows: ${summary.totalRows}`);
  console.log(`Processed: ${summary.processed}`);
  console.log(`Skipped: ${summary.skipped}`);
  console.log(`NEEDS_REVIEW: ${summary.needsReview}`);
  console.log(`Target exists: ${summary.targetExists}`);
  console.log(`Errors: ${summary.errors}`);
  console.log(`Converter: ${summary.converter || "none"}`);
  console.log("Report: asset-intake/output/rename_report.md");
  console.log("Raw source files were not renamed, deleted, or overwritten.");
}

main();
