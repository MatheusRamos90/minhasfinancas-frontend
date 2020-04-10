import React, {Component} from 'react';
import {Card} from "../components/card/card";
import {FormGroup} from "../components/formGroup/formGroup";

export class Login extends Component {

    state = {
      email: '',
      password: ''
    };

    entrar = () => {

    };

    render() {
        return (
            <>
                <div className="container">
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
                                                        <input type="password" className="form-control" onChange={ e => this.setState({password: e.target.value}) } value={this.state.password} id="senha" placeholder="Digite a senha"/>
                                                    </FormGroup>
                                                    <button onClick={this.entrar.bind(this)} className="btn btn-success">Entrar</button>
                                                    <button className="btn btn-danger">Cadastrar</button>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}