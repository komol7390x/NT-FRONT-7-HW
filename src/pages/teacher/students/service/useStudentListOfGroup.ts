import { request } from '@/config/request'
import { useQuery } from '@tanstack/react-query'
import type { IApiResponse } from '../../teacher/type/teacher-type'
import type { IGroup } from '../type/student-type'

export const useStudentListOfGroup = (id: string) => {
    return useQuery({
        queryKey: ['groups_list', id],
        queryFn: () => request.get<IApiResponse<IGroup>>(`group/for-teacher/${id}`).then((res) => res.data)
    })
}
