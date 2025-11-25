import { Admin } from "@/pages/admin/admin/admin";
import { Profile } from "@/pages/admin/profile/profile";
import { Settings } from "@/pages/admin/settings/settings";
import { Students } from "@/pages/admin/students/students";
import { Teacher } from "@/pages/admin/teacher/teacher";

export default [
    {
        path: 'admin',
        page: Admin
    },
    {
        path: 'teacher',
        page: Teacher
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