const timeDisplay = document.getElementById('time').childNodes[0];
const dateDisplay = document.getElementById('date');
let now = null;

const updateTime = function() {
    now = moment();
    timeDisplay.nodeValue = now.tz('America/Los_Angeles').format('HH:mm:ss');
};

const updateDate = function() {
    dateDisplay.innerText = now.tz('America/Los_Angeles').format('MMMM DD, YYYY');
};

const addTimezones = function() {}

updateTime();
updateDate();

//Update time every 1000ms
setInterval(updateTime, 1000);