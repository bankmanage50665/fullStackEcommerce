import { redirect } from "react-router-dom";

export default function getToken(req, res, next) {
  const token = localStorage.getItem("token");
  return token;
}

export function loader() {
  return getToken();
}

export function checkAuthLoader() {
  const token = getToken();
  if (!token) {
    return redirect("/login");
  }
  return null;
}
