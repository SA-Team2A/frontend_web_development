import { createStore } from 'redux'

export default createStore((state, action) => {
  switch(action.type){

    case 'LOG_IN':
      return {
        ...state,
        session: true
      }

    case 'LOG_OUT':
      return {
        ...state,
        session: false
      }

    default:
      return state
  }
},
{ session: !!localStorage.getItem('token') })
