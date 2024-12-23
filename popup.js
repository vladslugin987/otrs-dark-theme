document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentTab = tabs[0];
        if (currentTab.url && currentTab.url.includes("otrs")) {
            const toggleButton = document.getElementById('toggle-dark-theme');

            if (toggleButton) {
                chrome.storage.sync.get('darkThemeEnabled', function(data) {
                    const isDarkThemeEnabled = data.darkThemeEnabled || false; // Устанавливаем false как значение по умолчанию
                    updateButtonState(isDarkThemeEnabled);
                });

                toggleButton.addEventListener('click', function() {
                    chrome.storage.sync.get('darkThemeEnabled', function(data) {
                        const isDarkThemeEnabled = !data.darkThemeEnabled; // Переключаем состояние
                        chrome.storage.sync.set({'darkThemeEnabled': isDarkThemeEnabled}, function() {
                            updateButtonState(isDarkThemeEnabled);
                            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                                chrome.tabs.sendMessage(tabs[0].id, {
                                    action: 'toggleTheme',
                                    enable: isDarkThemeEnabled
                                });
                            });
                        });
                    });
                });

                function updateButtonState(isDarkThemeEnabled) {
                    if (isDarkThemeEnabled) {
                        toggleButton.textContent = 'The Dark Theme enabled';
                    } else {
                        toggleButton.textContent = 'The Dark Theme desabled';
                    }
                }
            } else {
                console.error('Toggle button not found!');
            }
        }
    });
});
