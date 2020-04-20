import React from 'react';
import currencyFormatter from "currency-formatter";

export default (props) => {

    const lancamentosBody = props.lancamentos.map((lanc, index) => {
        return(
            <>
                <tr key={lanc.id}>
                    <td>{lanc.descricao}</td>
                    <td>{currencyFormatter.format(lanc.valor, {locale: 'pt-BR'})}</td>
                    <td>{lanc.tipo}</td>
                    <td>{lanc.mes}</td>
                    <td>{lanc.status}</td>
                    <td>
                        <button type="button" disabled={ lanc.status !== 'PENDENTE' } onClick={e => props.alterarStatus(lanc, 'EFETIVADO')} className="btn btn-success" title="Efetivar">
                            <i className="pi pi-check"></i>
                        </button>
                        <button type="button" disabled={ lanc.status !== 'PENDENTE' } onClick={e => props.alterarStatus(lanc, 'CANCELADO')} className="btn btn-warning" title="Cancelar">
                            <i className="pi pi-times"></i>
                        </button>
                        <button type="button" onClick={e => props.editAction(lanc)} className="btn btn-primary" title="Editar">
                            <i className="pi pi-pencil"></i>
                        </button>
                        <button type="button" onClick={e => props.deleteAction(lanc)} className="btn btn-danger" title="Excluir">
                            <i className="pi pi-trash"></i>
                        </button>
                    </td>
                </tr>
            </>
        );
    });

    return(
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Descrição</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Mês</th>
                        <th scope="col">Situação</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {lancamentosBody}
                </tbody>
            </table>
        </>
    )
};