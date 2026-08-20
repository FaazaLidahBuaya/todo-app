import { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';

function App() {
  // State untuk menyimpan daftar tugas dan input teks
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Mengambil data dari localStorage saat aplikasi pertama kali dimuat
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) setTodos(savedTodos);
  }, []);

  // Menyimpan data ke localStorage setiap kali state 'todos' berubah
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Fungsi untuk menambah tugas baru
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return; // Mencegah input kosong

    const newTodo = {
      id: Date.now(), // Menggunakan timestamp sebagai ID unik
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue(''); // Kosongkan input setelah submit
  };

  // Fungsi untuk mengubah status selesai/belum
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Fungsi untuk menghapus tugas
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-50 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">📝 To-Do List</h1>
      
      {/* Form Input */}
      <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Tambah tugas baru..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
        >
          Tambah
        </button>
      </form>

      {/* Daftar Tugas */}
      <div>
        {todos.length === 0 ? (
          <p className="text-center text-gray-500 italic">Belum ada tugas. Yuk, tambahkan!</p>
        ) : (
          todos.map((todo) => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              toggleTodo={toggleTodo} 
              deleteTodo={deleteTodo} 
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;