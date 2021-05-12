import {DATA_STATUS} from '../../utils/configs/index';
const createRequestState = {
  dataCreateRequest: DATA_STATUS,
};
const createRequestReducer = (state = createRequestState, action) => {
  switch (action.type) {
    case 'REQUEST_SCREEN_REQUEST':
      state = {...state,dataCreateRequest: action.data.data};
      break;
  }
  return state;
};

export default createRequestReducer;
