const quizData = [
  {
    question: "You prefer planning over improvising.",
    options: [
      { text: "Strongly agree", effects: { J: 2 } },
      { text: "Somewhat agree", effects: { J: 1 } },
      { text: "Somewhat disagree", effects: { P: 1 } },
      { text: "Strongly disagree", effects: { P: 2 } }
    ]
  },
  {
    question: "You recharge best when alone.",
    options: [
      { text: "Strongly agree", effects: { I: 2 } },
      { text: "Somewhat agree", effects: { I: 1 } },
      { text: "Somewhat disagree", effects: { E: 1 } },
      { text: "Strongly disagree", effects: { E: 2 } }
    ]
  },
  {
    question: "You rely more on logic than emotion.",
    options: [
      { text: "Strongly agree", effects: { T: 2 } },
      { text: "Somewhat agree", effects: { T: 1 } },
      { text: "Somewhat disagree", effects: { F: 1 } },
      { text: "Strongly disagree", effects: { F: 2 } }
    ]
  },
  {
    question: "You focus on possibilities more than facts.",
    options: [
      { text: "Strongly agree", effects: { N: 2 } },
      { text: "Somewhat agree", effects: { N: 1 } },
      { text: "Somewhat disagree", effects: { S: 1 } },
      { text: "Strongly disagree", effects: { S: 2 } }
    ]
  }
];

// duplicate to reach 16
while (quizData.length < 16) {
  quizData.push(JSON.parse(JSON.stringify(quizData[quizData.length % 4])));
}

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
