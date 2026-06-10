console.log("Guess Animal App build: 20260610-ux1");

let DATA = [];
let DATA_VERSION = "v1";

const SOUND_PATHS = {
  correct: "/apps/guess-animal/assets/real/sounds/correct.mp3",
  wrong: "/apps/guess-animal/assets/real/sounds/wrong.mp3"
};

const DEFAULT_THUMBNAIL_ASSET = "/apps/guess-animal/assets/thumbnails/default.svg";
const SOUND_STORAGE_KEY = "kke.guessAnimal.soundEnabled";

const BADGE_MILESTONES = [
  { count: 3, id: "badge3", title: "Khởi động giỏi quá", message: "Bé đã trả lời đúng 3 câu rồi!", asset: null },
  { count: 5, id: "badge5", title: "Bé quan sát thật tốt", message: "Bé nhận huy hiệu 5 câu đúng!", asset: null },
  { count: 10, id: "badge10", title: "Nhà thám hiểm động vật", message: "Bé đã trả lời đúng 10 câu!", asset: null },
  { count: 15, id: "badge15", title: "Siêu chọn đúng", message: "15 câu đúng, bé chọn thật tinh mắt!", asset: null },
  { count: 20, id: "badge20", title: "Bậc thầy động vật", message: "20 câu đúng, bé học rất chăm!", asset: null },
  { count: 30, id: "badge30", title: "Anh hùng rừng xanh", message: "30 câu đúng, bé khám phá thật bền bỉ!", asset: null },
  { count: 50, id: "badge50", title: "Chuyên gia động vật", message: "50 câu đúng, bé hiểu rất nhiều bạn động vật!", asset: null },
  { count: 75, id: "badge75", title: "Siêu sao khám phá", message: "75 câu đúng, bé thật tuyệt vời!", asset: null },
  { count: 100, id: "badge100", title: "Nhà vô địch bé khám phá động vật", message: "100 câu đúng, bé là nhà vô địch hôm nay!", asset: null }
];

const CATEGORY_IDS = {
  familiar: new Set([
    "animal_sheep_vi_3_5",
    "animal_cat_vi_3_5",
    "animal_dog_vi_3_5",
    "animal_duck_vi_3_5",
    "animal_cow_vi_3_5",
    "animal_chicken_vi_3_5",
    "animal_rabbit_vi_3_5",
    "animal_frog_vi_3_5",
    "animal_fish_vi_3_5",
    "animal_bird_vi_3_5",
    "animal_horse_vi_3_5",
    "animal_pig_vi_3_5",
    "animal_turtle_vi_3_5",
    "animal_snail_vi_3_5",
    "animal_buffalo_vi_3_5",
    "animal_goat_vi_3_5",
    "animal_donkey_vi_3_5"
  ]),
  wild: new Set([
    "animal_elephant_vi_3_5",
    "animal_monkey_vi_3_5",
    "animal_lion_vi_3_5",
    "animal_giraffe_vi_3_5",
    "animal_zebra_vi_3_5",
    "animal_deer_vi_3_5",
    "animal_stag_vi_3_5",
    "animal_bear_vi_3_5",
    "animal_panda_vi_3_5",
    "animal_tiger_vi_3_5",
    "animal_leopard_vi_3_5",
    "animal_wolf_vi_3_5",
    "animal_crocodile_vi_3_5",
    "animal_hippo_vi_3_5",
    "animal_rhino_vi_3_5",
    "animal_camel_vi_3_5",
    "animal_kangaroo_vi_3_5",
    "animal_koala_vi_3_5",
    "animal_porcupine_vi_3_5",
    "animal_bat_vi_3_5",
    "animal_owl_vi_3_5",
    "animal_eagle_vi_3_5",
    "animal_reindeer_vi_3_5",
    "animal_polar_bear_vi_3_5",
    "animal_fox_vi_3_5",
    "animal_raccoon_vi_3_5",
    "animal_ferret_vi_3_5",
    "animal_beaver_vi_3_5",
    "animal_antelope_vi_3_5",
    "animal_lynx_vi_3_5",
    "animal_ostrich_vi_3_5",
    "animal_snake_vi_3_5",
    "animal_lizard_vi_3_5",
    "animal_gecko_vi_3_5",
    "animal_iguana_vi_3_5",
    "animal_monitor_lizard_vi_3_5"
  ]),
  insects: new Set([
    "animal_bee_vi_3_5",
    "animal_butterfly_vi_3_5",
    "animal_ant_vi_3_5",
    "animal_mosquito_vi_3_5",
    "animal_fly_vi_3_5",
    "animal_dragonfly_vi_3_5",
    "animal_grasshopper_vi_3_5",
    "animal_ladybug_vi_3_5",
    "animal_praying_mantis_vi_3_5",
    "animal_earthworm_vi_3_5",
    "animal_caterpillar_vi_3_5",
    "animal_silkworm_vi_3_5",
    "animal_spider_vi_3_5",
    "animal_beetle_vi_3_5"
  ]),
  sea: new Set([
    "animal_fish_vi_3_5",
    "animal_penguin_vi_3_5",
    "animal_dolphin_vi_3_5",
    "animal_whale_vi_3_5",
    "animal_shark_vi_3_5",
    "animal_starfish_vi_3_5",
    "animal_crab_vi_3_5",
    "animal_shrimp_vi_3_5",
    "animal_squid_vi_3_5",
    "animal_octopus_vi_3_5",
    "animal_seal_vi_3_5",
    "animal_sea_lion_vi_3_5",
    "animal_otter_vi_3_5",
    "animal_seahorse_vi_3_5",
    "animal_jellyfish_vi_3_5",
    "animal_coral_vi_3_5",
    "animal_sea_snail_vi_3_5",
    "animal_clam_vi_3_5",
    "animal_shellfish_vi_3_5",
    "animal_emperor_penguin_vi_3_5",
    "animal_manta_ray_vi_3_5"
  ])
};

const categoryFilter = document.getElementById("categoryFilter");
const contentStatus = document.getElementById("contentStatus");
const counter = document.getElementById("counter");
const score = document.getElementById("score");
const title = document.getElementById("title");
const riddle = document.getElementById("riddle");
const options = document.getElementById("options");
const feedback = document.getElementById("feedback");
const answerBox = document.getElementById("answerBox");
const answer = document.getElementById("answer");
const fact = document.getElementById("fact");
const vocab = document.getElementById("vocab");
const parentGuide = document.getElementById("parentGuide");
const safetyBlock = document.getElementById("safetyBlock");
const safetyNotes = document.getElementById("safetyNotes");
const nextBtn = document.getElementById("nextBtn");
const replayBtn = document.getElementById("replayBtn");
const soundToggle = document.getElementById("soundToggle");
const mascotBubble = document.getElementById("mascotBubble");
const visualStage = document.getElementById("visualStage");
const visualEmoji = document.getElementById("visualEmoji");
const visualHint = document.getElementById("visualHint");
const rewardToast = document.getElementById("rewardToast");
const quickFact = document.getElementById("quickFact");
const badgeRow = document.getElementById("badgeRow");
const badgeModal = document.getElementById("badgeModal");
const badgeModalVisual = document.getElementById("badgeModalVisual");
const badgeModalCount = document.getElementById("badgeModalCount");
const badgeModalTitle = document.getElementById("badgeModalTitle");
const badgeModalMessage = document.getElementById("badgeModalMessage");
const badgeContinueBtn = document.getElementById("badgeContinueBtn");

let soundEnabled = loadSoundPreference();
let audioContext = null;

const state = {
  category: "all",
  queue: [],
  index: 0,
  answered: 0,
  correct: 0,
  currentAnswered: false,
  earnedBadges: new Set()
};

function loadSoundPreference() {
  try {
    return window.localStorage.getItem(SOUND_STORAGE_KEY) !== "off";
  } catch (error) {
    return true;
  }
}

function saveSoundPreference() {
  try {
    window.localStorage.setItem(SOUND_STORAGE_KEY, soundEnabled ? "on" : "off");
  } catch (error) {
    // Sound preference is optional; the app still works without localStorage.
  }
}

function updateSoundToggle() {
  if (!soundToggle) {
    return;
  }

  soundToggle.textContent = soundEnabled ? "Âm thanh: Bật" : "Âm thanh: Tắt";
  soundToggle.setAttribute("aria-label", soundEnabled ? "Tắt âm thanh" : "Bật âm thanh");
  soundToggle.setAttribute("aria-pressed", String(soundEnabled));
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  saveSoundPreference();
  updateSoundToggle();
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getFilteredData(category) {
  if (category === "all") {
    return DATA;
  }

  const ids = CATEGORY_IDS[category];
  return DATA.filter((item) => ids && ids.has(item.id));
}

function setList(element, values) {
  element.innerHTML = "";
  values.forEach((value) => {
    const li = document.createElement("li");
    li.textContent = value;
    element.appendChild(li);
  });
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

function getAssetKeyFromAnimalId(animalId) {
  if (!animalId) {
    return "default";
  }

  const key = String(animalId)
    .replace(/^animal_/, "")
    .replace(/_vi_3_5$/, "");
  return key || "default";
}

function getAssetKeyFromItem(item) {
  return getAssetKeyFromAnimalId(item && item.id);
}

function getRealThumbnailAssetFromAnimalId(animalId) {
  const key = getAssetKeyFromAnimalId(animalId);
  return key === "default" ? "" : `/apps/guess-animal/assets/real/thumbnails/${key}.webp`;
}

function getRealThumbnailAssetFromItem(item) {
  return getRealThumbnailAssetFromAnimalId(item && item.id);
}

function getStarterThumbnailAssetFromAnimalId(animalId) {
  const key = getAssetKeyFromAnimalId(animalId);
  const starterAssets = {
    cat: "/apps/guess-animal/assets/thumbnails/cat.svg",
    dog: "/apps/guess-animal/assets/thumbnails/dog.svg",
    fish: "/apps/guess-animal/assets/thumbnails/fish.svg",
    elephant: "/apps/guess-animal/assets/thumbnails/elephant.svg",
    lion: "/apps/guess-animal/assets/thumbnails/lion.svg",
    bird: "/apps/guess-animal/assets/thumbnails/bird.svg",
    bee: "/apps/guess-animal/assets/thumbnails/bee.svg",
    butterfly: "/apps/guess-animal/assets/thumbnails/butterfly.svg",
    turtle: "/apps/guess-animal/assets/thumbnails/turtle.svg"
  };
  return starterAssets[key] || DEFAULT_THUMBNAIL_ASSET;
}

function getStarterThumbnailAssetFromItem(item) {
  return getStarterThumbnailAssetFromAnimalId(item && item.id);
}

function escapeAttribute(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function handleThumbnailError(img) {
  img.hidden = true;
  const fallbackElement = img.nextElementSibling;
  if (fallbackElement) {
    fallbackElement.hidden = false;
  }
}

function makeThumbnailHtmlFromAssets({ label, realAsset, svgAsset }) {
  const labelText = String(label || "động vật").trim();
  const ariaLabel = escapeAttribute(`Minh họa ${labelText}`);
  const realImage = realAsset
    ? `<img class="thumb-img thumb-img-real" src="${realAsset}" alt="" loading="lazy" onerror="handleThumbnailError(this);">`
    : "";
  const svgHidden = realAsset ? " hidden" : "";
  return `
    <span class="thumb-frame" role="img" aria-label="${ariaLabel}">
      ${realImage}
      <img class="thumb-img thumb-img-svg" src="${svgAsset}" alt="" loading="lazy"${svgHidden} onerror="handleThumbnailError(this);">
    </span>
  `;
}

function makeItemThumbnailHtml(item, label) {
  return makeThumbnailHtmlFromAssets({
    label: label || item.answer || item.title,
    realAsset: getRealThumbnailAssetFromItem(item),
    svgAsset: getStarterThumbnailAssetFromItem(item)
  });
}

function makeNeutralThumbnailHtml(label) {
  return makeThumbnailHtmlFromAssets({
    label,
    realAsset: "",
    svgAsset: DEFAULT_THUMBNAIL_ASSET
  });
}

function makeOptionThumbnailHtml(option, item) {
  if (option && typeof option === "object" && option.animalId) {
    return makeThumbnailHtmlFromAssets({
      label: option.label,
      realAsset: getRealThumbnailAssetFromAnimalId(option.animalId),
      svgAsset: getStarterThumbnailAssetFromAnimalId(option.animalId)
    });
  }

  if (option === item.answer) {
    return makeItemThumbnailHtml(item, option);
  }
  return makeNeutralThumbnailHtml(option);
}

function makeQuickFact(item) {
  const firstSentence = String(item.fact || "").split(/[.!?]/)[0].trim();
  return firstSentence ? `${firstSentence}.` : `${item.answer} có nhiều điều thú vị để bé khám phá.`;
}

function setMascotMessage(message) {
  mascotBubble.textContent = message;
}

function setVisual(item, message) {
  const label = item ? item.answer || item.title : "";
  visualEmoji.innerHTML = item ? makeItemThumbnailHtml(item, label) : makeNeutralThumbnailHtml("động vật");
  visualHint.textContent = message;
  visualStage.classList.remove("pop");
  window.setTimeout(() => visualStage.classList.add("pop"), 0);
}

function showReward(message, strong) {
  rewardToast.textContent = message;
  rewardToast.className = `reward-toast ${strong ? "celebrate" : ""}`;
  window.setTimeout(() => {
    rewardToast.classList.add("hidden");
  }, 1800);
}

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return null;
  }

  if (!audioContext) {
    audioContext = new AudioContextClass();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }

  return audioContext;
}

function playTone(frequency, startTime, duration, type, volume) {
  const context = getAudioContext();
  if (!context) {
    return;
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const start = startTime || context.currentTime;
  oscillator.type = type || "sine";
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume || 0.04, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

function playCorrectTone() {
  const context = getAudioContext();
  if (!context) {
    return;
  }

  const now = context.currentTime;
  [660, 880, 1046].forEach((frequency, index) => {
    playTone(frequency, now + index * 0.07, 0.14, "sine", 0.035);
  });
}

function playWrongTone() {
  const context = getAudioContext();
  if (!context) {
    return;
  }

  const now = context.currentTime;
  playTone(260, now, 0.13, "triangle", 0.028);
  playTone(196, now + 0.12, 0.16, "triangle", 0.024);
}

function playApplauseBurst(context, start, duration) {
  const sampleRate = context.sampleRate;
  const frameCount = Math.floor(sampleRate * duration);
  const buffer = context.createBuffer(1, frameCount, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < frameCount; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / frameCount);
  }

  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(1400, start);
  filter.Q.setValueAtTime(0.8, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(0.035, start + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  source.buffer = buffer;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);
  source.start(start);
  source.stop(start + duration);
}

function playVictorySound() {
  if (!soundEnabled) {
    return;
  }

  const context = getAudioContext();
  if (!context) {
    return;
  }

  const now = context.currentTime;
  [523, 659, 784, 1046].forEach((frequency, index) => {
    playTone(frequency, now + index * 0.1, 0.18, "sine", 0.038);
  });
  [0.08, 0.18, 0.3, 0.42].forEach((offset) => {
    playApplauseBurst(context, now + offset, 0.09);
  });
}

function playFeedbackSound(isCorrect) {
  if (!soundEnabled) {
    return;
  }

  const fallback = isCorrect ? playCorrectTone : playWrongTone;
  if (typeof Audio === "undefined") {
    fallback();
    return;
  }

  const sound = new Audio(isCorrect ? SOUND_PATHS.correct : SOUND_PATHS.wrong);
  sound.volume = isCorrect ? 0.42 : 0.32;
  sound.play().catch(fallback);
}

function vibrateWrongAnswer() {
  if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
    navigator.vibrate([80, 40, 80]);
  }
}

function renderBadgeRow() {
  if (!badgeRow) {
    return;
  }

  badgeRow.innerHTML = "";
  BADGE_MILESTONES.forEach((badge) => {
    const element = document.createElement("div");
    element.id = badge.id;
    element.className = "badge";
    element.innerHTML = `
      <strong>${badge.count}</strong>
      <span>${badge.count} đúng</span>
    `;
    element.title = badge.title;
    badgeRow.appendChild(element);
  });
}

function closeBadgeModal() {
  if (!badgeModal) {
    return;
  }

  badgeModal.classList.add("hidden");
}

function showBadgeModal(badge) {
  if (!badgeModal || !badgeModalVisual || !badgeModalTitle || !badgeModalMessage || !badgeModalCount) {
    return;
  }

  badgeModalVisual.textContent = badge.count;
  badgeModalCount.textContent = `${badge.count} câu đúng`;
  badgeModalTitle.textContent = badge.title;
  badgeModalMessage.textContent = badge.message;
  badgeModal.classList.remove("hidden");
  if (badgeContinueBtn) {
    badgeContinueBtn.focus();
  }
}

function updateBadges() {
  let earnedBadge = null;

  BADGE_MILESTONES.forEach((badge) => {
    const element = document.getElementById(badge.id);
    const earned = state.correct >= badge.count;
    if (element) {
      element.classList.toggle("earned", earned);
    }

    if (earned && !state.earnedBadges.has(badge.count)) {
      state.earnedBadges.add(badge.count);
      earnedBadge = badge;
    }
  });

  return earnedBadge;
}

function scrollToQuestionStart() {
  const target =
    document.querySelector("[data-question-start]") ||
    document.getElementById("questionStage") ||
    document.querySelector(".visual-stage");

  if (!target) {
    return;
  }

  target.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function updateStatus() {
  const reviewed = DATA.filter((item) => item.status === "reviewed").length;
  const draft = DATA.filter((item) => item.status === "draft").length;
  const versionLabel = DATA_VERSION === "v2" ? "V2 option ảnh" : "V1";
  contentStatus.textContent = `Bộ dữ liệu ${versionLabel}: ${DATA.length} câu đố động vật · ${reviewed} reviewed · ${draft} draft`;
}

function labelFromV1Item(item) {
  return String(item.answer || item.title || "")
    .replace(/^Con\s+/i, "")
    .trim();
}

const BAD_OPTION_LABELS = new Set([
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

function isValidAnimalsV2Data(v2Data, v1Data) {
  if (!Array.isArray(v2Data) || !Array.isArray(v1Data) || v2Data.length !== v1Data.length) {
    return false;
  }

  const v1ById = new Map(v1Data.map((item) => [item.id, item]));
  const seen = new Set();

  return v2Data.every((item) => {
    if (!item || !item.id || seen.has(item.id) || !v1ById.has(item.id)) {
      return false;
    }
    seen.add(item.id);

    if (!item.correctAnswer || item.correctAnswer.animalId !== item.id) {
      return false;
    }

    if (!Array.isArray(item.wrongAnswers) || item.wrongAnswers.length !== 2) {
      return false;
    }

    const options = [item.correctAnswer, ...item.wrongAnswers];
    const optionIds = new Set();
    return options.every((option) => {
      if (!option || !option.animalId || !option.label || !String(option.label).trim()) {
        return false;
      }
      if (!v1ById.has(option.animalId) || optionIds.has(option.animalId)) {
        return false;
      }
      optionIds.add(option.animalId);
      if (BAD_OPTION_LABELS.has(normalizeText(option.label))) {
        return false;
      }
      return normalizeText(option.label) === normalizeText(labelFromV1Item(v1ById.get(option.animalId)));
    });
  });
}

async function loadAnimalsV1Data() {
  if (Array.isArray(window.ANIMALS_DATA) && window.ANIMALS_DATA.length > 0) {
    return window.ANIMALS_DATA;
  }

  if (location.protocol === "http:" || location.protocol === "https:") {
    try {
      const response = await fetch("/apps/guess-animal/data/animals_vi_3_5_mvp_100.json", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch animals JSON fallback", error);
    }
  }

  return [];
}

async function loadAnimalsV2Data() {
  if (Array.isArray(window.ANIMALS_V2_DATA) && window.ANIMALS_V2_DATA.length > 0) {
    return window.ANIMALS_V2_DATA;
  }

  if (location.protocol === "http:" || location.protocol === "https:") {
    try {
      const response = await fetch("/apps/guess-animal/data/animals_vi_3_5_v2_100.json", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.warn("Failed to fetch animals V2 JSON fallback", error);
    }
  }

  return [];
}

async function loadAnimalsData() {
  const v1Data = await loadAnimalsV1Data();
  const v2Data = await loadAnimalsV2Data();

  if (isValidAnimalsV2Data(v2Data, v1Data)) {
    const v2ById = new Map(v2Data.map((item) => [item.id, item]));
    DATA_VERSION = "v2";
    return v1Data.map((item) => ({
      ...item,
      v2: v2ById.get(item.id)
    }));
  }

  DATA_VERSION = "v1";
  return v1Data;
}

function showDataLoadError() {
  contentStatus.textContent = "Không tải được bộ dữ liệu. Vui lòng kiểm tra file data.";
  counter.textContent = "";
  score.textContent = "Đúng: 0 / 0";
  title.textContent = "Chưa tải được câu đố";
  riddle.textContent = "Mini app chưa đọc được dữ liệu 100 câu đố.";
  options.innerHTML = "";
  feedback.className = "feedback gentle";
  feedback.textContent = "Hãy kiểm tra file data hoặc đường dẫn deploy.";
  setMascotMessage("Mình chưa tìm thấy dữ liệu rồi.");
  setVisual(null, "Hãy kiểm tra file data trước khi chơi nhé.");
  answerBox.classList.add("hidden");
  nextBtn.disabled = true;
  replayBtn.disabled = false;
}

async function initApp() {
  DATA = await loadAnimalsData();

  if (!Array.isArray(DATA) || DATA.length === 0) {
    showDataLoadError();
    return;
  }

  updateStatus();
  startSession();
}

function updateScore() {
  const rate = state.answered > 0 ? Math.round((state.correct / state.answered) * 100) : 0;
  score.textContent = state.answered > 0
    ? `Đúng: ${state.correct} / ${state.answered} · ${rate}%`
    : "Đúng: 0 / 0";
}

function showDetails(item) {
  answer.textContent = item.answer;
  quickFact.textContent = makeQuickFact(item);
  fact.textContent = item.fact;
  setList(vocab, Array.isArray(item.vocabulary) ? item.vocabulary : []);
  parentGuide.textContent = item.parentGuide || "Cùng bé nhắc lại đáp án và đặc điểm chính.";

  const notes = Array.isArray(item.safetyNotes) ? item.safetyNotes.filter(Boolean) : [];
  setList(safetyNotes, notes);
  safetyBlock.classList.toggle("hidden", notes.length === 0);
  answerBox.classList.remove("hidden");
}

function renderCompletion() {
  counter.textContent = `Đã chơi hết ${state.queue.length} câu`;
  title.textContent = "Hoàn thành lượt chơi";
  riddle.textContent = "Bé đã trả lời hết các câu trong bộ lọc này. Bấm Chơi lại để bắt đầu một lượt mới.";
  setMascotMessage("Hoan hô, bé đã hoàn thành lượt chơi!");
  setVisual(null, "Bấm Chơi lại để khám phá thêm nhé.");
  options.innerHTML = "";
  feedback.className = "feedback success";
  feedback.textContent = `Kết quả: ${state.correct} câu đúng trên ${state.answered} câu.`;
  answerBox.classList.add("hidden");
  nextBtn.disabled = true;
  updateScore();
}

function renderQuestion() {
  if (state.index >= state.queue.length) {
    renderCompletion();
    return;
  }

  const item = state.queue[state.index];
  state.currentAnswered = false;

  counter.textContent = `Câu ${state.index + 1} / ${state.queue.length}`;
  title.textContent = "Đố bé biết";
  riddle.textContent = getQuestionText(item);
  setMascotMessage("Bé đoán xem là con gì nhé!");
  setVisual(item, "Nhìn hình, nghe câu đố, rồi chọn đáp án nhé.");
  options.innerHTML = "";
  feedback.className = "feedback hidden";
  feedback.textContent = "";
  answerBox.classList.add("hidden");
  nextBtn.disabled = true;

  const quizOptions = getQuizOptions(item);
  quizOptions.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button answer-card";
    button.innerHTML = `
      <span class="answer-thumb">${makeOptionThumbnailHtml(option, item)}</span>
      <span class="answer-name">${getOptionLabel(option)}</span>
    `;
    button.dataset.answer = getOptionAnimalId(option);
    button.addEventListener("click", () => answerQuestion(option, item));
    options.appendChild(button);
  });

  updateScore();
}

function getQuestionText(item) {
  return item.v2 && item.v2.question ? item.v2.question : item.riddle;
}

function getQuizOptions(item) {
  if (item.v2 && item.v2.correctAnswer && Array.isArray(item.v2.wrongAnswers)) {
    return shuffle([item.v2.correctAnswer, ...item.v2.wrongAnswers]);
  }
  return item.quiz && Array.isArray(item.quiz.options) ? item.quiz.options : [];
}

function getOptionLabel(option) {
  return option && typeof option === "object" ? option.label : option;
}

function getOptionAnimalId(option) {
  return option && typeof option === "object" ? option.animalId : option;
}

function getCorrectAnimalId(item) {
  return item.v2 && item.v2.correctAnswer
    ? item.v2.correctAnswer.animalId
    : item.quiz.correctAnswer;
}

function getCorrectLabel(item) {
  return item.v2 && item.v2.correctAnswer
    ? item.v2.correctAnswer.label
    : item.quiz.correctAnswer;
}

function answerQuestion(selectedOption, item) {
  if (state.currentAnswered) {
    return;
  }

  const selectedAnimalId = getOptionAnimalId(selectedOption);
  const correctAnimalId = getCorrectAnimalId(item);
  const correctLabel = getCorrectLabel(item);
  const isCorrect = selectedAnimalId === correctAnimalId;
  state.currentAnswered = true;
  state.answered += 1;
  if (isCorrect) {
    state.correct += 1;
  }

  Array.from(options.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.answer === correctAnimalId) {
      button.classList.add("is-correct");
    } else if (button.dataset.answer === selectedAnimalId) {
      button.classList.add("is-incorrect");
    }
  });

  feedback.className = `feedback ${isCorrect ? "success" : "gentle"}`;
  feedback.textContent = isCorrect
    ? "Đúng rồi! +1 sao"
    : `Chưa đúng rồi. Đáp án là ${correctLabel}.`;

  if (!isCorrect) {
    vibrateWrongAnswer();
  }
  setVisual(item, makeQuickFact(item));
  showDetails(item);
  updateScore();
  const earnedBadge = updateBadges();
  if (earnedBadge) {
    playVictorySound();
    showBadgeModal(earnedBadge);
  } else {
    playFeedbackSound(isCorrect);
  }
  setMascotMessage(earnedBadge ? earnedBadge.message : (isCorrect ? "Giỏi lắm!" : "Không sao, mình cùng học nhé!"));
  showReward(earnedBadge ? earnedBadge.title : (isCorrect ? "+1 sao" : "Thử câu tiếp theo nhé"), Boolean(earnedBadge || isCorrect));
  nextBtn.disabled = false;
}

function startSession() {
  if (!Array.isArray(DATA) || DATA.length === 0) {
    showDataLoadError();
    return;
  }

  const filtered = getFilteredData(state.category);
  state.queue = shuffle(filtered);
  state.index = 0;
  state.answered = 0;
  state.correct = 0;
  state.currentAnswered = false;
  state.earnedBadges = new Set();
  closeBadgeModal();
  nextBtn.disabled = false;
  updateBadges();
  renderQuestion();
}

function goNext() {
  if (!state.currentAnswered) {
    return;
  }

  state.index += 1;
  renderQuestion();
  if (state.index < state.queue.length) {
    requestAnimationFrame(() => {
      scrollToQuestionStart();
    });
  }
}

categoryFilter.addEventListener("change", () => {
  state.category = categoryFilter.value;
  startSession();
});

nextBtn.addEventListener("click", goNext);
replayBtn.addEventListener("click", startSession);
if (soundToggle) {
  soundToggle.addEventListener("click", toggleSound);
}
if (badgeContinueBtn) {
  badgeContinueBtn.addEventListener("click", closeBadgeModal);
}
if (badgeModal) {
  badgeModal.addEventListener("click", (event) => {
    if (event.target === badgeModal) {
      closeBadgeModal();
    }
  });
}
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeBadgeModal();
  }
});

renderBadgeRow();
updateSoundToggle();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
