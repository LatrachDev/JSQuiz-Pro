import * as api from './quizApi.js';

export async function initQuiz(themeId, userId) {
    let questions = [];
    let currentIndex = 0;
    let userAnswers = [];
    let timer;
    let time;

    const nextButton = document.getElementById("next-btn");
    const noteText = document.getElementById("note-text");
    const optionsContainer = document.getElementById("options-container");

    nextButton.addEventListener("click", handleNext);

    // Initialize quiz
    await api.startSession(userId, themeId);
    const data = await api.fetchQuestions(themeId);
    questions = data.questions || data;
    renderQuestion(currentIndex);

    // ==================== Helper Functions ====================

    function handleSelect(btn, multiple) {
        const value = btn.dataset.value;

        if (multiple) {
            if (userAnswers.includes(value)) {
                userAnswers = userAnswers.filter(a => a !== value);
                btn.classList.replace("bg-yellow-500", "bg-gray-100");
                btn.classList.replace("text-white", "text-gray-800");
            } else {
                userAnswers.push(value);
                btn.classList.replace("bg-gray-100", "bg-yellow-500");
                btn.classList.add("text-white", "border-yellow-600");
            }
        } else {
            userAnswers = [value];
            optionsContainer.querySelectorAll("button").forEach(b => {
                b.classList.replace("bg-yellow-500", "bg-gray-100");
                b.classList.replace("text-white", "text-gray-800");
            });
            btn.classList.replace("bg-gray-100", "bg-yellow-500");
            btn.classList.add("text-white");
        }
    }

    function renderQuestion(index) {
        stopTimer();
        userAnswers = [];

        const q = questions[index];
        if (!q) return endQuiz();

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

        startTimer();
    }

    async function handleNext() {
        stopTimer();
        await saveAndShowResult(questions[currentIndex]);

        if (currentIndex === questions.length - 1) {
            await endQuiz();
        } else {
            currentIndex++;
            renderQuestion(currentIndex);
        }
    }

    async function saveAndShowResult(currentQuestion) {
        const correctData = await api.checkCorrect(currentQuestion.id, userAnswers);
        optionsContainer.querySelectorAll("button").forEach(btn => {
            const text = btn.textContent.trim();
            if (correctData.success) {
                if (correctData.correctAnswers.includes(text)) {
                    btn.classList.replace("bg-yellow-500", "bg-[#24b82a]");
                    btn.classList.add("text-white");
                } else if (userAnswers.includes(text)) {
                    btn.classList.add("bg-red-500", "text-white");
                }
            }
            btn.disabled = true;
        });

        await api.saveAnswer(userId, themeId, currentQuestion.id, userAnswers);
    }

    async function endQuiz() {
        await api.setUserBadge(userId);
        const scoreData = await api.calculateScore(userId, themeId);
        if (scoreData.success) document.location.href = `../result/${themeId}`;
    }

    function updateTimerDisplay(seconds) {
        document.getElementById("timer").textContent = `${String(seconds).padStart(2, '0')}s`;
    }

    function startTimer() {
        stopTimer();
        time = 20;
        updateTimerDisplay(time);

        const currentQuestion = questions[currentIndex];

        timer = setInterval(async () => {
            time--;
            updateTimerDisplay(time);

            if (time < 0) {
                stopTimer();
                // Save even if empty
                await api.saveAnswer(userId, themeId, currentQuestion.id, userAnswers);

                if (currentIndex === questions.length - 1) {
                    await endQuiz();
                } else {
                    currentIndex++;
                    renderQuestion(currentIndex);
                }
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
    }
}