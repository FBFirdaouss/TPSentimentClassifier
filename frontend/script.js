
const analyzeBtn = document.getElementById("analyzeBtn");
const reviewInput = document.getElementById("review");
const modelSelect = document.getElementById("modelSelect");
const resultDiv = document.getElementById("result");

// Boutons d'exemples
const exampleButtons = document.querySelectorAll(".example-btn");

exampleButtons.forEach(button => {
    button.addEventListener("click", () => {
        reviewInput.value = button.dataset.text;
        resultDiv.innerHTML = "";
    });
});

// Analyse du sentiment
analyzeBtn.addEventListener("click", async () => {
    const text = reviewInput.value.trim();
    const selectedModel = modelSelect.value;

    if (!text) {
        resultDiv.innerHTML =
            '<p class="error">Please enter a review.</p>';
        return;
    }

    resultDiv.textContent = "Analyzing...";

    try {
        // const response = await fetch("http://127.0.0.1:5000/predict", {
        const response = await fetch("/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: text,
                model: selectedModel
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Prediction failed.");
        }

        const sentiment = data.sentiment.toLowerCase();

        resultDiv.innerHTML = `
            <div class="result-card">
                <div class="sentiment ${sentiment}">
                    Predicted sentiment: ${sentiment.toUpperCase()}
                </div>
                <p>Algorithm: ${data.model}</p>
            </div>
        `;

    } catch (error) {
        resultDiv.innerHTML =
            `<p class="error">Error: ${error.message}</p>`;
    }
});
