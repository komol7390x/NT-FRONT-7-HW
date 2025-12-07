import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Cookies from "js-cookie"
import { Navigate, Outlet } from "react-router-dom";
import { AppSidebar } from "./app-sidebar";

export const MainLayout = () => {
  const token = Cookies.get('token');
  const role = Cookies.get('role');

  if (!token || !role) {
    return <Navigate replace to={'/'} />
  }
  return (
    <div>
      <SidebarProvider>
        <AppSidebar role={role as 'admin' | 'teacher'} />
        <main>
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  )
}
