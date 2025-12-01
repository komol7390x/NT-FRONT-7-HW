import { Teacher } from "@/pages/admin/admin/teacher/admin-teacher";
import { Profile } from "@/pages/admin/profile/profile";
import { Settings } from "@/pages/admin/settings/settings";
import { Students } from "@/pages/admin/students/students";

export default [
    {
        path: 'teacher',
        page: Teacher
    },
    {
        path: "teacher/:id",
        page: Teacher,
    },
    {
        path: 'student',
        page: Students
    },
    {
        path: 'profile',
        page: Profile
    },
    {
        path: 'settings',
        page: Settings
    },
]