import React from "react";

function TodoInput({ value, onChange, onAdd }) {
  return (
    <div>
      <div className="mb-3">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Add a new task..."
          className="form-control"
          onKeyDown={(e) => e.key === "Enter" && onAdd()}
        />
      </div>

      <div>
        <button className="btn btn-primary" onClick={onAdd}>
          Add
        </button>
      </div>
    </div>
  );
}

export default TodoInput;
