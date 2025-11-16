// src/components/features/ShareToolBar.jsx
function ShareToolBar() { // Переименовано: с заглавной буквы
  return (
    <div className="share-tool-bar" role="toolbar" aria-label="Инструменты для обмена ссылкой">
      <button type="button" className="share-tool-bar__btn" id="copy-btn">
        <img src="/images/copy.svg" alt="Копировать ссылку" />
      </button>
      <button type="button" className="share-tool-bar__btn" id="vk-btn">
        <img src="/images/vk.svg" alt="Поделиться в ВКонтакте" />
      </button>
      <button type="button" className="share-tool-bar__btn" id="telegram-btn">
        <img src="/images/telegram.svg" alt="Отправить в Telegram" />
      </button>
      <button type="button" className="share-tool-bar__btn" id="whatsapp-btn">
        <img src="/images/whatsapp.svg" alt="Отправить в WhatsApp" />
      </button>
      <button type="button" className="share-tool-bar__btn" id="facebook-btn">
        <img src="/images/facebook.svg" alt="Поделиться на Facebook" />
      </button>
    </div>
  );
}

export default ShareToolBar; // Переименовано: с заглавной буквы