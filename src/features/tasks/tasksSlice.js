
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  pinnedIds: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    taskAdded: {
      reducer(state, action) {
        state.tasks.unshift(action.payload); 
      },
      prepare(title, content = '—') {
        return {
          payload: {
            id: nanoid(),
            title: title.trim(),
            content: content.trim() || '—',
            isPinned: false,
          },
        };
      },
    },

    taskRemoved(state, action) {
      const { id } = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== id);
      state.pinnedIds = state.pinnedIds.filter(pid => pid !== id);
    },

    taskUpdated(state, action) {
      const { id, title, content } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task) {
        task.title = title.trim();
        task.content = content.trim() || '—';
      }
    },

    taskPinned(state, action) {
      const { id } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (!task) return;

      
      if (task.isPinned) {
        task.isPinned = false;
        state.pinnedIds = state.pinnedIds.filter(pid => pid !== id);
        return;
      }

      
      if (state.pinnedIds.length >= 3) {
        
        return;
      }

      task.isPinned = true;
      
      state.pinnedIds.push(id);
    },

    tasksReordered(state, action) {
      const { type, sourceIndex, destinationIndex } = action.payload;

      if (type === 'pinned') {
        const [movedId] = state.pinnedIds.splice(sourceIndex, 1);
        state.pinnedIds.splice(destinationIndex, 0, movedId);
        return;
      }

      if (type === 'unpinned') {
        
        const unpinnedIds = state.tasks
          .filter(t => !t.isPinned)
          .map(t => t.id);

        const [movedId] = unpinnedIds.splice(sourceIndex, 1);
        unpinnedIds.splice(destinationIndex, 0, movedId);

        
        const pinnedTasks = state.pinnedIds.map(id =>
          state.tasks.find(t => t.id === id)
        ).filter(Boolean);

        const remainingTasks = unpinnedIds.map(id =>
          state.tasks.find(t => t.id === id)
        ).filter(Boolean);

        state.tasks = [...pinnedTasks, ...remainingTasks];
      }
    },
  },
});


export const {
  taskAdded,
  taskRemoved,
  taskUpdated,
  taskPinned,
  tasksReordered,
} = tasksSlice.actions;


export const selectAllTasks = (state) => state.tasks.tasks;
export const selectPinnedIds = (state) => state.tasks.pinnedIds;

export const selectPinnedTasks = (state) =>
  state.tasks.pinnedIds.map(id =>
    state.tasks.tasks.find(t => t.id === id)
  ).filter(Boolean);

export const selectUnpinnedTasks = (state) =>
  state.tasks.tasks.filter(task => !task.isPinned);

export default tasksSlice.reducer;