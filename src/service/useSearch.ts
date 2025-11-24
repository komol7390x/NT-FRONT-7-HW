import { request } from "@/config/request"
import { useQuery } from "@tanstack/react-query"

interface UserLIst {
  name: string;
  email: string;
  username?: string;
  id: number;
}

export const useSearch = (str: string, limit: number = 5) => {
  return useQuery({
    queryKey: ['serch_item', str],
    queryFn: () =>
      request.get<UserLIst[]>('/users', {
        params: {
          name_like: str,
          _limit: limit
        }
      }).then((res) => res.data)
  }
  )
}
