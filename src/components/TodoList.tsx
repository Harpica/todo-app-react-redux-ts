import { observer } from "mobx-react-lite";
import { todo } from "../mobx/todo";
import TodoItem from "./TodoItem";

const TodoList = observer(() => {
  const todos = todo.todos;

  return (
    <ul className="list-group">
      {todos?.map((todo, i) => (
        <TodoItem
          key={i}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
        />
      ))}
    </ul>
  );
});

export default TodoList;
