import React, { Component } from 'react';

export class Card extends Component {
    render() {
        return (
            <>
                <div className="card md-3">
                    <h3 className="card-header">{ this.props.title }</h3>
                    <div className="card-body">
                        { this.props.children }
                    </div>
                </div>
            </>
        );
    }
}