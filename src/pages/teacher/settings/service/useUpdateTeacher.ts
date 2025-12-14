import { request } from "@/config/request";
import { useMutation } from "@tanstack/react-query";
import type { IApiResponse } from "../../teacher/type/teacher-type";
import type { ITeacher } from "@/pages/admin/types/teacher";

export const useUpdateTeacherDetail = () => {
    return useMutation<
        IApiResponse<ITeacher>,
        unknown,                 
        { name: string; username: string }
    >({
        mutationFn: (data) =>
            request.patch<IApiResponse<ITeacher>>("teacher/details", data).then(res => res.data),
    });
};