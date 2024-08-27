// Elements
const timerDisplay = document.querySelector('#timer-display');

const timePickerWrapper = document.querySelector('#time-picker-wrapper');
const timePickers = timePickerWrapper.querySelector('#time-pickers');
const timePickerHighlight = timePickerWrapper.querySelector('timepicker-highlight');
const hourPicker = timePickers.querySelector('#hour-picker');
const minutePicker = timePickers.querySelector('#minute-picker');
const secondPicker = timePickers.querySelector('#second-picker');

const timerButtonGroup = document.querySelector('#timer-buttongroup'); 
const timerStartButton = timerButtonGroup.querySelector('#timer-start-button');
const timerResetButton = timerButtonGroup.querySelector('#timer-reset-button');

// Variables
let timerIntervalID = null;
let isTimerPaused = false;
let selectedDuration = 0;
let secondsLeft = 0;

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

function togglePickerScrolling(enableOrDisable = 'disable') {
    // Disable pickers
    if (enableOrDisable === 'disable') {
        timePickerWrapper.classList.add('opacity-25');
    } 
    // Enable pickers
    else if (enableOrDisable === 'enable') {
        timePickerWrapper.classList.remove('opacity-25');
    }
}

function changeStartButtonIcon(iconName) {
    if (iconName === 'start') {
        timerStartButton.querySelector('svg').classList.remove('hidden'); // Pause icon
        timerStartButton.querySelector('svg + svg').classList.add('hidden'); // Play icon
    } else if (iconName === 'pause') {
        timerStartButton.querySelector('svg').classList.add('hidden'); // Pause icon
        timerStartButton.querySelector('svg + svg').classList.remove('hidden'); // Play icon
    }
}

function toggleStartButtonActivation() {
    // Disable the start button when when the selected time is 0
    if (getCenterItem(hourPicker).innerText === '00' && getCenterItem(minutePicker).innerText === '00' && getCenterItem(secondPicker).innerText === '00') {
        timerStartButton.disabled = true;
        timerStartButton.classList.add('opacity-50');
        timerStartButton.classList.remove('hover:scale-90');
    }
    // Enable the start button otherwise if it wasn't already enabled
    else if(timerStartButton.disabled) {
        timerStartButton.disabled = false;
        timerStartButton.classList.remove('opacity-50');
        timerStartButton.classList.add('hover:scale-90');
    }
}

// Runs if it's the first time starting the timer
function startTimer() {
    changeStartButtonIcon('pause');
    togglePickerScrolling('disable');

    // Get the selected timecap
    const timerHour = getCenterItem(hourPicker).innerText;
    const timerMinute = getCenterItem(minutePicker).innerText;
    const timerSecond = getCenterItem(secondPicker).innerText;

    // Set the clock display to selected time
    timerDisplay.innerText = `${ timerHour }:${ timerMinute }:${ timerSecond }`;
    
    // Convert timer value to numbers
    secondsLeft = parseInt(timerHour) * 3600 + parseInt(timerMinute) * 60 + parseInt(timerSecond);
    selectedDuration = secondsLeft;
    timerIntervalID = setInterval(updateTimer, 1000);  // Update timer every 1 sec

    // Console tests
    console.log('Timer started for the first time');
    console.log(`Seconds left: ${secondsLeft}`);
}

function updateTimer() {
    // Check if the timer has finished
    if (secondsLeft === 1) {
        resetTimer();
        setTimeout(() => { alert(`The timer has ended! Time elapsed: ${selectedDuration} seconds.`); });
        return;
    }

    secondsLeft--;  // Update the time left

    // Calcute left hours, minutes & seconds
    const timerHour = Math.floor(secondsLeft / 3600);
    const timerMinute = Math.floor((secondsLeft % 3600) / 60);
    const timerSeconds = secondsLeft % 60;

    // Update the time display
    const timerDisplayText = `${ timerHour > 9 ? timerHour : '0' + timerHour }:${ timerMinute > 9 ? timerMinute : '0' + timerMinute }:${ timerSeconds > 9 ? timerSeconds : '0' + timerSeconds }`;
    timerDisplay.innerText = timerDisplayText;

    // Console tests
    console.log(`Seconds left: ${secondsLeft}`);
}

function toggleTimer() {
    // Pause the timer
    if (!isTimerPaused) {
        isTimerPaused = true;
        changeStartButtonIcon('start');
        clearInterval(timerIntervalID);
        
        // Console tests
        console.log('Timer paused');
    } 
    // Wake up the timer from pause
    else {
        isTimerPaused = false;
        changeStartButtonIcon('pause');
        timerIntervalID = setInterval(updateTimer, 1000);

        // Console tests
        console.log('Timer started from pause'); 
    }
}

function resetTimer() {
    togglePickerScrolling('enable'); // Enable scrolling inside pickers 

    clearInterval(timerIntervalID);  // Stop the interval AND ONLY then you can set the ID to null
    timerIntervalID = null;  // Setting this to null means the timer hasn't been started yet
    isTimerPaused = false;
    secondsLeft = 0;  // For when clicking on the shutdown button manually
    timerDisplay.innerText = '00:00:00';
    changeStartButtonIcon('start');

    // Console tests
    console.log('Timer has been reset.');
}

// Fill time pickers with numbers
fillPicker(hourPicker, 24);
fillPicker(minutePicker, 60);
fillPicker(secondPicker, 60);

toggleStartButtonActivation();  // Disable timer start button at the start

// Event Listeners
// Scrolling events for activating/disabling the start button when selected time is not 0
hourPicker.addEventListener('scroll', toggleStartButtonActivation);
minutePicker.addEventListener('scroll', toggleStartButtonActivation);
secondPicker.addEventListener('scroll', toggleStartButtonActivation);
// Events for clicking on the timer buttons
timerStartButton.addEventListener('click', () => {
    // If the start button is being clicked for the first time & the selected time is greater than 0:
    if (timerIntervalID === null) {
        startTimer();
    } 
    // Toggle pause or start
    else {
        toggleTimer();
    } 
});
timerResetButton.addEventListener('click', resetTimer);