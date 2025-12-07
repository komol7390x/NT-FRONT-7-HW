import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";
import type { TeacherDetailT } from "../../types/teacher";

export const useTeacherDetail = (id: string) => {
  return useQuery({
    queryKey: ["teacher", id],
    queryFn: () =>
      request
        .get<TeacherDetailT>(`/teacher/for-admin/${id}`)
        .then((res) => res.data),
  });
};
