import { Calendar, Home, Inbox, Search, Settings, Camera } from "lucide-react";

export const links = {
    admin: [
        {
            title: "Statistica",
            url: "/app/admin",
            icon: Home,
        },
        {
            title: "Teacher",
            url: "/app/admin/teacher",
            icon: Inbox,
        },
        {
            title: "Student",
            url: "/app/admin/student",
            icon: Calendar,
        },
        {
            title: "Profile",
            url: "/app/admin/profile",
            icon: Search,
        },
        {
            title: "Settings",
            url: "/app/admin/settings",
            icon: Settings,
        },
    ],
    teacher: [
        {
            title: "Home",
            url: "#",
            icon: Home,
        },
        {
            title: "Inbox",
            url: "#",
            icon: Camera,
        },
    ],

};
