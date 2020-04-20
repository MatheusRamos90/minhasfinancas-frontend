import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {Card} from "../../components/Card/Card";
import {FormGroup} from "../../components/FormGroup/FormGroup";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import LancamentoService from "../../services/LancamentoService";
import Utils from "../../main/Utils";
import {mostrarErro, mostrarSucesso} from "../../components/Toast/Toast";

export class CadastroLancamentos extends Component {

    state = {
        id: '',
        ano: '',
        mes: '',
        tipo: '',
        valor: 0,
        descricao: '',
        status: ''
    };

    constructor(props) {
        super(props);
        this.service = new LancamentoService();
    }

    componentDidMount() {
        const params = this.props.match.params;
        if (params.id) {
            this.service.obterLancamento(params.id)
                .then((response) => {
                    this.setState({...response.data});
                })
                .catch((error) => {
                    mostrarErro(error.response.data);
                })
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name]: value });
    };

    salvarLancamento(event) {
        event.preventDefault();

        const usuarioLogado = JSON.parse(localStorage.getItem('USER_LOGGED'));

        if (this.state.id !== '') {
            const { id, ano, mes, tipo, valor, descricao, status } = this.state;
            let lancamento = { id, ano, mes, tipo, valor, descricao, usuario: usuarioLogado.id, status };

            if (!this.validarService(lancamento)) {
                return false;
            }

            this.service.atualizarLancamento(lancamento)
                .then(() => {
                    this.props.history.push('/consulta-lancamentos');
                    mostrarSucesso("Lançamento atualizado com sucesso!");
                })
                .catch((error) => {
                    mostrarErro(error);
                });
        } else {
            const { ano, mes, tipo, valor, descricao } = this.state;
            let lancamento = { ano, mes, tipo, valor, descricao, usuario: usuarioLogado.id };

            if (!this.validarService(lancamento)) {
                return false;
            }

            this.service.salvarLancamento(lancamento)
                .then(() => {
                    this.props.history.push('/consulta-lancamentos');
                    mostrarSucesso("Lançamento cadastrado com sucesso!");
                })
                .catch((error) => {
                    mostrarErro(error);
                });
        }
    }

    validarService(lancamento) {
        try {
            this.service.validar(lancamento);
            return true;
        } catch (erros) {
            const mensagens = erros.mensagens;
            mensagens.forEach(msg => mostrarErro(msg));
            return false;
        }
    }

    render() {
        const optionsValueMeses = new Utils().getMesesAno();
        const optionsValueTipos = new Utils().getTipoLancamento();

        return (
            <>
                <Card title={ this.state.id !== '' ? 'Atualizar de lançamento' : 'Cadastro de lançamento' } >
                    <div className="row">
                        <div className="col-md-12">
                            <FormGroup htmlFor="inputDescricao" label="Descrição: *">
                                <input
                                    type="text"
                                    value={this.state.descricao}
                                    className="form-control"
                                    id="inputDescricao"
                                    name="descricao"
                                    onChange={this.handleChange}
                                    placeholder="Digite a descrição"/>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text"
                                       value={this.state.ano}
                                       className="form-control"
                                       id="inputAno"
                                       name="ano"
                                       onChange={this.handleChange}
                                       placeholder="Digite o ano"/>
                            </FormGroup>
                        </div>
                        <div className="col-md-6">
                            <FormGroup htmlFor="inputMes" label="Mês: *">
                                <SelectMenu
                                    className="form-control"
                                    id="inputMes"
                                    options={optionsValueMeses}
                                    value={this.state.mes}
                                    name="mes"
                                    onChange={this.handleChange}
                                    />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <FormGroup htmlFor="inputValor" label="Valor: *">
                                <input
                                    type="text"
                                    value={this.state.valor}
                                    name="valor"
                                    onChange={this.handleChange}
                                    className="form-control"
                                    id="inputValor"
                                    placeholder="Digite o valor"/>
                            </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <FormGroup htmlFor="inputTipo" label="Tipo: *">
                                <SelectMenu
                                    className="form-control"
                                    id="inputTipo"
                                    options={optionsValueTipos}
                                    value={this.state.tipo}
                                    name="tipo"
                                    onChange={this.handleChange}/>
                            </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <FormGroup htmlFor="inputStatus" label="Status: ">
                                <input type="text"
                                       className="form-control"
                                       value={this.state.status}
                                       name="status"
                                       disabled/>
                            </FormGroup>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <button onClick={this.salvarLancamento.bind(this)} className="btn btn-success">
                                <i className="pi pi-save"></i>
                                Salvar
                            </button>
                            <button onClick={e => this.props.history.push('/consulta-lancamentos')} className="btn btn-danger">
                                <i className="pi pi-times"></i>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </Card>
            </>
        );
    }
}

export default withRouter(CadastroLancamentos);