chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "delete_game") {
        const appId = message.appId;

        // Формируем URL для удаления игры
        const deleteUrl = `https://help.steampowered.com/en/wizard/HelpWithGameIssue/?appid=${appId}&issueid=123`;

        // Открываем вкладку с подтверждением удаления
        chrome.tabs.create({ url: deleteUrl }, (tab) => {
            console.log(`Открыта вкладка для удаления игры с ID ${appId}`);
        });

        sendResponse({ success: true });
    }
});
