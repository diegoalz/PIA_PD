import React, { Component } from 'react';
import bitacoraControl from '../logic/Bitacora';
import {Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import FormBitacora from '../partials/FormBitacora';

export default class TablaBitacora extends Component{
    static displayName = TablaBitacora.name;
    constructor (props) {
        super(props);
        this.state = {
            Lista: [],
            Form :{
                idBitacora : 0,
                idTipoMovimiento : 0,
                monto : 0
            },
            modalCrear : false,
            modalEditar : false,
            HOY : new Date(Date.now()).toLocaleDateString(),
            Fecha_venta : undefined,
            Fecha_compra : undefined
        }
        this.cargarDatos = () => {
            bitacoraControl.listaBitacoras().then(response => {
                console.log(response.data);
                if (response.data == undefined) {
                    alert("Tabla vacia");
                }else{
                    this.setState({ Lista: response.data });
                }
            }).catch(error => {
                alert(error);
            });
        }
        this.abrirModalCrear = ()=>{
            this.setState({modalCrear : (this.state.modalCrear === false)?true:false});
        }
        this.abrirModalEditar = (bitacora)=>{
            this.setState({Form:bitacora});
            this.setState({modalEditar : (this.state.modalEditar === false)?true:false});
        }
    }
    componentDidMount() {
        this.cargarDatos();
    }

    render(){
        return(
            <div className="maincontainer-2">
                <div className="container text-center">
                    <div class="table-responsive py-4">
                        <div className='table-wrapper'>
                            <div className="table-title">
                                <div className="row">
                                    <div className="col-sm-8"><h2>Detalle de <b>Bitacora</b></h2></div>
                                        <div className="col-sm-4">
                                            <Button color="btn btn-success add-new" onClick={this.abrirModalCrear}>
                                                Agregar precio del dia
                                            </Button>
                                        </div>
                                </div>
                            </div>
                            <div className="table-container">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Tipo Movimiento</th>
                                            <th scope="col">Monto</th>
                                            <th scope="col">Fecha de registro</th>
                                            <th scope="col">IdUsuario</th>
                                            <th scope="col">Nombre del usuario</th>
                                            <th scope="col">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <CrearRegistro Lista={this.state.Lista} editar={this.abrirModalEditar}/>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal isOpen={this.state.modalCrear}>
                    <ModalHeader>Agregar bitacora</ModalHeader>
                    <ModalBody>
                        <FormBitacora />
                    </ModalBody>
                    <ModalFooter>
                    <Button className='btn btn-danger' onClick={this.abrirModalCrear}>
                        Cancelar
                    </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalEditar}>
                    <ModalHeader>Editar bitacora</ModalHeader>
                    <ModalBody>
                        <FormBitacora objeto={this.state.Form}/>
                    </ModalBody>
                    <ModalFooter>
                    <Button className="btn btn-danger" onClick={this.abrirModalEditar}>
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
            this.props.Lista.map(bitacora => {
                return <tr key={bitacora.idBitacora}>
                    <td>{(bitacora.idTipoMovimiento === 1) ? 'Compra' : 'Venta' }</td>
                    <td>{bitacora.monto}</td>
                    <td>{new Date(bitacora.fecRegistro).toLocaleDateString() + ' ' + 
                    new Date(bitacora.fecRegistro).toLocaleTimeString()}</td>
                    <td>{bitacora.idUsuario}</td>
                    <td>{bitacora.nombreCompleto}</td>
                    <td><Button onClick={()=>this.props.editar(bitacora)} className='btn btn-primary'>Editar</Button></td>
                </tr>
            })
        )
    }
}