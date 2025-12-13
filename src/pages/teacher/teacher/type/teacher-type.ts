export interface ISpecification {
    id: string;
    category: string;
    name: string;
}

export interface IGroup {
    id: string;
    name: string;
    teacherId: string;
    startTime: string; 
    endTime: string;   
    durationInMonths: number;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string; 
    updatedAt: string; 
    deletedAt: string | null;
}

export interface ITeacher {
    id: string;
    name: string;
    username: string;
    role: string; 
    avatarUrl: string | null;
    url: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    groups: IGroup[];
    specifications: ISpecification[];
}

export interface Message {
    uz: string;
    en: string;
    ru: string;
}

export interface IApiResponse<T> {
    statusCode: number;
    message: Message;
    data: T;
}