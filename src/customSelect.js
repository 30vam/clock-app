const dropdowns = document.getElementsByClassName('dropdown');
const body = document.getElementsByTagName('body')[0];

const searchBarID = 'dropdown-search'

// Toggle optionbox when clicking on input
function toggleDropdown (e, dropdown) {
    e.stopPropagation();  // Stop event bubbling so body isn't clicked on for closedDropdownFromOutside function
    dropdown.classList.toggle('opened'); 
}

// Change inputElement text when clicked inside the optionBox
function selectOption(e, inputElement, dropdown) {
    e.stopPropagation();
    const selectedElement = e.target; // Find the element that was clicked on

    // First check if the user didn't accidentally click on an empty space in the optionBox or the search bar
    if (selectedElement.classList.contains('option')) {
        inputElement.value = selectedElement.innerText; // Sets the value for <inout> html to selected option
        dropdown.classList.remove('opened'); // Close the optionBox
    }
}

// Close optionbox when anywhere othe than optionbox is clicked
function closedDropdownFromOutside(e, dropdown) {
    const clickedObj = e.target;
    if (dropdown.classList.contains('opened'))
        dropdown.classList.remove('opened');  // Remove .opened if dropdown was already open, no need to check if searchbar was clicked, because event propagation stops from clicking on body
}

for (const dropdown of dropdowns) {
    const inputElement = dropdown.getElementsByTagName('input')[0];
    const optionBox = dropdown.getElementsByTagName('ul')[0];

    // Adding event listeners
    // When input is clicked on, .opened class will be toggled.
    inputElement.addEventListener('focus', function() { this.blur(); });  // This line disables user text highlighting/selection in <input> field
    inputElement.addEventListener('click', e => toggleDropdown(e, dropdown));
    optionBox.addEventListener('click', e => selectOption(e, inputElement, dropdown));
    body.addEventListener('click', e => closedDropdownFromOutside(e, dropdown));
}