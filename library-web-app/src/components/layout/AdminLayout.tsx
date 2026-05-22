import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <div>
      <AdminSidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
