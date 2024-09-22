// pomodoro variables 
const startEl = document.getElementById("start");
const pauseEl = document.getElementById("pause");
const resetEl = document.getElementById("reset");
const timerEl = document.getElementById("timer");
const breakEl = document.getElementById("break");

// to do list variable 
const taskTB = document.getElementById("task");
const taskList = document.getElementById("todoList");
const addBtn = document.getElementById("add");

// pomodoro functions
let interval;
let breakInterval;
let timeLeft = 1500; // 1500 secs in 25 mins 
let breakTime = 0;

function updateBreak(){
    let breakMinutes = Math.floor(breakTime / 60);
    let breakSeconds = breakTime % 60
    let formattedBreakTime = `break: ${breakMinutes.toString().padStart(2, "0")}:${breakSeconds.toString().padStart(2, "0")}`;

    breakEl.innerHTML = formattedBreakTime;
}

function updateTimer(){
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`; // pads the front with a 0 if one digit number 

    timerEl.innerHTML = formattedTime;
}

function startTimer(){
    clearInterval(breakInterval);
    interval = setInterval(()=>{
        timeLeft--; // decrements by 1 
        updateTimer();
        if (timeLeft === 0) {
            clearInterval(interval);
            clearInterval(breakInterval);
            alert("pomodoro finished!");
            timeLeft = 1500;
            breakTime = 0
            updateTimer();
            updateBreak();
        }
    }, 1000)
}
function pauseTimer(){
    clearInterval(interval);
    breakInterval = setInterval(()=>{
        breakTime++; // increments rest by 1 
        updateBreak();
    }, 1000)

}

function resetTimer(){
    clearInterval(interval);
    clearInterval(breakInterval);
    timeLeft = 1500;
    breakTime = 0;
    updateTimer();
    updateBreak();
}

// to do list functions 
function addTask(){
    if(taskTB.value === ""){
        alert("you must enter a task!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = "  "+taskTB.value;
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        taskList.appendChild(li);
    }
    taskTB.value = "";
    saveData();
}

taskList.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked"); // if task is unchecked, it will be checked when pressed (vice versa) 
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false)

function saveData(){ // allows data to be saved every time website opens 
    localStorage.setItem("data", taskList.innerHTML);
}

function displayData(){
    taskList.innerHTML = localStorage.getItem("data");
}
displayData();

// pomodoro event listeners 
startEl.addEventListener("click", startTimer);
pauseEl.addEventListener("click", pauseTimer);
resetEl.addEventListener("click", resetTimer);

// to do list event listener 
addBtn.addEventListener("click", addTask);
addEventListener("keydown", (e)=>{
    if(e.key == "Enter"){
        addTask();
    }
})

// calendar event listener
document.addEventListener("DOMContentLoaded", function () {
    const monthYear = document.getElementById("month-year");
    const months = ['january', 'februrary', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const daysContainer = document.getElementById("days");
    
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    let currentDate = new Date();
    let today = new Date();

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();


        monthYear.textContent = `${months[month]} ${year}`;
        daysContainer.innerHTML = "";


        // previous months dates
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = firstDay; i > 0; i--) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = prevMonthLastDay - i + 1;
            dayDiv.classList.add("fade");
            daysContainer.appendChild(dayDiv);
        }


        // current months dates
        for (let i = 1; i <= lastDay; i++) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = i;
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayDiv.classList.add("today");
            }
            daysContainer.appendChild(dayDiv);
        }

        // next months dates
        const nextMonthStartDay = 7 - new Date(year, month + 1, 0).getDay() - 1;
        for (let i = 1; i <= nextMonthStartDay; i++) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = i;
            dayDiv.classList.add("fade");
            daysContainer.appendChild(dayDiv);
        }
    }
    prevBtn.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });


    nextBtn.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });


    renderCalendar(currentDate);
});
