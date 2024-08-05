"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import TodoItem from "./components/todItem/page";
import TodoForm from "./components/todoForm/page";

export default function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
      setTodos(res.data);
    } catch (err) {
      return (
        <p className="text-white bg-red-600 border-2 p-3 text-center mt-10">
          Error fetching todos {err}
        </p>
      );
    }
  };

  const handleAddTodo = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Todo List App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold mb-4 text-center">Todo List</h1>

      <TodoForm onAdd={handleAddTodo} />

      <div className="grid grid-cols-1  gap-4">
        {todos.map((todo, index) => (
          <div key={index}>
            <Link href={`./todo/${todo.id}`}>
              <TodoItem todo={todo} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
