// Elements
const timePicker = document.querySelector('#time-picker');
const hourPicker = timePicker.querySelector('#hour-picker');
const minutePicker = timePicker.querySelector('#minute-picker');
const secondPicker = timePicker.querySelector('#second-picker');

function fillPicker(pickerElement, maxNum) {
    for (let index = 0; index <= maxNum; index++) {
        const newItem = document.createElement('li');
        newItem.innerText = `${ index > 9  ? index : '0' + index }`;
        newItem.classList.add('snap-start');

        pickerElement.append(newItem);
    }
}

// Fill time pickers with numbers
fillPicker(hourPicker, 24);
fillPicker(minutePicker, 60);
fillPicker(secondPicker, 60);

stopwatchHourDisplay.innerText = `${ hour > 9 ? hour : '0' + hour }:${ minute > 9 ? minute : '0' + minute }:${ second > 9 ? second : '0' + second }`;