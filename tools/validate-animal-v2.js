const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const V1_PATH = path.join(ROOT, "content", "animals", "animals_vi_3_5_mvp_100.json");
const V2_PATH = path.join(ROOT, "content", "animals", "animals_vi_3_5_v2_100.json");
const THUMBNAIL_DIR = path.join(ROOT, "apps", "guess-animal", "assets", "real", "thumbnails");

const BAD_LABELS = new Set([
  "co",
  "khong",
  "khong biet",
  "canh",
  "hoa",
  "mau sac",
  "duoi nuoc",
  "tren cay",
  "bay",
  "boi",
  "an co",
  "bien",
  "rung"
]);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .replace(/\s+/g, " ");
}

function labelFromV1(item) {
  return String(item.answer || item.title || "")
    .replace(/^Con\s+/i, "")
    .trim();
}

function getAssetKeyFromAnimalId(animalId) {
  const key = String(animalId || "")
    .replace(/^animal_/, "")
    .replace(/_vi_3_5$/, "");
  return key || "";
}

function addError(errors, message) {
  errors.push(message);
}

function validate() {
  const errors = [];
  const v1 = readJson(V1_PATH);
  const v2 = readJson(V2_PATH);

  if (!Array.isArray(v1)) {
    addError(errors, "ERROR V1 dataset is not an array.");
  }
  if (!Array.isArray(v2)) {
    addError(errors, "ERROR V2 dataset is not an array.");
  }
  if (errors.length > 0) {
    return { errors, v1Count: 0, v2Count: 0 };
  }

  if (v1.length !== 100) {
    addError(errors, `ERROR V1 item count must be 100. Actual: ${v1.length}`);
  }
  if (v2.length !== 100) {
    addError(errors, `ERROR V2 item count must be 100. Actual: ${v2.length}`);
  }

  const v1ById = new Map();
  const expectedLabels = new Map();
  v1.forEach((item) => {
    if (v1ById.has(item.id)) {
      addError(errors, `ERROR duplicate V1 id: ${item.id}`);
    }
    v1ById.set(item.id, item);
    expectedLabels.set(item.id, labelFromV1(item));
  });

  const v2ById = new Map();
  v2.forEach((item) => {
    if (!item.id) {
      addError(errors, "ERROR V2 item missing id.");
      return;
    }
    if (v2ById.has(item.id)) {
      addError(errors, `ERROR duplicate V2 id: ${item.id}`);
    }
    v2ById.set(item.id, item);
  });

  v1ById.forEach((_, id) => {
    if (!v2ById.has(id)) {
      addError(errors, `ERROR missing V2 id from V1 coverage: ${id}`);
    }
  });

  v2ById.forEach((_, id) => {
    if (!v1ById.has(id)) {
      addError(errors, `ERROR V2 id not found in V1: ${id}`);
    }
  });

  v2.forEach((item) => {
    const prefix = `item.id = ${item.id}`;
    if (!item.animalName || !String(item.animalName).trim()) {
      addError(errors, `ERROR empty animalName: ${prefix}`);
    }
    if (!item.question || !String(item.question).trim()) {
      addError(errors, `ERROR empty question: ${prefix}`);
    }

    const expectedCorrectLabel = expectedLabels.get(item.id);
    if (!item.correctAnswer || typeof item.correctAnswer !== "object") {
      addError(errors, `ERROR missing correctAnswer: ${prefix}`);
    } else {
      if (item.correctAnswer.animalId !== item.id) {
        addError(errors, [
          "ERROR correctAnswer animalId mismatch:",
          `item.id = ${item.id}`,
          `correctAnswer.animalId = ${item.correctAnswer.animalId}`
        ].join("\n"));
      }
      validateOption(errors, item.id, item.correctAnswer, expectedLabels, "correctAnswer");
      if (expectedCorrectLabel && normalizeText(item.correctAnswer.label) !== normalizeText(expectedCorrectLabel)) {
        addError(errors, `ERROR correctAnswer label mismatch: ${prefix}; expected "${expectedCorrectLabel}", got "${item.correctAnswer.label}"`);
      }
    }

    if (!Array.isArray(item.wrongAnswers)) {
      addError(errors, `ERROR wrongAnswers must be array: ${prefix}`);
    } else if (item.wrongAnswers.length !== 2) {
      addError(errors, `ERROR wrongAnswers must have exactly 2 items: ${prefix}; actual ${item.wrongAnswers.length}`);
    } else {
      item.wrongAnswers.forEach((option, index) => {
        validateOption(errors, item.id, option, expectedLabels, `wrongAnswers[${index}]`);
        if (option && option.animalId === item.id) {
          addError(errors, `ERROR wrongAnswers animalId duplicates correct id: ${prefix}; wrong animalId = ${option.animalId}`);
        }
      });

      const wrongIds = item.wrongAnswers.map((option) => option && option.animalId);
      if (wrongIds[0] && wrongIds[0] === wrongIds[1]) {
        addError(errors, `ERROR duplicate wrongAnswers animalId: ${prefix}; animalId = ${wrongIds[0]}`);
      }
    }

    const optionIds = [
      item.correctAnswer && item.correctAnswer.animalId,
      ...(Array.isArray(item.wrongAnswers) ? item.wrongAnswers.map((option) => option && option.animalId) : [])
    ].filter(Boolean);
    if (new Set(optionIds).size !== 3) {
      addError(errors, `ERROR option animalIds must contain exactly 3 unique ids: ${prefix}; ids = ${optionIds.join(", ")}`);
    }
    optionIds.forEach((animalId) => validateOptionImage(errors, animalId));
  });

  return { errors, v1Count: v1.length, v2Count: v2.length };
}

function validateOption(errors, itemId, option, expectedLabels, fieldName) {
  if (!option || typeof option !== "object") {
    addError(errors, `ERROR ${fieldName} must be object: item.id = ${itemId}`);
    return;
  }
  if (!option.animalId) {
    addError(errors, `ERROR ${fieldName} missing animalId: item.id = ${itemId}`);
  }
  if (!option.label || !String(option.label).trim()) {
    addError(errors, `ERROR ${fieldName} missing label: item.id = ${itemId}; animalId = ${option.animalId}`);
  }
  if (!expectedLabels.has(option.animalId)) {
    addError(errors, `ERROR ${fieldName} animalId not found in V1: item.id = ${itemId}; animalId = ${option.animalId}`);
    return;
  }

  const expectedLabel = expectedLabels.get(option.animalId);
  if (normalizeText(option.label) !== normalizeText(expectedLabel)) {
    addError(errors, `ERROR ${fieldName} label mismatch: item.id = ${itemId}; animalId = ${option.animalId}; expected "${expectedLabel}", got "${option.label}"`);
  }

  if (BAD_LABELS.has(normalizeText(option.label))) {
    addError(errors, `ERROR bad option label: item.id = ${itemId}; animalId = ${option.animalId}; label = ${option.label}`);
  }
}

function validateOptionImage(errors, animalId) {
  const key = getAssetKeyFromAnimalId(animalId);
  if (!key) {
    addError(errors, `ERROR cannot resolve option image key: animalId = ${animalId}`);
    return;
  }
  const expectedFile = path.join(THUMBNAIL_DIR, `${key}.webp`);
  if (!fs.existsSync(expectedFile)) {
    addError(errors, [
      "ERROR missing option image:",
      `animalId = ${animalId}`,
      `expected file = ${expectedFile}`
    ].join("\n"));
  }
}

const result = validate();
if (result.errors.length > 0) {
  console.error(result.errors.join("\n"));
  process.exit(1);
}

console.log("Animal V2 validation PASS");
console.log(`V1 items: ${result.v1Count}`);
console.log(`V2 items: ${result.v2Count}`);
console.log("All ids covered");
console.log("All correctAnswer animalId match item id");
console.log("All wrongAnswers valid");
console.log("All option images exist");
