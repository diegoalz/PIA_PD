import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export default class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border border-dark box-shadow py" container dark>
          <NavbarBrand tag={Link} to="landing"><div className=""><img className="ico" src={require('./../assets/img/dolar.png')} /></div></NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem >
                <NavLink tag={Link} className="navh" to="usuarios">Usuarios<i className="bi bi-people-fill m-1"></i></NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="navh" to="bitacora">Bitacora<i className="bi bi-table m-1"></i></NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="navh" to="movimiento">Compra-Venta<i className="bi bi-currency-exchange m-1"></i></NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="navh" to="dashboard">Dashboard<i className="bi bi-bar-chart-line-fill m-1"></i></NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="navhred" to="/">Log Out<i class="bi bi-door-closed-fill m-1"></i></NavLink>
              </NavItem>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
