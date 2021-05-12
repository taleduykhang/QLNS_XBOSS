import Servies from './Servies';
import {DATA_STATUS} from '../utils/configs';

export default class UserService extends Servies {
  modelName() {
    return 'hr.employee';
  }

  login(username, password, database, url) {
    return new Promise((resolve, rejects) => {
      const params = {
        db: database,
        login: username,
        password: password,
      };
      this.post(params, url)
        .then((resService) => {
          if ('data' in resService && 'error' in resService.data) {
            resolve({
              status: DATA_STATUS.FAILED,
              data: resService,
            });
          } else {
            resolve({
              status: DATA_STATUS.SUCCESS,
              data: resService,
            });
          }
        })
        .catch((rejectService) => {
          rejects({
            status: DATA_STATUS.FAILED,
            error: rejectService,
          });
        });
    });
  }

  contact(id, display_name, email, phone) {
    return new Promise((resolve, rejects) => {
      const params = {
        id: id,
        name: display_name,
        email: email,
        phone: phone,
      };
    });
  }

  listPartners(domain = [], fields = [], offset, limit, orderBy, url, method) {
    return new Promise((resolve, rejects) => {
      const params = {
        model: this.modelName(),
        method: method,
        args: [domain, fields, offset, limit, orderBy],
        kwargs: {},
        context: {},
      };

      this.post(params, url)
        .then((resService) => {
          if ('data' in resService && 'error' in resService.data) {
            resolve({
              status: DATA_STATUS.FAILED,
              data: resService,
            });
          } else {
            resolve({
              status: DATA_STATUS.SUCCESS,
              data: resService,
            });
          }
        })
        .catch((rejectService) => {
          resolve({
            status: DATA_STATUS.FAILED,
            error: rejectService,
          });
        });
    });
  }
}
