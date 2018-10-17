import React, { Component } from "react";
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUsers, insertMessage } from '../../modules/users'
import styled from "styled-components";
const Wrapper = styled.div`
  display:flex;
  flex-direction:row;
  width:800px;
  height:auto;
  border: 6px solid rgba(28,110,164,0.38);
  border-radius: 0px 40px 0px 0px;
  padding:20px;
  margin:0 auto;
  margin-top:20px;
`;
const Foto = styled.div`
    height:350px;
    width:250px;
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
padding-bottom:10px;
`;
const SecondName = styled.div`
padding-bottom:10px;
`;
const Email = styled.div`
padding-bottom:10px;
`;
const Country = styled.div`
padding-bottom:10px;
`;
const ListaMensajes = styled.div`
>div{
  display:flex;
  justify-content: center;
  align-items:center;
  font-size:30px;
}
`;
const WrapTextArea = styled.div`
display:flex;
flex-direction:row;
>textarea{
  width:300px;
}
`;

class MiPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users.users,
      user: false,
      mensajes: [],
      soisAmigos: false,
      btnAmistadDisabled: false,
      msg: "",
    };

  }
  async componentDidMount() {
    let mensajes;
    let data;
  
    mensajes = this.getUserMessages(this.props.users.userId)
    data = this.getUserData(this.props.users.userId)
    this.setState({
      user: data,
      mensajes
    })
  }
  //recoge los mensajes del store segun la id del usuario
  getUserMessages(id) {
    let messages = this.props.users.mensajes
    let result = messages.filter(msg => msg.id === id)
    return result
  }
  //recogemos los datos del usuario de la web
  getUserData(id) {
    let data = this.props.users.users
    let result = data.filter(user => user.login.uuid === id)
    return result
  }
  //funcion asincrona que inserta mensaje en el store 
  async enviarMensaje() {
    await this.props.insertMessage({ id: this.state.user[0].login.uuid, msg: this.state.msg })
    let mensajes = this.state.mensajes.concat({ id: this.state.user[0].login.uuid, msg: this.state.msg })
    this.setState({ mensajes })
    this.setState({ msg: "" })
  }

  render() {
    return (
      <div>
        <h1>Mi perfil</h1>
        {this.state.user[0] &&
          <Wrapper>
            <Foto image={this.state.user[0].picture.medium}></Foto>
            <Datos>

              <Name>
                <div><label>nombre    :</label><FirstName>{this.state.user[0].name.first}</FirstName></div>
                <div><label>apellidos :</label><SecondName>{this.state.user[0].name.last}</SecondName></div>


                <div><label>Email</label><Email>{this.state.user[0].email}</Email></div>
                <div><label>Country</label><Country>{this.state.user[0].location.state}</Country></div>
              </Name>
              <WrapTextArea>
                <textarea value={this.state.msg} onChange={(event) => this.setState({ msg: event.target.value })}></textarea>
                <button onClick={() => this.enviarMensaje()}>
                  Send
            </button>
              </WrapTextArea>


            </Datos>
          </Wrapper>
        }

        <ListaMensajes>
          {this.state.mensajes.map(((msg, index) => {
            return <div key={index}>{msg.msg}</div>
          }))}
        </ListaMensajes>
      </div>
    );
  };
}



const mapStateToProps = ({ counter, users, mensajes, amigos, userId }) => ({
  users: users,
  mensajes: mensajes,
  amigos: amigos,
  userId: userId

})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUsers,
      insertMessage,
      changePage: () => push('/about-us')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiPerfil)
