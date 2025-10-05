export async function fetchQuestions(themeId) {
    const res = await fetch(`/api/quiz/theme/${themeId}/questions`);
    return await res.json();
}

export async function startSession(userId, themeId) {
    const res = await fetch("/api/quiz/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, themeId })
    });
    return await res.json();
}

export async function saveAnswer(userId, themeId, questionId, answers) {
    const res = await fetch("/api/quiz/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, themeId, questionId, answers })
    });
    return await res.json();
}

export async function checkCorrect(questionId, answers) {
    const res = await fetch("/api/quiz/correct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, answers })
    });
    return await res.json();
}

export async function calculateScore(userId, themeId) {
    const res = await fetch("/api/quiz/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, themeId })
    });
    return await res.json();
}

export async function getUserQuizAnswers(userId, themeId) {
    try {
        const res = await fetch(`/api/quiz/user/${userId}/theme/${themeId}/history`);
        if (!res.ok) {
            throw new Error(`Failed to fetch quiz answers: ${res.status}`);
        }
        const data = await res.json();
        return data.answers;
    } catch (error) {
        console.error("Error fetching user quiz answers:", error);
        return null;
    }
}