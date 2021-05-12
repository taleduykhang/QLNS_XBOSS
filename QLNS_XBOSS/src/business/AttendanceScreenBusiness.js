import ResAttendanceService from '../services/ResAttendanceService';
import {DATA_STATUS} from '../utils/configs/';

export default class AttendanceScreenBusiness {
  // domain : là điều kiện lọc , nếu [] là không lọc.
  // fields : là danh sách các fields cần lấy , nếu [] là lấy hết.
  // offset : vị trí bắt đâu lấy trên server.
  // limit : số lượng phần tử cần lấy.
  // orderBy : sấp xếp DESC , ASC theo 1 hay nhiều field chọn lựa.
  // url : địa chỉ url
  // method : tên function cần server thực hiện (vì đây là JsonRPC)

  getListAttendance = (
    domain = [],
    fields = [],
    offset = 0,
    limit = 0,
    orderBy = '',
    url = '',
    method = '',
  ) => {
    return new Promise(async (resolve, reject) => {
      const resAttendanceService = new ResAttendanceService();
      let attendances = await resAttendanceService.listAttendances(
        domain,
        fields,
        offset,
        limit,
        orderBy,
        url,
        method,
      );
      console.log('kiem tra attendence', attendances);
      if (attendances.status == DATA_STATUS.SUCCESS) {
        resolve(attendances);
      } else {
        resolve(attendances);
      }
    });
  };
}
