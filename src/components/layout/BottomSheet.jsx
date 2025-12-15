import ShareToolBar from '../features/ShareToolBar';
import './BottomSheet.css';
import { useDispatch } from 'react-redux';
import { taskRemoved, taskUpdated } from '../../features/tasks/tasksSlice';
import { useState, useEffect, useRef } from 'react';

function BottomSheet({
    state,
    editData,
    onHide,
}) {
    const dispatch = useDispatch();

    const [editTitle, setEditTitle] = useState(editData.title);
    const [editContent, setEditContent] = useState(editData.content);

    useEffect(() => {
        if (state.type === 'edit' && state.show) {
            setEditTitle(editData.title);
            setEditContent(editData.content);
        } else {
            setEditTitle('');
            setEditContent('');
        }
    }, [editData, state.show, state.type]);

    const handleSaveEdit = (taskId, newTitle, newContent) => {
        dispatch(taskUpdated({ id: taskId, title: newTitle, content: newContent }));
        onHide();
    };

    const handleConfirmedDelete = (taskId) => {
        dispatch(taskRemoved({ id: taskId }));
        onHide();
    };

    const shareToolBarRef = useRef(null);
    const shouldDisplay = state.show;

    const handleRootClick = (e) => {
        if (state.type === 'share' && shareToolBarRef.current && !shareToolBarRef.current.contains(e.target)) {
            onHide();
        }
    };

    const renderContent = () => {
        if (!shouldDisplay) {
            return null;
        }

        switch (state.type) {
            case 'delete':
                return (
                    <div className="center-widget active">
                        <div className="delete-form">
                            <p>Удалить задачу?</p>
                            <div className="delete-form-action-bar">
                                <button
                                    className="delete-form-action-bar-others-choises"
                                    id="delete-form-action-accept"
                                    onClick={() => handleConfirmedDelete(state.taskId)}
                                >
                                    Да
                                </button>
                                <button
                                    className="delete-form-action-bar-first-choise"
                                    id="delete-form-action-reject"
                                    onClick={onHide}
                                >
                                    Нет
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case 'edit':
                const handleSaveClick = () => {
                    handleSaveEdit(state.taskId, editTitle.trim(), editContent.trim() || '—');
                };

                const handleCancelClick = () => {
                    onHide();
                };

                return (
                    <div className="edit-task-form active">
                        <input
                            id="EditTitle"
                            type="text"
                            placeholder="Задача"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <input
                            id="EditContent"
                            type="text"
                            placeholder="Описание"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                        />
                        <div className="edit-task-form-action-bar">
                            <button id="edit-task-form-cancel" onClick={handleCancelClick}>
                                Отменить
                            </button>
                            <button id="edit-task-form-save" onClick={handleSaveClick}>
                                Сохранить
                            </button>
                        </div>
                    </div>
                );
            case 'share':
                return (
                    <div className="bottom-line active" ref={shareToolBarRef}>
                        <ShareToolBar />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`bottom-sheet ${shouldDisplay ? 'visible' : ''}`} onClick={handleRootClick}>
            {renderContent()}
        </div>
    );
}

export default BottomSheet;