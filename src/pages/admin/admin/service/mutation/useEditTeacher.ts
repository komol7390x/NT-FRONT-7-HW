import { useMutation } from "@tanstack/react-query";
import { request } from "@/config/request";
import { useSearchParams } from "react-router-dom";
import type { TeacherField } from "../../type/teacher-type";

export const useEditTeacher = () => {
  const [params, _] = useSearchParams();
  return useMutation({
    mutationFn: (data: TeacherField) =>
      request
        .patch(`/teacher/teacher/${params.get("editId")}`, data)
        .then((res) => res.data),
  });
};
