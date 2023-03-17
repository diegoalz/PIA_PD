import React, { Component } from 'react';
import usuarioControl from '../logic/Usuario';
import {Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';
import FormUser from '../partials/FormUser';
import controlUsuario from '../logic/Usuario';

export default class TablaUsuarios extends Component{
    static displayName = TablaUsuarios.name;
    constructor (props) {
        super(props);
        this.state = {
            Lista : [],
            modalCrear : false,
            modalEliminar : false,
            modalEditar : false,
            Form :{
                idUsuario : 0,
                nombre : "",
                aPaterno : "",
                aMaterno : "",
                contra : "",
                usuario : "",
            }
        }
        // Peticion para cargar los datos
        this.cargarDatos = ()=>{
            usuarioControl.listaUsuarios().then(response=>{
                console.log(response.data);
                this.setState({Lista:response.data});
            }).catch(error=>{
                alert(error);
            });
        }
        // Funciones para abrir y cerrar modales
        this.abrirModalEditar = (usuario)=>{
            this.setState({Form:usuario});
            this.setState({modalEditar : (this.state.modalEditar == false)?true:false});
        }
        this.abrirModalCrear = ()=>{
            this.setState({modalCrear : (this.state.modalCrear == false)?true:false});
        }
        this.abrirModalEliminar = (usuario)=>{
            this.setState({Form:usuario});
            this.setState({modalEliminar : (this.state.modalEliminar == false)?true:false});
        }
        // Funcion para dar de baja
        this.bajaUsuario = ()=>{
            controlUsuario.bajaUsuario(this.state.Form).then(response=>{
                console.log(response);
                alert("Usuario dado de baja correctamente");
                window.location.reload();
            }).catch(error => {
                console.log(error);
                alert("Error al dar de baja");
            })
        }
    }
    // Cargar funciones al renderizar
    componentDidMount() {
        this.cargarDatos();
    }
    render(){
        return(
            <div className='maincontainer-1'>
            <div className="container text-center">
                <div className="table-responsive py-4">
                    <div className='table-wrapper'>
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-8"><h2>Detalle de <b>Usuario</b></h2></div>
                                    <div className="col-sm-4">
                                        <Button type="button" className="btn btn-success add-new" onClick={this.abrirModalCrear}>
                                            Crear usuario
                                        </Button>
                                    </div>
                            </div>
                        </div>
                        <div className="table-container">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Apellido</th>
                                    <th scope="col">Contraseña</th>
                                    <th scope="col">UserName</th>
                                    <th scope="col">Estatus</th>
                                    <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <CrearRegistro Lista={this.state.Lista} borrar={this.abrirModalEliminar} editar={this.abrirModalEditar}/>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


                <Modal isOpen={this.state.modalCrear}>
                    <ModalHeader>Crear usuario</ModalHeader>
                    <ModalBody>
                        <FormUser/>
                    </ModalBody>
                    <ModalFooter>
                    <Button className="btn btn-primary" onClick={this.abrirModalCrear}>
                        Cancelar
                    </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalEditar}>
                    <ModalHeader>Editar usuario</ModalHeader>
                    <ModalBody>
                        <FormUser objeto={this.state.Form}/>
                    </ModalBody>
                    <ModalFooter>
                    <Button className="btn btn-primary" onClick={this.abrirModalEditar}>
                        Cancelar
                    </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalEliminar}>
                    <div className='d-flex justify-content-center'>
                        <ModalHeader>Eliminar usuario</ModalHeader>
                    </div>
                    <ModalBody>
                        <h5 className='text-center'>¿Esta seguro que quiere borrar el siguiente usuario?</h5>
                        <div>
                            <p className='d-flex justify-content-center my-5'><i class="bi bi-person-circle me-2"></i>Usuario: {this.state.Form.nombre}</p>
                        </div>
                        {/* <p>{this.state.Form.idUsuario}</p> */}
                    </ModalBody>
                    <ModalFooter className='d-flex justify-content-center'>
                    <Button onClick={this.bajaUsuario} className='btn btn-danger'>
                        Borrar
                    </Button>{' '}
                    <Button className='btn btn-primary' onClick={this.abrirModalEliminar}>
                        Cancelar
                    </Button>
                    </ModalFooter>
                </Modal>
            </div>

        );
    }
}
// Componentes para dibujar registros
class CrearRegistro extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            this.props.Lista.map(usuario => {
                return <tr key={usuario.idUsuario}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.aPaterno + " " + usuario.aMaterno}</td>
                            <td>{new Date(usuario.fecRegistro).toLocaleDateString()}</td>
                            <td>{usuario.usuario}</td>
                            <td>{(usuario.isActivo==true)?"Activo":"Inactivo"}</td>
                            <td><Button onClick={()=>this.props.borrar(usuario)} className='btn btn-danger me-2'>Borrar</Button><Button onClick={()=>this.props.editar(usuario)} className="btn btn-primary">Editar</Button></td>
                        </tr>
                        })
        )
    }
}