import { USERLOGGED } from "../main/Constants";

export default class AuthService {

    static isUsuarioAutenticado () {
        const usuario = JSON.parse(localStorage.getItem(USERLOGGED));
        return usuario && usuario.id;
    }

    static removerUsuarioAutenticado() {
        return localStorage.removeItem(USERLOGGED);
    }

    static logar(usuario) {
        localStorage.setItem(USERLOGGED, usuario);
    }

    static obterUsuarioAutenticado() {
        return localStorage.getItem(USERLOGGED);
    }

}