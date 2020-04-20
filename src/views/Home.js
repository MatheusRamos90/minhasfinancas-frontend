import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import UsuarioService from "../services/UsuarioService";
import {mostrarErro} from "../components/Toast/Toast.js";
import {AuthContext} from "../main/AuthProvider";

export class Home extends Component {

    state = {
      saldo: 0
    };

    constructor(props) {
        super(props);
        this.service = new UsuarioService();
    }

    componentDidMount() {
        this.carregarSaldo();
    };

    async carregarSaldo() {
        const usuarioLogado = this.context.usuarioAutenticado;

        if (usuarioLogado != null) {
            const usuarioDados = JSON.parse(usuarioLogado);

            await this.service.buscaSaldo(usuarioDados.id)
                .then((response) => {
                    if (response.data != null) {
                        this.setState({saldo: response.data});
                    }
                })
                .catch((error) => {
                    mostrarErro(error.response.data);
                    this.props.history.push('/login');
                });
        } else {
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <>
                <div className="jumbotron">
                    <h1 className="display-3">Bem vindo!</h1>
                    <p className="lead">Esse é seu sistema de finanças.</p>
                    <p className="lead">Seu saldo para o mês atual é de R$ { this.state.saldo }</p>
                    <hr className="my-4" />
                        <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo
                            sistema.</p>
                        <p className="lead">
                            <a className="btn btn-primary btn-lg" href="#/cadastrar-usuario" role="button">
                                <i className="pi pi-users"></i>
                                Cadastrar Usuário
                            </a>
                            <a className="btn btn-danger btn-lg" href="#/cadastro-lancamentos" role="button">
                                <i className="pi pi-money-bill"></i>
                                Cadastrar Lançamento
                            </a>
                        </p>
                </div>
            </>
        );
    }
}

Home.contextType = AuthContext;

export default withRouter(Home);