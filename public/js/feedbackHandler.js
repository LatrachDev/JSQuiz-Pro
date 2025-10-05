// public/js/handleFeedback.js
import { getUserQuizAnswers } from './quizApi.js';

export function initFeedbackButton(userId, themeId) {
    const feedbackButton = document.getElementById("view-feedback-btn");
    const feedbackSection = document.getElementById("feedback-section");
    const feedbackContainer = document.getElementById("feedback-container");

    if (!feedbackButton || !feedbackSection || !feedbackContainer) return;

    feedbackButton.addEventListener("click", async () => {
        // Toggle visibility
        const isHidden = feedbackSection.classList.contains("hidden");
        feedbackSection.classList.toggle("hidden", !isHidden);
        feedbackButton.textContent = isHidden ? "Hide Feedback" : "View Feedback";

        if (!isHidden) return; // If hiding, stop here

        feedbackContainer.innerHTML = ""; // clear previous content

        try {
            const answers = await getUserQuizAnswers(userId, themeId);

            answers.forEach((answer, index) => {
                const questionNumber = index + 1;
                let noteText = "";
                let noteClasses = "";

                if (answer.correct) {
                    noteText = "Correct ✅";
                    noteClasses = "text-green-700";
                } else if (!answer.correct && answer.userAnswers.some(ans => answer.correctAnswers.includes(ans))) {
                    noteText = "Partially correct ⚠️";
                    noteClasses = "text-yellow-600";
                } else {
                    noteText = "Incorrect ❌";
                    noteClasses = "text-red-700";
                }

                // Build options HTML using all possible options
                const optionsHtml = answer.questionOptions
                    .map(opt => {
                        let bgClass = "bg-gray-100";
                        let borderClass = "";

                        if (answer.correctAnswers.includes(opt)) {
                            bgClass = "bg-green-100";
                            borderClass = "border-2 border-green-400";
                        } else if (answer.userAnswers.includes(opt)) {
                            bgClass = "bg-red-100";
                            borderClass = "border-2 border-red-400";
                        }

                        return `<div class="rounded-full px-6 py-4 ${bgClass} ${borderClass}">
                                    <span class="text-gray-800">${opt}</span>
                                </div>`;
                    }).join("");

                feedbackContainer.innerHTML += `
                    <div class="bg-white rounded-2xl border-2 border-yellow-500 p-8 shadow-lg mb-6">
                        <div class="flex justify-end mb-4">
                            <span class="flex items-center font-semibold ${noteClasses}">
                                ${noteText}
                            </span>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-4">Question ${questionNumber}</h3>
                        <p class="text-gray-700 text-lg mb-6">${answer.questionText}</p>
                        <div class="space-y-3">
                            ${optionsHtml}
                        </div>
                    </div>
                `;
            });

        } catch (err) {
            console.error("Failed to get user quiz answers:", err);
        }
    });
}