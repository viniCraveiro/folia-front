export interface ILogin {
    identificacao: string,
    senha: string,
}

export interface UsuarioResponse {
    uuid: string;
    nome: string;
    valid: boolean;
    tipoUsuario: string;
}
