import { useState } from "react";
function Form(props) {
  const [name, setName] = useState("");
  function handleChange(event) {
    setName(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    name.length >= 1 && props.addTask(name);
    setName("");
  }
  return (
    <>
      <h1>TodoList</h1>
      <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="on"
          placeholder="enter todo task..."
          value={name}
          onChange={handleChange}
          style={{ padding: "15px" }}
        />
        <button
          type="submit"
          className="btn btn__primary btn__lg"
          style={{ backgroundColor: "#5ad460ff" }}
        >
          Add
        </button>
      </form>
    </>
  );
}
export default Form;
