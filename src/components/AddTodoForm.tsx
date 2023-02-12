import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { todo } from "../mobx/todo";

const AddTodoForm = observer(() => {
  const [value, setValue] = useState("");

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (value) {
      todo.addTodo(value, false);
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
  );
});

export default AddTodoForm;
