// Elements
const timePicker = document.querySelector('#time-picker');
const hourPicker = timePicker.querySelector('#hour-picker');
const minutePicker = timePicker.querySelector('#minute-picker');
const secondPicker = timePicker.querySelector('#second-picker');

function fillPicker(pickerElement, maxNum) {
    for (let index = 0; index <= maxNum; index++) {
        const newItem = document.createElement('li');
        newItem.innerText = `${ index > 9  ? index : '0' + index }`;
        newItem.classList.add('snap-center');

        pickerElement.append(newItem);
    }

       // Up Arrow
       const upArrow = document.createElement('button');
       upArrow.classList.add('h-[12px]', 'w-full','bg-no-repeat', 'bg-center');
       upArrow.style.backgroundImage = `url("data:image/svg+xml,%3Csvg fill='%23000000' height='20px' width='20px' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 330 330' xml:space='preserve'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath id='XMLID_224_' d='M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394 l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393 C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`;
       pickerElement.parentNode.prepend(upArrow);

       // Down Arrow
       const downArrow = document.createElement('button');
       downArrow.classList.add('h-[32px]', 'w-full','bg-no-repeat', 'bg-center');
       downArrow.style.backgroundImage = `url("data:image/svg+xml,%3Csvg fill='%23000000' height='20px' width='20px' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 330 330' xml:space='preserve'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath id='XMLID_224_' d='M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394 l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393 C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`;
       downArrow.style.transform = 'rotate(180deg)';
       pickerElement.parentNode.append(downArrow);
}

// Fill time pickers with numbers
fillPicker(hourPicker, 24);
fillPicker(minutePicker, 60);
fillPicker(secondPicker, 60);