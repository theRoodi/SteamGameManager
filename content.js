function addDeleteButtons() {
    const focusableElements = document.querySelectorAll(".Focusable");
  
    focusableElements.forEach((element) => {
      const linkElement = element.querySelector("a[href*='/app/']");
      if (!linkElement) return;
  
      const appIdMatch = linkElement.href.match(/\/app\/(\d+)/);
      const appId = appIdMatch ? appIdMatch[1] : null;
      if (!appId) return;
  
      if (element.querySelector(".delete-game-btn")) return;
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌ Удалить игру";
      deleteButton.className = "delete-game-btn";
      deleteButton.style.cssText = `
        background-color: red;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        margin-left: 10px;
      `;
  
      deleteButton.addEventListener("click", () => {
        if (confirm(`Вы уверены, что хотите удалить игру с ID ${appId}?`)) {
          chrome.runtime.sendMessage({ action: "delete_game", appId });
        }
      });
  
      element.appendChild(deleteButton);
    });
  }
  
  function monitorContent() {
    const container = document.querySelector('[data-featuretarget="gameslist-root"]'); // Контейнер, где хранятся игры
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
  