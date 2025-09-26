import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
const data = [{ id: "todo-0", name: "Go to church in 12pm!", completed: true }];
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App tasks={data} />
  </StrictMode>
);
