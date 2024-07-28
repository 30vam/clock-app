/* tabwidget-tab-active class is for the tab that is currently selected */

const tabWidgets = document.querySelectorAll('.tabwidget');

const activeTabClassName = 'tabwidget-tab-active';

function switchTab(e, currentTab, tabWidgetMap) {
    const newTab = e.target;
    e.stopPropagation();

    console.log(currentTab);
    // First, check if the tab was active or not
    if (newTab === currentTab) {
        console.log('TAB ALREAD SELECTED');
    } else {
        //add active class
        //const newModule;

        currentTab.classList.remove(activeTabClassName);
        newTab.classList.add(activeTabClassName);
        console.log('NEW TAB SELECTED');
    }
}

// For all .tabwidget objects
for (const tabWidget of tabWidgets) {
    const tabWidgetNav = tabWidget.querySelector('.tabwidget-nav');
    const tabWidgetTabs = tabWidgetNav.children;  // List of all tab headers
    const tabWidgetContent = tabWidget.querySelector('.tabwidget-content');
    const tabWidgetModules = tabWidgetContent.children;  // List of all modules
    const tabWidgetMap = new Map();

    // Create a map that binds tabs and modules
    for (let i = 0; i < tabWidgetTabs.length; i++) {
        const tab = tabWidgetTabs[i];
        const module = tabWidgetModules[i];

        module.style.display = 'none';  // At first, disable all modules inside the tabWidget & make them invisible
        tabWidgetMap.set(tab, module);  // Add the tab and its module to the map

        // Event Listener for when user clicks on a tab
        tab.addEventListener('click', e => switchTab(e, tabWidgetNav.getElementsByClassName(activeTabClassName)[0], tabWidgetMap));  
    }

    // Select the first tab when page loads
    [...tabWidgetMap][0][0].classList.add(activeTabClassName);  // Mark the first tab as active
    [...tabWidgetMap][0][1].style.display = '';  // '' makes the display to return to whatever it was normally (For example flexbox in this case instead of block)
}