// Elements
const timeDisplay = document.querySelector('#time');
const dateDisplay = document.querySelector('#date');
const timezoneDropdown = document.querySelector('#timezone-dropdown');
const timezoneInput = timezoneDropdown.querySelector('.dropdown-input');

const stopwatchDisplay = document.querySelector('#stopwatch-display');
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
let stopwatchInterval = null;

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

function startStopwatch() {
    // Fade & disable the start button
    console.log('STOPWATCH STARTED');
    stopwatchStartButton.style.opacity = 0;
    stopwatchStartButton.disabled = true;

    //Enable other buttons after opacity transition has ended:
    setTimeout(() => { stopwatchStartButton.style.display = 'none';
    activatedStopwatchButtongroup.style.display = '';
    activatedStopwatchButtongroup.style.opacity = 100; }, 150);
    
    // Start the stopwatch
    const startingTime = new Date();
    stopwatchInterval = setInterval(() => updateStopwatch(startingTime), 10);
}

function updateStopwatch(startingTime) {
    // Calculate the passed time since stopwatch started
    const currentTime = new Date();
    const timeElapsed = new Date(currentTime - startingTime);
    const hour = timeElapsed.getUTCHours();
    const minute = timeElapsed.getUTCMinutes();
    const second = timeElapsed.getUTCSeconds();
    const millisecond = timeElapsed.getUTCMilliseconds();

    stopwatchDisplay.innerText = `${ hour > 9 ? hour : '0' + hour }:${ minute > 9 ? minute : '0' + minute }:${ second > 9 ? second : '0' + second }.${ millisecond > 9 ? millisecond : '0' + millisecond }`;
}

//Event Listeners
timezoneInput.addEventListener('input', () => { updateTime(); }); // Whenever a new dropdown item is selected, update time
stopwatchStartButton.addEventListener('click', startStopwatch);

//Startup
addTimezones();
updateTime();
updateTime('date');
setInterval(updateTime, 1000);  // Update time every 1000ms

activatedStopwatchButtongroup.style.display = 'none';