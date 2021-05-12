import Servies from './Servies';
import {DATA_STATUS} from '../utils/configs';
export default class ResCreateLeaveService extends Servies {
  modelName() {
    return 'hr.leave';
  }

  CreateLeaves(fields = {}, url, method) {
    return new Promise((resolve, rejects) => {
      const params = {
        model: this.modelName(),
        method: method,
        args: [fields],
        kwargs: {},
        context: {},
      };

      this.post(params, url)
        .then((resService) => {
          console.log('kt res', resService);
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
          console.log('kt catch', rejectService);
          resolve({
            status: DATA_STATUS.FAILED,
            error: rejectService,
          });
        });
    });
  }
}