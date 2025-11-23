import { request } from "@/config/request"
import type { IUserList } from "@/pages/home/service/query/useGetUserList"
import { useQuery } from "@tanstack/react-query"

export const useUser = (id: string) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => request.get<IUserList>(`/users/${id}`).then((res) => res.data)
    }
    )
}
