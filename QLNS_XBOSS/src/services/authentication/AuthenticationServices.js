import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

import {GOOGLE_CONFIGS, DATA_STATUS} from '../../utils/configs';

export default class AuthenticationServices {
  loginGoogle = async () => {
    return new Promise(async (resolve, reject) => {
      GoogleSignin.configure({webClientId: GOOGLE_CONFIGS.WEB_CLIENT_ID});
      try {
        await GoogleSignin.hasPlayServices();
        let accountInfo = await GoogleSignin.signIn();
        resolve({
          status: DATA_STATUS.SUCCESS,
          data: accountInfo,
        });
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        } else if (error.code === statusCodes.IN_PROGRESS) {
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          reject({
            status: DATA_STATUS.FAILED,
            error: 'Play services not available or outdated',
          });
        } else {
          reject({
            status: DATA_STATUS.FAILED,
            error: 'Error when login Google',
          });
        }
      }
    });
  };
}
