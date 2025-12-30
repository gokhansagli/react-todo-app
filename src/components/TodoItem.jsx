import React from "react";
import { RiEditFill } from "react-icons/ri";
import { MdDeleteSweep } from "react-icons/md";
import { FaCheckSquare, FaWindowClose } from "react-icons/fa";

function TodoItem({ todo, onDelete, onToggle, onEditStart }) {
  return (
    <tr key={todo.id}>
      <th className={todo.completed ? "completed" : ""}>{todo.text}</th>
      <th style={todo.completed ? { color: "#158215" } : { color: "#b78611" }}>
        {todo.completed ? "Completed" : "Pending"}
      </th>
      <th>
        {todo.completed ? (
          <FaWindowClose
            onClick={() => onToggle(todo.id)}
            className="transactionIcons"
            style={{ color: "#a61c1c" }}
          />
        ) : (
          <FaCheckSquare
            onClick={() => onToggle(todo.id)}
            className="transactionIcons"
            style={{ color: "#158215" }}
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
      </th>
    </tr>
  );
}

export default TodoItem;
