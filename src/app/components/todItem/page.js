"use client";

import { useState } from "react";
import axios from "axios";

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        {
          ...todo,
          title,
        }
      );
      onUpdate(res.data);
      setEditing(false);
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`
      );
      onDelete(todo.id);
    } catch (err) {
      <p className="text-white bg-red-600 border-2 p-3 text-center mt-10">
        Error deleting todo: {err}
      </p>;
    }
  };

  return (
    <div className="bg-transparent p-4 lg:w-[90%] m-auto  shadow rounded-lg mb-4">
      {editing ? (
        <div className="flex items-center">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg mr-2 flex-1 bg-transparent"
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="sm:flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{todo.title}</h2>
            <p className="text-gray-600">
              {todo.completed ? "Completed" : "Not completed"}
            </p>
          </div>
          <div className="mt-5">
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-500 text-white p-2 px-10 mr-2 rounded-md"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 p-2 px-10 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
