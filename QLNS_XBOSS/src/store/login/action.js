const HANDLE_IS_LOGIN = 'HANDLE_IS_LOGIN';
const HANDLE_IS_SPLASH = 'HANDLE_IS_SPLASH';
const HANDLE_OFF_SPLASH = 'HANDLE_OFF_SPLASH';
const HANDLE_OFF_LOGIN = 'HANDLE_OFF_LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const actHandleIsLogin = () => {
  return {
    type: HANDLE_IS_LOGIN,
  };
};
const actHandleIsSplash = () => {
  return {
    type: HANDLE_IS_SPLASH,
  };
};
const actHandleLogout = () => {
  return {
    type: HANDLE_OFF_LOGIN,
  };
};
const actLOGIN_SUCCESS = (session_id) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      session_id
    }
  }
}

export {
  actHandleIsLogin,
  actHandleIsSplash,
  actHandleLogout,
  actLOGIN_SUCCESS,
  HANDLE_IS_LOGIN,
  HANDLE_IS_SPLASH,
  HANDLE_OFF_LOGIN,
  LOGIN_SUCCESS
};
