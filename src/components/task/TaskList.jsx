import { useDispatch } from 'react-redux';
import { tasksReordered } from '../../features/tasks/tasksSlice';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useSelector } from 'react-redux';
import { selectPinnedTasks, selectUnpinnedTasks } from '../../features/tasks/tasksSlice';
import TaskItem from './TaskItem';

function TaskList({
    onShowDeleteConfirm,
    onShowEditForm,
    onShowShareBar,
}) {
    const pinnedTasks = useSelector(selectPinnedTasks);
    const unpinnedTasks = useSelector(selectUnpinnedTasks);
    const dispatch = useDispatch();

    const onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;

        // Отмена при отмене перетаскивания или drop вне зоны
        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        dispatch(tasksReordered({
            type,
            sourceIndex: source.index,
            destinationIndex: destination.index,
        }));
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="list-view-tasks">
                <Droppable droppableId="pinned" type="pinned" direction="vertical">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {pinnedTasks.map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <TaskItem
                                                task={task}
                                                onShowDeleteConfirm={onShowDeleteConfirm}
                                                onShowEditForm={onShowEditForm}
                                                onShowShareBar={onShowShareBar}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                <Droppable droppableId="unpinned" type="unpinned" direction="vertical">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {unpinnedTasks.map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={snapshot.isDragging ? 'task-item-wrapper is-dragging' : ''}
                                            style={{
                                                ...provided.draggableProps.style,
                                                marginBottom: '15px',
                                            }}
                                        >
                                            <TaskItem
                                                task={task}
                                                onShowDeleteConfirm={onShowDeleteConfirm}
                                                onShowEditForm={onShowEditForm}
                                                onShowShareBar={onShowShareBar}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
}

export default TaskList;