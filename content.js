function addDeleteButtons() {
  // Находим все элементы с ссылками на приложения
  const focusableElements = document.querySelectorAll("[data-featuretarget='gameslist-root'] .Focusable");

  focusableElements.forEach((element) => {
    // Находим ссылку внутри элемента
    const linkElement = element.querySelector("a[href*='/app/']");
    if (!linkElement) return;

    // Извлекаем ID приложения из ссылки
    const appIdMatch = linkElement.href.match(/\/app\/(\d+)/);
    const appId = appIdMatch ? appIdMatch[1] : null;
    if (!appId) return;

    // Проверяем, добавлена ли уже кнопка
    if (element.querySelector(".delete-game-btn")) return;

    // Создаем кнопку "Удалить игру"
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.className = "delete-game-btn";
    deleteButton.style.cssText = `
      background-color: red;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      margin-left: 10px;
    `;

    // Добавляем обработчик клика на кнопку
    deleteButton.addEventListener("click", () => {
      if (confirm(`Вы уверены, что хотите удалить игру с ID ${appId}?`)) {
        // Отправляем сообщение в бэкграунд для обработки удаления
        chrome.runtime.sendMessage({ action: "delete_game", appId });
      }
    });

    // Находим контейнер, в который добавляем кнопку
    const buttonContainer = element.querySelector("div:nth-of-type(3)") || element;
    buttonContainer.appendChild(deleteButton);
  });
}

function monitorContent() {
  const container = document.querySelector('[data-featuretarget="gameslist-root"]'); // Контейнер с играми
  if (container) {
    console.log("Контейнер найден, добавляем кнопки...");
    addDeleteButtons();
  } else {
    console.log("Контейнер не найден, продолжаем искать...");
  }
}

// Проверяем контент каждые 500 мс
const interval = setInterval(() => {
  monitorContent();
}, 500);
