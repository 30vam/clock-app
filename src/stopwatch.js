// Elements
const stopwatchContentDisplay = document.querySelector('#stopwatch-display');
const stopwatchHourDisplay = document.querySelector('#stopwatch-display').firstElementChild;
const stopwatchMillisecDisplay = document.querySelector('#stopwatch-display').lastElementChild;
const stopwatchCheckpointList = document.querySelector('#stopwatch-checkpoint-list');
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
const fadeAnimationLength = 500;

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
    
    stopwatchHourDisplay.innerText = `${ hour > 9 ? hour : '0' + hour }:${ minute > 9 ? minute : '0' + minute }:${ second > 9 ? second : '0' + second }`;
    stopwatchMillisecDisplay.innerText = `.${ millisecond > 9 ? millisecond : '0' + millisecond }`;
}

function addCheckpoint() {
    // New checkpoint flexbox
    const newCheckpointElement = document.createElement('div');
    newCheckpointElement.classList.add('w-[90%]', 'flex', 'justify-between', 'text-[16px]', 'opacity-0', 'transition-opacity', `duration-[${fadeAnimationLength}ms]`);
    stopwatchCheckpointList.appendChild(newCheckpointElement);

    // Checkpoint rank
    const checkpointNum = document.createElement('span');
    checkpointNum.innerText = `${stopwatchCheckpointList.children.length}.`;
    newCheckpointElement.appendChild(checkpointNum);

    // Checkpoint time
    const checkpointTime = document.createElement('span');
    checkpointTime.innerText = stopwatchContentDisplay.innerText;
    newCheckpointElement.appendChild(checkpointTime);

    // Scroll to the end of the checkpoint list
    stopwatchCheckpointList.scrollTop = stopwatchCheckpointList.scrollWidth;

    // When the checkpoint buttons is pressed for the first time:
    if (stopwatchCheckpointList.children.length === 1) {
        // First, move the stopwatch display to the top (its real position):
        stopwatchContentDisplay.classList.remove('translate-y-[var(--stopwatch-display-offset)]');
        stopwatchHourDisplay.classList.add('translate-y-0');

        // Make the checkpoint list visible
        stopwatchCheckpointList.classList.remove('hidden');
        stopwatchCheckpointList.classList.add('flex');
        // Fade in effect
        setTimeout(() => { stopwatchCheckpointList.classList.remove('opacity-0');
        stopwatchCheckpointList.classList.add('opacity-100');  } , 100);
    }

    // Give the checkpoint a fade-in transition
    newCheckpointElement.classList.add('opacity-100');
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

        //Disable checkpoint button on pause
        stopwatchCheckpointButton.disabled = true;
        stopwatchCheckpointButton.classList.add('opacity-50');
        stopwatchCheckpointButton.classList.remove('hover:scale-90');
    } else {
        // Change start icon to pause
        stopwatchPauseButton.querySelector('svg').classList.remove('hidden');
        stopwatchPauseButton.querySelector('svg + svg').classList.add('hidden');
        startStopwatch();

        //Enable checkpoint button on pause
        stopwatchCheckpointButton.disabled = false;
        stopwatchCheckpointButton.classList.remove('opacity-50');
        stopwatchCheckpointButton.classList.add('hover:scale-90');
    }
}

function resetStopwatch() {
    // Reset stopwatch display
    clearInterval(stopwatchIntervalID);
    stopwatchStartTime = null;
    stopwatchPauseTime = null;
    isStopwatchPaused = 0;
    stopwatchPauseDuration = 0;
    stopwatchHourDisplay.innerText = '00:00:00';
    stopwatchMillisecDisplay.innerText = '.00';

    // Remove all checkpoints
    stopwatchCheckpointList.classList.remove('opacity-100');
    stopwatchCheckpointList.classList.add('opacity-0');  
    
    // Fade out effect, after 0.5s the transition is done & set display:none
    setTimeout(() => { stopwatchCheckpointList.classList.add('hidden'); 
    stopwatchCheckpointList.classList.remove('flex');
    stopwatchCheckpointList.replaceChildren(); }, fadeAnimationLength);
     // Bring the stopwatch down again after removing checkpoints
    stopwatchContentDisplay.classList.add('translate-y-[var(--stopwatch-display-offset)]');
    stopwatchHourDisplay.classList.remove('translate-y-0');

    disableStopwatchButtons();
}

// Event Listeners
stopwatchStartButton.addEventListener('click', startStopwatch);
stopwatchPauseButton.addEventListener('click', toggleStopwatch);
stopwatchResetButton.addEventListener('click', resetStopwatch);
stopwatchCheckpointButton.addEventListener('click', addCheckpoint);