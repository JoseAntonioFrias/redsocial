import React, { Component } from "react";
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUsers, solicitarAmistad } from '../../modules/users'
import styled from "styled-components";
const Wrapper = styled.div`
  display:flex;
  flex-direction:row;
  width:500px;
  height:400px;
  border: 6px solid rgba(28,110,164,0.38);
border-radius: 0px 40px 0px 0px;
padding:20px;
margin:0 auto;
margin-top:20px;
`;
const Foto = styled.div`
    height:150px;
    width:150px;
    background-image:url(${props => props.image});
    background-size:contain;
`;
const Datos = styled.div`
margin-left:10px;
`;
const Name = styled.div`
>div{
  display:flex;
  flex-direction:row;
  >label{
    margin-right:10px;
  }
}
`;
const FirstName = styled.div`

`;
const SecondName = styled.div`

`;
const Email = styled.div`

`;
const Country = styled.div`

`;
const Mensajes = styled.div`
  display:flex;
  justify-content:center;
  flex-direction:column;
  align-items: center;
`;
const Solicitud = styled.div`
height:100px;
width:300px;

`;
class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users.users,
      user: false,
      mensajes: 0,
      soisAmigos: false,
      btnAmistadDisabled: false,
      solEnviada: false
    };

  }

  async componentDidMount() {
    let mensajes;
    let data;
    let soisAmigos = false
    let solEnviada = false
    
    mensajes = await this.getUserMessages(this.props.location.state)

    data = await this.getUserData(this.props.location.state)

    soisAmigos = this.comprobarAmistad()
    //comprobamos si tiene ya solicitud enviada
    solEnviada = this.comprobarSolicitud()
    
    this.setState({
      user: data,
      mensajes,
      soisAmigos,
      solEnviada
    })
  }
  //recogemos los mensajes del usuario del perfil visitado
  getUserMessages(id) {
    let messages = this.props.users.mensajes
    let result = messages.filter(msg => msg.id === id)
    return result
  }
  //recogemos los datos del usuario del perfil visitado
  getUserData(id) {
    let data = this.props.users.users
    let result = data.filter(user => user.login.uuid === id)

    return result
  }
  async solAmistad() {
    let users = this.props.users.users
    let user = users.filter(user => user.login.uuid === this.props.users.userId)
    let obj = { sol1: this.props.users.userId, sol2: this.props.location.state, nombre: user[0].login.username }

    await this.props.solicitarAmistad(obj)
    this.setState({ solEnviada: true })
  }
  //comprobamos si sois amigos devuelve bool para renderizar o no los mensajes
  comprobarAmistad() {
    //sol2 es el usuario y sol 1 al perfil al que entra
    let amigos = this.props.users.amigos;
    let bool = false

    for (var i = 0; i < amigos.length; i++) {
      if (this.props.location.state === amigos[i].sol1 || amigos[i].sol2 === this.props.location.state) {
        bool = true
        return bool
      }
    }

    return bool

  }
  //comprueba si ya tiene solicitud enviada
  comprobarSolicitud() {
    //sol2 es el usuario y sol 1 al perfil al que entra
    let solicitudes = this.props.users.solicitudes;

    let bool = false
    for (var i = 0; i < solicitudes.length; i++) {
      if (solicitudes[i].sol2 === this.props.location.state || solicitudes[i].sol1 === this.props.location.state) {
        bool = true
      }
    }

    return bool
  }

  render() {
    return (
      <div>

        {this.state.user[0] &&
          <Wrapper>
            <Foto image={this.state.user[0].picture.thumbnail}></Foto>
            <Datos>

              <Name>
                <div><label>nombre :</label><FirstName>{this.state.user[0].name.first}</FirstName></div>
                <div><label>apellidos :</label><SecondName>{this.state.user[0].name.last}</SecondName></div>
              </Name>
              <Name>
                <div><label>email :</label><Email>{this.state.user[0].email}</Email></div>
                <div><label>Country :</label><Country>{this.state.user[0].location.state}</Country></div>
              </Name>
              {!this.state.solEnviada && this.state.user[0].login.uuid !== this.props.users.userId &&
                <Solicitud >
                  <button onClick={() => this.solAmistad()}>Solicitar Amistad</button>
                </Solicitud>
              }

            </Datos>

          </Wrapper>

        }

        {this.state.soisAmigos &&
          this.state.mensajes.map((mensaje, index) => {
            return <div key={index}> <Mensajes><div >{mensaje.msg}</div> </Mensajes></div>
          })
        }

      </div>
    );
  };
}



const mapStateToProps = ({ counter, users, mensajes, amigos, userId, solicitudes }) => ({
  users: users,
  mensajes: mensajes,
  amigos: amigos,
  userId: userId,
  solicitudes: solicitudes
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUsers,
      solicitarAmistad,
      changePage: () => push('/about-us')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detalle)
