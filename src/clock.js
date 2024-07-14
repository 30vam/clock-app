const timeDisplay = document.getElementById('time').childNodes[0];
const dateDisplay = document.getElementById('date');
let momentObj = moment();

const updateTime = function() {
    momentObj = moment();
    timeDisplay.nodeValue = momentObj.tz('America/Los_Angeles').format('HH:mm:ss');
};

const updateDate = function() {
    dateDisplay.innerText = momentObj.tz('America/Los_Angeles').format('MMMM DD, YYYY');
};

updateTime();
updateDate();

//Update time every 1000ms
setInterval(updateTime, 1000);