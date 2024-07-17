const dropdowns = document.getElementsByClassName('dropdown');
const body = document.getElementsByTagName('body')[0];

// Change inputElement text when clicked inside the optionBox
const selectOption = (e, inputElement, dropdown) => {
    e.stopPropagation();
    const selectedElement = e.target;  // Find the element that was clicked on
    
    // First check if the user didn't accidentally click on an empty space in the optionBox element that wans't an option
    if (!selectedElement.classList.contains('optionbox')) {
        inputElement.value = selectedElement.innerText;  // Sets the value for <inout> html to selected option
        dropdown.classList.remove('opened');  // Close the optionBox
    }
};

for (const dropdown of dropdowns) {
    const inputElement = dropdown.getElementsByTagName('input')[0];
    const optionBox = dropdown.getElementsByTagName('ul')[0];

    // When input is clicked on, .opened class will be toggled.
    inputElement.addEventListener('click', function (e) {
        dropdown.classList.toggle('opened');
    });

    // Add the event listeners
    
    optionBox.addEventListener('click', (e) => selectOption(e, inputElement, dropdown));
}