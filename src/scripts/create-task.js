let expandedTask = null;
let bottomSheet = null;
let bottomLine = null;
let copyElmBtn = null;
let vkElmBtn = null;
let tgElmBtn = null;
let whatsapElmBtn = null;
let facebookElmBtn = null;
let shareToolBar = null;
let centerWidget = null;
let deleteForm = null;
let deleteFormActionAccept = null;
let deleteFormActionReject = null;
// --- Новые переменные для формы редактирования ---
let editTaskForm = null;
let editTitleInput = null;
let editContentInput = null;
let editFormCancelBtn = null;
let editFormSaveBtn = null;
// ---------------------------------------------------

let choosenTaskItem = null;

const TASK_STATE = {
    NONE: 'none',
    DELETING: 'deleting',
    SHARING: 'sharing',
    EDITING: 'editing',
    INFO: 'info'
};

let currentTaskState = TASK_STATE.NONE;

// --- Новая функция для генерации уникального ID ---
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}
// -----------------------------------------------

function getCurrentTaskState() {
    return currentTaskState;
}
function setCurrentTaskState(state) {
    currentTaskState = state;
    switch (state) {
        case TASK_STATE.NONE:
            choosenTaskItem = null;
            // Сброс выбранной задачи при возврате в состояние NONE
            choosenTaskItem = null;
    }
}

function resetCenterWidget() {
    // Скрываем все элементы центрального виджета
    Array.from(centerWidget.children).forEach(child => {
        child.style.display = "none";
    });
}

// --- Функции управления видимостью ---
function showDeleteForm() {
    resetCenterWidget();
    bottomSheet.style.display = "flex";
    centerWidget.style.display = "block";
    deleteForm.style.display = "block";
    // Скрываем другие формы
    bottomLine.style.display = "none";
    editTaskForm.style.display = "none";
}

function showShareForm() {
    resetCenterWidget(); // Сбрасываем центральный виджет (если был активен delete)
    bottomSheet.style.display = "flex";
    bottomLine.style.display = "flex"; // Показываем нижнюю строку
    // Скрываем другие формы
    centerWidget.style.display = "none";
    editTaskForm.style.display = "none";
}

// --- Новая функция для показа формы редактирования ---
function showEditForm() {
    resetCenterWidget(); // Сбрасываем центральный виджет (если был активен delete)
    bottomSheet.style.display = "flex";
    editTaskForm.style.display = "flex"; // Показываем форму редактирования
    // Скрываем другие формы
    bottomLine.style.display = "none";
    centerWidget.style.display = "none";
}
// -------------------------------------

function deleteTask(item) {
    console.log("delete task");
    choosenTaskItem = item;
    setCurrentTaskState(TASK_STATE.DELETING); // Установить состояние перед показом
    showDeleteForm();
}

function shareTask(item) {
    console.log("share task");
    choosenTaskItem = item;
    setCurrentTaskState(TASK_STATE.SHARING);
    showShareForm();
}

function editTask(item) {
    console.log("edit task");
    choosenTaskItem = item;
    setCurrentTaskState(TASK_STATE.EDITING); // Установить состояние перед показом

    // Заполняем поля формы текущими значениями задачи
    const titleElement = item.querySelector('.task-title');
    const contentElement = item.querySelector('.task-content');
    editTitleInput.value = titleElement ? titleElement.textContent : '';
    editContentInput.value = contentElement ? contentElement.textContent : '';

    showEditForm();
}

function infoTask(item) {
    console.log("info task");
    choosenTaskItem = item;
    setCurrentTaskState(TASK_STATE.INFO);
    // Для простоты, info пока просто выводит в консоль
    // Можно реализовать отображение деталей задачи
    console.log("Details for:", item.querySelector('.task-title').textContent);
    // Пока просто сбрасываем состояние
    setCurrentTaskState(TASK_STATE.NONE);
}

function hideBottomSheet() {
    bottomSheet.style.display = "none";
    // Также сбрасываем состояние при скрытии
    setCurrentTaskState(TASK_STATE.NONE);
}
function handleAcceptRemoveTaskClick() {
    if (choosenTaskItem) {
        // --- Удаляем задачу из localStorage ---
        const taskId = choosenTaskItem.dataset.taskId;
        if (taskId) {
            removeFromLocalStorage(taskId);
        }
        choosenTaskItem.remove();
        choosenTaskItem = null; // Сбрасываем ссылку на удаленную задачу
    }
    setCurrentTaskState(TASK_STATE.NONE);
    resetCenterWidget();
    hideBottomSheet();
}

function handleRejectRemoveTaskClick() {
    setCurrentTaskState(TASK_STATE.NONE);
    resetCenterWidget();
    hideBottomSheet();
}

// --- Новые функции для формы редактирования ---
function handleEditFormCancel() {
    setCurrentTaskState(TASK_STATE.NONE);
    resetCenterWidget();
    hideBottomSheet();
}

function handleEditFormSave() {
    if (choosenTaskItem) {
        const newTitle = editTitleInput.value.trim();
        const newContent = editContentInput.value.trim();

        if (!newTitle) {
            alert('Введите название задачи');
            return;
        }

        // Обновляем элементы задачи
        const titleElement = choosenTaskItem.querySelector('.task-title');
        const contentElement = choosenTaskItem.querySelector('.task-content');

        if (titleElement) titleElement.textContent = newTitle;
        if (contentElement) contentElement.textContent = newContent || '—';

        // --- Сохраняем обновленную задачу в localStorage ---
        const taskId = choosenTaskItem.dataset.taskId;
        if (taskId) {
            updateTaskInLocalStorage(taskId, newTitle, newContent);
        }
    }
    setCurrentTaskState(TASK_STATE.NONE);
    resetCenterWidget();
    hideBottomSheet();
}
// ---------------------------------------------

function handleCopy() {
    console.log("copy click");
    // Логика копирования
    if (choosenTaskItem) {
        const title = choosenTaskItem.querySelector('.task-title').textContent;
        const content = choosenTaskItem.querySelector('.task-content').textContent;
        const textToCopy = `${title}\n${content}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            console.log('Текст скопирован в буфер обмена');
             // Сбрасываем состояние и скрывает панель после копирования
            setCurrentTaskState(TASK_STATE.NONE);
            hideBottomSheet();
        }).catch(err => {
            console.error('Ошибка при копировании: ', err);
        });
    }
    return;
}

function handleVK() {
    console.log("vk click");
    // Логика шаринга в VK
    setCurrentTaskState(TASK_STATE.NONE);
    hideBottomSheet();
    return;
}

function handleTG() {
    console.log("tg click");
    // Логика шаринга в Telegram
    setCurrentTaskState(TASK_STATE.NONE);
    hideBottomSheet();
    return;
}

function handleWhatsap() {
    console.log("whatsap click");
    // Логика шаринга в WhatsApp
    setCurrentTaskState(TASK_STATE.NONE);
    hideBottomSheet();
    return;
}

function handleFacebook() {
    console.log("facebook click");
    // Логика шаринга в Facebook
    setCurrentTaskState(TASK_STATE.NONE);
    hideBottomSheet();
    return;
}

// --- Функции для работы с localStorage ---
const TASKS_STORAGE_KEY = 'todo_tasks';

function loadTasksFromLocalStorage() {
    try {
        const tasksJson = localStorage.getItem(TASKS_STORAGE_KEY);
        if (tasksJson) {
            return JSON.parse(tasksJson);
        }
    } catch (e) {
        console.error('Ошибка при загрузке задач из localStorage:', e);
        return [];
    }
    return [];
}

function saveTasksToLocalStorage(tasks) {
    try {
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
        console.error('Ошибка при сохранении задач в localStorage:', e);
    }
}

function addTaskToLocalStorage(id, title, content) {
    const tasks = loadTasksFromLocalStorage();
    tasks.push({ id, title, content });
    saveTasksToLocalStorage(tasks);
}

function updateTaskInLocalStorage(id, newTitle, newContent) {
    const tasks = loadTasksFromLocalStorage();
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].title = newTitle;
        tasks[taskIndex].content = newContent;
        saveTasksToLocalStorage(tasks);
    }
}

function removeFromLocalStorage(id) {
    const tasks = loadTasksFromLocalStorage();
    const filteredTasks = tasks.filter(task => task.id !== id);
    saveTasksToLocalStorage(filteredTasks);
}
// -----------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById('Title');
    const contentInput = document.getElementById('Content');
    const addButton = document.querySelector('.button-create');
    const taskList = document.querySelector('.list-view-tasks');

    bottomSheet = document.querySelector(".bottom-sheet");
    copyElmBtn = document.getElementById("copy-btn");
    vkElmBtn = document.getElementById("vk-btn");
    telegramElmBtn = document.getElementById("telegram-btn");
    whatsapElmBtn = document.getElementById("whatsap-btn");
    facebookElmBtn = document.getElementById("facebook-btn");
    bottomLine = document.querySelector(".bottom-line");
    deleteFormActionAccept = document.getElementById("delete-form-action-accept");
    deleteFormActionReject = document.getElementById("delete-form-action-reject");
    centerWidget = document.querySelector(".center-widget");
    deleteForm = document.querySelector(".delete-form");
    shareToolBar = document.querySelector(".share-tool-bar");

    // --- Элементы формы редактирования ---
    editTaskForm = document.querySelector(".edit-task-form");
    editTitleInput = document.getElementById("EditTitle");
    editContentInput = document.getElementById("EditContent");
    editFormCancelBtn = document.getElementById("edit-task-form-cancel");
    editFormSaveBtn = document.getElementById("edit-task-form-save");
    // ---------------------------------------

    deleteFormActionAccept.addEventListener('click', handleAcceptRemoveTaskClick);
    deleteFormActionReject.addEventListener('click', handleRejectRemoveTaskClick);

    // --- Слушатели для формы редактирования ---
    editFormCancelBtn.addEventListener('click', handleEditFormCancel);
    editFormSaveBtn.addEventListener('click', handleEditFormSave);
    // -----------------------------------------

    resetCenterWidget();
    hideBottomSheet(); // Инициализируем скрытие bottom-sheet

    // --- Загружаем задачи из localStorage при загрузке ---
    const savedTasks = loadTasksFromLocalStorage();
    savedTasks.forEach(taskData => {
        renderTask(taskData.id, taskData.title, taskData.content);
    });
    // ----------------------------------------------------


    function addTask() {
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();

        if (!title) {
            alert('Введите название задачи');
            return;
        }

        // --- Генерируем уникальный ID для новой задачи ---
        const taskId = generateId();
        // ------------------------------------------------

        // --- Сохраняем задачу в localStorage ---
        addTaskToLocalStorage(taskId, title, content);
        // ----------------------------------------

        // --- Вызываем функцию для создания DOM-элемента ---
        renderTask(taskId, title, content);
        // --------------------------------------------------

        titleInput.value = '';
        contentInput.value = '';
        titleInput.focus();
    }

    // --- Функция для создания DOM-элемента задачи ---
    function renderTask(id, title, content) {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        // --- Присваиваем ID задачи как data-атрибут ---
        taskItem.dataset.taskId = id;
        // ----------------------------------------------

        const taskInfo = document.createElement('info');
        taskInfo.classList.add('task-info');

        const taskTitle = document.createElement('div');
        taskTitle.classList.add('task-title');
        taskTitle.textContent = title;

        const taskContent = document.createElement('div');
        taskContent.classList.add('task-content');
        taskContent.textContent = content || '—';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('task-delete-button');

        taskInfo.appendChild(taskTitle);
        taskInfo.appendChild(taskContent);
        taskInfo.appendChild(deleteButton);

        taskItem.appendChild(taskInfo);
        taskList.prepend(taskItem);

        taskItem.addEventListener('click', (e) => {
            // Проверяем, не был ли клик по кнопке внутри задачи
            if (!e.target.classList.contains('task-delete-button') &&
                !e.target.classList.contains('task-toolbar-item') &&
                !e.target.classList.contains('task-toolbar-item img')) {
                expandTask(taskItem);
            }
        });

        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Останавливаем всплытие, чтобы не вызвать expandTask
            deleteTask(taskItem);
        });
    }
    // -----------------------------------------------

    addButton.addEventListener('click', addTask);

    titleInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    contentInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    copyElmBtn.addEventListener('click', handleCopy);
    vkElmBtn.addEventListener('click', handleVK);
    telegramElmBtn.addEventListener('click', handleTG);
    whatsapElmBtn.addEventListener('click', handleWhatsap);
    facebookElmBtn.addEventListener('click', handleFacebook);
});

document.addEventListener('click', (e) => {
    if (expandedTask && expandedTask.contains(e.target)) {
        return;
    }

    const state = getCurrentTaskState();
    switch (state) {
        case TASK_STATE.NONE:
            if (expandedTask) {
                removeToolbar(expandedTask);
                expandedTask = null;
            }
            break;

        case TASK_STATE.SHARING:
            if (!bottomSheet.contains(e.target)) { // Проверяем клик вне всего bottom-sheet
                hideBottomSheet();
                setCurrentTaskState(TASK_STATE.NONE);
            }
            break;

        // --- Добавляем обработку клика вне формы редактирования ---
        case TASK_STATE.EDITING:
            if (!bottomSheet.contains(e.target)) { // Проверяем клик вне всего bottom-sheet
                hideBottomSheet();
                setCurrentTaskState(TASK_STATE.NONE);
            }
            break;
        // -----------------------------------------------------------
    }

});

function removeToolbar(item) {
    const toolbar = item.querySelector('.task-bottom-toolbar');
    if (toolbar) {
        toolbar.remove();
    }
}

function expandTask(item) {
    if (expandedTask === item)
        return

    if (expandedTask)
        removeToolbar(expandedTask);
    addBottomTaskToolbar(item);
    expandedTask = item;
}

function createToolbarButton(action, iconName) {
    const button = document.createElement('button');
    button.classList.add('task-toolbar-item');
    button.setAttribute('data-action', action);

    const image = document.createElement('img');
    // Убираем "url()" - это CSS-синтаксис, а не путь к файлу
    image.src = `src/assets/images/${iconName}`;
    button.appendChild(image); // Добавляем изображение в кнопку

    return button;
}

function addBottomTaskToolbar(item) {
    const toolbar = document.createElement('div');
    toolbar.classList.add('task-bottom-toolbar');

    const shareTool = createToolbarButton('share', 'share.svg');
    const infoTool = createToolbarButton('info', 'info.svg');
    const editTool = createToolbarButton('edit', 'edit.svg');

    toolbar.appendChild(shareTool);
    toolbar.appendChild(infoTool);
    toolbar.appendChild(editTool);

    item.appendChild(toolbar);

    shareTool.addEventListener('click', (e) => { e.stopPropagation(); shareTask(item) });
    infoTool.addEventListener('click', (e) => { e.stopPropagation(); infoTask(item) });
    editTool.addEventListener('click', (e) => { e.stopPropagation(); editTask(item) });
}
