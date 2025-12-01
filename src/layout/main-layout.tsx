import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Navigate, Outlet } from "react-router-dom"
import { AppSidebar } from "./navbar"
import Cookies from "js-cookie";

export const MainLayout = () => {
    const token = Cookies.get("token");
    const cookieRole = Cookies.get("role")?.toLowerCase();

    const role = cookieRole === "admin" || cookieRole === "teacher"
        ? cookieRole
        : null;

    if (!token || !role) {
        return <Navigate replace to={"/"} />;
    }

    return (
        <SidebarProvider>
            <AppSidebar role={role} />
            <main className="pl-2">
                <SidebarTrigger />
                <Outlet />
            </main>
        </SidebarProvider>
    )
}


