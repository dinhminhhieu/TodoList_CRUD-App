import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

function Form({ input, setInput, todos, setTodos, edit, setEdit }) {
  const updateTodo = (title, id, completed) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { title, id, completed: !completed } : todo
    );
    setTodos(newTodo);
    toast.success("Sửa công việc thành công");
    setEdit("");
  };

  useEffect(() => {
    if (edit) {
      setInput(edit.title);
    } else {
      setInput("");
    }
  }, [setInput, edit]);

  const onChangeInput = (event) => {
    setInput(event.target.value);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    if (!edit) {
      setTodos([...todos, { id: uuidv4(), title: input, completed: false }]);
      toast.success("Thêm công việc thành công");
      setInput("");
    } else {
      updateTodo(input, edit.id, (edit.completed = true));
    }
  };

  return (
    <form onSubmit={onSubmitForm}>
      <input
        type="text"
        placeholder="Enter a Todo..."
        className="task-input"
        value={input}
        required
        onChange={onChangeInput}
      />
      <button className="button-add" type="submit">
        {edit ? "OK" : "Add"}
      </button>
    </form>
  );
}

export default Form;
