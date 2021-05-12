import {DATA_STATUS} from '../../utils/configs/index';
const loginState = {
  test: 'Kiem tra login.................................',
  //informationAccounters: {},
  user: {
    id: 0,
    name: '',
    session: '',
    company_id: '',
  },
};
const loginReducer = (state = loginState, action) => {
  switch (action.type) {
    case 'LOGIN_SCREEN_LOGIN':
      state = {...state, informationAccounters: action.data.data};
      console.log('Kiem tra data', action.data);
      break;
    case 'DRAWER_SCREEN_LOGOUT':
      state = {
        user: {
          id: 0,
          name: '',
          session: '',
          company_id: '',
        },
      };
      break;
  }
  return state;
};
export default loginReducer;
