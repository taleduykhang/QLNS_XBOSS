import Servies from './Servies';
import {DATA_STATUS} from '../utils/configs';

export default class ResRequestService extends Servies {
  modelName() {
    return 'hr.holiday';
  }
  createRequest(fields = [], url, method) {
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
          console.log('kiem tra request tại reservice', resService);
          if (
            typeof resService === 'object' &&
            'data' in resService &&
            'error' in resService.data
          ) {
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
          console.log('kiem tra request tại rẹactService', rejectService);
          resolve({
            status: DATA_STATUS.FAILED,
            error: rejectService,
          });
        });
    });
  }
}
