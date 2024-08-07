// Elements
const stopwatchDisplay = document.querySelector('#stopwatch-display').firstElementChild;
const stopwatchMillisecDisplay = document.querySelector('#stopwatch-display').lastElementChild;
const stopwatchStartButton = document.querySelector('#stopwatch-start-button');
const activatedStopwatchButtongroup = document.querySelector('#activated-stopwatch-buttongroup');
const stopwatchCheckpointButton = document.querySelector('#stopwatch-checkpoint-button');
const stopwatchPauseButton = document.querySelector('#stopwatch-pause-button');
const stopwatchResetButton = document.querySelector('#stopwatch-reset-button');

// Variables
let stopwatchIntervalID = null;
let stopwatchStartTime = null;
let stopwatchPauseTime = null;
let isStopwatchPaused = 0;
let stopwatchPauseDuration = 0;

function enableStopwatchButtons() {
    // Fade & disable the start button
    stopwatchStartButton.style.opacity = 0;
    stopwatchStartButton.disabled = true;

    //Enable other buttons after opacity transition has ended:
    setTimeout(() => { stopwatchStartButton.classList.add('hidden');
    activatedStopwatchButtongroup.classList.remove('hidden');  // Remove tailwind .hidden (display: none)
    activatedStopwatchButtongroup.classList.add('flex');  // Make the buttons a flexbox. Other flex properties are already set in HTML
    activatedStopwatchButtongroup.style.opacity = 100; }, 150);
}

function disableStopwatchButtons() {
    // ALWAYS make sure pause button is reset to its default icon
    if (stopwatchPauseButton.querySelector('svg').classList.contains('hidden')) {
        stopwatchPauseButton.querySelector('svg').classList.remove('hidden');  // Pause icon
        stopwatchPauseButton.querySelector('svg + svg').classList.add('hidden');  // Start icon
    }

    //Disable button group & activate start button
    activatedStopwatchButtongroup.style.opacity = 0;
    activatedStopwatchButtongroup.classList.remove('flex'); 
    activatedStopwatchButtongroup.classList.add('hidden');
    stopwatchStartButton.classList.remove('hidden');
    stopwatchStartButton.style.opacity = 100;
    stopwatchStartButton.disabled = false;
    
}

function startStopwatch() {
    // If the timer is starting from null(starting the stopwatch for the  first time of after reset)
    if (!isStopwatchPaused) {
        enableStopwatchButtons();
        stopwatchStartTime = new Date();
    } 
    if (isStopwatchPaused) {
        stopwatchPauseDuration += (new Date() - stopwatchPauseTime);  // Calculate pause duration if the stop watch is paused
        isStopwatchPaused = false;
    }
  
    // Start the stopwatch and update it every 10 ms
    stopwatchIntervalID = setInterval(updateStopwatch, 10);
}

function updateStopwatch() {
    const currentTime = new Date();
    const timeElapsed = new Date(currentTime - stopwatchStartTime - stopwatchPauseDuration);  // Calculate the passed time since stopwatch started
    const hour = timeElapsed.getUTCHours();
    const minute = timeElapsed.getUTCMinutes();
    const second = timeElapsed.getUTCSeconds();
    const millisecond = Math.floor(timeElapsed.getUTCMilliseconds() / 10);
    
    stopwatchDisplay.innerText = `${ hour > 9 ? hour : '0' + hour }:${ minute > 9 ? minute : '0' + minute }:${ second > 9 ? second : '0' + second }`;
    stopwatchMillisecDisplay.innerText = `.${ millisecond > 9 ? millisecond : '0' + millisecond }`;
}

function toggleStopwatch() {
    // Pause the stopwatch if it wasn't already paused
    if (!isStopwatchPaused) {
        isStopwatchPaused = true;
        stopwatchPauseTime = new Date();
        clearInterval(stopwatchIntervalID);

        // Change pause icon to start
        stopwatchPauseButton.querySelector('svg').classList.add('hidden'); // Pause icon
        stopwatchPauseButton.querySelector('svg + svg').classList.remove('hidden'); // Play icon
    } else {
        // Change start icon to pause
        stopwatchPauseButton.querySelector('svg').classList.remove('hidden');
        stopwatchPauseButton.querySelector('svg + svg').classList.add('hidden');
        startStopwatch();
    }
}

function resetStopwatch() {
    clearInterval(stopwatchIntervalID);
    stopwatchStartTime = null;
    stopwatchPauseTime = null;
    isStopwatchPaused = 0;
    stopwatchPauseDuration = 0;
    stopwatchDisplay.innerText = '00:00:00';
    stopwatchMillisecDisplay.innerText = '.00';

    disableStopwatchButtons();
}

// Event Listeners
stopwatchStartButton.addEventListener('click', startStopwatch);
stopwatchPauseButton.addEventListener('click', toggleStopwatch);
stopwatchResetButton.addEventListener('click', resetStopwatch)