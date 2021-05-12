import {DATA_STATUS} from '../../utils/configs/index';
const createleaveState = {
  listDataCreateLeave: DATA_STATUS,
};
const createleaveReducer = (state = createleaveState, action) => {
  switch (action.type) {
    case 'CREATELEAVE_SCREEN_CREATELEAVE':
      state = {...state, listDataCreateLeave: action.data.data};
      break;
  }
  return state;
};
export default createleaveReducer;
