import React, { Component } from 'react';
import movimientoControl from '../logic/Movimiento';
import {Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import FormMovimiento from '../partials/FormMovimiento';
import controlMovimiento from '../logic/Movimiento';

export default class TablaMovimiento extends Component {
    static displayName = TablaMovimiento.name;
    constructor(props) {
        super(props);
        this.state = {
            Lista : [],
            modalCrear : false,
            modalEliminar : false,
            modalEditar : false,
            Form :{
                // idMovimiento : 0,
                idTipoMovimiento : 0,
                cantDolares : 0.00,
                pUnitario : 0.00,
                costoTotal : 0.00,
                pago : 0.00,
                cambio : 0.00,
                fecRegistro : "",
                idUsuario : 0,
                nombreCompleto : "",
            }
        }
        //peticion para cargar datos
        this.cargarDatos = () => {
            movimientoControl.listaMovimientos().then(response => {
                console.log(response.data);
                this.setState({ Lista: response.data });
            }).catch(error => {
                alert(error);
            });
        }
        this.registrarMovimiento = () => {
            movimientoControl.registrarMovimiento(this.state.Form).then(response => {
                console.log(response);
                alert("Movimiento existoso");
                window.location.reload();
            }).catch(error=>{
                console.log(error);
                alert("Error al registrar");
            });
        }
        // Funciones para abrir y cerrar modales
        this.abrirModalEditar = (movimiento)=>{
            this.setState({Form:movimiento});
            this.setState({modalEditar : (this.state.modalEditar === false)?true:false});
        }
        this.abrirModalCrear = ()=>{
            this.setState({modalCrear : (this.state.modalCrear === false)?true:false});
        }
        this.abrirModalEliminar = (movimiento)=>{
            this.setState({Form:movimiento});
            this.setState({modalEliminar : (this.state.modalEliminar === false)?true:false});
        }

    }
    componentDidMount() {
        this.cargarDatos();
    }

    render() {
        return (
            <div className='maincontainer-3'>

                <div className="container text-center">
                    <div className="table-responsive py-4">
                        <div class="table-wrapper">
                            <div className="table-title">
                                <div className="row">
                                    <div className="col-sm-8"><h2>Detalle de los <b>movimientos</b></h2></div>
                                        <div className="col-sm-4">
                                            <Button className="btn btn-success add-new" onClick={this.abrirModalCrear}>
                                                Crear Movimiento
                                            </Button>
                                        </div>
                                </div>
                            </div>


                            <div className="table-container">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Tipo de movimiento</th>
                                            <th scope="col">Cantidad de dolares</th>
                                            <th scope="col">Precio unitario</th>
                                            <th scope="col">Costo Total</th>
                                            <th scope="col">Pago</th>
                                            <th scope="col">Cambio</th>
                                            <th scope="col">Fecha de registro</th>
                                            <th scope="col">IdUsuario</th>
                                            <th scope="col">Nombre de usuario</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <CrearRegistro Lista={this.state.Lista} editar={this.abrirModalCrear} />
                                    </tbody>
                                </table>
                            </div>


                        </div>
                    </div>
                </div>





                <Modal isOpen={this.state.modalCrear}>
                    <ModalHeader>Editar Movimiento</ModalHeader>
                    <ModalBody>
                        <FormMovimiento/>
                    </ModalBody>
                    <ModalFooter>
                    <Button className='btn btn-danger' onClick={this.abrirModalCrear}>
                        Cancelar
                    </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

// Componentes necesarios
class CrearRegistro extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            this.props.Lista.map(movimiento => {
                return <tr key={movimiento.idMovimiento}>
                    <td>{(movimiento.idTipoMovimiento == 1) ? 'Compra' : 'Venta'}</td>
                    <td>{movimiento.cantDolares}</td>
                    <td>{movimiento.pUnitario}</td>
                    <td>{movimiento.costoTotal}</td>
                    <td>{movimiento.pago}</td>
                    <td>{movimiento.cambio}</td>
                    <td>{new Date(movimiento.fecRegistro).toLocaleDateString() + ' ' + 
                    new Date(movimiento.fecRegistro).toLocaleTimeString()}</td>
                    <td>{movimiento.idUsuario}</td>
                    <td>{movimiento.nombreCompleto}</td>
                </tr>
            })
        )
    }
}