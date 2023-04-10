import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ThemeProvider from "./context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);
