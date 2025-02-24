import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/temp.css";
import App from "./App.jsx";
import { GlobalProvider } from "./context/GlobalContext.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>
);
