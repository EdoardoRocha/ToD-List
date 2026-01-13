import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { FocusProvider } from "./components/pomodoroTimer/FocusContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FocusProvider>
      <App />
    </FocusProvider>
  </BrowserRouter>
);
