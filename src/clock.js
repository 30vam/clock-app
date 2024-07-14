const timeDisplay = document.getElementById('time').childNodes[0];
const dateDisplay = document.getElementById('date');
const momentObj = moment();

function updateTime() {
    timeDisplay.nodeValue = momentObj.tz('America/Los_Angeles').format('HH:mm:ss');
};

function updateDate() {
    dateDisplay.innerText = momentObj.tz('America/Los_Angeles').format('MMMM DD, YYYY');
};

updateTime();
updateDate();