import React from 'react';

export default function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <div className="flex items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center gap-3">
        <input 
          type="checkbox" 
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="w-5 h-5 cursor-pointer"
        />
        <span className={`text-gray-800 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
          {todo.text}
        </span>
      </div>
      <button 
        onClick={() => deleteTodo(todo.id)}
        className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition"
      >
        Hapus
      </button>
    </div>
  );
}