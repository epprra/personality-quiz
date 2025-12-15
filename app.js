const questions = [
  {
    text: "When starting something new, you prefer:",
    options: [
      { text: "Planning everything first", effects: { structure: 10, logic: 5 } },
      { text: "Jumping in and adapting", effects: { chaos: 10, emotion: 5 } }
    ]
  },
  {
    text: "You trust decisions that are mostly:",
    options: [
      { text: "Rational and analyzed", effects: { logic: 10 } },
      { text: "Based on feeling and instinct", effects: { emotion: 10 } }
    ]
  }
];

let currentIndex = 0;
let selectedEffects = null;

const scores = {
  structure: 0,
  chaos: 0,
  logic: 0,
  emotion: 0
};

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");

const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");
const scoreOutput = document.getElementById("scoreOutput");
const tagEl = document.getElementById("tag");

function renderQuestion() {
  const q = questions[currentIndex];
  questionEl.textContent = q.text;
  optionsEl.innerHTML = "";
  nextBtn.disabled = true;
  selectedEffects = null;

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option.text;
    btn.onclick = () => {
      selectedEffects = option.effects;
      nextBtn.disabled = false;
    };
    optionsEl.appendChild(btn);
  });
}

nextBtn.onclick = () => {
  for (const trait in selectedEffects) {
    scores[trait] += selectedEffects[trait];
  }

  currentIndex++;

  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    showFinalizeButton();
  }
};

function showFinalizeButton() {
  questionEl.textContent = "Quiz complete.";
  optionsEl.innerHTML = "";
  nextBtn.textContent = "See Results & Get Code";
  nextBtn.disabled = false;
  nextBtn.onclick = finalizeQuiz;
}

function generateTag() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let raw = "";

  for (let i = 0; i < 12; i++) {
    raw += chars[Math.floor(Math.random() * chars.length)];
  }

  return raw.match(/.{1,4}/g).join("-");
}

function finalizeQuiz() {
  const tag = generateTag();

  quizEl.hidden = true;
  resultEl.hidden = false;

  scoreOutput.textContent = JSON.stringify(scores, null, 2);
  tagEl.textContent = tag;

  // Supabase insert happens later — NOT YET
}

renderQuestion();
