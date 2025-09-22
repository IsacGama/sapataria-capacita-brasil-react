import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  slice = "user",
  redirect = "/login-user",
}) {
  const authState = useSelector((state) => state[slice]);
  const token = localStorage.getItem(
    slice === "user" ? "userToken" : "clienteToken"
  );

  const isAuthenticated = !!(authState?.token || token);

  return isAuthenticated ? children : <Navigate to={redirect} />;
}
