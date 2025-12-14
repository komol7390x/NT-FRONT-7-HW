import { Groups } from "@/pages/teacher/groups/groups";
import { Settings } from "@/pages/teacher/settings/settings";
import { GroupOfStudents } from "@/pages/teacher/students/group-of-students";
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
        path: "group-of-students/:id",
        page: GroupOfStudents,
    },
    {
        path: "setting",
        page: Settings,
    },
];
