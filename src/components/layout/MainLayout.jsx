import GetHeader from './Header';
import GetTaskCreator from '../task/TaskCreator';
import TaskList from '../task/TaskList';
import BottomSheet from './BottomSheet';
import './MainLayout.css';

function MainLayout({
    tasks,
    onAddTask,
    onShowDeleteConfirm,
    onShowEditForm,
    onShowShareBar,
    activeBottomSheet,
    editData,
    onHideBottomSheet,
}) {
    return (
        <>
            <GetHeader />
            <div className="content">
                <GetTaskCreator onAddTask={onAddTask} />
                <TaskList
                    onShowDeleteConfirm={onShowDeleteConfirm}
                    onShowEditForm={onShowEditForm}
                    onShowShareBar={onShowShareBar}
                />
                <BottomSheet
                    state={activeBottomSheet}
                    editData={editData}
                    onHide={onHideBottomSheet}
                />
            </div>
            <div className="footer">
                @СЛайн
            </div>
        </>
    );
}

export default MainLayout;