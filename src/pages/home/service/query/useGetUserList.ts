import { request } from "@/config/request"
import { useQuery } from "@tanstack/react-query"

export interface IUserList {
    name: string,
    email: string,
    username?: string,
    id?: number
}

export const useGetUserList = () => {
    return useQuery({
        queryKey: ['user_list'],
        queryFn: () => request.get<IUserList[]>('users').then((res) => res.data)
    }
    )
}
