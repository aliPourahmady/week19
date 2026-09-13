import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Router from "./router/Router";
import ThemeProvider from "./context/themeContext";

function App() {
  return (
    <>
      <ThemeProvider>
          <Toaster position="top-right" />
          <Router />
      </ThemeProvider>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
