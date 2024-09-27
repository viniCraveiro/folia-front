
import { LoginToken } from "../pages/login/ILoginData";
import LocalStorageService from "./LocalStorageService";

class AuthService { // Singleton
    private static instance: AuthService;

    private constructor() { }

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    public setToken(token: LoginToken): void {
        LocalStorageService.setItem<LoginToken>('loginToken', token);
    }

    public getToken(): LoginToken | null {
        return LocalStorageService.getItem<LoginToken>('loginToken');
    }

    public clearToken(): void {
        LocalStorageService.removeItem('loginToken');
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();
        return token !== null && token.valid;
    }
};

export default AuthService;
