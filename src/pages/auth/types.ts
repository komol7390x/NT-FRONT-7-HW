export interface ILogin {
    username: string;
    password: string;
    role: string;
}

export interface ILoginResponse {
    data: {
        token: string;
        user: {
            createdAt: string;
            fullName: string;
            id: string;
            role: string;
            updatedAt: string;
            username: string;
        };
    };
    message: {
        en: string;
        ru: string;
        uz: string;
    };
}
