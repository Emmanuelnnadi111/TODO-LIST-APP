"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function TodoPage() {
  const [todo, setTodo] = useState("");
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`/api/todo/${todo.id}`);
        setTodo(response.data);
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    };

    if (todo.id) {
      fetchTodo();
    }
  }, [todo.id]);

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo Details</h1>
      <div className="mb-4">
        <h2 className="text-xl">{todo.title}</h2>
        <p>Status: {todo.completed ? "Completed" : "Not Completed"}</p>
      </div>
      <button
        onClick={() => router.push("/")}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Back to List
      </button>
    </div>
  );
}
