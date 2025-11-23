import { useMutation } from "@tanstack/react-query"
import { request } from "../../../../config/request"

interface IData { name: string, email: string, username: string }

export const useUpdateUser = (id: number) => {
    return useMutation(
        {
            mutationFn: (data: IData) => request.patch(`/users/${id}`, data).then((res) => res.data)
        }
    )
}
