import React from "react";
import TodoItem from "./TodoItem";
import { RiEditFill } from "react-icons/ri";
import { MdDeleteSweep } from "react-icons/md";
import { FaCheckSquare, FaWindowClose } from "react-icons/fa";

function TodoList({
  todos,
  editingId,
  inputTodo,
  onToggle,
  onDelete,
  onEditStart,
  onInputChange,
  onSaveEdit,
  onCancelEdit,
}) {
  return (
    <div>
      <table>
        {todos.length > 0 && (
          <thead>
            <tr>
              <th>Todo</th>
              <th>Status</th>
              <th>Transactions</th>
            </tr>
          </thead>
        )}

        <tbody>
          {todos.map((todo) =>
            editingId === todo.id ? (
              <tr key={todo.id}>
                <td>
                  <input
                    value={inputTodo}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onSaveEdit();

                      if (e.key === "Escape") onCancelEdit();
                    }}
                    onChange={onInputChange}
                    onBlur={() => {
                      onSaveEdit();
                    }}
                    className="form-control"
                  />
                </td>
                <td
                  style={
                    todo.completed ? { color: "#158215" } : { color: "#b78611" }
                  }
                >
                  {todo.completed ? "Completed" : "Pending"}
                </td>
                <td>
                  {todo.completed ? (
                    <FaWindowClose
                      onClick={() => onToggle(todo.id)}
                      style={{ color: "#a61c1c" }}
                      className="transactionIcons"
                    />
                  ) : (
                    <FaCheckSquare
                      onClick={() => onToggle(todo.id)}
                      style={{ color: "#158215" }}
                      className="transactionIcons"
                    />
                  )}

                  <RiEditFill
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditStart(todo.id, todo.text);
                    }}
                    style={{ color: "#b78611" }}
                    className="transactionIcons"
                  />
                  <MdDeleteSweep
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(todo.id);
                    }}
                    style={{ color: "#a61c1c" }}
                    className="transactionIcons"
                  />
                </td>
              </tr>
            ) : (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                onToggle={() => onToggle(todo.id)}
                onEditStart={onEditStart}
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
