import React from "react";
import { observer } from "mobx-react-lite";
import Button from "@mui/material/Button";
import { Checkbox } from "@mui/material";
import { todo, Todo } from "../mobx/todo";


interface TodoItemProps extends Todo{
}

const TodoItem:React.FC<TodoItemProps> = observer(({ id, title, completed }) => {

  const handleCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    todo.toggleCompleteTodo(id);
  };

  const handleDeleteClick:React.MouseEventHandler<HTMLButtonElement> = () => {
    todo.deleteTodo(id);
	};

  return (
    <li className={`list-group-item ${completed && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between align-items-center">
        <span className="d-flex align-items-center">
          <Checkbox onChange={handleCheckboxClick}
						checked={completed ?? false} color="secondary" />
          {title}
        </span>

        <Button onClick={handleDeleteClick} variant="outlined" color="error">
          Delete
        </Button>
      </div>
    </li>
  );
})

export default TodoItem;
