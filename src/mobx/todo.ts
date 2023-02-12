import { makeAutoObservable } from "mobx";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

class TodoState {
  todos: Array<Todo> | undefined;
  constructor() {
    makeAutoObservable(this);
    this.getAllTodos();
  }
  public async getAllTodos() {
    const res = await fetch("http://localhost:3000/todos");
    if (res.ok) {
      this.todos = await res.json();
      return true;
    }
    console.log(res.statusText);
    return false;
  }
  public async addTodo(title: string, completed: boolean) {
    const res = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title: title, completed: completed }),
    });
    if (res.ok) {
      const newTodo: Todo = await res.json();
      this.todos?.push(newTodo);
    }
  }
  public async deleteTodo(id: number) {
    const res = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (res.ok) {
      this.todos = this.todos?.filter((todo) => todo.id !== id);
    }
  }
  public async toggleCompleteTodo(id: number) {
    const res = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (res.ok) {
      const todo = this.todos?.find((todo) => todo.id === id);
      if (todo !== undefined) todo.completed = !todo.completed;
    }
  }
}

export const todo = new TodoState();
