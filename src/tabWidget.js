const tabWidgets = document.querySelectorAll('.tabwidget');

// For all .tabwidget objects
for (const tabWidget of tabWidgets) {
    const tabWidgetNav = tabWidget.querySelector('.tabwidget-nav');
    const tabWidgetTabs = tabWidgetNav.children;  // List of all tabs
    const tabWidgetContent = tabWidget.querySelector('.tabwidget-content');
    const tabWidgetModules = tabWidgetContent.children;  // List of all modules

    // Global variables
    const tabWidgetMap = new Map();

    // Create a map that binds tabs and modules
    for (let i = 0; i < tabWidgetTabs.length; i++) {
        const currentTab = tabWidgetTabs[i];
        const currentModule = tabWidgetModules[i];

        currentModule.style.display = 'none';  // At first, disable all modules inside the tabWidget
        tabWidgetMap.set(currentTab, currentModule);
    }

    // Only make the first module visible at first (First value is selected using spread...)
    [...tabWidgetMap][0][1].style.display = '';  // '' makes the display to return to whatever it was normally (For example flexbox in this case instead of block)
}