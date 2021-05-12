import {DATA_STATUS} from '../../utils/configs/index';
const attendanceState = {
  listDataAttendance: [],
  status: DATA_STATUS.NONE,
  search: '',
};
const attendanceReducer = (state = attendanceState, action) => {
  switch (action.type) {
    case 'ATTENDANCE_SCREEN_LOAD_LIST':
      state = {
        ...state,
        listDataAttendance: action.data.data,
        status: action.data.status,
      };
      break;
    case 'ATTENDANCE_SCREEN_SEARCH_LIST':
      state = {...state, search: action.data};
      break;
  }
  return state;
};

export default attendanceReducer;
