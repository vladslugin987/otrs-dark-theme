// Путь к вашему файлу стилей темной темы
const darkThemePath = 'dark-theme.css';

document.addEventListener('DOMContentLoaded', function() {
    // Получаем все элементы iframe, чьи id начинаются с "iframeid"
    var iframes = document.querySelectorAll('iframe[id^="iframeid"]');

    // Проходимся по каждому iframe и изменяем text-shadow в его body
    iframes.forEach(function(iframe) {
        // Добавляем обработчик события 'load' для каждого iframe
        iframe.addEventListener('load', function() {
            var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
            innerDoc.body.style.textShadow = '0 0 black';
        });
    });
});


// Функция для добавления тёмной темы
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

// Функция для удаления тёмной темы
function disableDarkTheme() {
    const existingLinkElement = document.getElementById('dark-theme-style');
    if (existingLinkElement) {
        existingLinkElement.parentNode.removeChild(existingLinkElement);
    }
}

// Проверяем сохранённое состояние темы при загрузке страницы
chrome.storage.sync.get('darkThemeEnabled', function(data) {
    if (data.darkThemeEnabled) {
        enableDarkTheme();
    }
});

// Слушатель для сообщений от всплывающего окна или других компонентов расширения
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleTheme') {
        if (request.enable) {
            enableDarkTheme();
        } else {
            disableDarkTheme();
        }
    }
});
