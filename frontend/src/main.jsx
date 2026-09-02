import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryCLient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

const queryClinet = new QueryCLient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClinet}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
