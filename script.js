async function checkAnswer() {
  const answerInput = document.getElementById("answer");
  const scoreDiv = document.getElementById("score");
  const feedbackDiv = document.getElementById("feedback");
  const btn = document.getElementById("checkBtn");

  const text = answerInput.value.trim();
  if (!text) {
    scoreDiv.textContent = "Score: 0/10";
    feedbackDiv.textContent = "Please enter an answer.";
    return;
  }

  btn.disabled = true;
  btn.querySelector(".spinner").style.display = "inline";
  btn.querySelector(".btn-text").textContent = "Checking...";

  try {
    const response = await fetch("https://interview-checker.onrender.com/check", { // your FastAPI URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Update score and feedback cards
    scoreDiv.textContent = `Score: ${data.score}/10`;
    feedbackDiv.innerHTML = data.feedback.join("<br>");

  } catch (error) {
    console.error(error);
    scoreDiv.textContent = "Score: 0/10";
    feedbackDiv.textContent = "Error connecting to backend.";
  } finally {
    btn.disabled = false;
    btn.querySelector(".spinner").style.display = "none";
    btn.querySelector(".btn-text").textContent = "Check Strength";
  }
}



