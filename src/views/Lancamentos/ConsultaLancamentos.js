import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {Card} from "../../components/Card/Card";
import {FormGroup} from "../../components/FormGroup/FormGroup";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import LancamentosTable from "./LancamentosTable/LancamentosTable";
import LancamentoService from "../../services/LancamentoService";
import {mostrarAlerta, mostrarErro, mostrarSucesso} from "../../components/Toast/Toast";
import Utils from "../../main/Utils";
import {Dialog} from 'primereact/dialog';
import {Button} from "primereact/button";

export class ConsultaLancamentos extends Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: [],
        lancamentoDelecao: null,
        showConfirmDialog: false
    };

    constructor(props) {
        super(props);
        this.service = new LancamentoService();
    }

    async buscar() {
        if (!this.state.ano) {
            mostrarErro('O campo "ano" é obrigatório para busca');
            return;
        }

        const usuarioLogado = JSON.parse(localStorage.getItem('USER_LOGGED'));

        if (usuarioLogado) {
            const data = {
                ano: this.state.ano,
                mes: this.state.mes,
                tipo: this.state.tipo,
                descricao: this.state.descricao,
                usuario: usuarioLogado.id
            };

            await this.service.consultaLancamento(data)
                .then((response) => {
                    debugger;
                    const filtro = response.data;

                    if (filtro.length <= 0) {
                        mostrarAlerta("Nenhum resultado encontrado");
                        return;
                    }

                    this.setState({lancamentos: response.data});
                })
                .catch((error) => {
                    mostrarErro(error.response.data);
                });

        } else {
            this.props.history.push('/login');
        }
    }

    removeItem(lancamento) {
        this.setState({showConfirmDialog: true});
        this.setState({lancamentoDelecao: lancamento});
    }

    confirmButtonDialog() {
        this.service.deletarLancamento(this.state.lancamentoDelecao.id)
            .then((response) => {
                this.setState({showConfirmDialog: false});

                const { lancamentos } = this.state;
                const index = lancamentos.indexOf(this.state.lancamentoDelecao);
                lancamentos.splice(index, 1);

                this.setState(lancamentos);

                mostrarSucesso('O lançamento foi removido com sucesso');
            })
            .catch((error) => {
                mostrarErro('Houve um erro interno ao deletar o lançamento. ' + error);
            });
    }

    confirmDialogFooter() {
        return (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={() => this.confirmButtonDialog()} />
                <Button label="Cancelar" icon="pi pi-times" onClick={() => this.setState({showConfirmDialog: false})} className="p-button-secondary"/>
            </div>
        );
    }

    cadastrarButton() {
        this.props.history.push('/cadastro-lancamentos');
    }

    editItem = (e) => {
        this.props.history.push(`/cadastro-lancamentos/${e.id}`);
    };

    alterarStatusLancamento = (lancamento, status) => {
        this.service
            .alterarStatus(lancamento.id, status)
            .then(response => {
                const lancamentos  = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento);
                if (index !== -1) {
                    lancamento['status'] = status;
                    lancamentos[index] = lancamento;
                    this.setState({lancamento});
                }
                mostrarSucesso("Status atualizado com sucesso!");
            })
    };

    render() {
        const optionsValueMeses = new Utils().getMesesAno();
        const optionsValueTipos = new Utils().getTipoLancamento();

        return (
            <>
                <Card title="Consulta de lançamentos">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="bs-component">
                                <FormGroup htmlFor="inputAno" label="Ano: *">
                                    <input type="text"
                                           value={this.state.ano}
                                           onChange={e => this.setState({ano: e.target.value})}
                                           className="form-control"
                                           id="inputAno"
                                           placeholder="Digite o ano"/>
                                </FormGroup>
                                <FormGroup htmlFor="inputMes" label="Mês:">
                                    <SelectMenu
                                        className="form-control"
                                        id="inputMes"
                                        options={optionsValueMeses}
                                        value={this.state.mes}
                                        onChange={e => this.setState({mes: e.target.value})}/>
                                </FormGroup>
                                <FormGroup htmlFor="inputDescricao" label="Descrição:">
                                    <input
                                        type="text"
                                        value={this.state.descricao}
                                        onChange={e => this.setState({descricao: e.target.value})}
                                        className="form-control"
                                        id="inputDescricao"
                                        placeholder="Digite a descrição"/>
                                </FormGroup>
                                <FormGroup htmlFor="inputTipo" label="Tipo:">
                                    <SelectMenu
                                        className="form-control"
                                        id="inputTipo"
                                        options={optionsValueTipos}
                                        value={this.state.tipo}
                                        onChange={e => this.setState({tipo: e.target.value})}/>
                                </FormGroup>

                                <button type="button" onClick={this.buscar.bind(this)} className="btn btn-success">
                                    <i className="pi pi-search"></i>
                                    Buscar
                                </button>
                                <button type="button" onClick={this.cadastrarButton.bind(this)} className="btn btn-danger">
                                    <i className="pi pi-plus"></i>
                                    Cadastrar
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="bs-component">
                                <LancamentosTable
                                    lancamentos={this.state.lancamentos}
                                    deleteAction={this.removeItem.bind(this)}
                                    editAction={this.editItem.bind(this)}
                                    alterarStatus={this.alterarStatusLancamento.bind(this)}/>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Dialog header="Confirmação"
                                visible={this.state.showConfirmDialog}
                                style={{width: '50vw'}}
                                modal={true}
                                onHide={() => this.setState({showConfirmDialog: false})}
                                footer={this.confirmDialogFooter()}>
                            Confirma a exclusão deste lançamento?
                        </Dialog>
                    </div>
                </Card>
            </>
        );
    }
}

export default withRouter(ConsultaLancamentos);