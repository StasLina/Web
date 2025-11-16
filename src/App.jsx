import { useState, useEffect } from 'react';
import './App.css';
import MainLayout from './components/layout/MainLayout';


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



function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}


function App() {
    const [tasks, setTasks] = useState(() => loadTasksFromLocalStorage()); 

    
    useEffect(() => {
        saveTasksToLocalStorage(tasks);
    }, [tasks]);

    const handleAddTask = (title, content) => {
        if (!title.trim()) {
            alert('Введите название задачи');
            return;
        }

        const newTask = {
            id: generateId(),
            title: title.trim(),
            content: content.trim() || '—'
        };

        setTasks(prevTasks => [newTask, ...prevTasks]); 
        addTaskToLocalStorage(newTask.id, newTask.title, newTask.content);
    };

    const handleRemoveTask = (taskId) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        removeFromLocalStorage(taskId);
    };

    const handleUpdateTask = (taskId, newTitle, newContent) => {
        setTasks(prevTasks => prevTasks.map(task => {
            if (task.id === taskId) {
                return { ...task, title: newTitle, content: newContent };
            }
            return task;
        }));
        updateTaskInLocalStorage(taskId, newTitle, newContent);
    };

    
    
    const [activeBottomSheet, setActiveBottomSheet] = useState({ show: false, type: null, taskId: null });
    const [editData, setEditData] = useState({ title: '', content: '' }); 

    const showDeleteConfirm = (taskId) => {
        setActiveBottomSheet({ show: true, type: 'delete', taskId: taskId });
    };

    const showEditForm = (taskId) => {
        
        const taskToEdit = tasks.find(task => task.id === taskId);
        if (taskToEdit) {
            
            setEditData({ title: taskToEdit.title, content: taskToEdit.content });
            
            setActiveBottomSheet({ show: true, type: 'edit', taskId: taskId });
        }
    };

    
    const showShareBar = (taskId) => {
        
        setActiveBottomSheet({ show: true, type: 'share', taskId: taskId });
    };
    

    const hideBottomSheet = () => {
        setActiveBottomSheet({ show: false, type: null, taskId: null });
        
        setEditData({ title: '', content: '' });
    };

    const handleConfirmedDelete = (taskId) => {
        handleRemoveTask(taskId); 
        hideBottomSheet(); 
    };

    
    const handleSaveEdit = (taskId, newTitle, newContent) => {
        handleUpdateTask(taskId, newTitle, newContent);
        hideBottomSheet(); 
    };

    return (
        <div className='main-body'>
            <MainLayout
                tasks={tasks}
                onAddTask={handleAddTask}
                onRemoveTask={handleRemoveTask}
                onUpdateTask={handleUpdateTask}
                onShowDeleteConfirm={showDeleteConfirm}
                onShowEditForm={showEditForm} 
                onShowShareBar={showShareBar} 
                activeBottomSheet={activeBottomSheet}
                editData={editData} 
                onConfirmDelete={handleConfirmedDelete}
                onHideBottomSheet={hideBottomSheet}
                onSaveEdit={handleSaveEdit} 
            />
        </div>
    );
}

export default App;