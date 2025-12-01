export interface IResponse<T> {
    currentPage: number;
    pageSize: number;
    statusCode: number;
    to: number;
    totalElements: number;
    totalPages: number;
    message: {
        uz: string;
        en: string;
        ru: string;
    };
    data: T[];
}