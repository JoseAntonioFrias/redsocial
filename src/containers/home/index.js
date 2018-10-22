import React, { Component } from "react";
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from "styled-components";
import { getUsers, setUserId, logout } from '../../modules/users'
import { Link } from 'react-router-dom'
const Wrapper = styled.div`
  display:flex;
  flex-direction:row;
  width:600px;
  height:200px;
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
display:flex;
flex-direction:column;
`;
const FirstName = styled.div`
margin-left:20px;
`;

const Email = styled.div`
margin-left:20px;
`;
const Country = styled.div`
margin-left:20px;
`;
const Login = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
margin-top:100px;
>input{
margin-bottom:10px;
}
`;
const Logout = styled.button`
position:absolute;
top:10px;

`;
const Row = styled.div`
display:flex;
`;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users.users,
      logged: false,
      textValue: "",
      passValue: ""
    };

  }
  async componentDidMount() {
    if (this.props.users.users === 0) {
      await this.props.getUsers();
    }

    if (this.props.users.userId) {
      this.setState({ logged: true })
    }

  }
  //filtramos  de los usuarios los q coinciden con el nombre usuario y pasword
  loguearse(userName, pass) {
    let result = this.props.users.users.filter(user =>
      user.login.username === userName && user.login.password)

    if (this.state.textValue.length > 0 && this.state.passValue.length > 0) {
      if (result.length === 0) {
        alert("debe introducir user y password correctos")
      } else {
        this.props.setUserId(result[0].login.uuid)
        this.setState({
          logged: true
        })
      }
    } else alert("debe introducir user y password correctos")

  };

  render() {
    const data = this.props.users.users;
    return (
      <div>

        {this.state.logged && <Logout onClick={() => { this.props.logout(); this.setState({ logged: false })}}>logout</Logout>}
        {this.state.logged ?

          data.length > 0 && data.map((user, index) =>
            user.login.uuid !== this.props.userId && <Wrapper key={index}>
              <Foto image={user.picture.thumbnail}></Foto>
              <Datos>

                <Name>
                  <Row><span>nombre    :</span><Link to={{ pathname: `/detalle/${user.name.first}`, state: user.login.uuid }} ><FirstName>{user.name.first}  {user.name.last}</FirstName> </Link></Row>

                </Name>

                <Row><span>mail             :</span><Email>{user.email}</Email></Row>
                <Row><span>ciudad    :</span><Country>{user.location.state}</Country></Row>
              </Datos>
            </Wrapper>
          )
          :
          <Login>
            user    <input placeholder="user" type="text" value={this.state.textValue} onChange={(event) => this.setState({ textValue: event.target.value })}></input>
            password<input placeholder="******" type="password" value={this.state.passValue} onChange={(event) => this.setState({ passValue: event.target.value })}></input>
            <button onClick={() => this.loguearse(this.state.textValue, this.state.passValue)}>login</button>
          </Login>
        }
      </div>
    );
  };
}



const mapStateToProps = ({ counter, users, userId }) => ({
  users: users,
  userId: userId
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUsers,
      setUserId,
      logout,
      changePage: () => push('/about-us')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

