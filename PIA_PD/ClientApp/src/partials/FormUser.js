import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import controlUsuario from '../logic/Usuario';

function validarFormulario(objeto){
    let valores = Object.values(objeto);
    for(let value of valores){
        if(value.length < 3){
            return false;
        }
    }
    return true;
}

export default class FormUser extends Component{
    static displayName = FormUser.name;
    constructor (props) {
        super(props);
        this.state = {
            Form :{
                idUsuario : 0,
                nombre : "",
                aPaterno : "",
                aMaterno : "",
                contra : "",
                usuario : "",
            }
        }
        this.handleChange = (e) => {
            this.setState({Form:{...this.state.Form, [e.target.name]: e.target.value} })
        }
        this.registrarUsuario = ()=>{
            let validacion = validarFormulario(this.state.Form);
            if(validacion == true){
                controlUsuario.registrarUsuario(this.state.Form).then(response=>{
                    console.log(response);
                    alert("Usuario registrado correctamente");
                    window.location.reload();
                }).catch(error => {
                    console.log(error);
                    alert("Error al registrar");
                })
            }else{
                alert("Rellene todos los datos correctamente");
            }
        }
        this.editarUsuario = ()=>{
            let validacion = validarFormulario(this.state.Form);
            if(validacion == true){
                controlUsuario.editarUsuario(this.state.Form).then(response=>{
                    console.log(response);
                    alert("Usuario registrado correctamente");
                    window.location.reload();
                }).catch(error => {
                    console.log(error);
                    alert("Error al registrar");
                })
            }else{
                alert("Rellene todos los datos correctamente");
            }
        }
        this.guardar = ()=>{
            if(this.state.Form.idUsuario == 0){
                this.registrarUsuario();
            }else{
                this.editarUsuario();
            }
        }
    }
    componentDidMount() {
        console.log(this.props.objeto);
        (this.props.objeto != undefined)?this.setState({Form:this.props.objeto}):this.setState({Form:this.state.Form});
    }
    render(){
        return(
            <div>
                <Form>
                    <FormGroup>
                        <Label for="nombre">Nombre&#40;s&#41;</Label>
                        <Input id="nombre" name="nombre" placeholder="Juan Pablo" type="text" required
                        value={this.state.Form.nombre} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="aPaterno">Apellido Paterno</Label>
                        <Input id="aPaterno" name="aPaterno" placeholder="Juan Pablo" type="text" required
                        value={this.state.Form.aPaterno} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="aMaterno">Apellido Materno</Label>
                        <Input id="aMaterno" name="aMaterno" placeholder="juanitoP" type="text" required
                        value={this.state.Form.aMaterno} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="contra">Contraseña</Label>
                        <Input id="contra" name="contra" placeholder="********" type="password" required
                        value={this.state.Form.contra} onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="usuario">Nombre de usuario</Label>
                        <Input id="usuario" name="usuario" placeholder="juanitoP" type="text" required pattern='[/^[a-z0-9_-]{3,16}$]'
                        value={this.state.Form.usuario} onChange={this.handleChange}/>
                    </FormGroup>
                    <div className='d-flex justify-content-center py-2'>
                        <Button onClick={this.guardar} className="btn btn-success">
                            Guardar
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}