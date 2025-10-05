import * as api from './quizApi.js';

export async function initQuiz(themeId, userId) {
    let questions = [];
    let currentIndex = 0;
    let userAnswers = [];

    let timer;
    let time = 20;

    const nextButton = document.getElementById("next-btn");
    const noteText = document.getElementById("note-text");
    const optionsContainer = document.getElementById("options-container");
    nextButton.addEventListener("click", handleNext);

    // Initialize quiz
    await api.startSession(userId, themeId);
    // get theme questions
    const data = await api.fetchQuestions(themeId);
    questions = data.questions || data;
    renderQuestion(currentIndex);


    function handleSelect(btn, multiple) {
        const value = btn.dataset.value;
        if (multiple) {
            if (userAnswers.includes(value)) {
                userAnswers = userAnswers.filter(a => a !== value);
                btn.classList.remove("bg-yellow-500", "text-white");
                btn.classList.add("bg-gray-100", "hover:bg-gray-200");
            } else {
                userAnswers.push(value);
                btn.classList.add("bg-yellow-500", "text-white", "border-yellow-600");
                btn.classList.remove("bg-gray-100", "hover:bg-gray-200");
            }
        } else {
            userAnswers = [value];
            optionsContainer.querySelectorAll("button").forEach(b => {
                b.classList.remove("bg-yellow-500", "text-white");
                b.classList.add("bg-gray-100", "hover:bg-gray-200");
            });
            btn.classList.add("bg-yellow-500", "text-white");
            btn.classList.remove("bg-gray-100", "hover:bg-gray-200");
        }
    }

    function renderQuestion(index) {
        startTimer();
        userAnswers = [];
        const q = questions[index];
        if (!q) return document.location.href = `../result/${themeId}`;

        document.getElementById("question-number").textContent = `Question: ${index + 1}/${questions.length}`;
        document.getElementById("progress-bar").style.width = `${((index + 1) / questions.length) * 100}%`;
        document.getElementById("question-text").textContent = q.question_text;

        noteText.innerHTML = `<span class="text-yellow-500 font-semibold">Note :</span>
            This question ${q.multiple ? "may have multiple answers" : "has only one correct answer"}.`;

        optionsContainer.innerHTML = "";

        q.options.forEach(opt => {
            const btn = document.createElement("button");
            btn.dataset.value = opt.text;
            btn.className = "option w-full text-left p-3 md:p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-150";
            btn.textContent = opt.text;
            btn.addEventListener("click", () => handleSelect(btn, q.multiple));
            optionsContainer.appendChild(btn);
        });

        nextButton.textContent = index === questions.length - 1 ? "Finish" : "Next";
        optionsContainer.querySelectorAll("button").forEach(b => b.disabled = false);
    }

    async function handleNext() {
        stopTimer();
        const currentQuestion = questions[currentIndex];
        if (!currentQuestion) return;

        const correctData = await api.checkCorrect(currentQuestion.id, userAnswers);
        if (correctData.success) {
            optionsContainer.querySelectorAll("button").forEach(btn => {
                const text = btn.textContent.trim();
                if (correctData.correctAnswers.includes(text)) {
                    btn.classList.remove("bg-yellow-500");
                    btn.classList.add("bg-[#24b82a]", "text-white");
                } else if (userAnswers.includes(text)) {
                    btn.classList.add("bg-red-500", "text-white");
                }
                btn.disabled = true;
            });
        }

        await api.saveAnswer(userId, themeId, currentQuestion.id, userAnswers);

        if (currentIndex === questions.length - 1) {
            const scoreData = await api.calculateScore(userId, themeId);
            if (scoreData.success) document.location.href = `../result/${themeId}`;
            return;
        }

        setTimeout(() => {
            currentIndex++;
            renderQuestion(currentIndex);
        }, 2000);
    }

    // timer functions
    function updateTimerDisplay(seconds) {
        const timerEl = document.getElementById("timer");
        timerEl.textContent = `${String(seconds).padStart(2, '0')}s`;
    }

    function startTimer() {
        time = 20; // reset timer for each question
        updateTimerDisplay(time);

        timer = setInterval(() => {
            time--;

            if (time < 0) {
                stopTimer(); // stop the current timer
                const isLastQuestion = currentIndex === questions.length - 1;
                if (isLastQuestion) {
                    calculateFinalScore();
                } else {
                    currentIndex++;
                    renderQuestion(currentIndex);
                    startTimer(); // restart for next question
                }
            } else {
                updateTimerDisplay(time);
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
    }
}