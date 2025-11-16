import { useState } from 'react';
import './TaskCreator.css';

function GetTaskCreator({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(title, content);
    setTitle('');
    setContent('');
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  return (
    <form onSubmit={handleSubmit} className="task-creator-form"> {}
      <div className="input-fields">
        <input
          id="Title"
          type="text"
          placeholder="Задача"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          id="Content"
          type="text"
          placeholder="Описание"
          value={content}
          onChange={handleContentChange}
        />
      </div>
      <button type="submit" className="button-create">Добавить</button>
    </form>
  );
}

export default GetTaskCreator;