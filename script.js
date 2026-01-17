const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputField_1 = document.querySelector(".input-field-1");
const inputField_2 = document.querySelector(".input-field-2");
const inputField_3 = document.querySelector(".input-field-3");
const errorLabel = document.querySelector(".error-label");
const progressValue = document.querySelector(".progress-value");
const resetBtn = document.querySelector(".resetBtn");
const goalContainer = document.querySelectorAll(".goal-container");

let goalCompletedCounter = 0;

checkBoxList.forEach((checkBox) => {
  checkBox.addEventListener("click", (e) => {
    let field1 = inputField_1.value.length;
    let field2 = inputField_2.value.length;
    let field3 = inputField_3.value.length;
    if (field1 == 0 || field2 == 0 || field3 == 0) {
      errorLabel.classList.remove("error-label-visibility");
    } else if (field1 >= 1 && field2 >= 1 && field3 >= 1) {
      errorLabel.classList.add("error-label-visibility");
      e.target.classList.add("completed");
      e.target.parentElement.classList.toggle("strike");
      goalCompletedCounter++;

      // Updating the Goal Completing
      if (goalCompletedCounter == 0) {
        progressValue.classList.add("progress-value-0");
        progressValue.innerHTML = "0/3 Completed";
      } else if (goalCompletedCounter == 1) {
        progressValue.classList.add("progress-value-1");
        progressValue.innerHTML = "1/3 Completed";
      } else if (goalCompletedCounter == 2) {
        progressValue.classList.add("progress-value-2");
        progressValue.innerHTML = "2/3 Completed";
      } else if (goalCompletedCounter == 3) {
        progressValue.classList.add("progress-value-3");
        progressValue.innerHTML = "3/3 Completed";
        resetBtn.classList.remove("visibility");
      }
    }
  });
});

resetBtn.addEventListener("click", (e) => {
  goalCompletedCounter = 0;
  checkBoxList.forEach((checkBox) => {
    checkBox.classList.remove("completed");
    let allInputs = document.querySelectorAll("input");
    allInputs.forEach((input) => {
      input.value = "";
    });
    goalContainer.forEach((container) => {
      container.classList.remove("strike");
    });
  });
});
