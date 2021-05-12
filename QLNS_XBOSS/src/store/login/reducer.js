import {
   HANDLE_IS_SPLASH,
   HANDLE_IS_LOGIN,
   HANDLE_OFF_LOGIN,
   LOGIN_SUCCESS
} from './action'

const initState = {
   isLogin: false,
   isSplash: true,
   SESSION_ID: null
}

const reducer = (state = initState, action) => {
   switch (action.type) {
      case HANDLE_IS_LOGIN:
         return {
            ...state,
            isLogin: true
         }
      case HANDLE_IS_SPLASH:
         return {
            ...state,
            isSplash: false
         }
      case HANDLE_OFF_LOGIN:
         return {
            ...state,
            isLogin: false
         }
      case LOGIN_SUCCESS:
         return {
            ...state,
            SESSION_ID: action.payload.session_id
         }
      default:
         return state
   }
}

export default reducer