import {DATA_STATUS} from '../../utils/configs/index';
const settingState = {
  listDataCompany: [],
  changeDataCompany: DATA_STATUS,
  changeDataLanguage: DATA_STATUS,
  listDataLanguage: [],
};
const settingReducer = (state = settingState, action) => {
  switch (action.type) {
    case 'COMPANY_SCREEN_SETTING':
      state = {...state, listDataCompany: action.data.data};
      break;
    case 'CHANGE_COMPANY_SCREEN_SETTING':
      state = {...state, changeDataCompany: action.data.data};
      break;
    case 'CHANGE_LANGUAGE_SCREEN_SETTING':
      state = {...state, changeDataLanguage: action.data.data};
      break;
    case 'LANGUAGE_SCREEN_SETTING':
      state = {...state, listDataLanguage: action.data.data};
      break;
  }
  return state;
};

export default settingReducer;
