import React, { Component } from 'react';
import {Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import FormBitacora from '../partials/FormBitacora';
import {Routes, Route} from 'react-router-dom';


export default class Landing extends Component{
    static displayName = Landing.name;
    constructor (props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
    }

    render(){
        return(
            <div className='maincontainer-0'>
                <div className="d-flex justify-content-center py-5">
                    <div className="d-flex justify-content-center flex-column me-5">
                            <h1>Bienvenido <span className='text-success'>{localStorage.Usuario}</span></h1>
                            <p>En este sistema podras hacer compras y ventas de dolares, crear una bitacora <br></br>con los precios historicos, además de generar reporte de graficos dinamicos.</p>
                    </div>
                    <div class="">
                        <img className='ico2' src={require('./../assets/img/Banknote-bro.png')} />
                    </div>
                </div>
            </div>
        );
    }
}
