import React, {Component} from 'react';
import {Card} from "../components/Card/Card.js";
import {FormGroup} from "../components/FormGroup/FormGroup";
import { withRouter } from "react-router-dom";
import {mostrarSucesso, mostrarErro} from "../components/Toast/Toast.js";
import UsuarioService from "../services/UsuarioService";

export class CadastroUsuario extends Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: '',
    };

    constructor(props) {
        super(props);
        this.service = new UsuarioService();
    }

    async cadastrar() {
        const { nome, email, senha, senhaRepeticao } = this.state;

        let data = {nome, email, senha, senhaRepeticao};

        if (!this.validarService(data)) {
            return false;
        }

        await this.service.salvarUsuario(data)
            .then((response) => {
                if (response.data !== undefined) {
                    mostrarSucesso('Usuário salvo com sucesso! Faça o login para acessar o sistema.');
                }
                this.props.history.push('/login');
            })
            .catch((error) => {
                if (error.response === undefined) {
                    mostrarErro('O servidor não está respondendo a requisição. ' + error);
                    return;
                }
                mostrarErro(error.response.data);
            });
    };

    validarService(data) {
        try {
            this.service.validar(data);
            return true;
        } catch (erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => mostrarErro(msg));
            return false;
        }
    }

    cancelarCadastro = () => {
        this.props.history.push('/#');
    };

    render() {
        return (
            <>
                <Card title="Cadastro de usuário">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <FormGroup htmlFor="nome" label="Nome: *">
                                    <input type="text" className="form-control" onChange={ e => this.setState({nome: e.target.value}) } value={this.state.nome} id="nome" placeholder="Digite o nome"/>
                                </FormGroup>
                                <FormGroup htmlFor="email" label="E-mail: *">
                                    <input type="email" className="form-control" onChange={ e => this.setState({email: e.target.value}) } value={this.state.email} id="email" placeholder="Digite o e-mail"/>
                                </FormGroup>
                                <FormGroup htmlFor="senha" label="Senha: *">
                                    <input type="password" className="form-control" onChange={ e => this.setState({senha: e.target.value}) } value={this.state.senha} id="senha" placeholder="Digite a senha"/>
                                </FormGroup>
                                <FormGroup htmlFor="senhaRepeticao" label="Repita a senha: *">
                                    <input type="password" className="form-control" onChange={ e => this.setState({senhaRepeticao: e.target.value}) } value={this.state.senhaRepeticao} id="senhaRepeticao" placeholder="Repita a senha"/>
                                </FormGroup>
                                <button type="button" onClick={this.cadastrar.bind(this)} className="btn btn-success">
                                    <i className="pi pi-save"></i>
                                    Cadastrar
                                </button>
                                <button type="button" onClick={this.cancelarCadastro.bind(this)} className="btn btn-danger">
                                    <i className="pi pi-times"></i>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>
            </>
        );
    }
}

export default withRouter(CadastroUsuario);