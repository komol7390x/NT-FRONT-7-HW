export interface IGroup {
    id: string;
    name: string;
    durationInMonths: number;
    startTime: string;
    endTime: string;
    teacherId: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    students: IStudent[]
}
export interface IStudent {
    id: string;
    name: string;
    email: string;
    role: "student" | "teacher" | "admin";
    groupId: string;
    avatarUrl: string;
    url: string | null;
    behavior: string | null;
    grade: number | null;
    group: IGroup;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
