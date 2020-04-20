import ApiService from "./ApiService";
import mensagemValidacaoErro from "./exceptions/MensagemValidacaoErro";

class UsuarioService extends ApiService {

    autenticar(credentials) {
        return this.post('/usuarios/autenticar', credentials);
    }

    buscaSaldo(id) {
        return this.get(`/usuarios/${id}/saldo`);
    }

    salvarUsuario(data) {
        return this.post(`/usuarios`, data);
    }

    validar(data) {
        const erros = [];

        if (!data.nome) {
            erros.push('O campo "nome" é requerido');
        }
        if (!data.email) {
            erros.push('O campo "e-mail" é requerido');
        } else if (!data.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            erros.push('O campo "e-mail" deve ser válido');
        }

        if (!data.senha || !data.senhaRepeticao) {
            erros.push('O campos de "senha" são requeridos');
        } else if (data.senha !== this.state.senhaRepeticao) {
            erros.push('As senhas devem ser idênticas');
        }

        if (erros && erros.length > 0) {
            throw new mensagemValidacaoErro(erros);
        }
    }
}

export default UsuarioService;