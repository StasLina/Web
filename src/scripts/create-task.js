let expandedTask = null; 
let bottomSheet = null;
let bottomLine = null; 
let copyElmBtn = null;
let vkElmBtn = null;
let tgElmBtn = null;
let whatsapElmBtn = null;
let facebookElmBtn = null;

let centerWidget = null;
let deleteForm = null; 
let deleteFormActionAccept = null;
let deleteFormActionReject = null;

let removingTaskItem = null;

function resetCenterWidget() {
    Array.from(bottomSheet.children).forEach(child => {
    child.style.display = "none";
    });

    Array.from(centerWidget.children).forEach(child => {
    child.style.display = "none";
    });
}

function showDeleteForm() {
    resetCenterWidget();
    bottomSheet.style.display="flex";
    centerWidget.style.display = "block";
    deleteForm.style.display = "block";
}

function deleteTask(item) {
    console.log("delete task")
    removingTaskItem = item;
    showDeleteForm()
}

function handleAcceptRemoveTaskClick() {
    if (removingTaskItem) {
        removingTaskItem.remove();
    }
    removingTaskItem = null;
    resetCenterWidget();
    bottomSheet.style.display="none";
}

function handleRejectRemoveTaskClick() {

    removingTaskItem = null;
    resetCenterWidget();
    bottomSheet.style.display="none";
}

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
    bottomLine = document.querySelector(".bottom-line")
    deleteFormActionAccept = document.getElementById("delete-form-action-accept")
    deleteFormActionReject = document.getElementById("delete-form-action-reject")
    centerWidget = document.querySelector(".center-widget");
    deleteForm = document.querySelector(".delete-form");

    deleteFormActionAccept.addEventListener('click', handleAcceptRemoveTaskClick)
    deleteFormActionReject.addEventListener('click', handleRejectRemoveTaskClick)

    resetCenterWidget();
    bottomSheet.style.display="None";
    

    function addTask() {
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();

        if (!title) {
          alert('Введиите название задачи');
          return;
        }

        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

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
        taskInfo.appendChild(deleteButton)
        
        taskItem.appendChild(taskInfo)
        taskList.prepend(taskItem);

        titleInput.value = '';
        contentInput.value = '';
        titleInput.focus();

        taskItem.addEventListener('click', () =>{
            expandTask(taskItem);
        });

        deleteButton.addEventListener('click', () =>{
            deleteTask(taskItem)
        });
      }

      addButton.addEventListener('click', addTask);

      titleInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
      });

      contentInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
      });
    });

document.addEventListener('click', (e) => {
    if (expandedTask && expandedTask.contains(e.target)) {
        return;
    }

    if (expandedTask) {
        removeToolbar(expandedTask);
        expandedTask = null;
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
    addBottomTaskToolbar(item)
    expandedTask = item
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
    
    shareTool.addEventListener('click', shareHandler)
    
}

function shareHandler() {
    
}