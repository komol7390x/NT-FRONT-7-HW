import { Groups } from "@/pages/teacher/groups/groups";
import { Settings } from "@/pages/teacher/settings/settings";
import { StudentDetail } from "@/pages/teacher/students/student-detail";
import { Students } from "@/pages/teacher/students/students";

export default [
    {
        path: "groups",
        page: Groups,
    },
    {
        path: "students",
        page: Students,
    },
    {
        path: "student/:id",
        page: StudentDetail,
    },
    {
        path: "setting",
        page: Settings,
    },
];
