export interface IApiSingleResponse<T> {
    data: T[];
    message: {
        uz: string;
        en: string;
        ru: string;
    };
    statusCode: number;
}
export interface IUser {
    id: string;
    name: string;
    email: string;

    role: "student" | "teacher" | "admin";
    groupId: string | null;

    avatarUrl: string;
    url: string | null;

    behavior: string | null;
    grade: number | null;

    isActive: boolean;
    isDeleted: boolean;

    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface IGroup {
    id: string;
    name: string;
    durationInMonths: number;
    startTime: string;
    endTime: string;
    teacherId: string;
    isActive: boolean;
    isDeleted: boolean;
    students: IUser[];
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
