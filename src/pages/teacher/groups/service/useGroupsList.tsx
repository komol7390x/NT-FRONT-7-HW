import { request } from "@/config/request"
import { useQuery } from "@tanstack/react-query"
import type { IApiSingleResponse, IGroup } from "../type/group-type"

export const useGroupsList = () => {
    return useQuery({
        queryKey: ['group_list'],
        queryFn: () => request.get<IApiSingleResponse<IGroup>>('/group/my-groups').then((res) => res.data)
    })
}
