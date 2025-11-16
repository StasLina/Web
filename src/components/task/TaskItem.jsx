import { useState, useRef } from 'react';
import './TaskItem.css';

const TASK_STATE = {
    NONE: 'none',
    DELETING: 'deleting',


    INFO: 'info'
};

function TaskItem({ task, onRemove, onUpdate, onShowDeleteConfirm, onShowEditForm, onShowShareBar, onPinTask }) {
    const [currentTaskState, setCurrentTaskState] = useState(TASK_STATE.NONE);
    const [expanded, setExpanded] = useState(false);
    const itemRef = useRef(null);

    const handleTaskClick = () => {
        setExpanded(prev => !prev);
        setCurrentTaskState(TASK_STATE.NONE);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        onShowDeleteConfirm(task.id);
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        onShowEditForm(task.id);
    };





    const handleShareClick = (e) => {
        e.stopPropagation();

        onShowShareBar(task.id);



    };

    const handleInfoClick = (e) => {
        e.stopPropagation();
        setCurrentTaskState(TASK_STATE.INFO);
        console.log("info task", task.title);
        setCurrentTaskState(TASK_STATE.NONE);
    };

    const handlePinClick = (e) => {
        e.stopPropagation();
        onPinTask(task.id);
    };
    return (
        <div className="task-item" ref={itemRef} onClick={handleTaskClick}>
            <div className="task-info">
                <div className="task-title">{task.title}</div>
                <div className="task-content">{task.content}</div>
                <button className="task-delete-button" onClick={handleDeleteClick}></button>
            </div>
            {expanded && (
                <div className="task-bottom-toolbar">
                    <button className="task-toolbar-item" onClick={handleShareClick}>
                        <img src="/images/share.svg" alt="Поделиться" />
                    </button>
                    <button className="task-toolbar-item" onClick={handleInfoClick}>
                        <img src="/images/info.svg" alt="Информация" />
                    </button>
                    <button className="task-toolbar-item" onClick={handleEditClick}>
                        <img src="/images/edit.svg" alt="Редактировать" />
                    </button>
                    <button className="task-toolbar-item" onClick={handlePinClick}>
                        <img
                            src={task.isPinned ? "/images/unpin.svg" : "/images/pin.svg"}
                            alt={task.isPinned ? "Открепить" : "Закрепить"}
                        />
                    </button>
                </div>
            )}
        </div>
    );
}

export default TaskItem;