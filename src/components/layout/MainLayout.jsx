import GetHeader from './Header';
import GetTaskCreator from '../task/TaskCreator';
import TaskList from '../task/TaskList';
import BottomSheet from './BottomSheet'; 
import './MainLayout.css';

function MainLayout({
    tasks,
    onAddTask,
    onRemoveTask,
    onUpdateTask,
    onShowDeleteConfirm,
    onShowEditForm, 
    onShowShareBar, 
    activeBottomSheet,
    editData, 
    onConfirmDelete,
    onHideBottomSheet,
    onSaveEdit 
}) {
    return (
        <>
            <GetHeader />
            <div className="content">
                <GetTaskCreator onAddTask={onAddTask} />
                <TaskList
                    tasks={tasks}
                    onRemoveTask={onRemoveTask}
                    onUpdateTask={onUpdateTask}
                    onShowDeleteConfirm={onShowDeleteConfirm}
                    onShowEditForm={onShowEditForm} 
                    onShowShareBar={onShowShareBar} 
                />
                <BottomSheet
                    state={activeBottomSheet}
                    editData={editData} 
                    onConfirmDelete={onConfirmDelete}
                    onHide={onHideBottomSheet}
                    onSaveEdit={onSaveEdit} 
                />
            </div>
            <div className="footer">
                @СЛайн
            </div>
        </>
    );
}

export default MainLayout;