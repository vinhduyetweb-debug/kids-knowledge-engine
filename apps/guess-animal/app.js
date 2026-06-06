let DATA = [];

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

const state = {
  category: "all",
  queue: [],
  index: 0,
  answered: 0,
  correct: 0,
  currentAnswered: false
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
      const response = await fetch("./data/animals_vi_3_5_mvp_100.json", { cache: "no-store" });
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
  options.innerHTML = "";
  feedback.className = "feedback hidden";
  feedback.textContent = "";
  answerBox.classList.add("hidden");
  nextBtn.disabled = true;

  const quizOptions = item.quiz && Array.isArray(item.quiz.options) ? item.quiz.options : [];
  quizOptions.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.textContent = option;
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
    if (button.textContent === correctAnswer) {
      button.classList.add("is-correct");
    } else if (button.textContent === selectedOption) {
      button.classList.add("is-incorrect");
    }
  });

  feedback.className = `feedback ${isCorrect ? "success" : "gentle"}`;
  feedback.textContent = isCorrect
    ? "Đúng rồi! Bé giỏi lắm."
    : `Chưa đúng rồi. Đáp án là ${correctAnswer}.`;

  showDetails(item);
  updateScore();
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
  nextBtn.disabled = false;
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
