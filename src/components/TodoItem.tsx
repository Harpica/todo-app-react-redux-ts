import React from "react";
import Button from "@mui/material/Button";
import { Checkbox } from "@mui/material";
import { AppThunkDispatch, deleteTodo, deleteTodoAsync, TodoState, toggleComplete, toggleCompleteAsync } from "../redux/todoSlice";
import { useDispatch } from "react-redux";

interface TodoItemProps extends TodoState {
}


const TodoItem:React.FC<TodoItemProps> = ({ id, title, completed }) => {
  const dispatch = useDispatch<AppThunkDispatch>();

  const handleCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleCompleteAsync({id, completed: !completed}));
  };

  const handleDeleteClick:React.MouseEventHandler<HTMLButtonElement> = () => {
		dispatch(deleteTodoAsync({ id }));
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
};

export default TodoItem;
