import {DATA_STATUS} from '../../utils/configs/index';
const leaveState = {
  listDataLeave: [],
  status: DATA_STATUS.NONE,
  searchLeaves: '',
};
const leavesReducer = (state = leaveState, action) => {
  switch (action.type) {
    case 'LEAVE_SCREEN_LEAVE':
      state = {...state, listDataLeave: action.data.data};
      break;
    case 'LEAVE_SCREEN_SEARCH_LIST':
      state = {...state, searchLeaves: action.data};
  }
  return state;
};

export default leavesReducer;
