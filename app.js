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
  },
  {
    text: "Your workspace is usually:",
    options: [
      { text: "Organized and intentional", effects: { structure: 10 } },
      { text: "Messy but functional", effects: { chaos: 10 } }
    ]
  },
  {
    text: "When under pressure, you tend to:",
    options: [
      { text: "Focus and problem-solve", effects: { logic: 10 } },
      { text: "React emotionally", effects: { emotion: 10 } }
    ]
  },
  {
    text: "You value rules because:",
    options: [
      { text: "They create consistency", effects: { structure: 10 } },
      { text: "They can be bent or broken", effects: { chaos: 10 } }
    ]
  },
  {
    text: "You prefer projects that are:",
    options: [
      { text: "Well-defined", effects: { structure: 5, logic: 5 } },
      { text: "Open-ended", effects: { chaos: 5, emotion: 5 } }
    ]
  },
  {
    text: "You make choices faster when:",
    options: [
      { text: "You have all the data", effects: { logic: 10 } },
      { text: "You trust your gut", effects: { emotion: 10 } }
    ]
  },
  {
    text: "Your creative process is:",
    options: [
      { text: "Methodical", effects: { structure: 10 } },
      { text: "Explosive and chaotic", effects: { chaos: 10 } }
    ]
  },
  {
    text: "You dislike situations that are:",
    options: [
      { text: "Unpredictable", effects: { structure: 10 } },
      { text: "Overly rigid", effects: { chaos: 10 } }
    ]
  },
  {
    text: "When learning, you prefer:",
    options: [
      { text: "Clear explanations", effects: { logic: 10 } },
      { text: "Experiential discovery", effects: { emotion: 10 } }
    ]
  },
  {
    text: "Your strengths are strongest in:",
    options: [
      { text: "Analysis", effects: { logic: 10 } },
      { text: "Empathy", effects: { emotion: 10 } }
    ]
  },
  {
    text: "You feel better when life is:",
    options: [
      { text: "Predictable", effects: { structure: 10 } },
      { text: "Spontaneous", effects: { chaos: 10 } }
    ]
  },
  {
    text: "You judge success by:",
    options: [
      { text: "Efficiency", effects: { logic: 10 } },
      { text: "Fulfillment", effects: { emotion: 10 } }
    ]
  },
  {
    text: "You handle change by:",
    options: [
      { text: "Planning ahead", effects: { structure: 10 } },
      { text: "Adapting on the fly", effects: { chaos: 10 } }
    ]
  },
  {
    text: "Your instincts lean toward:",
    options: [
      { text: "Reason", effects: { logic: 10 } },
      { text: "Feeling", effects: { emotion: 10 } }
    ]
  },
  {
    text: "You value systems that are:",
    options: [
      { text: "Stable", effects: { structure: 10 } },
      { text: "Flexible", effects: { chaos: 10 } }
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
  btn.classList.add("option");

  btn.onclick = () => {
    // clear previous selection
    document.querySelectorAll(".option").forEach(b =>
      b.classList.remove("selected")
    );

    btn.classList.add("selected");
    selectedEffects = option.effects;
    nextBtn.disabled = false;
  };

  optionsEl.appendChild(btn);
});

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

  renderResults(scores);
tagEl.textContent = tag;
  
function renderResults(scores) {
  const container = document.getElementById("resultsList");
  container.innerHTML = "";

  const max = Math.max(...Object.values(scores));

  for (const trait in scores) {
    const percent = Math.round((scores[trait] / max) * 100);

    const row = document.createElement("div");
    row.classList.add("result-row");

    row.innerHTML = `
      <div class="result-label">${trait}</div>
      <div class="result-bar">
        <div class="result-fill" style="width: ${percent}%"></div>
      </div>
    `;

    container.appendChild(row);
  }
}
  // Supabase insert happens later — NOT YET
}

renderQuestion();
