import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { addTodo, addTodoAsync, AppThunkDispatch } from "../redux/todoSlice";

const AddTodoForm:React.FC = () => {
  const [value, setValue] = useState("");

  const dispatch = useDispatch<AppThunkDispatch>();

  const onSubmit:React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // fetch('http://localhost:3000/todos').then((res) => console.log(res.json()));
    if (value) {
      dispatch(
        addTodoAsync({
          title: value,
          completed: false
        })
      );
    }
  };

  return (
    <form
    onSubmit={onSubmit}
    className="d-flex gap-2 align-self-center align-items-center mb-2"
  >
    <TextField
      color="secondary"
      type="text"
      placeholder="Add todo..."
      value={value}
      variant="standard"
      onChange={(event) => setValue(event.target.value)}
    />

    <Button type="submit" variant="outlined" color="secondary">
      Submit
    </Button>
  </form>
  )
    
  
};

export default AddTodoForm;
