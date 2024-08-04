/* 
   modules are the content shown when their related tab is selected.
   .tabwidget-content is a container that wraps ALL modules
   .tabwidget-nav is a container for .tabwidget-tab
   tabwidget-tab-active class is for the tab that is currently selected 
*/

const tabWidgets = document.querySelectorAll('.tabwidget');
const activeTabClassName = 'tabwidget-tab-active';
const defaultTabIndex = 1;

function switchTab(e, currentTab, tabWidgetMap) {
    const newTab = e.target;
    e.stopPropagation();

    // First, check if the tab was active or not
    if (newTab === currentTab) 
        return;
    
    // Add active class to the newly selected tab and remove it from previous tab
    currentTab.classList.remove(activeTabClassName);
    newTab.classList.add(activeTabClassName);
        
    // Hide the currently visible module in tabwidget & make the new content for the selected tab visible
    const currentModule = tabWidgetMap.get(currentTab);
    const newModule = tabWidgetMap.get(newTab);
    currentModule.style.display = 'none';
    newModule.style.display = '';    
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

        tabWidgetMap.set(tab, module);  // Add the tab and its module to the map AND also its display value : tab, [module, display]
        module.style.display = 'none';  // At first, disable all modules inside the tabWidget & make them invisible

        // Event Listener for when user clicks on a tab
        tab.addEventListener('click', e => switchTab(e, tabWidgetNav.getElementsByClassName(activeTabClassName)[0], tabWidgetMap));  
    }

    // Select the first tab as default when page loads
    [...tabWidgetMap][defaultTabIndex][0].classList.add(activeTabClassName);  // Mark the first tab as active
    [...tabWidgetMap][defaultTabIndex][1].style.display = '';  // '' makes the display to return to whatever it was normally (For example flexbox in this case instead of block)
}