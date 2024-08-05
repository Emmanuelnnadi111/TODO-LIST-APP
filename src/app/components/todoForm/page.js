"use client";

import { useState } from "react";
import axios from "axios";

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        {
          title,
          completed: false,
        }
      );
      onAdd(res.data);
      setTitle("");
    } catch (err) {
      return (
        <p className="text-white bg-red-600 border-2 p-3 text-center mt-10">
          Error creating todo: {err}
        </p>
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-5 md:flex-row md:justify-center sm:mt-4 text-center py-10"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => console.log(setTitle(e.target.value))}
        placeholder="Enter todo title"
        className="border border-gray-300 p-2 rounded-lg mr-2 bg-transparent"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
