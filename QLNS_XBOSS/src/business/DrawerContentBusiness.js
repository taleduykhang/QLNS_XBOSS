import ResLogoutService from '../services/ResLogoutService';
import {DATA_STATUS} from '../utils/configs/';
export default class DrawerContentBusiness {
  logout = (url = '') => {
    return new Promise(async (resolve, reject) => {
      const resLogoutService = new ResLogoutService();
      let userLogout = await resLogoutService.logout(url);
      if (userLogout.status == DATA_STATUS.SUCCESS) {
        // có thể xử lý custom data cho gọn , đẹp rồi hãy trả về View.
        resolve(userLogout);
      } else {
        resolve(userLogout);
      }
    });
  };
}
