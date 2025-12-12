import logo from '@/assets/img/logo.png'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { items } from "./data/sidebar"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import Cookies from 'js-cookie'
import { toast } from 'sonner'



export function AppSidebar({ role }: { role: "admin" | "teacher" }) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className='w-[150px] py-5'>
                        <Link to={`/app/${role}`}>
                            <img src={logo} alt="logo" />
                        </Link>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = pathname === item.url;

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            className={
                                                "flex items-center gap-2 " +
                                                (isActive
                                                    ? "bg-green-500 text-white py-4.5"
                                                    : "hover:bg-muted py-4.5")
                                            }
                                        >
                                            <Link to={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                    <Button className='bg-green-500 mt-5 hover:bg-amber-500'
                        onClick={() => {
                            Cookies.remove('token');
                            Cookies.remove('role');
                            navigate("/"),
                                toast.success('Muvaffaqiyatli tark etdingiz!', {
                                    position: "top-center",
                                    icon: "👋",
                                    style: {
                                        background: "#0f0f0f",
                                        color: "#a3e635",
                                        border: "1px solid #a3e635",
                                        boxShadow: "0 0 10px #a3e635",
                                        borderRadius: "12px"
                                    }
                                });
                        }}
                    >Logout</Button>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}