import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Router from "./router/Router";
import AuthProvider from "./context/authContext";

function App() {
  return (
    <>
      <AuthProvider>
        <Toaster position="top-right" />
        <Router />
      </AuthProvider>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
