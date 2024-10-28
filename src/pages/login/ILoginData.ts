import { UserRole } from "./UserRole";

export interface ILogin {
    identificacao: string,
    senha: string,
}

export interface LoginToken {
    uuid: string;
    nome: string;
    valid: boolean;
    tipoUsuario: UserRole;
}
