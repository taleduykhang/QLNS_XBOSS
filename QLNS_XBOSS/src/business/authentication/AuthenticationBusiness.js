import AuthenticationServices from '../../services/authentication/AuthenticationServices';
import {DATA_STATUS, USER_GOOGLE} from '../../utils/configs';

export default class AuthenticationBusiness {
  loginGoogle = () => {
    return new Promise(async (resolve, reject) => {
      const authenticationServices = new AuthenticationServices();
      let authentication = await authenticationServices
        .loginGoogle()
        .catch((error) => {
          console.log('Login Google catched error: ', error);
          reject(error);
        });
      (USER_GOOGLE.name = authentication.data.user.name),
        (USER_GOOGLE.email = authentication.data.user.email),
        (USER_GOOGLE.image = authentication.data.user.photo),
        console.log(authentication);
      console.log(
        'kiem tra account login google',
        authentication.data.user.name,
      );
      if (authentication.status == DATA_STATUS.SUCCESS) {
        resolve({
          status: authentication.status,
          data: {
            userName: authentication.data.user.name,
            email: authentication.data.user.email,
            image: authentication.data.user.photo,
            //uid: authentication.data.user.uid,
          },
        });
      } else {
        reject(authentication);
      }
    });
  };
}
