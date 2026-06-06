console.log("Guess Animal App build: 20260606-fix2");

let DATA = [];

const SOUND_PATHS = {
  correct: "/apps/guess-animal/assets/real/sounds/correct.mp3",
  wrong: "/apps/guess-animal/assets/real/sounds/wrong.mp3"
};

const REAL_THUMBNAIL_ASSETS = [
  { keywords: ["meo"], src: "/apps/guess-animal/assets/real/thumbnails/cat.webp" },
  { keywords: ["cho"], src: "/apps/guess-animal/assets/real/thumbnails/dog.webp" },
  { keywords: ["ca heo"], src: "/apps/guess-animal/assets/real/thumbnails/dolphin.webp" },
  { keywords: ["ca voi"], src: "/apps/guess-animal/assets/real/thumbnails/whale.webp" },
  { keywords: ["ca map"], src: "/apps/guess-animal/assets/real/thumbnails/shark.webp" },
  { keywords: ["ca"], src: "/apps/guess-animal/assets/real/thumbnails/fish.webp" },
  { keywords: ["voi"], src: "/apps/guess-animal/assets/real/thumbnails/elephant.webp" },
  { keywords: ["su tu"], src: "/apps/guess-animal/assets/real/thumbnails/lion.webp" },
  { keywords: ["chim", "vet", "dai bang"], src: "/apps/guess-animal/assets/real/thumbnails/bird.webp" },
  { keywords: ["ong"], src: "/apps/guess-animal/assets/real/thumbnails/bee.webp" },
  { keywords: ["buom"], src: "/apps/guess-animal/assets/real/thumbnails/butterfly.webp" },
  { keywords: ["rua"], src: "/apps/guess-animal/assets/real/thumbnails/turtle.webp" },
  { keywords: ["cuu"], src: "/apps/guess-animal/assets/real/thumbnails/sheep.webp" },
  { keywords: ["bo"], src: "/apps/guess-animal/assets/real/thumbnails/cow.webp" },
  { keywords: ["ga"], src: "/apps/guess-animal/assets/real/thumbnails/chicken.webp" },
  { keywords: ["tho"], src: "/apps/guess-animal/assets/real/thumbnails/rabbit.webp" },
  { keywords: ["khi"], src: "/apps/guess-animal/assets/real/thumbnails/monkey.webp" },
  { keywords: ["cua"], src: "/apps/guess-animal/assets/real/thumbnails/crab.webp" },
  { keywords: ["vit"], src: "/apps/guess-animal/assets/real/thumbnails/duck.webp" },
  { keywords: ["ngua"], src: "/apps/guess-animal/assets/real/thumbnails/horse.webp" }
];

const THUMBNAIL_ASSETS = [
  { keywords: ["mèo"], src: "/apps/guess-animal/assets/thumbnails/cat.svg" },
  { keywords: ["chó"], src: "/apps/guess-animal/assets/thumbnails/dog.svg" },
  { keywords: ["cá", "cá heo", "cá voi", "cá mập"], src: "/apps/guess-animal/assets/thumbnails/fish.svg" },
  { keywords: ["voi", "vòi"], src: "/apps/guess-animal/assets/thumbnails/elephant.svg" },
  { keywords: ["sư tử"], src: "/apps/guess-animal/assets/thumbnails/lion.svg" },
  { keywords: ["chim", "cánh", "vẹt", "đại bàng"], src: "/apps/guess-animal/assets/thumbnails/bird.svg" },
  { keywords: ["ong", "mật"], src: "/apps/guess-animal/assets/thumbnails/bee.svg" },
  { keywords: ["bướm"], src: "/apps/guess-animal/assets/thumbnails/butterfly.svg" },
  { keywords: ["rùa", "mai"], src: "/apps/guess-animal/assets/thumbnails/turtle.svg" }
];

const DEFAULT_THUMBNAIL_ASSET = "/apps/guess-animal/assets/thumbnails/default.svg";

const BADGE_MILESTONES = [
  { count: 5, id: "badge5", message: "Bé đạt huy hiệu đầu tiên!" },
  { count: 10, id: "badge10", message: "Bé nhận huy hiệu bạc!" },
  { count: 20, id: "badge20", message: "Bé đã trở thành nhà thám hiểm động vật!" }
];

const THUMBNAIL_MAP = [
  ["cừu", "🐑"], ["voi", "🐘"], ["mèo", "🐱"], ["chó", "🐶"], ["vịt", "🦆"],
  ["bò", "🐄"], ["gà", "🐔"], ["thỏ", "🐰"], ["ếch", "🐸"], ["cá", "🐟"],
  ["chim", "🐦"], ["ngựa", "🐴"], ["heo", "🐷"], ["ong", "🐝"], ["bướm", "🦋"],
  ["rùa", "🐢"], ["khỉ", "🐵"], ["sư tử", "🦁"], ["cánh cụt", "🐧"], ["ốc", "🐌"],
  ["hươu", "🦒"], ["cao cổ", "🦒"], ["cá heo", "🐬"], ["cá voi", "🐋"],
  ["cá mập", "🦈"], ["sao biển", "⭐"], ["cua", "🦀"], ["tôm", "🦐"],
  ["mực", "🦑"], ["bạch tuộc", "🐙"], ["ngựa vằn", "🦓"], ["nai", "🦌"],
  ["gấu", "🐻"], ["gấu trúc", "🐼"], ["hổ", "🐯"], ["báo", "🐆"], ["sói", "🐺"],
  ["cá sấu", "🐊"], ["hà mã", "🦛"], ["tê giác", "🦏"], ["lạc đà", "🐪"],
  ["chuột túi", "🦘"], ["sóc", "🐿️"], ["chuột", "🐭"], ["nhím", "🦔"],
  ["dơi", "🦇"], ["cú", "🦉"], ["đại bàng", "🦅"], ["công", "🦚"],
  ["vẹt", "🦜"], ["thiên nga", "🦢"], ["ngỗng", "🪿"], ["gà tây", "🦃"],
  ["kiến", "🐜"], ["muỗi", "🦟"], ["ruồi", "🪰"], ["chuồn chuồn", "🌈"],
  ["châu chấu", "🦗"], ["bọ rùa", "🐞"], ["bọ ngựa", "🌿"], ["giun", "🪱"],
  ["sâu", "🐛"], ["tằm", "🐛"], ["nhện", "🕷️"], ["bọ cánh cứng", "🪲"],
  ["hải cẩu", "🦭"], ["rái cá", "🦦"], ["cá ngựa", "🐠"], ["sứa", "🪼"],
  ["san hô", "🪸"], ["ngao", "🦪"], ["sò", "🦪"], ["trâu", "🐃"], ["dê", "🐐"],
  ["lừa", "🫏"], ["tuần lộc", "🦌"], ["cáo", "🦊"], ["hải ly", "🦫"],
  ["linh miêu", "🐱"], ["đà điểu", "🪶"], ["kiwi", "🥝"], ["rắn", "🐍"],
  ["thằn lằn", "🦎"], ["tắc kè", "🦎"], ["kỳ nhông", "🦎"], ["kỳ đà", "🦎"],
  ["cánh", "🪽"], ["vòi", "🐘"], ["vây", "🐟"], ["đuôi", "〰️"], ["mào", "🔴"],
  ["sừng", "🌙"], ["mai", "🛡️"], ["hoa", "🌸"], ["mật", "🍯"], ["bơi", "💧"],
  ["rừng", "🌳"], ["biển", "🌊"], ["băng", "🧊"], ["đồng cỏ", "🌾"]
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
const mascotBubble = document.getElementById("mascotBubble");
const visualStage = document.getElementById("visualStage");
const visualEmoji = document.getElementById("visualEmoji");
const visualHint = document.getElementById("visualHint");
const rewardToast = document.getElementById("rewardToast");
const quickFact = document.getElementById("quickFact");

const state = {
  category: "all",
  queue: [],
  index: 0,
  answered: 0,
  correct: 0,
  currentAnswered: false,
  earnedBadges: new Set()
};

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

function getThumbnail(value) {
  const normalized = normalizeText(value);
  const match = THUMBNAIL_MAP.find(([keyword]) => normalized.includes(normalizeText(keyword)));
  return match ? match[1] : "🌟";
}

function getThumbnailAsset(value) {
  const normalized = normalizeText(value);
  const match = THUMBNAIL_ASSETS.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(normalizeText(keyword)))
  );
  return match ? match.src : DEFAULT_THUMBNAIL_ASSET;
}

function getRealThumbnailAsset(value) {
  const normalized = normalizeText(value);
  const match = REAL_THUMBNAIL_ASSETS.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword))
  );
  return match ? match.src : "";
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

function makeThumbnailHtml(value, label) {
  const labelText = String(label || value || "động vật").trim();
  const realAsset = getRealThumbnailAsset(value);
  const svgAsset = getThumbnailAsset(value);
  const emoji = getThumbnail(value);
  const ariaLabel = escapeAttribute(`Minh họa ${labelText}`);
  const realImage = realAsset
    ? `<img class="thumb-img thumb-img-real" src="${realAsset}" alt="" loading="lazy" onerror="handleThumbnailError(this);">`
    : "";
  const svgHidden = realAsset ? " hidden" : "";
  return `
    <span class="thumb-frame" role="img" aria-label="${ariaLabel}">
      ${realImage}
      <img class="thumb-img thumb-img-svg" src="${svgAsset}" alt="" loading="lazy"${svgHidden} onerror="handleThumbnailError(this);">
      <span class="thumb-emoji" hidden>${emoji}</span>
    </span>
  `;
}

function getItemThumbnail(item) {
  return getThumbnail(`${item.answer} ${item.title} ${item.fact}`);
}

function makeQuickFact(item) {
  const firstSentence = String(item.fact || "").split(/[.!?]/)[0].trim();
  return firstSentence ? `${firstSentence}.` : `${item.answer} có nhiều điều thú vị để bé khám phá.`;
}

function setMascotMessage(message) {
  mascotBubble.textContent = message;
}

function setVisual(item, message) {
  const value = item ? `${item.answer} ${item.title} ${item.fact}` : "";
  const label = item ? item.answer || item.title : "";
  visualEmoji.innerHTML = item ? makeThumbnailHtml(value, label) : `<span class="thumb-emoji">❔</span>`;
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

function playTone(isCorrect) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return;
  }

  const context = new AudioContextClass();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = isCorrect ? 740 : 220;
  gain.gain.value = 0.05;
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + (isCorrect ? 0.16 : 0.22));
}

function playFeedbackSound(isCorrect) {
  if (typeof Audio === "undefined") {
    playTone(isCorrect);
    return;
  }

  const sound = new Audio(isCorrect ? SOUND_PATHS.correct : SOUND_PATHS.wrong);
  sound.play().catch(() => playTone(isCorrect));
}

function vibrateWrongAnswer() {
  if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
    navigator.vibrate([80, 40, 80]);
  }
}

function updateBadges() {
  let earnedMessage = "";

  BADGE_MILESTONES.forEach((badge) => {
    const element = document.getElementById(badge.id);
    const earned = state.correct >= badge.count;
    element.classList.toggle("earned", earned);

    if (earned && !state.earnedBadges.has(badge.count)) {
      state.earnedBadges.add(badge.count);
      earnedMessage = badge.message;
    }
  });

  return earnedMessage;
}

function updateStatus() {
  const reviewed = DATA.filter((item) => item.status === "reviewed").length;
  const draft = DATA.filter((item) => item.status === "draft").length;
  contentStatus.textContent = `Bộ dữ liệu: ${DATA.length} câu đố động vật · ${reviewed} reviewed · ${draft} draft`;
}

async function loadAnimalsData() {
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
  riddle.textContent = item.riddle;
  setMascotMessage("Bé đoán xem là con gì nhé!");
  setVisual(null, "Nhìn hình, nghe câu đố, rồi chọn đáp án nhé.");
  options.innerHTML = "";
  feedback.className = "feedback hidden";
  feedback.textContent = "";
  answerBox.classList.add("hidden");
  nextBtn.disabled = true;

  const quizOptions = item.quiz && Array.isArray(item.quiz.options) ? item.quiz.options : [];
  quizOptions.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button answer-card";
    button.innerHTML = `
      <span class="answer-thumb">${makeThumbnailHtml(option, option)}</span>
      <span class="answer-name">${option}</span>
    `;
    button.dataset.answer = option;
    button.addEventListener("click", () => answerQuestion(option, item));
    options.appendChild(button);
  });

  updateScore();
}

function answerQuestion(selectedOption, item) {
  if (state.currentAnswered) {
    return;
  }

  const correctAnswer = item.quiz.correctAnswer;
  const isCorrect = selectedOption === correctAnswer;
  state.currentAnswered = true;
  state.answered += 1;
  if (isCorrect) {
    state.correct += 1;
  }

  Array.from(options.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.answer === correctAnswer) {
      button.classList.add("is-correct");
    } else if (button.dataset.answer === selectedOption) {
      button.classList.add("is-incorrect");
    }
  });

  feedback.className = `feedback ${isCorrect ? "success" : "gentle"}`;
  feedback.textContent = isCorrect
    ? "Đúng rồi! +1 sao"
    : `Chưa đúng rồi. Đáp án là ${correctAnswer}.`;

  playFeedbackSound(isCorrect);
  if (!isCorrect) {
    vibrateWrongAnswer();
  }
  setVisual(item, makeQuickFact(item));
  showDetails(item);
  updateScore();
  const badgeMessage = updateBadges();
  setMascotMessage(badgeMessage || (isCorrect ? "Giỏi lắm!" : "Không sao, mình cùng học nhé!"));
  showReward(badgeMessage || (isCorrect ? "+1 sao" : "Thử câu tiếp theo nhé"), Boolean(badgeMessage || isCorrect));
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
}

categoryFilter.addEventListener("change", () => {
  state.category = categoryFilter.value;
  startSession();
});

nextBtn.addEventListener("click", goNext);
replayBtn.addEventListener("click", startSession);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
