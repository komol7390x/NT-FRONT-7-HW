import { Settings, LineChart, Users, Baby, Group } from "lucide-react"


export const AdminItems = [
    {
        title: "Statistica",
        url: "/app/admin",
        icon: LineChart,
    },
    {
        title: "Teacher",
        url: "/app/admin/teachers",
        icon: Users,
    },
    {
        title: "Student",
        url: "/app/admin/students",
        icon: Baby,
    },
    {
        title: "Groups",
        url: "/app/admin/groups",
        icon: Group,
    },
    {
        title: "Settings",
        url: "/app/admin/settings",
        icon: Settings,
    },
]

export const TeacherItems = [
    {
        title: "Groups",
        url: "/app/teacher/groups",
        icon: Users,
    },
    {
        title: "Student",
        url: "/app/teacher/students",
        icon: Baby,
    },
    {
        title: "Settings",
        url: "/app/teacher/setting",
        icon: Settings,
    },
]