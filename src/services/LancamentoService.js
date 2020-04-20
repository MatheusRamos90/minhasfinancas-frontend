import ApiService from "./ApiService";
import mensagemValidacaoErro from "./exceptions/MensagemValidacaoErro";

class LancamentoService extends ApiService {

    consultaLancamento(filter) {

        let params = `?ano=${filter.ano}`;

        if (filter.mes) {
            params = `${params}&mes=${filter.mes}`;
        }

        if (filter.tipo) {
            params = `${params}&tipo=${filter.tipo}`;
        }

        if (filter.status) {
            params = `${params}&status=${filter.status}`;
        }

        if (filter.usuario) {
            params = `${params}&usuario=${filter.usuario}`;
        }

        if (filter.descricao) {
            params = `${params}&descricao=${filter.descricao}`;
        }

        return this.get(`/lancamentos` + params);
    }

    deletarLancamento(id) {
        return this.delete(`/lancamentos/` + id);
    }

    salvarLancamento(data) {
        return this.post(`/lancamentos`, data);
    }

    atualizarLancamento(data) {
        return this.put(`/lancamentos/${data.id}`, data);
    }

    obterLancamento(id) {
        return this.get(`lancamentos/${id}`);
    }

    alterarStatus(id, status) {
        return this.put(`lancamentos/${id}/atualiza-status`, { status });
    }

    validar(data) {
        const erros = [];

        if (!data.ano) {
            erros.push("Informe o ano");
        }

        if (!data.mes) {
            erros.push("Informe o mês");
        }

        if (!data.descricao) {
            erros.push("Informe a descrição");
        }

        if (!data.valor) {
            erros.push("Informe o valor");
        }

        if (!data.tipo) {
            erros.push("Informe o tipo");
        }

        if (erros && erros.length > 0) {
            throw new mensagemValidacaoErro(erros);
        }
    }
}

export default LancamentoService;