import { redirect } from "react-router-dom";

export function userId(req, res, next) {
  const userId = localStorage.getItem("userId");
  return userId;
}

export function getToken(req, res, next) {
  const token = localStorage.getItem("token");
  return token;
}

export function getCreatorId(req, res, next) {
  const creatorid = localStorage.getItem("creatorid");
  return creatorid;
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
