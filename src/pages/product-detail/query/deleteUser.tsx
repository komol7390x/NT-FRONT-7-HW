import { request } from "@/config/request"
import { useMutation } from "@tanstack/react-query"

export const useDeleteUser = (id: string) => {
    return useMutation({
        mutationFn: () => request.delete(`/users/${id}`)
    })
}
