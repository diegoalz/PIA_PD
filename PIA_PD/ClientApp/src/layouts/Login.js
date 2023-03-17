import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import controlUsuario from "../logic/Usuario";

export default class Login extends Component {
  static displayName = Login.name;
  constructor(props) {
    super(props);
    this.state = {
      Usuario: "",
      Contra: "",
    };
    this.handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };
    this.handleSubmit = (e) => {
      e.preventDefault();
      alert(Object.values(this.state));
    };
    this.loginUsuario = () => {
      if (this.state.Usuario.length <= 3 || this.state.Contra.length == 0) {
        alert("Caracteres insuficientes");
      } else {
        controlUsuario
          .login(this.state)
          .then((response) => {
            console.log(response.data);
            if (response.data.IdUsuario != 0) {
              if (response.data.isActivo == true) {
                localStorage.Usuario = this.state.Usuario;
                localStorage.IdUsuario = response.data.idUsuario;
                // localStorage.clear();
                window.location.href = "/panel/landing";
              } else {
                alert("Cuenta no disponible");
              }
            } else {
              alert("El usuario no existe");
            }
          })
          .catch((error) => {
            console.log(error);
            alert("Error al registrar");
          });
      }
    };
    this.registro = () => {
      window.location.href = "/registro";
    };
  }
  render() {
    return (
      <div className="maincontainer-3">
        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong">
                  <div className="card-body p-5 text-center">
                    <h3 className="mb-5">Ingresar al sistema</h3>
                    <Form>
                      <FormGroup>
                        <div className="input-group mb-2">
                          <span class="input-group-text" id="basic-addon1">
                            <i class="bi bi-person-fill"></i>
                          </span>
                          <Input
                            id="Usuario"
                            name="Usuario"
                            placeholder="username"
                            className="form-control form-control-lg"
                            type="text"
                            value={this.state.Usuario}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                        <Label for="Usuario" className="form-label">
                          Nombre de usuario
                        </Label>
                      </FormGroup>
                      <FormGroup>
                        <div class="input-group mb-2">
                          <span class="input-group-text" id="basic-addon1">
                            <i class="bi bi-exclamation-circle-fill"></i>
                          </span>
                          <Input
                            id="Contra"
                            name="Contra"
                            placeholder="********"
                            className="form-control form-control-lg"
                            type="password"
                            value={this.state.Contra}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                        <Label for="Contra" className="form-label">
                          Contraseña
                        </Label>
                      </FormGroup>
                      <Button
                        onClick={this.loginUsuario}
                        className="btn btn-success btn-lg btn-block"
                      >
                        Ingresar <i class="bi bi-box-arrow-in-right"></i>
                      </Button>
                      <Button
                        onClick={this.registro}
                        className="btn btn-primary btn-lg btn-block ms-3"
                      >
                        Registrar <i class="bi bi-pencil-square"></i>
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
