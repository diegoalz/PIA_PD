import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import controlBitacora from '../logic/Bitacora';

function validarFormulario(objeto){
    if(objeto.monto <= 0){
        return false;
    }else{
        return true;
    }
}

export default class FormBitacora extends Component{
    static displayName = FormBitacora.name;
    constructor (props) {
        super(props);
        this.state = {
            Form :{
                idBitacora : 0,
                idTipoMovimiento : 1,
                monto : 0
            },
            Fecha_compra : undefined,
            Fecha_venta : undefined
        }
        this.handleChange = (e) => {
            this.setState({Form:{...this.state.Form, [e.target.name]: e.target.value} })
        }
        this.agregarBitacora = ()=>{
            let validacion = validarFormulario(this.state.Form)
            if(validacion == true){

                controlBitacora.agregarBitacora(this.state.Form).then(response=>{
                    window.location.reload();
                }).catch(error => {
                    alert("Error al agregar");
                })
            }else{
                alert("Coloque un valor mayor a 0");
            }
        }
        this.modificarBitacora = ()=>{
            let validacion = validarFormulario(this.state.Form);
            if(validacion == true){
                controlBitacora.modificarBitacora(this.state.Form).then(response=>{
                    console.log(response);
                    alert("Bitacora actualizada correctamente");
                    window.location.reload();
                }).catch(error => {
                    alert("Error al registrar");
                })
            }else{
                alert("Coloque un valor mayor a 0");
            }
        }
        this.guardar = ()=>{
            if(this.state.Form.idBitacora == 0){
                this.agregarBitacora();
            }else{
                this.modificarBitacora();
            }
        }
    }
    componentDidMount() {
        (this.props.objeto != undefined)?this.setState({Form:this.props.objeto}):this.setState({Form:this.state.Form});
        const tipoMovimiento = document.getElementById("idTipoMovimiento");
        (this.props.objeto != undefined)?tipoMovimiento.disabled = true:tipoMovimiento.disabled = false;
    }
    render(){
        return(
            <div>
                <Form>
                    <FormGroup>
                        <Label for="idTipoMovimiento">Tipo de movimiento</Label>
                        <Input type="select" name="idTipoMovimiento" id="idTipoMovimiento" value={this.state.Form.idTipoMovimiento} onChange={this.handleChange}>
                            <option value={Number(1)}>Compra</option>
                            <option value={Number(2)}>Venta</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="monto">Monto</Label>
                        <Input id="monto" name="monto" placeholder="$0" type="number" step="0.01"
                        value={this.state.Form.monto} onChange={this.handleChange}/>
                    </FormGroup>
                    <div className='d-flex justify-content-center py-2'> 
                        <Button onClick={this.guardar} className='btn btn-success '>
                            Guardar
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}