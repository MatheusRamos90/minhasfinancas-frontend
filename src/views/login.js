import React, {Component} from 'react';
import {Card} from "../components/Card/Card";
import {FormGroup} from "../components/FormGroup/FormGroup";
import {withRouter} from "react-router-dom";
import UsuarioService from "../services/UsuarioService";
import {mostrarErro} from "../components/Toast/Toast.js";
import { AuthContext } from "../main/AuthProvider";

export class Login extends Component {

    state = {
      email: '',
      senha: ''
    };

    constructor(props) {
        super(props);
        this.service = new UsuarioService();
    }

    async entrar() {
        const data = {
            email: this.state.email,
            senha: this.state.senha,
        };

        await this.service.autenticar(data)
            .then((response) => {
                if (response.data != null) {
                    // localStorage.setItem('USER_LOGGED', JSON.stringify(response.data));
                    this.context.iniciarSessao(JSON.stringify(response.data));
                    this.props.history.push('/');
                }
            })
            .catch((error) => {
                mostrarErro(error.response.data);
                this.props.history.push('/login');
            });
    };

    prepararCadastro = () => {
        this.props.history.push('/cadastrar-usuario');
    };

    render() {
        return (
            <>
                <div className="row">
                    <div className="col-md-6" style={ {position: 'relative', left: '300px'} }>
                        <div className="bs-popover-auto">
                            <Card title="Login">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="bs-component">
                                            <fieldset>
                                                <FormGroup htmlFor="email" label="E-mail: *">
                                                    <input type="email" className="form-control" onChange={ e => this.setState({email: e.target.value}) } value={this.state.email} id="email" placeholder="Digite o e-mail"/>
                                                </FormGroup>
                                                <FormGroup htmlFor="senha" label="Senha: *">
                                                    <input type="password" className="form-control" onChange={ e => this.setState({senha: e.target.value}) } value={this.state.senha} id="senha" placeholder="Digite a senha"/>
                                                </FormGroup>
                                                <button onClick={this.entrar.bind(this)} className="btn btn-success">
                                                    <i className="pi pi-sign-in"></i>
                                                    Entrar
                                                </button>
                                                <button onClick={this.prepararCadastro.bind(this)} className="btn btn-danger">
                                                    <i className="pi pi-plus"></i>
                                                    Cadastrar
                                                </button>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

Login.contextType = AuthContext;

export default withRouter(Login);