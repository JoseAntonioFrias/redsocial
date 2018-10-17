import React, { Component } from "react";
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUsers, aceptarAmistad } from '../../modules/users'
// import styled from "styled-components";


class GestionSolicitudes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users.users,
      user: false,
      solicitudes: 0,
      btnDisabled: false

    };

  }
  async componentDidMount() {
    let result = this.props.users.solicitudes.filter(solicitud => solicitud.sol2 === this.props.users.userId)
    this.setState({ solicitudes: result })


  }
  //recoge los datos del usuario
  getUserData(id) {
    let data = this.props.users.users
    let result = data.filter(user => user.login.uuid === id)

    return result
  }
  //aceptar solicitud llama al action aceptarAmistad de redux y agrega al store al amigo
  aceptarSolicitud(solicitud) {
    console.log(solicitud)
    this.props.aceptarAmistad(solicitud)
    this.setState({ btnDisabled: true })
  }
  //rechaza la solicitud de amistad, borra del store la solicitud
  rechazarSolicitud() {
    console.log("rechazando")
  }

  render() {
    return (
      <div>
        <h1>Solicitudes</h1>
        {this.state.solicitudes.length > 0 ? this.state.solicitudes.map((solicitud) => {
          return (
            <div>solicitud de : <span >{solicitud.nombre}</span><button disabled={this.state.btnDisabled} onClick={() => this.aceptarSolicitud({ sol1: solicitud.sol1, sol2: this.props.users.userId })}>aceptar</button><button onClick={() => this.rechazarSolicitud()}>rechazar</button></div>
          )
        }) : <div>no hay solicitudes</div>}







      </div>
    );
  };
}



const mapStateToProps = ({ counter, users, solicitudes, amigos, userId }) => ({
  users: users,
  solicitudes: solicitudes,
  amigos: amigos,
  userId: userId

})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUsers,
      aceptarAmistad,
      changePage: () => push('/about-us')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GestionSolicitudes)

