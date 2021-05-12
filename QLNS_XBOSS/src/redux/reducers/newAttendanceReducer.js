import {DATA_STATUS} from '../../utils/configs/index';
const listNewAttendances = {
  listDataNewAttendance: [],
  status: DATA_STATUS.NONE,
  searchRequests: '',
};
const listNewAttendanceReducer = (state = listNewAttendances, action) => {
  switch (action.type) {
    case 'NEWATTENDANCE_SCREEN_NEWATTENDANCE':
      state = {
        ...state,
        listDataNewAttendance: action.data.data,
        status: action.data.status,
      };
      break;
    case 'NEWATTENDANCE_SCREEN_SEARCH_LIST':
      state = {...state, searchRequests: action.data};
  }

  return state;
};

export default listNewAttendanceReducer;
