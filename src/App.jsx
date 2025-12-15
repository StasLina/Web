// src/App.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import MainLayout from './components/layout/MainLayout';
import {
  taskAdded,
  selectAllTasks,
  selectPinnedIds,
} from './features/tasks/tasksSlice';

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);
  const pinnedIds = useSelector(selectPinnedIds);

  const [activeBottomSheet, setActiveBottomSheet] = useState({ show: false, type: null, taskId: null });
  const [editData, setEditData] = useState({ title: '', content: '' });

  const handleAddTask = (title, content) => {
    if (!title.trim()) {
      alert('Введите название задачи');
      return;
    }
    dispatch(taskAdded(title, content));
  };

  // const handleRemoveTask = (taskId) => {
  //   dispatch(taskRemoved({ id: taskId }));
  // };

  // const handleUpdateTask = (taskId, newTitle, newContent) => {
  //   dispatch(taskUpdated({ id: taskId, title: newTitle, content: newContent }));
  // };

  // const handlePinTask = (taskId) => {
  //   if (pinnedIds.length >= 3 && !pinnedIds.includes(taskId)) {
  //     alert('Можно закрепить не более 3 задач.');
  //     return;
  //   }
  //   dispatch(taskPinned({ id: taskId }));
  // };

  // --- BottomSheet логика — без изменений (остаётся в App, т.к. UI-состояние) ---
  const showDeleteConfirm = (taskId) => {
    setActiveBottomSheet({ show: true, type: 'delete', taskId });
  };

  const showEditForm = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit) {
      setEditData({ title: taskToEdit.title, content: taskToEdit.content });
      setActiveBottomSheet({ show: true, type: 'edit', taskId });
    }
  };

  const showShareBar = (taskId) => {
    setActiveBottomSheet({ show: true, type: 'share', taskId });
  };

  const hideBottomSheet = () => {
    setActiveBottomSheet({ show: false, type: null, taskId: null });
    setEditData({ title: '', content: '' });
  };

  // const handleConfirmedDelete = (taskId) => {
  //   // handleRemoveTask(taskId);
  //   hideBottomSheet();
  // };

  // const handleSaveEdit = (taskId, newTitle, newContent) => {
  //   handleUpdateTask(taskId, newTitle, newContent);
  //   hideBottomSheet();
  // };

  return (
    <div className="main-body">
      <MainLayout
        tasks={tasks}
        pinnedIds={pinnedIds}
        onAddTask={handleAddTask}
        // onRemoveTask={handleRemoveTask}
        // onUpdateTask={handleUpdateTask}
        // onPinTask={handlePinTask}
        onShowDeleteConfirm={showDeleteConfirm}
        onShowEditForm={showEditForm}
        onShowShareBar={showShareBar}
        activeBottomSheet={activeBottomSheet}
        editData={editData}
        // onConfirmDelete={handleConfirmedDelete}
        onHideBottomSheet={hideBottomSheet}
        // onSaveEdit={handleSaveEdit}
      />
    </div>
  );
}

export default App;