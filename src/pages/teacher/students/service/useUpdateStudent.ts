import { request } from '@/config/request'
import { useMutation } from '@tanstack/react-query';
import type { IApiResponse } from '../../teacher/type/teacher-type';
import type { IStudent } from '../type/student-type';

export interface IEvaluate {
    grade: number
    behavior: string
}

export const useUpdateStudent = (id: string) => {
    return useMutation({
        mutationFn: (data: IEvaluate) =>
            request.patch<IApiResponse<IStudent>>(`student/evaluate/${id}`,
                data).then((res) => res.data),
    });
}
