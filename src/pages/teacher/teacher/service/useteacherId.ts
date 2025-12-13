import { useQuery } from "@tanstack/react-query";
import { request } from "@/config/request";
import type { IApiResponse, ITeacher } from "../type/teacher-type";

export const useTeacherInfo = () => {
    return useQuery({
        queryKey: ["teacherId"],
        queryFn: () =>
            request.get<IApiResponse<ITeacher>>("/teacher/details")
                .then((res) => res.data),
    });
};
