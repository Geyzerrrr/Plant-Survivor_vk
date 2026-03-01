// vk-bridge-fix.js
// Общие функции для VK Mini Apps

(function() {
    // Инициализация VK Bridge
    try {
        if (typeof vkBridge !== 'undefined') {
            vkBridge.send('VKWebAppInit');
            console.log('✅ VK Mini App инициализирован');
        }
    } catch (e) {
        console.log('ℹ️ Не в VK окружении');
    }

    // Функция для получения параметров запуска
    window.getVKLaunchParams = function() {
        try {
            if (typeof vkBridge !== 'undefined') {
                return vkBridge.getLaunchParams();
            }
        } catch (e) {}
        return null;
    };

    // Функция для показа кнопки назад
    window.showVKBackButton = function(buttonId = 'vk-back-button') {
        const backButton = document.getElementById(buttonId);
        if (!backButton) return;
        
        try {
            if (typeof vkBridge !== 'undefined' && window.location !== window.parent.location) {
                backButton.style.display = 'flex';
                
                backButton.addEventListener('click', function() {
                    vkBridge.send('VKWebAppClose', { status: 'success' });
                });
            }
        } catch (e) {
            console.log('Не удалось показать кнопку назад');
        }
    };

    // Функция для шеринга через VK
    window.vkShare = function(options) {
        const { text, link, title } = options;
        
        try {
            if (typeof vkBridge !== 'undefined') {
                vkBridge.send('VKWebAppShowShareBox', {
                    text: text,
                    link: link
                }).catch(() => {
                    // Fallback на обычный шеринг
                    const shareUrl = `https://vk.com/share.php?url=${encodeURIComponent(link)}&title=${encodeURIComponent(title || '')}&description=${encodeURIComponent(text)}&noparse=true`;
                    window.open(shareUrl, '_blank', 'width=600,height=500');
                });
            } else {
                const shareUrl = `https://vk.com/share.php?url=${encodeURIComponent(link)}&title=${encodeURIComponent(title || '')}&description=${encodeURIComponent(text)}&noparse=true`;
                window.open(shareUrl, '_blank', 'width=600,height=500');
            }
        } catch (e) {
            console.error('Ошибка шеринга:', e);
        }
    };
})();
