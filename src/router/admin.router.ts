import { Group } from "@/pages/admin/groups/group";
import { Profile } from "@/pages/admin/profile";
import { Settings } from "@/pages/admin/settings";
import { Student } from "@/pages/admin/students/student";
import { Teacher } from "@/pages/admin/teacher/teacher";
import { TeacherDetail } from "@/pages/admin/teacher/teacher-detail";

export default [
    {
        path: "teachers",
        page: Teacher,
    },
    {
        path: "teacher/:id",
        page: TeacherDetail,
    },
    {
        path: "groups",
        page: Group,
    },
    {
        path: "students",
        page: Student,
    },
    {
        path: "profile",
        page: Profile,
    },
    {
        path: "settings",
        page: Settings,
    },
];
