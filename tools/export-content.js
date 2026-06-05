const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "exports", "generated");
const printableDir = path.join(rootDir, "exports", "printable");

const defaultSource = path.join(rootDir, "content", "animals", "animals_vi_3_5_mvp_20.json");
const defaultSuffix = "mvp_20";
const allowedStatuses = ["draft", "reviewed", "published"];

function parseArgs(argv) {
  const options = {
    source: defaultSource,
    suffix: defaultSuffix,
    printable: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const value = argv[index + 1];

    if (arg === "--source") {
      if (!value) {
        throw new Error("Missing value for --source.");
      }
      options.source = path.resolve(rootDir, value);
      index += 1;
    } else if (arg === "--suffix") {
      if (!value) {
        throw new Error("Missing value for --suffix.");
      }
      options.suffix = value;
      index += 1;
    } else if (arg === "--printable") {
      options.printable = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function makeOutputFiles(suffix) {
  return {
    ebook: path.join(outputDir, `animals_ebook_${suffix}.md`),
    flashcards: path.join(outputDir, `animals_flashcards_${suffix}.csv`),
    coloring: path.join(outputDir, `animals_coloring_prompts_${suffix}.csv`),
    videos: path.join(outputDir, `animals_video_scripts_${suffix}.csv`),
    parentGuide: path.join(outputDir, `animals_parent_guide_${suffix}.md`),
  };
}

function makePrintableFiles() {
  return {
    ebookPrint: path.join(printableDir, "animals_ebook_print.html"),
    flashcardsPrint: path.join(printableDir, "animals_flashcards_print.html"),
    coloringPromptBook: path.join(printableDir, "animals_coloring_prompt_book.md"),
    printGuide: path.join(printableDir, "PRINT_GUIDE.md"),
  };
}

function validationError(index, item, field, reason) {
  const id = item && item.id ? item.id : "unknown id";
  return `Item ${index + 1} (${id}) field "${field}": ${reason}`;
}

function isMissing(value) {
  return value === undefined || value === null || value === "";
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`Cannot read or parse JSON: ${filePath}\n${error.message}`);
  }
}

function validateItems(items) {
  if (!Array.isArray(items)) {
    throw new Error("Content data must be a JSON array.");
  }

  if (items.length < 1) {
    throw new Error("Content data must contain at least 1 item.");
  }

  const requiredFields = [
    "id",
    "topic",
    "ageGroup",
    "title",
    "riddle",
    "answer",
    "fact",
    "vocabulary",
    "quiz",
    "coloringPrompt",
    "imagePrompt",
    "shortVideoScript",
    "worksheetInstruction",
    "parentGuide",
    "safetyNotes",
    "difficulty",
    "status",
  ];
  const errors = [];
  const ids = new Map();
  const titles = new Map();

  items.forEach((item, index) => {
    requiredFields.forEach((field) => {
      if (!item || isMissing(item[field])) {
        errors.push(validationError(index, item, field, "missing required field"));
      }
    });

    if (!item) {
      return;
    }

    if (ids.has(item.id)) {
      errors.push(validationError(index, item, "id", `duplicate id; first seen at item ${ids.get(item.id) + 1}`));
    } else {
      ids.set(item.id, index);
    }

    if (titles.has(item.title)) {
      errors.push(validationError(index, item, "title", `duplicate title; first seen at item ${titles.get(item.title) + 1}`));
    } else {
      titles.set(item.title, index);
    }

    if (item.topic !== "animals") {
      errors.push(validationError(index, item, "topic", 'must be "animals"'));
    }

    if (item.ageGroup !== "3-5") {
      errors.push(validationError(index, item, "ageGroup", 'must be "3-5"'));
    }

    if (!allowedStatuses.includes(item.status)) {
      errors.push(validationError(index, item, "status", "must be draft, reviewed, or published"));
    }

    if (!Array.isArray(item.quiz && item.quiz.options)) {
      errors.push(validationError(index, item, "quiz.options", "must be an array"));
    } else if (item.quiz.options.length !== 3) {
      errors.push(validationError(index, item, "quiz.options", "must contain exactly 3 options"));
    }

    if (!item.quiz || isMissing(item.quiz.correctAnswer)) {
      errors.push(validationError(index, item, "quiz.correctAnswer", "missing required field"));
    } else if (Array.isArray(item.quiz.options) && !item.quiz.options.includes(item.quiz.correctAnswer)) {
      errors.push(validationError(index, item, "quiz.correctAnswer", "must be inside quiz.options"));
    }
  });

  if (errors.length > 0) {
    throw new Error(`Content validation failed:\n${errors.join("\n")}`);
  }
}

function csvEscape(value) {
  const text = value === undefined || value === null ? "" : String(value).replace(/\r?\n/g, " ");
  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function csvRow(values) {
  return values.map(csvEscape).join(",");
}

function htmlEscape(value) {
  return String(value === undefined || value === null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function listText(values) {
  return Array.isArray(values) ? values.join("; ") : "";
}

function markdownList(values) {
  if (!Array.isArray(values) || values.length === 0) {
    return "- Không có.";
  }
  return values.map((value) => `- ${value}`).join("\n");
}

function htmlList(values) {
  if (!Array.isArray(values) || values.length === 0) {
    return "<p>Không có.</p>";
  }
  return `<ul>${values.map((value) => `<li>${htmlEscape(value)}</li>`).join("")}</ul>`;
}

function htmlParagraphs(value) {
  return htmlEscape(value).replace(/\r?\n/g, "<br>");
}

function makeEbook(items) {
  const sections = items.map((item, index) => {
    const vocabulary = markdownList(item.vocabulary);
    const quizQuestion = item.quiz && item.quiz.question ? item.quiz.question : "";

    return [
      `## ${index + 1}. ${item.title}`,
      "",
      "### Câu đố",
      item.riddle,
      "",
      "### Đáp án",
      item.answer,
      "",
      "### Kiến thức nhỏ",
      item.fact,
      "",
      "### Từ mới",
      vocabulary,
      "",
      "### Câu hỏi cho bé",
      quizQuestion,
      "",
      "---",
    ].join("\n");
  });

  return [
    "# Bé Khám Phá Động Vật",
    "",
    "Mỗi ngày một câu đố, một hình ảnh, một điều mới.",
    "",
    ...sections,
  ].join("\n\n") + "\n";
}

function makeFlashcardsCsv(items) {
  const header = csvRow(["id", "title", "frontText", "backAnswer", "fact", "vocabulary", "quizQuestion"]);
  const rows = items.map((item) =>
    csvRow([
      item.id,
      item.title,
      item.riddle,
      item.answer,
      item.fact,
      listText(item.vocabulary),
      item.quiz && item.quiz.question ? item.quiz.question : "",
    ])
  );
  return [header, ...rows].join("\n") + "\n";
}

function makeColoringCsv(items) {
  const header = csvRow(["id", "title", "coloringPrompt"]);
  const rows = items.map((item) => csvRow([item.id, item.title, item.coloringPrompt || ""]));
  return [header, ...rows].join("\n") + "\n";
}

function makeVideoCsv(items) {
  const header = csvRow(["id", "title", "shortVideoScript", "imagePrompt"]);
  const rows = items.map((item) =>
    csvRow([item.id, item.title, item.shortVideoScript || "", item.imagePrompt || ""])
  );
  return [header, ...rows].join("\n") + "\n";
}

function makeParentGuide(items) {
  const sections = items.map((item, index) => {
    const safetyNotes = Array.isArray(item.safetyNotes) && item.safetyNotes.length > 0
      ? markdownList(item.safetyNotes)
      : "Không có.";

    return [
      `## ${index + 1}. ${item.title}`,
      "",
      "### Câu hỏi gợi mở",
      "",
      item.parentGuide || "",
      "",
      "### Từ mới",
      "",
      markdownList(item.vocabulary),
      "",
      "### Lưu ý an toàn",
      "",
      safetyNotes,
      "",
      "---",
    ].join("\n");
  });

  return ["# Hướng Dẫn Phụ Huynh", "", ...sections].join("\n\n") + "\n";
}

function makePrintableEbook(items) {
  const sections = items.map((item, index) => {
    const quizQuestion = item.quiz && item.quiz.question ? item.quiz.question : "";
    const safety = Array.isArray(item.safetyNotes) && item.safetyNotes.length > 0
      ? `<section><h3>Lưu ý an toàn</h3>${htmlList(item.safetyNotes)}</section>`
      : "";

    return `
      <article class="item">
        <p class="item-number">Câu ${index + 1}</p>
        <h2>${htmlEscape(item.title)}</h2>
        <section>
          <h3>Câu đố</h3>
          <p class="riddle">${htmlParagraphs(item.riddle)}</p>
        </section>
        <section>
          <h3>Đáp án</h3>
          <p><strong>${htmlEscape(item.answer)}</strong></p>
        </section>
        <section>
          <h3>Kiến thức nhỏ</h3>
          <p>${htmlEscape(item.fact)}</p>
        </section>
        <section>
          <h3>Từ mới</h3>
          ${htmlList(item.vocabulary)}
        </section>
        <section>
          <h3>Câu hỏi quiz</h3>
          <p>${htmlEscape(quizQuestion)}</p>
        </section>
        <section>
          <h3>Gợi ý phụ huynh</h3>
          <p>${htmlEscape(item.parentGuide || "Cùng bé nhắc lại đáp án và đặc điểm chính.")}</p>
        </section>
        ${safety}
      </article>`;
  }).join("\n");

  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <title>Bé Khám Phá Động Vật - Printable Ebook</title>
  <style>
    @page { size: A4; margin: 14mm; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #222; font-family: Arial, sans-serif; line-height: 1.55; background: #fff; }
    .cover { min-height: 92vh; display: flex; flex-direction: column; justify-content: center; border: 2px solid #222; padding: 28mm 18mm; text-align: center; page-break-after: always; }
    .cover h1 { margin: 0; font-size: 38px; line-height: 1.15; }
    .cover .subtitle { margin: 14px 0 0; font-size: 22px; font-weight: 700; }
    .cover .intro { margin: 28px auto 0; max-width: 620px; font-size: 16px; }
    .item { page-break-inside: avoid; break-inside: avoid; margin: 0 0 12mm; padding: 8mm; border: 1px solid #333; border-radius: 6px; }
    .item-number { margin: 0 0 4px; font-weight: 700; color: #555; }
    h2 { margin: 0 0 8px; font-size: 24px; }
    h3 { margin: 12px 0 4px; font-size: 14px; text-transform: uppercase; }
    p { margin: 0 0 6px; }
    ul { margin: 0; padding-left: 18px; }
    .riddle { white-space: normal; font-size: 17px; }
    @media print {
      body { background: #fff; }
      .item { box-shadow: none; }
    }
  </style>
</head>
<body>
  <section class="cover">
    <h1>Bé Khám Phá Động Vật</h1>
    <p class="subtitle">100 câu đố vui cho trẻ 3-5 tuổi</p>
    <p class="intro">Tài liệu dành cho phụ huynh đọc và chơi cùng bé. Mỗi trang gồm câu đố, đáp án, kiến thức nhỏ, từ mới, câu hỏi quiz và gợi ý trò chuyện.</p>
  </section>
  ${sections}
</body>
</html>
`;
}

function makePrintableFlashcards(items) {
  const cards = items.map((item, index) => {
    return `
      <article class="card-pair">
        <section class="card front">
          <p class="label">Mặt trước · ${index + 1}</p>
          <h2>${htmlEscape(item.title)}</h2>
          <p class="riddle">${htmlParagraphs(item.riddle)}</p>
        </section>
        <section class="card back">
          <p class="label">Mặt sau · ${index + 1}</p>
          <h2>${htmlEscape(item.answer)}</h2>
          <p>${htmlEscape(item.fact)}</p>
          <p><strong>Từ mới:</strong> ${htmlEscape(listText(item.vocabulary))}</p>
        </section>
      </article>`;
  }).join("\n");

  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <title>Bé Khám Phá Động Vật - Printable Flashcards</title>
  <style>
    @page { size: A4; margin: 10mm; }
    * { box-sizing: border-box; }
    body { margin: 0; color: #222; font-family: Arial, sans-serif; line-height: 1.45; background: #fff; }
    header { margin-bottom: 8mm; padding-bottom: 5mm; border-bottom: 2px solid #222; }
    h1 { margin: 0; font-size: 30px; }
    .guide { margin: 6px 0 0; color: #444; }
    .grid { display: grid; grid-template-columns: 1fr; gap: 7mm; }
    .card-pair { page-break-inside: avoid; break-inside: avoid; display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; }
    .card { min-height: 86mm; padding: 6mm; border: 1.5px dashed #222; border-radius: 6px; }
    .label { margin: 0 0 6px; color: #555; font-size: 12px; font-weight: 700; text-transform: uppercase; }
    h2 { margin: 0 0 8px; font-size: 20px; }
    p { margin: 0 0 8px; }
    .riddle { font-size: 16px; }
    @media print {
      .card-pair { page-break-inside: avoid; break-inside: avoid; }
    }
  </style>
</head>
<body>
  <header>
    <h1>Bé Khám Phá Động Vật - Flashcards</h1>
    <p class="guide">In hai mặt hoặc cắt theo từng cặp mặt trước/mặt sau. Nên kiểm tra thứ tự trang trước khi in số lượng lớn.</p>
  </header>
  <main class="grid">
    ${cards}
  </main>
</body>
</html>
`;
}

function makeColoringPromptBook(items) {
  const sections = items.map((item, index) => {
    return [
      `## ${index + 1}. ${item.title}`,
      "",
      "### Coloring Prompt",
      item.coloringPrompt || "",
      "",
      "### Image Prompt",
      item.imagePrompt || "",
      "",
      "### Gợi ý trang tô màu",
      `Tên tranh: ${item.title}`,
      "Ghi chú: Nét rõ, ít chi tiết, phù hợp trẻ 3-5 tuổi.",
      "",
      "---",
    ].join("\n");
  });

  return [
    "# Coloring Prompt Book - Bé Khám Phá Động Vật",
    "",
    "Bộ prompt dùng để tạo tranh tô màu từ dataset 100 item.",
    "",
    ...sections,
  ].join("\n\n") + "\n";
}

function makePrintGuide() {
  return `# Print Guide

## Cách mở file HTML

1. Mở thư mục \`exports/printable/\`.
2. Mở \`animals_ebook_print.html\` hoặc \`animals_flashcards_print.html\` bằng Chrome, Edge hoặc Brave.
3. Kiểm tra nhanh vài trang đầu, giữa và cuối.

## Cách Save as PDF

1. Bấm \`Ctrl+P\`.
2. Chọn \`Save as PDF\`.
3. Kiểm tra tên file và nơi lưu.
4. Bấm \`Save\`.

## Gợi ý setting

- Paper: A4.
- Margins: Default hoặc Narrow.
- Background graphics: bật nếu muốn giữ màu nền.
- Scale: 90-100%.

## Kiểm trước khi bán hoặc chia sẻ

- Đọc lại toàn bộ nội dung.
- Kiểm lỗi chính tả.
- Kiểm an toàn với các động vật có cảnh báo.
- Kiểm bản quyền hình ảnh nếu có thêm ảnh sau này.

## Ghi chú

Task này không tạo PDF bằng code. PDF được tạo thủ công bằng tính năng Print -> Save as PDF của trình duyệt.
`;
}

function writeOutput(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
}

function writeGeneratedOutputs(items, outputFiles) {
  fs.mkdirSync(outputDir, { recursive: true });
  writeOutput(outputFiles.ebook, makeEbook(items));
  writeOutput(outputFiles.flashcards, makeFlashcardsCsv(items));
  writeOutput(outputFiles.coloring, makeColoringCsv(items));
  writeOutput(outputFiles.videos, makeVideoCsv(items));
  writeOutput(outputFiles.parentGuide, makeParentGuide(items));
}

function writePrintableOutputs(items, printableFiles) {
  fs.mkdirSync(printableDir, { recursive: true });
  writeOutput(printableFiles.ebookPrint, makePrintableEbook(items));
  writeOutput(printableFiles.flashcardsPrint, makePrintableFlashcards(items));
  writeOutput(printableFiles.coloringPromptBook, makeColoringPromptBook(items));
  writeOutput(printableFiles.printGuide, makePrintGuide());
}

function printCreatedFiles(files) {
  Object.values(files).forEach((filePath) => {
    console.log(`- ${path.relative(rootDir, filePath)}`);
  });
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const outputFiles = makeOutputFiles(options.suffix);
  const items = readJson(options.source);
  validateItems(items);

  writeGeneratedOutputs(items, outputFiles);

  console.log(`Exported ${items.length} items.`);
  console.log(`Source: ${path.relative(rootDir, options.source)}`);
  console.log("Created files:");
  printCreatedFiles(outputFiles);

  if (options.printable) {
    const printableFiles = makePrintableFiles();
    writePrintableOutputs(items, printableFiles);
    console.log("Created printable files:");
    printCreatedFiles(printableFiles);
  }

  console.log("Source content was not modified.");
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
