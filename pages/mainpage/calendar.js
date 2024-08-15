const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let currentMonthText = document.getElementById("currentMonth");
let calendarDates = document.getElementById("calendarDates");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const calendarFunction = function () {
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const startDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const lastDaysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const nextMonthStartDay = new Date(currentYear, currentMonth + 1, 1).getDay();

  currentMonthText.textContent = `${currentYear}년 ${currentMonth + 1}월`;

  calendarDates.innerHTML = "";

  for (
    let i = lastDaysInMonth - startDayOfWeek + 1;
    i <= lastDaysInMonth;
    i++
  ) {
    let emptyDate = document.createElement("div");
    emptyDate.classList.add("nextday");
    emptyDate.textContent = i;
    calendarDates.appendChild(emptyDate);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    let dateElement = document.createElement("div");
    dateElement.classList.add("date");
    dateElement.textContent = i;
    calendarDates.appendChild(dateElement);
  }

  if (nextMonthStartDay > 0) {
    for (let i = 1; i <= 7 - nextMonthStartDay; i++) {
      let nextDay = document.createElement("div");
      nextDay.classList.add("nextday");
      nextDay.textContent = i;
      calendarDates.appendChild(nextDay);
    }
  }

  if (
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear()
  ) {
    for (let todayDate of document.querySelectorAll(".date")) {
      if (+todayDate.innerText === today.getDate()) {
        todayDate.classList.add("today");
        break;
      }
    }
  }
};
calendarFunction();

prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  calendarFunction();
});

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  calendarFunction();
});
