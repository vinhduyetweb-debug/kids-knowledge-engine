const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "exports", "generated");

const defaultSource = path.join(rootDir, "content", "animals", "animals_vi_3_5_mvp_20.json");
const defaultSuffix = "mvp_20";
const allowedStatuses = ["draft", "reviewed", "published"];

function parseArgs(argv) {
  const options = {
    source: defaultSource,
    suffix: defaultSuffix,
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

function validationError(index, item, field, reason) {
  const id = item && item.id ? item.id : "unknown id";
  return `Item ${index + 1} (${id}) field "${field}": ${reason}`;
}

function isMissing(value) {
  return value === undefined || value === null || value === "";
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
  const options = parseArgs(process.argv.slice(2));
  const outputFiles = makeOutputFiles(options.suffix);
  const items = readJson(options.source);
  validateItems(items);

  fs.mkdirSync(outputDir, { recursive: true });

  writeOutput(outputFiles.ebook, makeEbook(items));
  writeOutput(outputFiles.flashcards, makeFlashcardsCsv(items));
  writeOutput(outputFiles.coloring, makeColoringCsv(items));
  writeOutput(outputFiles.videos, makeVideoCsv(items));
  writeOutput(outputFiles.parentGuide, makeParentGuide(items));

  console.log(`Exported ${items.length} items.`);
  console.log(`Source: ${path.relative(rootDir, options.source)}`);
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
