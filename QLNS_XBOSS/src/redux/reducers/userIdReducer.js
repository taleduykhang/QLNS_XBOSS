import {DATA_STATUS} from '../../utils/configs/index';
const getUserIdState = {
  dataUser: DATA_STATUS,
};
const userIdReducer = (state = getUserIdState, action) => {
  switch (action.type) {
    case 'USERID_SCREEN_USERID':
      state = {...state,dataUser: action.data.data};
     
      break;
  }
  return state;
};

export default userIdReducer;
