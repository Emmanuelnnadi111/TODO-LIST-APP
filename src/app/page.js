"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import TodoPage from "./api/todos/[id]/route";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todo");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/todo", { title: newTodo });
      setNewTodo("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async (todo) => {
    try {
      await axios.put("/api/todo", todo);
      setEditingTodo(null);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete("/api/todo", { data: { id } });
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="flex min-h-screen w-auto items-center justify-center">
      <div className="w-full h-full lg:w-[80%] lg:h-[90%] p-4 bg-slate-900 lg:rounded-2xl ">
        <h1 className="text-4xl text-center font-bold py-5 text-white">
          Todo List App
        </h1>
        <form
          onSubmit={addTodo}
          className="py-5 lg:flex lg:gap-x-10 justify-center text-center"
        >
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className=" rounded-md p-2 lg:p-0 bg-transparent border-2 text-white"
            placeholder="New todo"
          />
          <button
            type="submit"
            className="m-4 bg-blue-500 text-white p-2 rounded"
          >
            Add Todo
          </button>
        </form>
        <ul className="lg:flex flex-col items-center gap-2 py-3 justify-center">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="w-full lg:w-[80%]  flex mt-6 gap-10 justify-between"
            >
              {editingTodo?.id === todo.id ? (
                <form onSubmit={() => updateTodo(editingTodo)}>
                  <input
                    type="text"
                    value={editingTodo.title}
                    onChange={(e) =>
                      setEditingTodo({ ...editingTodo, title: e.target.value })
                    }
                    className="border p-1 mr-2"
                  />
                  <button
                    type="submit"
                    className="bg-green-500 text-white p-1 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTodo(null)}
                    className="bg-gray-500 text-white p-1 rounded"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <div className=" w-full">
                  <div className="lg:border lg:p-3 lg:rounded-2xl flex gap-4 justify-between">
                    <Link
                      href={`./todos/${todo.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      <TodoPage />
                      <span className={todo.completed ? "line-through" : ""}>
                        {todo.title}
                      </span>
                    </Link>
                    <button
                      onClick={() =>
                        updateTodo({ ...todo, completed: !todo.completed })
                      }
                      className=" bg-yellow-500 text-white py-1 lg:px-5 rounded"
                    >
                      {todo.completed ? "Undo" : "Done"}
                    </button>
                    <button
                      onClick={() => setEditingTodo(todo)}
                      className=" bg-blue-500 text-white px-3 lg:p-2 lg:px-10 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className=" bg-red-500 text-white px-2 lg:p-2 lg:px-10 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
