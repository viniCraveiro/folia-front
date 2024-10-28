
import { IEmpresaData } from "../pages/login/IEmpresaData";
import { LoginToken } from "../pages/login/ILoginData";
import LocalStorageService from "./LocalStorageService";

class AuthService { // Singleton
    private static instance: AuthService;
    LOGIN_KEY = 'loginKey';
    EMPRESA_KEY = 'empresaKey';
    EXPIRATION_KEY = 'expirationKey';

    private constructor() { }

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    public setToken(token: LoginToken): void {
        if (token.valid) {
            this.setExpiration();
            LocalStorageService.setItem<LoginToken>(this.LOGIN_KEY, token);
        }
    }

    public setEmpresa(data: IEmpresaData): void {
            LocalStorageService.setItem<IEmpresaData>(this.EMPRESA_KEY, data);
    }

    public getToken(): LoginToken | null {
        return LocalStorageService.getItem<LoginToken>(this.LOGIN_KEY);
    }

    private setExpiration(): void {
        LocalStorageService.setItem<number>(this.EXPIRATION_KEY, Date.now() + 60 * 60 * 1000);
    }

    private isTokenExpired(): boolean {
        const expirationTime = LocalStorageService.getItem<number>(this.EXPIRATION_KEY);
        if(Date.now() > expirationTime!){
            this.clearToken();
            return true;
        }
        return false;
    }

    public clearToken(): void {
        LocalStorageService.removeItem(this.LOGIN_KEY);
        LocalStorageService.removeItem(this.EXPIRATION_KEY);
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) {
            return false;
        }
        return token.valid && !this.isTokenExpired();
    }
};

export default AuthService;
