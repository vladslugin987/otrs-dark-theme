const darkThemePath = 'dark-theme.css';

document.addEventListener('DOMContentLoaded', function() {
    var iframes = document.querySelectorAll('iframe[id^="iframeid"]');
    iframes.forEach(function(iframe) {
        iframe.addEventListener('load', function() {
            var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
            innerDoc.body.style.textShadow = '0 0 black';
        });
    });
});


function enableDarkTheme() {
    const linkElement = document.createElement('link');
    // var iframe = document.getElementById('IframeId');
    // var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    // innerDoc.body.style.textShadow = '0 0 black'
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('type', 'text/css');
    linkElement.setAttribute('href', chrome.runtime.getURL(darkThemePath));
    linkElement.setAttribute('id', 'dark-theme-style'); // Установить ID для последующего поиска
    document.head.appendChild(linkElement);
}

function disableDarkTheme() {
    const existingLinkElement = document.getElementById('dark-theme-style');
    if (existingLinkElement) {
        existingLinkElement.parentNode.removeChild(existingLinkElement);
    }
}

chrome.storage.sync.get('darkThemeEnabled', function(data) {
    if (data.darkThemeEnabled) {
        enableDarkTheme();
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleTheme') {
        if (request.enable) {
            enableDarkTheme();
        } else {
            disableDarkTheme();
        }
    }
});
