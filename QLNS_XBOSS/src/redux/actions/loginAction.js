export function login(username, password, database, url) {
  return {
    type: 'LOGIN_SCREEN_LOGIN',
    data: {username, password, url},
  };
}
