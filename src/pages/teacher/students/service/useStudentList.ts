import { request } from '@/config/request'
import { useQuery } from '@tanstack/react-query'
import type { IApiResponse } from '../../teacher/type/teacher-type'
import type { IStudent } from '../type/student-type'

export const useStudentList = () => {
    return useQuery({
        queryKey: ['student_list'],
        queryFn: () => request.get<IApiResponse<IStudent[]>>('/student/my-students').then((res) => res.data)
    })
}
