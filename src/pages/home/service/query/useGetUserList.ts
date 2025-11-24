import { request } from "@/config/request"
import { useQuery } from "@tanstack/react-query"

export interface IUserList {
    name: string,
    email: string,
    username?: string,
    id?: number
}

export const useGetUserList = (page: number = 1, limit: number = 3) => {
    return useQuery({
        queryKey: ['user_list', page],
        queryFn: () => request.get<IUserList[]>('/users', {
            params: {
                _limit: limit,
                _page: page
            }
        }).then((res): { data: IUserList[]; pageSize: number } => {
            // @ts-ignore
            const totalCount = Number(res.headers['x-total-count']); 

            const pageSize = Math.ceil(Number(totalCount / limit))
            return { data: res.data, pageSize }
        })
    }
    )
}
