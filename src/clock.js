// Elements
const timeDisplay = document.querySelector('#time');
const dateDisplay = document.querySelector('#date');
const timezoneDropdown = document.querySelector('#timezone-dropdown');
const timezoneInput = timezoneDropdown.querySelector('.dropdown-input');

const stopwatchDisplay = document.querySelector('#stopwatch-display').firstElementChild;
const stopwatchMillisecDisplay = document.querySelector('#stopwatch-display').lastElementChild;
const stopwatchStartButton = document.querySelector('#stopwatch-start-button');
const activatedStopwatchButtongroup = document.querySelector('#activated-stopwatch-buttongroup');
const stopwatchCheckpointButton = document.querySelector('#stopwatch-checkpoint-button');
const stopwatchPauseButton = document.querySelector('#stopwatch-pause-button');
const stopwatchResetButton = document.querySelector('stopwatch-reset-button');

// Variables
const timeFormat = 'HH:mm:ss';
const dateFormat = 'MMMM DD, YYYY';
const defaultTimezone = 'Asia/Tehran';
const timezones = moment.tz.names();
const timezoneMap = new Map(); // Key(left side) is dropdown timezone name, and value(right side) is the timezone name in MomentJS

let stopwatchIntervalID = null;
let stopwatchStartTime = null;
let stopwatchPauseTime = null;
let isStopwatchPaused = 0;
let stopwatchPauseDuration = 0;

function addTimezones() {
    const optionbox = timezoneDropdown.querySelector('.optionbox');  // Get the .optionbox object
    for (const timezone of timezones) {
        // Add each timezone to a map in a correct format
        const displayName = timezone.replace(/\//g, ' - ').replace(/_/g, " ");;  // Create the name that actually appears in the dropdown
        timezoneMap.set(displayName, timezone);
        
        // Create a new timezone option div and add it to dropdown
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.textContent = displayName;
        optionbox.append(optionDiv);
    }
}

function updateTime(timeOrDate = 'time') {
    // If the selector is empty, then chose the default timezone. Else find out what the timezone was called in MomentJS
    let timezone = timezoneInput.value;
    if (timezone === '')
        timezone = defaultTimezone;
    else 
        timezone = timezoneMap.get(timezone);

    // Update time or date depending on method arguments
    if (timeOrDate === 'time')
        timeDisplay.textContent = moment().tz(timezone).format(timeFormat);
    else if (timeOrDate === 'date')
        dateDisplay.textContent = moment().tz(timezone).format(dateFormat);
}

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
    
}

//Event Listeners
timezoneInput.addEventListener('input', () => { updateTime(); }); // Whenever a new dropdown item is selected in clock tab, update time
stopwatchStartButton.addEventListener('click', startStopwatch);
stopwatchPauseButton.addEventListener('click', toggleStopwatch);

//Startup
addTimezones();  // Adds the list of timezones to the dropdown in clock tab
updateTime();  // Sets clock at startup
updateTime('date');  // Sets date at startup
setInterval(updateTime, 1000);  // Update time every 1000ms
