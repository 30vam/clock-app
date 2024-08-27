// Elements
const timerDisplay = document.querySelector('#timer-display');

const timePickers = document.querySelector('#time-pickers');
const hourPicker = timePickers.querySelector('#hour-picker');
const minutePicker = timePickers.querySelector('#minute-picker');
const secondPicker = timePickers.querySelector('#second-picker');

const timerButtonGroup = document.querySelector('#timer-buttongroup'); 
const timerStartButton = document.querySelector('#timer-start-button');
const timerResetButton = document.querySelector('#timer-reset-button');

// Variables
let timerIntervalID = null;
let hasTimerStarted = 0;
let isTimerPaused = 0;
let timerHour = 0;
let timerMinute = 0;
let timerSecond = 0;

function addArrows(pickerElement) {
     // Up Arrow
     const upArrow = document.createElement('button');
     upArrow.classList.add('h-[12px]', 'w-full','bg-no-repeat', 'bg-center');
     upArrow.style.backgroundImage = `url("data:image/svg+xml,%3Csvg fill='%23000000' height='20px' width='20px' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 330 330' xml:space='preserve'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath id='XMLID_224_' d='M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394 l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393 C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`;
     pickerElement.parentNode.prepend(upArrow);
     addEventListener('click', {} );

     // Down Arrow
     const downArrow = document.createElement('button');
     downArrow.classList.add('h-[32px]', 'w-full','bg-no-repeat', 'bg-center');
     downArrow.style.backgroundImage = `url("data:image/svg+xml,%3Csvg fill='%23000000' height='20px' width='20px' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 330 330' xml:space='preserve'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath id='XMLID_224_' d='M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394 l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393 C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`;
     downArrow.style.transform = 'rotate(180deg)';
     pickerElement.parentNode.append(downArrow);
     addEventListener('click', {} );
}

function fillPicker(pickerElement, maxNum) {
    for (let index = 0; index <= maxNum; index++) {
        const newItem = document.createElement('li');
        newItem.innerText = `${ index > 9  ? index : '0' + index }`;
        newItem.classList.add('snap-center');

        pickerElement.append(newItem);
    }

    addArrows(pickerElement);
}

function getCenterItem(scrollBox) {
    const scrollBoxRect = scrollBox.getBoundingClientRect();  // This rectangle tells us about the position of top, buttom etc. borders and also the width and height of the element
    return document.elementFromPoint(scrollBoxRect.left + (scrollBoxRect.width/2), scrollBoxRect.top + (scrollBoxRect.height/2));
}

// Runs if it's the first time starting the timer
function startTimer() {
    // Change start icon to pause
    isTimerPaused = false;
    timerStartButton.querySelector('svg').classList.add('hidden'); // Pause icon
    timerStartButton.querySelector('svg + svg').classList.remove('hidden'); // Play icon

    // Get the selected time cap
    timerHour = getCenterItem(hourPicker).innerText;
    timerMinute = getCenterItem(minutePicker).innerText;
    timerSecond = getCenterItem(secondPicker).innerText;

    // Set the clock display to selected time
    const timerDisplayText = `${ timerHour }:${ timerMinute }:${ timerSecond }`;
    timerDisplay.innerText = timerDisplayText;

    //const timerStartTimeMillisec = (Number(hour) * 3600 + Number(minute) * 60 + Number(second)) * 1000;
    hasTimerStarted = 1;
     // Convert timer value to numbers
    timerHour = parseInt(timerHour); 
    timerMinute = parseInt(timerMinute);
    timerSecond = parseInt(timerSecond);
    timerIntervalID = setInterval(updateTimer, 1000);  // Update timer every 1 sec

    // Console tests
    console.log('Timer started for the first time');
    console.log(`Hour: ${timerHour}, Minute: ${timerMinute}, Second: ${timerSecond}`);
}

function updateTimer() {
    /*const currentTime = new Date();
    const timeElapsed = new Date(currentTime - hasTimerStarted - stopwatchPauseDuration);  // Calculate the passed time since stopwatch started
    const hour = timeElapsed.getUTCHours();
    const minute = timeElapsed.getUTCMinutes();
    const second = timeElapsed.getUTCSeconds();
    const millisecond = Math.floor(timeElapsed.getUTCMilliseconds() / 10);
    
    stopwatchHourDisplay.innerText = `${ hour > 9 ? hour : '0' + hour }:${ minute > 9 ? minute : '0' + minute }:${ second > 9 ? second : '0' + second }`;
    stopwatchMillisecDisplay.innerText = `.${ millisecond > 9 ? millisecond : '0' + millisecond }`;*/
    
}

function toggleTimer() {
    // Pause the timer
    if (!isTimerPaused) {
        // Change pause icon to start
        timerStartButton.querySelector('svg').classList.remove('hidden'); // Pause icon
        timerStartButton.querySelector('svg + svg').classList.add('hidden'); // Play icon
        
        isTimerPaused = true;
        /*timerPauseTime = new Date();
        clearInterval(timerIntervalID);*/
        console.log('Timer paused');

    } 
    // Wake up the timer from pause
    else {
        // Change start icon to pause
        timerStartButton.querySelector('svg').classList.add('hidden');
        timerStartButton.querySelector('svg + svg').classList.remove('hidden');
        
        console.log('Timer started from pause'); 
        isTimerPaused = false;
    }
}

function resetTimer() {
    hasTimerStarted = 0;
}

// Fill time pickers with numbers
fillPicker(hourPicker, 24);
fillPicker(minutePicker, 60);
fillPicker(secondPicker, 60);

// Event Listeners
timerStartButton.addEventListener('click', () => {
    // If the start button is being clicked for the first time:
    if (!hasTimerStarted) {
        startTimer();
    } 
    // Toggle pause or start
    else {
        toggleTimer();
    }
});