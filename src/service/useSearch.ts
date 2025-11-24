import { request } from "@/config/request"
import { useQuery } from "@tanstack/react-query"

interface UserLIst {
  name: string;
  email: string;
  username?: string;
  id: number;
}

export const useSearch = (str: string) => {
  return useQuery({
    queryKey: ['serch_item', str],
    queryFn: () =>
      request.get<UserLIst[]>('/users', {
        params: {
          name_like: str
        }
      }).then((res) => res.data)
  }
  )
}
