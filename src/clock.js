// Elements
const timeDisplay = document.querySelector('#time');
const dateDisplay = document.querySelector('#date');
const timezoneDropdown = document.querySelector('#timezone-dropdown');
const timezoneInput = timezoneDropdown.querySelector('.dropdown-input');

// Variables
const timeFormat = 'HH:mm:ss';
const dateFormat = 'MMMM DD, YYYY';
const defaultTimezone = 'Asia/Tehran';
const timezones = moment.tz.names();
const timezoneMap = new Map(); // Key(left side) is dropdown timezone name, and value(right side) is the timezone name in MomentJS

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

//Event Listeners
timezoneInput.addEventListener('input', () => { updateTime(); }); // Whenever a new dropdown item is selected in clock tab, update time

//Startup
addTimezones();  // Adds the list of timezones to the dropdown in clock tab
updateTime();  // Sets clock at startup
updateTime('date');  // Sets date at startup
setInterval(updateTime, 1000);  // Update time every 1000ms
