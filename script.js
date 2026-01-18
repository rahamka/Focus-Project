const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressLabel = document.querySelector(".progress-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");

const allQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away, keep going!",
  "Wow! You just completed all the goals, time for chill :D",
];

// ----- Input Goals Saving Object ----- //
const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
  first: {
    name: "",
    completed: "",
  },
  second: {
    name: "",
    completed: "",
  },
  third: {
    name: "",
    completed: "",
  },
}; // getting object from localStorage if available.

// getting the length of complete goals for progressValue updating
let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed,
).length;

progressValue.style.width = `${(completedGoalsCount / 3) * 100}%`; // updating the completed goals
progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 Complete`;
progressLabel.innerText = allQuotes[completedGoalsCount];

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allGoalsAdded = [...inputFields].every(function (input) {
      return input.value;
    });

    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle("completed"); // checkbox.parentElement means goal-container in the html
      const inputId = checkbox.nextElementSibling.id; // getting id of input for changing the value of complete
      allGoals[inputId].completed = !allGoals[inputId].completed; // true => false or false => true
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed,
      ).length;
      progressValue.style.width = `${(completedGoalsCount / 3) * 100}%`;
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 Complete`;

      progressLabel.innerText = allQuotes[completedGoalsCount];

      localStorage.setItem("allGoals", JSON.stringify(allGoals)); // updates the values of complete key
    } else {
      progressBar.classList.add("show-error");
    }
  });
});

inputFields.forEach((input) => {
  // ----- Adding value to the Input by getting value from localStorage ----- //
  input.value = allGoals[input.id].name;

  // ----- Adding class to the checkboxes ----- //
  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }
  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });

  // ----- Second event on Input ----- //
  input.addEventListener("input", (e) => {
    if (allGoals[input.id].completed) {
      e.target.value = allGoals[input.id].name;
    }

    allGoals[input.id] = {
      name: input.value,
      completed: false,
    };
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
    console.log(input.id);
  });
});
