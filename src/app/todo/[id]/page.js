"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function TodoDetail() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [todo, setTodo] = useState(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchTodo(id);
    }
  }, [id]);

  const fetchTodo = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      setTodo(res.data);
      setTitle(res.data.title);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching todo:", err);
      setError("Failed to fetch todo");
      setLoading(false);
    }
  };

  const handleUpdateTodo = async () => {
    try {
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          ...todo,
          title,
        }
      );
      setTodo(res.data);
      console.log("Todo updated:", res.data);
      setEditing(false);
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  const handleDeleteTodo = async () => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      router.push("/"); // Redirect to home page after deletion
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!todo) {
    return <div>Todo not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Todo Item Detail</h1>
      <div className="bg-tranparent p-4 shadow rounded-lg">
        {editing ? (
          <div className="flex items-center">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg mr-2 flex-1 bg-transparent"
            />
            <button
              onClick={handleUpdateTodo}
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
              <p className="text-gray-600">ID: {todo.id}</p>
            </div>
            <div>
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-500 text-white p-2 px-10 mr-2 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteTodo}
                className="bg-red-500 text-white p-2 px-10 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
