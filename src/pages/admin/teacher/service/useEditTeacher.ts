import { useMutation } from "@tanstack/react-query";
import { request } from "@/config/request";
import type { TeacherField } from "../../types/teacher";

export const useEditTeacher = (teacherId: string) => {
  return useMutation({
    mutationFn: (data: TeacherField) =>
      request
        .patch(`/teacher/teacher/${teacherId}`, data)
        .then((res) => res.data),
  });
};
