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
        tabWidgetMap.set(tabWidgetTabs[i], tabWidgetModules[i]);
    }
    console.log(tabWidgetMap);

    // Disable all modules inside the tabWidget except the first one
}