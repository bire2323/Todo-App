import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import FilterButton from "./filterButton";
import Form from "./Form";
import Todo from "./Todo";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  useEffect(() => {
    window.scrollTo({ top: "0", behavior: "smooth" });
  }, []);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("todo-tasks");
    return savedTasks ? JSON.parse(savedTasks) : props.tasks;
  });
  const [filter, setFilter] = useState("All");

  // Save to localStorage every time tasks change
  useEffect(() => {
    localStorage.setItem("todo-tasks", JSON.stringify(tasks));
  }, [tasks]);
  console.log(localStorage.getItem("todo-tasks"));

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }
  function editTask(id, newname) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // Copy the task and update its name
        return { ...task, name: newname };
      }
      // Return the original task if it's not the edited task
      return task;
    });
    setTasks(editedTaskList);
  }
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const noun = taskList.length === 1 ? `task` : `tasks`;
  const headingText = `${taskList.length} ${noun} remaining`;
  return (
    <>
      <div
        className="todoapp stack-large "
        style={{
          margin: "20px",
          paddingLeft: "15px",
          paddingRight: "15px",
        }}
      >
        <Form addTask={addTask} />
        <div className="filters btn-group stack-exception">{filterList}</div>
        <h2 id="list-heading">{headingText}</h2>
        <ul
          role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {taskList}
        </ul>
      </div>
      <div
        style={{
          height: "30vh",
          fontSize: "28px",
          display: "flex",
          justifyContent: "center",
          alignItems: "end",
          paddingBottom: "30px",
        }}
      >
        developed by B.D @ version 1.0.0
      </div>
    </>
  );
}

export default App;
