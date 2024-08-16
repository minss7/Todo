let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let currentMonthText = document.getElementById("currentMonth");
let calendarDates = document.getElementById("calendarDates");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const mainDay = document.getElementById("main-day");
const mainDate = document.getElementById("main-date");

let inputValue = document.querySelector("#todo-input");
let todoList = document.querySelector("#todo-list");
const localItems = JSON.parse(localStorage.getItem("saved-item"));

//달력 출력 함수
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
  changeToday = today.getDate();
  today = new Date(currentYear, currentMonth, changeToday);
  calendarFunction();
  showMain();
});

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  changeToday = today.getDate();
  today = new Date(currentYear, currentMonth, changeToday);
  calendarFunction();
  showMain();
});

const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const showMain = function () {
  mainDay.innerHTML = dayList[today.getDay()];
  mainDate.innerHTML = `${today.getMonth() + 1}.${today.getDate()}`;
};

showMain();

// todo 출력함수
const createTodo = function (storageItem) {
  let inputTodo = inputValue.value;

  if (storageItem) {
    inputTodo = storageItem.content;
  }

  const newLi = document.createElement("li");
  const newBtn = document.createElement("button");
  const newSpan = document.createElement("span");
  const newDelete = document.createElement("span");
  newDelete.classList.add("delete");
  newDelete.textContent = "X";

  newBtn.addEventListener("click", () => {
    newLi.classList.toggle("complete");
  });

  newDelete.addEventListener("click", () => {
    newLi.remove();
    saveItem();
  });

  if (storageItem?.complete) {
    newLi.classList.add("complete");
  }

  newSpan.textContent = inputTodo;
  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan);
  newLi.appendChild(newDelete);
  todoList.appendChild(newLi);

  inputValue.value = "";
  saveItem();
};

const inputCheck = function () {
  if (window.event.keyCode === 13) {
    createTodo();
  }
};

//localStorage에 저장하기 위한 함수
const saveItem = function () {
  let saveItems = [];
  for (let i = 0; i < todoList.children.length; i++) {
    const todoObj = {
      content: todoList.children[i].querySelector("span").textContent,
      complete: todoList.children[i].classList.contains("complete"),
    };
    saveItems.push(todoObj);
  }

  saveItems.length === 0
    ? localStorage.removeItem("saved-item")
    : localStorage.setItem("saved-item", JSON.stringify(saveItems));
};

if (localItems) {
  for (i = 0; i < localItems.length; i++) {
    createTodo(localItems[i]);
  }
}
