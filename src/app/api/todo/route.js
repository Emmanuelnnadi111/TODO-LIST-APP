import { NextResponse } from "next/server";

let todos = [
  { id: 1, title: "Learn Next.js", completed: false },
  { id: 2, title: "Build a todo app", completed: false },
  { id: 3, title: "Master React", completed: false },
  { id: 4, title: "Pick Up Typescript", completed: false },
];

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(request) {
  const { title } = await request.json();
  const newTodo = { id: todos.length + 1, title, completed: false };
  todos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}

export async function PUT(request) {
  const { id, title, completed } = await request.json();
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos[index] = { ...todos[index], title, completed };
    return NextResponse.json(todos[index]);
  }
  return NextResponse.json({ error: "Todo not found" }, { status: 404 });
}

export async function DELETE(request) {
  const { id } = await request.json();
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    const deletedTodo = todos.splice(index, 1)[0];
    return NextResponse.json(deletedTodo);
  }
  return NextResponse.json({ error: "Todo not found" }, { status: 404 });
}
