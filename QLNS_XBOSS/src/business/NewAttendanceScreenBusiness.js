import ResListNewAttendanceService from '../services/ResListNewAttendanceService';
import {DATA_STATUS} from '../utils/configs/';

export default class NewAttendanceScreenBusiness {
  // domain : là điều kiện lọc , nếu [] là không lọc.
  // fields : là danh sách các fields cần lấy , nếu [] là lấy hết.
  // offset : vị trí bắt đâu lấy trên server.
  // limit : số lượng phần tử cần lấy.
  // orderBy : sấp xếp DESC , ASC theo 1 hay nhiều field chọn lựa.
  // url : địa chỉ url
  // method : tên function cần server thực hiện (vì đây là JsonRPC)

  getlistNewAttendance = (
    domain = [],
    fields = [],
    offset = 0,
    limit = 0,
    orderBy = '',
    url = '',
    method = '',
  ) => {
    return new Promise(async (resolve, reject) => {
      const resListNewAttendanceService = new ResListNewAttendanceService();
      let listnewattendance = await resListNewAttendanceService.listNewAttendances(
        domain,
        fields,
        offset,
        limit,
        orderBy,
        url,
        method,
      );
      //console.log("kiem tra newattendence",listNewAttendances);
      if (listnewattendance.status == DATA_STATUS.SUCCESS) {
        resolve(listnewattendance);
      } else {
        resolve(listnewattendance);
      }
    });
  };
}
