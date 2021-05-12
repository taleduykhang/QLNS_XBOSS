import ResRequestService from '../services/ResRequestService';
import {DATA_STATUS} from '../utils/configs';

export default class RequestScreenBusiness {
  // domain : là điều kiện lọc , nếu [] là không lọc.
  // fields : là danh sách các fields cần lấy , nếu [] là lấy hết.
  // offset : vị trí bắt đâu lấy trên server.
  // limit : số lượng phần tử cần lấy.
  // orderBy : sấp xếp DESC , ASC theo 1 hay nhiều field chọn lựa.
  // url : địa chỉ url
  // method : tên function cần server thực hiện (vì đây là JsonRPC)

  createRequest = (
    fields = [],

    url = '',
    method = '',
  ) => {
    return new Promise(async (resolve, reject) => {
      const resRequestService = new ResRequestService();
      let request = await resRequestService.createRequest(
        fields,

        url,
        method,
      );
      //console.log("kiem tra newattendence",listNewAttendances);
      if (request.status == DATA_STATUS.SUCCESS) {
        resolve(request);
      } else {
        resolve(request);
      }
    });
  };
}
