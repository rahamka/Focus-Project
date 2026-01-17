const checkBoxes = document.querySelectorAll(".custom-checkbox");
const goalContainers = document.querySelectorAll(".goal-container");
const inputs = document.querySelectorAll(".goal-input");

const errorLabel = document.querySelector(".error-label");
const progressValue = document.querySelector(".progress-value");
const resetBtn = document.querySelector(".resetBtn");

/* ---------- Helpers ---------- */

function allInputsFilled() {
  return [...inputs].every((input) => input.value.trim() !== "");
}

function updateProgress() {
  const completedCount = document.querySelectorAll(
    ".goal-container.completed",
  ).length;

  progressValue.textContent = `${completedCount}/3 Completed`;

  progressValue.className = "progress-value";
  progressValue.classList.add(`progress-value-${completedCount}`);

  if (completedCount === 3) {
    resetBtn.classList.remove("visibility");
  } else {
    resetBtn.classList.add("visibility");
  }
}

/* ---------- Checkbox Click ---------- */

checkBoxes.forEach((checkBox, index) => {
  checkBox.addEventListener("click", () => {
    if (!allInputsFilled()) {
      errorLabel.classList.remove("error-label-visibility");
      return;
    }

    errorLabel.classList.add("error-label-visibility");

    goalContainers[index].classList.toggle("completed");
    goalContainers[index].classList.toggle("strike");

    updateProgress();
  });
});

/* ---------- Reset ---------- */

resetBtn.addEventListener("click", () => {
  goalContainers.forEach((container) => {
    container.classList.remove("completed", "strike");
  });

  inputs.forEach((input) => (input.value = ""));

  progressValue.textContent = "0/3 Completed";
  progressValue.className = "progress-value progress-value-0";

  resetBtn.classList.add("visibility");
});
