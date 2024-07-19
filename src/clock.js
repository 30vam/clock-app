// Elements
const timeDisplay = document.querySelector('#time');
const dateDisplay = document.querySelector('#date');
const timezoneDropdown = document.querySelector('#timezone-dropdown');
const timezoneInput = timezoneDropdown.querySelector('.dropdown-input');

// Variables
const timeFormat = 'HH:mm:ss';
const dateFormat = 'MMMM DD, YYYY';
let now = null;
const timezones = moment.tz.names();
const timezoneMap = new Map(); // Key(left side) is moment timezone name, and value(right side) is an the function: now.tz(name)

function addTimezones() {
    const optionbox = timezoneDropdown.querySelector('.optionbox');  // Get the .optionbox object
    for (const timezone of timezones) {
        // Add each timezone to a map in a correct format
        const optionName = timezone.replace(/\//g, ' - ').replace(/_/g, " ");;  // Create the name that actually appears in the dropdown
        timezoneMap.set(optionName, () => { now.tz(timezone) });
        
        // Create a new timezone option div and add it to dropdown
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.textContent = optionName;
        optionbox.append(optionDiv);
    }
}

function updateTime() {
    now = moment();
    timeDisplay.textContent = now.tz('America/Los_Angeles').format(timeFormat);
}

function updateDate() {
    dateDisplay.textContent = now.tz('America/Los_Angeles').format(dateFormat);
}

selectedTimezone = timezoneInput.value;
console.log(selectedTimezone);
addTimezones();
updateTime('Asia/Tehran');
updateDate('Asia/Tehran');
//Add dropdown event listener here
setInterval(updateTime, 1000);  // Update time every 1000ms