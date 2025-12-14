import { request } from "@/config/request";
import { useMutation } from "@tanstack/react-query";
import type { IApiResponse } from "../../teacher/type/teacher-type";
import type { TeacherList } from "@/pages/admin/types/teacher";

export interface ITeacher {
    name: string,
    username: string
}
export const useUpdateTeacherImage = () => {
    return useMutation({
        mutationFn: (formData: FormData) =>
            request.patch<IApiResponse<TeacherList>>(
                "teacher/update-avatar",
                formData
            ).then(res => res.data),
    });
};