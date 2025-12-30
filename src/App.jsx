import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [inputTodo, setInputTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo() {
    if (!todo.trim()) {
      return;
    }
    const createTodo = {
      id: Date.now(),
      text: todo,
      completed: false,
    };
    setTodos([...todos, createTodo]);
    setTodo("");
  }

  function handleDeleteTodo(id) {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodos);
  }

  function handleToggleTodo(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  function onDoubleClickHandler(id, todoText) {
    setEditingId(id);
    setInputTodo(todoText);
  }

  function saveEdit() {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editingId) {
        return {
          ...todo,
          text: inputTodo,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
    setEditingId(null);
    setInputTodo("");
  }

  return (
    <div className="container">
      <div className="container-addTodo">
        <div className="row">
          <div className="col-md-12">
            <div className="mb-3">
              <h1>React Todo App</h1>
            </div>
          </div>
          <div className="col-md-12 mb-3">
            <TodoInput
              value={todo}
              onAdd={handleAddTodo}
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>
          <div className="col-md-12 mb-3">
            {todos.length <= 0 && <h3>Your todo list is empty.</h3>}
          </div>
        </div>
      </div>

      <TodoList
        todos={todos}
        editingId={editingId}
        inputTodo={inputTodo}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
        onEditStart={onDoubleClickHandler}
        onInputChange={(e) => setInputTodo(e.target.value)}
        onSaveEdit={saveEdit}
        onCancelEdit={() => {
          setEditingId(null);
          setInputTodo("");
        }}
      />
    </div>
  );
}

export default App;
