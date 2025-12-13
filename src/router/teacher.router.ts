import { Groups } from "@/pages/teacher/groups/groups";
import { Settings } from "@/pages/teacher/settings/settings";
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
        path: "setting",
        page: Settings,
    },
];
