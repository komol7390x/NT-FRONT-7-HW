import { request } from "@/config/request"
import { useQuery } from "@tanstack/react-query"
import type { IResponse, TeacherList } from "../../types/teacher"

export const useTeacherList = () => {
    return useQuery({
        queryKey: ['teacher_list'],
        queryFn: () =>
            request.get<IResponse<TeacherList>>('/teacher').then((res) => res.data)
    })
}

export const useTeachersListPagination = (page: string) => {
    return useQuery({
        queryKey: ["teacher_list", page],
        queryFn: () =>
            request
                .get<IResponse<TeacherList>>("/teacher", {
                    params: {
                        pageSize: 10,
                        page,
                    },
                })
                .then((res) => res.data),
    });
};