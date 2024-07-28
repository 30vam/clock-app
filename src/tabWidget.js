const tabWidgets = document.querySelectorAll('.tabwidget');

// For all .tabwidget objects
for (const tabWidget of tabWidgets) {
    const tabWidgetNav = tabWidget.children.querySelector('.tabwidget-nav');
    const tabWidgetTabs = tabWidgetNav.children;  // List of all tabs
    const tabWidgetContent = tabWidget.children.querySelector('.tabwidget-content');
    const tabWidgetModules = tabWidgetContent.children;  // List of all modules

    const tabWidgetMap = new Map();

    // Create a map that binds tabs and modules
    for (i == 0; i < tabWidgetTabs.length; i++) {
        console.log(tabWidgetTabs.length)
    }

    // Disable all modules inside the tabWidget except the first one
}