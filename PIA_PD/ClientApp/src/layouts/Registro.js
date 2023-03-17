import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import controlUsuario from "../logic/Usuario";

function validarFormulario(objeto) {
  let valores = Object.values(objeto);
  for (let value of valores) {
    if (value.length < 3) {
      return false;
    }
  }
  return true;
}

export default class Registro extends Component {
  static displayName = Registro.name;
  constructor(props) {
    super(props);
    this.state = {
      Form: {
        idUsuario: 0,
        nombre: "",
        aPaterno: "",
        aMaterno: "",
        contra: "",
        usuario: "",
      },
    };
    this.handleSubmit = (e) => {
      e.preventDefault();
      alert(Object.values(this.state));
    };
    this.handleChange = (e) => {
      this.setState({
        Form: { ...this.state.Form, [e.target.name]: e.target.value },
      });
    };
    this.registrarUsuario = () => {
      let validacion = validarFormulario(this.state.Form);
      if (validacion == true) {
        controlUsuario
          .registrarUsuario(this.state.Form)
          .then((response) => {
            console.log(response);
            alert("Usuario registrado correctamente");
            window.location.href = "/";
          })
          .catch((error) => {
            console.log(error);
            alert("Error al registrar");
          });
      } else {
        alert("Rellene todos los datos correctamente");
      }
    };
    this.cancelar = () => {
      window.location.href = "/";
    }
    this.guardar = () => {
      this.registrarUsuario();
    };
  }
  render() {
    return (
      <div>
        <div className="maincontainer-1">
          <section className="vh-100">
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div className="card shadow-2-strong">
                    <div className="card-body p-5 text-center">
                      <h3 className="mb-3">Registro de usuario</h3>
                      <Form>
                        <FormGroup>
                          <Label for="nombre">Nombre&#40;s&#41;</Label>
                          <div className="input-group mb2">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              <i class="bi bi-person-circle"></i>
                            </span>
                            <Input
                              id="nombre"
                              name="nombre"
                              placeholder="Juan Pablo"
                              className="form-control form-control-md"
                              type="text"
                              required
                              minLength="3"
                              value={this.state.Form.nombre}
                              onChange={this.handleChange}
                            />
                          </div>
                        </FormGroup>
                        <FormGroup>
                          <Label for="aPaterno">Apellido Paterno</Label>
                          <div className="input-group mb2">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              <i class="bi bi-1-circle-fill"></i>
                            </span>
                            <Input
                              id="aPaterno"
                              name="aPaterno"
                              className="form-control form-control-md"
                              placeholder="Juan Pablo"
                              type="text"
                              required
                              minLength="3"
                              value={this.state.Form.aPaterno}
                              onChange={this.handleChange}
                            />
                          </div>
                        </FormGroup>
                        <FormGroup>
                          <Label for="aMaterno">Apellido Materno</Label>
                          <div className="input-group mb2">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              <i class="bi bi-2-circle-fill"></i>
                            </span>
                            <Input
                              id="aMaterno"
                              name="aMaterno"
                              className="form-control form-control-md"
                              placeholder="juanitoP"
                              type="text"
                              required
                              minLength="3"
                              value={this.state.Form.aMaterno}
                              onChange={this.handleChange}
                            />
                          </div>
                        </FormGroup>
                        <FormGroup>
                          <Label for="contra">Contraseña</Label>
                          <div className="input-group mb2">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              <i class="bi bi-lock-fill"></i>
                            </span>
                            <Input
                              id="contra"
                              name="contra"
                              className="form-control form-control-md"
                              placeholder="********"
                              type="password"
                              required
                              minLength="3"
                              value={this.state.Form.contra}
                              onChange={this.handleChange}
                            />
                          </div>
                        </FormGroup>
                        <FormGroup>
                          <Label for="usuario">Nombre de usuario</Label>
                          <div className="input-group mb2">
                            <span
                              className="input-group-text"
                              id="basic-addon1"
                            >
                              <i class="bi bi-person-badge-fill"></i>
                            </span>
                            <Input
                              id="usuario"
                              name="usuario"
                              className="form-control form-control-md"
                              placeholder="juanitoP"
                              type="text"
                              required
                              minLength="3"
                              pattern="[/^[a-z0-9_-]{3,16}$]"
                              value={this.state.Form.usuario}
                              onChange={this.handleChange}
                            />
                          </div>
                        </FormGroup>
                        <div className="d-flex justify-content-center py-2">
                          <Button
                            onClick={this.guardar}
                            className="btn btn-success me-3"
                          >
                            Guardar
                          </Button>
                          <Button onClick={this.cancelar} className="btn btn-warning">Cancelar</Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
