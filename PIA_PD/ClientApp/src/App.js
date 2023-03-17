import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
// import AppRoutes from './AppRoutes';
// import { Layout } from './components/Layout';
import Login from './layouts/Login';
import Panel from './layouts/Panel';
import Registro from './layouts/Registro';
import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <>
        <Routes>
          <Route path='/' element={<Login/ >} />
          <Route path='/panel/*' element={<Panel/ >} />
          <Route path='/registro' element={<Registro/ >} />
        </Routes>
      </>
    );
  }
}
