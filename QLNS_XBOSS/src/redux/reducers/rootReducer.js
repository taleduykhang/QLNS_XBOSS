import {combineReducers} from 'redux';
import loginReducer from '../reducers/loginReducer';
import employeesReducer from '../reducers/employeesReducer';
import settingReducer from '../reducers/settingReducer';
import leavesReducer from '../reducers/leavesReducer';
import addleaveReducer from '../reducers/addleaveReducer';
import attendanceReducer from '../reducers/attendanceReducer';
import requestReducer from '../reducers/requestReducer';
import createleaveReducer from '../reducers/createleaveReducer';
import listNewAttendanceReducer from '../reducers/newAttendanceReducer';
import userIdReducer from '../reducers/userIdReducer';
const rootReducer = combineReducers({
  loginReducer,
  employeesReducer,
  settingReducer,
  leavesReducer,
  addleaveReducer,
  attendanceReducer,
  listNewAttendanceReducer,
  requestReducer,
  createleaveReducer,
  userIdReducer,
});

export default rootReducer;
