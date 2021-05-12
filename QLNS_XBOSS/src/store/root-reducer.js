import { combineReducers } from 'redux'
import LoginReducer from './login/reducer'
import UserReducer from './user/reducer'

const myReducer = combineReducers({
   Auth: LoginReducer,
   User: UserReducer
})

export default myReducer