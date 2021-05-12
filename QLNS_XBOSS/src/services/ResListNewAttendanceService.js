import Servies from './Servies';
import {DATA_STATUS} from '../utils/configs';

export default class UserService extends Servies {
  modelName() {
    return 'hr.holiday';
  }

  listNewAttendances(
    domain = [],
    fields = [],
    offset,
    limit,
    orderBy,
    url,
    method,
  ) {
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
