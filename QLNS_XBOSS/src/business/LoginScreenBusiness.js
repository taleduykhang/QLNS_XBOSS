import ResUserService from '../services/ResPartnerService';
import {DATA_STATUS, USER_PROFILE} from '../utils/configs';
export default class LoginScreenBusiness {
  login = (userName = '', password = '', database = '', url = '') => {
    try {
      return new Promise(async (resolve, reject) => {
        const resUserService = new ResUserService();
        let userInfo = await resUserService.login(
          userName,
          password,
          database,
          url,
        );

        if (userInfo.status == DATA_STATUS.SUCCESS) {
          let customData = {
            uid: userInfo.data.uid != undefined ? userInfo.data.uid : 0,
            name: userInfo.data.name != undefined ? userInfo.data.name : '',
            session:
              userInfo.data.session_id != undefined
                ? userInfo.data.session_id
                : '',
            company_id:
              userInfo.data.company_id != undefined
                ? userInfo.data.company_id
                : '',
            user_context:
              userInfo.data.user_context.lang != undefined
                ? userInfo.data.user_context.lang
                : '',
            user_companies:
              userInfo.data.user_companies.current_company[1] != undefined
                ? userInfo.data.user_companies.current_company[1]
                : '',
            company_id:
              userInfo.data.company_id != undefined
                ? userInfo.data.company_id
                : '',
          };
          USER_PROFILE.id = customData.uid;
          USER_PROFILE.name = customData.name;
          USER_PROFILE.company = customData.user_companies;
          USER_PROFILE.id_company = customData.company_id;
          USER_PROFILE.language = customData.user_context;
          console.log('Kiem tra ngon ngu user:', customData.user_context);
          console.log('Kiem tra công ty user:', customData.user_companies);
          console.log('Kiem tra id user:', customData.uid);
          resolve({
            data: customData,
            status: DATA_STATUS.SUCCESS,
          });
        } else {
          resolve(userInfo);
        }
      });
    } catch (error) {
      resolve({
        data: [],
        status: DATA_STATUS.FAILED,
      });
    }
  };
  // domain : là điều kiện lọc , nếu [] là không lọc.
  // fields : là danh sách các fields cần lấy , nếu [] là lấy hết.
  // offset : vị trí bắt đâu lấy trên server.
  // limit : số lượng phần tử cần lấy.
  // orderBy : sấp xếp DESC , ASC theo 1 hay nhiều field chọn lựa.
  // url : địa chỉ url
  // method : tên function cần server thực hiện (vì đây là JsonRPC)
  getListUsers = (
    domain = [],
    fields = [],
    offset = 0,
    limit = 0,
    orderBy = '',
    url = '',
    method = '',
  ) => {
    return new Promise(async (resolve, reject) => {
      const resUserService = new ResUserService();
      let users = await resUserService.listUsers(
        domain,
        fields,
        offset,
        limit,
        orderBy,
        url,
        method,
      );
      if (users.status == DATA_STATUS.SUCCESS) {
        // có thể xử lý custom data cho gọn , đẹp rồi hãy trả về View.
        resolve(users);
      } else {
        reject(users);
      }
    });
  };
}
