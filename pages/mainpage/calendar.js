let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let currentMonthText = document.getElementById("currentMonth");
let calendarDates = document.getElementById("calendarDates");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const mainYear = document.getElementById("main-year");
const mainDay = document.getElementById("main-day");
const mainDate = document.getElementById("main-date");

let inputValue = document.querySelector("#todo-input");
let todoList = document.querySelector("#todo-list");
// const localItems = JSON.parse(localStorage.getItem("saved-item"));

const dayList = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

//todo list위에 선택한 날짜, 요일 출력하는 함수
const showMain = function () {
  mainYear.innerHTML = today.getFullYear();
  mainDay.innerHTML = dayList[today.getDay()];
  mainDate.innerHTML = `${today.getMonth() + 1}.${today.getDate()}`;
};

showMain();

let tdGroup = [];

const clickDay = function () {
  for (
    let i = 1;
    i <= new Date(currentYear, currentMonth + 1, 0).getDate();
    i++
  ) {
    tdGroup[i] = document.getElementById(i);
    tdGroup[i].addEventListener("click", changeToday);
  }
};

const changeToday = function (e) {
  let clickedDate1 = document.getElementById(today.getDate());
  for (
    let i = 1;
    i <= new Date(currentYear, currentMonth + 1, 0).getDate();
    i++
  ) {
    if (tdGroup[i].classList.contains("today")) {
      tdGroup[i].classList.remove("today");
    }
  }
  clickedDate1 = e.currentTarget;
  clickedDate1.classList.add("today");
  today = new Date(today.getFullYear(), today.getMonth(), clickedDate1.id);
  displayTodos();
  showMain();
};

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
    dateElement.setAttribute("id", i);
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
  clickDay();
};
calendarFunction();

prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  let changeToday = today.getDate();
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
  let changeToday = today.getDate();
  today = new Date(currentYear, currentMonth, changeToday);
  calendarFunction();
  showMain();
});

let inputList = [];

let keyValue =
  today.getFullYear() + "" + (today.getMonth() + 1) + "" + today.getDate();

if (!inputList[keyValue]) {
  inputList[keyValue] = [];
}

const displayTodos = function () {
  todoList.innerHTML = "";

  keyValue =
    today.getFullYear() + "" + (today.getMonth() + 1) + "" + today.getDate();

  if (inputList[keyValue] && inputList[keyValue].length > 0) {
    inputList[keyValue].forEach((todo) => {
      const newLi = document.createElement("li");
      const newBtn = document.createElement("button");
      const newSpan = document.createElement("span");
      const newDelete = document.createElement("span");
      newDelete.classList.add("delete");
      newDelete.textContent = "X";

      newBtn.addEventListener("click", () => {
        newLi.classList.toggle("complete");
        todo.complete = !todo.complete;
        saveInputList();
      });

      newDelete.addEventListener("click", () => {
        newLi.remove();
        inputList[keyValue] = inputList[keyValue].filter(
          (item) => item !== todo
        );
        saveInputList();
      });

      if (todo.complete) {
        newLi.classList.add("complete");
      }

      newSpan.textContent = todo.content;
      newLi.appendChild(newBtn);
      newLi.appendChild(newSpan);
      newLi.appendChild(newDelete);
      todoList.appendChild(newLi);
    });

    todoList.scrollTop = todoList.scrollHeight;
  }
};

// 할 일을 생성하고 저장하는 함수
const createTodo = function (storageItem) {
  let inputTodo = inputValue.value;

  if (storageItem) {
    inputTodo = storageItem.content;
  }

  const newTodo = {
    content: inputTodo,
    complete: false,
  };

  keyValue =
    today.getFullYear() + "" + (today.getMonth() + 1) + "" + today.getDate();

  if (!inputList[keyValue]) {
    inputList[keyValue] = [];
  }

  inputList[keyValue].push(newTodo);

  displayTodos();
  inputValue.value = "";
  saveInputList();
};

const inputCheck = function () {
  if (window.event.keyCode === 13) {
    createTodo();
  }
};

const clickBtn = function () {
  createTodo();
};

const saveInputList = function () {
  const minimizedInputList = Object.fromEntries(
    Object.entries(inputList).filter(([key, value]) => value.length > 0)
  );
  localStorage.setItem("inputList", JSON.stringify(minimizedInputList));
};

const loadInputList = function () {
  const savedList = localStorage.getItem("inputList");
  if (savedList) {
    inputList = JSON.parse(savedList);
    displayTodos();
  }
};

window.onload = function () {
  loadInputList();
  displayTodos();
};
