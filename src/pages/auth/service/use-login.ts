import { useMutation } from "@tanstack/react-query"
import type { ILoginResponse, ILogin } from "../types"
import { request } from "@/config/request"

export const useLogin = () => {
    return useMutation({
        mutationFn: (data: ILogin) =>
            request.post<ILoginResponse>('/auth/signin', data).then((res) => res.data)
    })
}