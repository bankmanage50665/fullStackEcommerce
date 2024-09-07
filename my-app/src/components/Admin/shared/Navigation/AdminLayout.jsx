import { Outlet } from "react-router-dom";
import AdminNavigation from "./AdminNavigation";

export default function AdminLayout() {
    return <>
        <AdminNavigation />
        <Outlet />
    </>
}