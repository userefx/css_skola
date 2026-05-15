const questions = [
    { q: "Vilket tecken används för Class-selektorer?", o: ["#", ".", "*", ":"], a: 1 },
    { q: "Vilket avstånd är utanför ramen (border)?", o: ["Padding", "Margin", "Gap", "Space"], a: 1 },
    { q: "Hur gör man text fetstilt i CSS?", o: ["font-weight: bold", "text-style: bold", "font-bold: true", "weight: 700"], a: 0 },
    { q: "Vilket värde döljer ett element helt?", o: ["visibility: hidden", "opacity: 0", "display: none", "filter: blur"], a: 2 },
    { q: "Vad står den första 'C':et för i CSS?", o: ["Computer", "Creative", "Cascading", "Common"], a: 2 }
];

let currentIdx = 0;
let score = 0;
let answered = false;

const qText = document.getElementById("question");
const optionsBox = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const counterText = document.getElementById("q-counter");
const progBar = document.getElementById("progress-bar");

function startQuiz() {
    showQuestion();
}

function showQuestion() {
    answered = false;
    nextBtn.classList.add("hidden");
    const current = questions[currentIdx];
    qText.innerText = current.q;
    counterText.innerText = `Fråga ${currentIdx + 1} av ${questions.length}`;
    progBar.style.width = `${((currentIdx) / questions.length) * 100}%`;
    
    optionsBox.innerHTML = "";
    current.o.forEach((option, i) => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.classList.add("option-btn");
        btn.onclick = () => checkAnswer(i, btn);
        optionsBox.appendChild(btn);
    });
}

function checkAnswer(idx, btn) {
    if (answered) return;
    answered = true;
    const correct = questions[currentIdx].a;
    
    if (idx === correct) {
        btn.classList.add("correct");
        score++;
    } else {
        btn.classList.add("wrong");
        optionsBox.children[correct].classList.add("correct");
    }
    
    nextBtn.classList.remove("hidden");
}

nextBtn.onclick = () => {
    currentIdx++;
    if (currentIdx < questions.length) {
        showQuestion();
    } else {
        document.getElementById("quiz-container").classList.add("hidden");
        const resScreen = document.getElementById("result-screen");
        resScreen.classList.remove("hidden");
        document.getElementById("final-score").innerText = `Du fick ${score} av ${questions.length} rätt!`;
        progBar.style.width = "100%";
    }
};

startQuiz();