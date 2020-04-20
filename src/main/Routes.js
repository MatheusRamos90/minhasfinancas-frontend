import React from "react";
import {HashRouter, Route, Switch} from "react-router-dom";
import {Login} from "../views/Login";
import {CadastroUsuario} from "../views/CadastroUsuario";
import {Home} from "../views/Home";
import ConsultaLancamentos from "../views/Lancamentos/ConsultaLancamentos";
import CadastroLancamentos from "../views/Lancamentos/CadastroLancamentos";
import Redirect from "react-router-dom/es/Redirect";
import {AuthConsumer} from "./AuthProvider"

function RouteAuth ({component: Component, isUsuarioAutenticado, ...props}) {
    return (
        <Route {...props} render={ (componentProps) => {
            if (isUsuarioAutenticado) {
                return (
                    <Component {...componentProps} />
                );
            } else {
                return (
                    <Redirect to={ {pathname: '/login', state: { from: componentProps.location }} } />
                );
            }
        } }/>
    );
}

function Routes(props) {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/cadastrar-usuario" component={CadastroUsuario} />

                <RouteAuth exact isUsuarioAutenticado={props.isUsuarioAutenticado} path="/" component={Home} />
                <RouteAuth exact isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <RouteAuth exact isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />
            </Switch>
        </HashRouter>
    );
}

export default () => (
    <AuthConsumer>
        {(context) => (
            <Routes isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao} />
        )}
    </AuthConsumer>
);