export interface ILogin {
    identificacao: string,
    senha: string,
}

export interface LoginToken {
    uuid: string;
    nome: string;
    valid: boolean;
    tipoUsuario: string;
}
