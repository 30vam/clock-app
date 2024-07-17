const dropdowns = document.getElementsByClassName('dropdown');
const body = document.getElementsByTagName('body')[0];

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

// New search results after search input text has been changed
function updateSearchResults(e, dropdownSearch, optionbox) {
    console.log(dropdownSearch.value);
}

for (const dropdown of dropdowns) {
    const inputElement = dropdown.getElementsByClassName('dropdown-input')[0];
    const optionBox = dropdown.getElementsByClassName('optionbox')[0];

    // Add search bar if necessary
    if (dropdown.classList.contains('enable-dropdown-search')) {
        const dropdownSearch = document.createElement('input');  // Create the search bar as an input element
        dropdownSearch.setAttribute('type', 'text');
        dropdownSearch.placeholder = "Search...";  // Set the placeholder text for the search bar
        dropdownSearch.classList.add('dropdown-search');  // Give a class to the search bar, used for its CSS stylings
        dropdownSearch.addEventListener('input', e => updateSearchResults(e, dropdownSearch,optionBox));
        optionBox.prepend(dropdownSearch);  // Add the search bar as the first child of .optionbox
    }
    // Adding event listeners
    // When input is clicked on, .opened class will be toggled.
    inputElement.addEventListener('focus', function() { this.blur(); });  // This line disables user text highlighting/selection in <input> field
    inputElement.addEventListener('click', e => toggleDropdown(e, dropdown));
    optionBox.addEventListener('click', e => selectOption(e, inputElement, dropdown));
    body.addEventListener('click', e => closedDropdownFromOutside(e, dropdown));
}