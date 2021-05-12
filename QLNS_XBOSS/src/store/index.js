import { createStore } from 'redux'
import MyReducer from './root-reducer'

const Store = createStore(MyReducer)

export default Store