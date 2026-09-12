import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Router from "./router/Router";
import AuthProvider from "./context/authContext";
import ThemeProvider from "./context/themeContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <Toaster position="top-right" />
          <Router />
        </AuthProvider>
      </ThemeProvider>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
