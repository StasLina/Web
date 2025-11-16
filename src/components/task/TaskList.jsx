import TaskItem from './TaskItem'; 
import './TaskList.css';


function TaskList({ tasks, onRemoveTask, onUpdateTask, onShowDeleteConfirm, onShowEditForm, onShowShareBar }) {
  return (
    <div className="list-view-tasks">
      {tasks.map(task => (
        <TaskItem
          key={task.id} 
          task={task} 
          onRemove={onRemoveTask}
          onUpdate={onUpdateTask}
          
          onShowDeleteConfirm={onShowDeleteConfirm}
          onShowEditForm={onShowEditForm}
          onShowShareBar={onShowShareBar} 
        />
      ))}
    </div>
  );
}

export default TaskList;