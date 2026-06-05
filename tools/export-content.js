const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const inputPath = path.join(rootDir, "content", "animals", "animals_vi_3_5_mvp_20.json");
const outputDir = path.join(rootDir, "exports", "generated");

const outputFiles = {
  ebook: path.join(outputDir, "animals_ebook_mvp_20.md"),
  flashcards: path.join(outputDir, "animals_flashcards_mvp_20.csv"),
  coloring: path.join(outputDir, "animals_coloring_prompts_mvp_20.csv"),
  videos: path.join(outputDir, "animals_video_scripts_mvp_20.csv"),
  parentGuide: path.join(outputDir, "animals_parent_guide_mvp_20.md"),
};

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

  const requiredFields = ["id", "title", "riddle", "answer", "fact"];
  const errors = [];

  items.forEach((item, index) => {
    requiredFields.forEach((field) => {
      if (!item || item[field] === undefined || item[field] === null || item[field] === "") {
        errors.push(`Item ${index + 1} is missing required field: ${field}`);
      }
    });

    if (item && item.quiz && item.quiz.options !== undefined && !Array.isArray(item.quiz.options)) {
      errors.push(`Item ${index + 1} (${item.id || "unknown id"}) has quiz.options but it is not an array.`);
    }

    if (item && item.quiz && item.quiz.correctAnswer !== undefined) {
      if (!Array.isArray(item.quiz.options)) {
        errors.push(`Item ${index + 1} (${item.id || "unknown id"}) has quiz.correctAnswer but no valid quiz.options array.`);
      } else if (!item.quiz.options.includes(item.quiz.correctAnswer)) {
        errors.push(`Item ${index + 1} (${item.id || "unknown id"}) has quiz.correctAnswer outside quiz.options.`);
      }
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

function listText(values) {
  return Array.isArray(values) ? values.join("; ") : "";
}

function markdownList(values) {
  if (!Array.isArray(values) || values.length === 0) {
    return "- Không có.";
  }
  return values.map((value) => `- ${value}`).join("\n");
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

function writeOutput(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
}

function main() {
  const items = readJson(inputPath);
  validateItems(items);

  fs.mkdirSync(outputDir, { recursive: true });

  writeOutput(outputFiles.ebook, makeEbook(items));
  writeOutput(outputFiles.flashcards, makeFlashcardsCsv(items));
  writeOutput(outputFiles.coloring, makeColoringCsv(items));
  writeOutput(outputFiles.videos, makeVideoCsv(items));
  writeOutput(outputFiles.parentGuide, makeParentGuide(items));

  console.log(`Exported ${items.length} items.`);
  console.log("Created files:");
  Object.values(outputFiles).forEach((filePath) => {
    console.log(`- ${path.relative(rootDir, filePath)}`);
  });
  console.log("Source content was not modified.");
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
