export const USERS_REQUESTED = 'users/USERS_REQUESTED'
export const USERS_SUCCES = 'users/USERS_SUCCES'
export const USER_ID = 'users/USER_ID'
export const INSERT_MSN = 'users/INSERT_MSN'
export const SOLICITAR_AMISTAD = 'users/SOLICITAR_AMISTAD'
export const ACEPTAR_AMISTAD = 'users/ACEPTAR_AMISTAD'
const initialState = {
  userId: null,
  users: 0,
  mensajes: [],
  amigos: [],
  solicitudes: [],
  isFetching: false,

}

export default (state = initialState, action) => {

  switch (action.type) {
    case USERS_REQUESTED:
      return {
        ...state,
        isFetching: true
      }

    case USERS_SUCCES:
      return {
        ...state,
        users: action.data,
        isFetching: !state.isFetching
      }
    case USER_ID:
      return {
        ...state,
        userId: action.data
      }
    case INSERT_MSN:
      return {
        ...state,
        mensajes: state.mensajes.concat(action.data)
      }
    case SOLICITAR_AMISTAD:
      let sol = state.solicitudes.concat(action.data)
      return {
        ...state,
        solicitudes: sol
      }
    case ACEPTAR_AMISTAD:
      let amigos = state.amigos.concat(action.data)

      return {
        ...state,
        amigos
      }

    default:
      return state
  }
}
export const insertMessage = (data) => {
  return async dispatch => {
    dispatch({
      type: INSERT_MSN,
      data
    })
  }
}
export const getUsers = () => {

  return async dispatch => {
    let data = false;
    var url = 'https://randomuser.me/api/?results=5&seed=foobar';
    await fetch(url, {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        data = response.results;

      });

    dispatch({
      type: USERS_SUCCES, data
    })
  }

}
export const setUserId = (data) => {
  return async dispatch => {
    dispatch({
      type: USER_ID,
      data
    })
  }
}
export const solicitarAmistad = (data) => {
  return async dispatch => {
    dispatch({
      type: SOLICITAR_AMISTAD,
      data
    })
  }
}

export const aceptarAmistad = (data) => {
  return async dispatch => {
    dispatch({
      type: ACEPTAR_AMISTAD,
      data
    })
  }
}
