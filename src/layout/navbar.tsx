import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { links } from "@/data/layout-data";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { toast } from "sonner";


export function AppSidebar({ role }: { role: "admin" | "teacher" }) {
  return (
    <Sidebar>
      <SidebarHeader />
      <Link to={'/'} className="text-4xl">Logo</Link>
      <SidebarContent>
        <SidebarGroupContent>
          <SidebarMenu>
            {links[role].map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}

          </SidebarMenu>
          <div>
            <Button

              className="mx-auto"
              onClick={() => {
                Cookies.remove("token");
                Cookies.remove("role");
                toast.success('Siz muffaqqiyatli tark etingiz!', {
                  position: 'top-center'
                })
              }}
              asChild
            >
              <Link to="/">Logout</Link>
            </Button>          </div>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
