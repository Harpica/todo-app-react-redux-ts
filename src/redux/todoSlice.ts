import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface TodoState {
  id: number;
  title: string;
  completed: boolean;
}

interface AddTodoPayload {
  title: string;
}

const initialState: Array<TodoState> = [
  { id: 1, title: "todo1", completed: false },
];

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const getTodosAsync = createAsyncThunk(
  "/todos/getTodosAsync",
  async () => {
    const res = await fetch("http://localhost:3000/todos");
    if (res.ok) {
      const todos: Array<TodoState> = await res.json();
      return { todos };
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload: { title: string; completed: boolean }) => {
    const res = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: payload.title }),
    });
    if (res.ok) {
      const todo: TodoState = await res.json();
      return { todo };
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  "todos/completeTodoAsync",
  async (payload: { id: number; completed: boolean }) => {
    const res = await fetch(`http://localhost:3000/todos/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: payload.completed }),
    });

    if (res.ok) {
      const todo: TodoState = await res.json();
      return { todo };
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (payload: { id: number }) => {
    const res = await fetch(`http://localhost:3000/todos/${payload.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return payload;
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<AddTodoPayload>) => {
      const date = new Date();
      const todo: TodoState = {
        id: date.getMilliseconds(),
        title: action.payload.title,
        completed: false,
      };
      state.push(todo);
    },
    toggleComplete: (
      state,
      action: PayloadAction<{ id: number; completed: boolean }>
    ) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action: PayloadAction<{ id: number }>) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodosAsync.fulfilled, (state, action) => {
      return action.payload?.todos;
    });
    builder.addCase(addTodoAsync.fulfilled, (state, action) => {
      if (action.payload?.todo) state.push(action.payload?.todo);
    });
    builder.addCase(toggleCompleteAsync.fulfilled, (state, action) => {
      const index = state.findIndex(
        (todo) => todo.id === action.payload?.todo.id
      );
      if (action.payload?.todo)
        state[index].completed = action.payload?.todo.completed;
    });
    builder.addCase(deleteTodoAsync.fulfilled, (state, action) => {
      return state.filter((todo) => todo.id !== action.payload?.id);
    });
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

export const todoReducer = todoSlice.reducer;
