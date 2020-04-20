import React, { Component } from "react";
import AuthService from "../services/AuthService";

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;
const AuthProviderComponent = AuthConsumer.Provider;

class AuthProvider extends Component {

    state = {
      usuarioAutenticado: null,
      isAutenticado: false
    };

    iniciarSessao = (usuario) => {
        AuthService.logar(usuario);
        this.setState({isAutenticado: true, usuarioAutenticado: usuario});
    };

    encerrarSessao = () => {
        AuthService.removerUsuarioAutenticado();
        this.setState({isAutenticado: false, usuarioAutenticado: null});
    };

    render() {
        const context = {
            usuarioAutenticado: this.state.usuarioAutenticado,
            isAutenticado: this.state.isAutenticado,
            iniciarSessao: this.iniciarSessao,
            encerrarSessao: this.encerrarSessao
        };

        return (
            <>
                <AuthProviderComponent value={context}>
                    { this.props.children }
                </AuthProviderComponent>
            </>
        )
    }

}

export default AuthProvider;