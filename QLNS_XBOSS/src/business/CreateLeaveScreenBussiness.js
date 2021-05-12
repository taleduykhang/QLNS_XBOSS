import ResCreateLeaveService from '../services/ResCreateLeaveService';
import {DATA_STATUS, USER_PROFILE} from '../utils/configs/';
export default class CreateLeaveScreenBussiness {
  // domain : là điều kiện lọc , nếu [] là không lọc.
  // fields : là danh sách các fields cần lấy , nếu [] là lấy hết.
  // offset : vị trí bắt đâu lấy trên server.
  // limit : số lượng phần tử cần lấy.
  // orderBy : sấp xếp DESC , ASC theo 1 hay nhiều field chọn lựa.
  // url : địa chỉ url
  // method : tên function cần server thực hiện (vì đây là JsonRPC)

  getCreateLeaves = (fields = {}, url = '', method = '') => {
    return new Promise(async (resolve, reject) => {
      const resCreateLeaveService = new ResCreateLeaveService();
      let Createleaves = await resCreateLeaveService.CreateLeaves(
        fields,
        url,
        method,
      );
      if (Createleaves.status == DATA_STATUS.SUCCESS) {
        resolve(Createleaves);
      } else {
        resolve(Createleaves);
      }
    });
  };
}
