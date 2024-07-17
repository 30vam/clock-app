const dropdowns = document.getElementsByClassName('dropdown');

for (const dropdown of dropdowns) {
    const inputElement = dropdown.getElementsByTagName('input')[0];
    const optionBox = dropdown.getElementsByTagName('ul')[0];

    // When input is clicked on, .opened class will be toggled.
    inputElement.addEventListener('click', function () {
        dropdown.classList.toggle('opened');
    });

    // Change inputElement text when clicked inside the optionBox
    optionBox.addEventListener('click', function (e) {
        const selectedText = e.target.innerText;  // Find the text that was selected using event delegation
        inputElement.value = selectedText;  // Sets the value for <inout> html to selected option
        dropdown.classList.remove('opened');  // Close the optionBox
    });
}