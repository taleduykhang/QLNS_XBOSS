import ResAddLeaveService from '../services/ResAddLeaveService';
import {DATA_STATUS} from '../utils/configs/';
export default class AddLeavesScreenBussiness {

  
    // domain : là điều kiện lọc , nếu [] là không lọc.
    // fields : là danh sách các fields cần lấy , nếu [] là lấy hết.
    // offset : vị trí bắt đâu lấy trên server.
    // limit : số lượng phần tử cần lấy.
    // orderBy : sấp xếp DESC , ASC theo 1 hay nhiều field chọn lựa.
    // url : địa chỉ url
    // method : tên function cần server thực hiện (vì đây là JsonRPC)
    
      getListLeavesType = (domain=[] ,url="",method="") => {
        return new Promise(async (resolve, reject) => {
          const resLeaveTypeService = new ResAddLeaveService();
          let leavesType = await resLeaveTypeService.AddlistLeaves(domain,url,method)
          let z = leavesType.data[0];
          console.log("kt leavesType",z[1]);
          //console.log("kt leavesType 111", leavesType);
          if (leavesType.status == DATA_STATUS.SUCCESS) {
            resolve(leavesType)
          } else {
            resolve(leavesType);
          }
        });
      };
    }