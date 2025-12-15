const quizData = [
  // I vs E
  {
    question: "You feel drained after long social interactions.",
    options: [
      { text: "Strongly agree", effects: { I: 2 } },
      { text: "Somewhat agree", effects: { I: 1 } },
      { text: "Somewhat disagree", effects: { E: 1 } },
      { text: "Strongly disagree", effects: { E: 2 } }
    ]
  },
  {
    question: "You prefer working alone rather than in groups.",
    options: [
      { text: "Strongly agree", effects: { I: 2 } },
      { text: "Somewhat agree", effects: { I: 1 } },
      { text: "Somewhat disagree", effects: { E: 1 } },
      { text: "Strongly disagree", effects: { E: 2 } }
    ]
  },
  {
    question: "You often initiate conversations with strangers.",
    options: [
      { text: "Strongly agree", effects: { E: 2 } },
      { text: "Somewhat agree", effects: { E: 1 } },
      { text: "Somewhat disagree", effects: { I: 1 } },
      { text: "Strongly disagree", effects: { I: 2 } }
    ]
  },
  {
    question: "Being alone helps you reset mentally.",
    options: [
      { text: "Strongly agree", effects: { I: 2 } },
      { text: "Somewhat agree", effects: { I: 1 } },
      { text: "Somewhat disagree", effects: { E: 1 } },
      { text: "Strongly disagree", effects: { E: 2 } }
    ]
  },

  // S vs N
  {
    question: "You trust experience over theories.",
    options: [
      { text: "Strongly agree", effects: { S: 2 } },
      { text: "Somewhat agree", effects: { S: 1 } },
      { text: "Somewhat disagree", effects: { N: 1 } },
      { text: "Strongly disagree", effects: { N: 2 } }
    ]
  },
  {
    question: "You enjoy thinking about abstract concepts.",
    options: [
      { text: "Strongly agree", effects: { N: 2 } },
      { text: "Somewhat agree", effects: { N: 1 } },
      { text: "Somewhat disagree", effects: { S: 1 } },
      { text: "Strongly disagree", effects: { S: 2 } }
    ]
  },
  {
    question: "Details matter more than big ideas.",
    options: [
      { text: "Strongly agree", effects: { S: 2 } },
      { text: "Somewhat agree", effects: { S: 1 } },
      { text: "Somewhat disagree", effects: { N: 1 } },
      { text: "Strongly disagree", effects: { N: 2 } }
    ]
  },
  {
    question: "You often think about future possibilities.",
    options: [
      { text: "Strongly agree", effects: { N: 2 } },
      { text: "Somewhat agree", effects: { N: 1 } },
      { text: "Somewhat disagree", effects: { S: 1 } },
      { text: "Strongly disagree", effects: { S: 2 } }
    ]
  },

  // T vs F
  {
    question: "Logic is more important than harmony.",
    options: [
      { text: "Strongly agree", effects: { T: 2 } },
      { text: "Somewhat agree", effects: { T: 1 } },
      { text: "Somewhat disagree", effects: { F: 1 } },
      { text: "Strongly disagree", effects: { F: 2 } }
    ]
  },
  {
    question: "You prioritize honesty over tact.",
    options: [
      { text: "Strongly agree", effects: { T: 2 } },
      { text: "Somewhat agree", effects: { T: 1 } },
      { text: "Somewhat disagree", effects: { F: 1 } },
      { text: "Strongly disagree", effects: { F: 2 } }
    ]
  },
  {
    question: "You make decisions based on personal values.",
    options: [
      { text: "Strongly agree", effects: { F: 2 } },
      { text: "Somewhat agree", effects: { F: 1 } },
      { text: "Somewhat disagree", effects: { T: 1 } },
      { text: "Strongly disagree", effects: { T: 2 } }
    ]
  },
  {
    question: "You dislike emotional decision-making.",
    options: [
      { text: "Strongly agree", effects: { T: 2 } },
      { text: "Somewhat agree", effects: { T: 1 } },
      { text: "Somewhat disagree", effects: { F: 1 } },
      { text: "Strongly disagree", effects: { F: 2 } }
    ]
  },

  // J vs P
  {
    question: "You prefer structured schedules.",
    options: [
      { text: "Strongly agree", effects: { J: 2 } },
      { text: "Somewhat agree", effects: { J: 1 } },
      { text: "Somewhat disagree", effects: { P: 1 } },
      { text: "Strongly disagree", effects: { P: 2 } }
    ]
  },
  {
    question: "You like to keep your options open.",
    options: [
      { text: "Strongly agree", effects: { P: 2 } },
      { text: "Somewhat agree", effects: { P: 1 } },
      { text: "Somewhat disagree", effects: { J: 1 } },
      { text: "Strongly disagree", effects: { J: 2 } }
    ]
  },
  {
    question: "Last-minute changes stress you out.",
    options: [
      { text: "Strongly agree", effects: { J: 2 } },
      { text: "Somewhat agree", effects: { J: 1 } },
      { text: "Somewhat disagree", effects: { P: 1 } },
      { text: "Strongly disagree", effects: { P: 2 } }
    ]
  },
  {
    question: "You prefer flexibility over planning.",
    options: [
      { text: "Strongly agree", effects: { P: 2 } },
      { text: "Somewhat agree", effects: { P: 1 } },
      { text: "Somewhat disagree", effects: { J: 1 } },
      { text: "Strongly disagree", effects: { J: 2 } }
    ]
  }
];

let currentQuestion = 0;
let selectedEffects = null;
let scores = { I: 0, E: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const quizEl = document.getElementById("quiz");
const tagEl = document.getElementById("tag");
const progressEl = document.getElementById("progress");

function renderQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  selectedEffects = null;
  nextBtn.disabled = true;

  progressEl.textContent = `Question ${currentQuestion + 1} / ${quizData.length}`;

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option.text;
    btn.classList.add("option");

    btn.onclick = () => {
      document.querySelectorAll(".option").forEach(b =>
        b.classList.remove("selected")
      );
      btn.classList.add("selected");
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

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    renderQuestion();
  } else {
    finalizeQuiz();
  }
};

function finalizeQuiz() {
  quizEl.hidden = true;
  resultEl.hidden = false;

  renderResults(scores);

  const tag = generateTag();
  tagEl.textContent = tag;
}

function renderResults(scores) {
  const container = document.getElementById("resultsList");
  container.innerHTML = "";

  const max = Math.max(...Object.values(scores));

  for (const trait in scores) {
    const percent = max === 0 ? 0 : Math.round((scores[trait] / max) * 100);

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

function generateTag() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

renderQuestion();
