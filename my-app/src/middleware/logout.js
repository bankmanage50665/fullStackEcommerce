import { redirect } from "react-router-dom";

export  function action(req, res) {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("creatorid");
  return redirect("/products");
}
