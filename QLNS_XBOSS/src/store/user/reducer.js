
import { HANDLE_ADD_USER, LIST_USER } from './action'

const initialState = {
   listUser: [],
   listUserSuccessed: []
}


const reducer = (state = initialState, action) => {
   switch (action.type) {
      case HANDLE_ADD_USER:
         return {
            ...state,
            listUserSuccessed: action.payload.user
         }
      case LIST_USER:
         return {
            ...state,
            listUser: action.payload.listUser
         }

      default:
         return state
   }

}

export default reducer