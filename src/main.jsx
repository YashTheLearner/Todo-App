import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoApp from "./Components/TodoApp.jsx";
import Login from "./Components/Login.jsx";
import Signup from "./Components/Signup.jsx";
import ForgotPassword from "./Components/ForgotPassword.jsx";
import EnterOtp from "./Components/EnterOtp.jsx";
import NewPassword from "./Components/NewPassword.jsx";

const router = createBrowserRouter([
  { path: "/", element: <TodoApp /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgotpassword", element: <ForgotPassword /> },
  { path: "/verify", element: <EnterOtp /> },
  { path: "/newpassword", element: <NewPassword /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
