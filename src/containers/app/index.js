import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import GestionSolicitudes from '../gestionSolicitudes'
import Detalle from '../detalle'
import MiPerfil from '../miPerfil'
import styled from "styled-components";
const Cabecera = styled.header`
display:flex;
justify-content:center;
justify-content:space-around;
align-items:center;
background: deepskyblue;
height:50px;
`;
const App = () => (
  <div>
    <Cabecera>
      <Link to="/">Home</Link>
      <Link to="/gestion">Gestion Solicitudes</Link>
      <Link to="/MiPerfil">Mi perfil</Link>
    </Cabecera>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/gestion" component={GestionSolicitudes} />
      <Route exact path="/MiPerfil" component={MiPerfil} />
      <Route exact path="/detalle/:pathparams" component={Detalle} />
    </main>
  </div>
)

export default App
