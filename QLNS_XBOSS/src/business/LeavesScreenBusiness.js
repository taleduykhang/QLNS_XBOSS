import ResLeaveService from '../services/ResLeaveService';
import {DATA_STATUS} from '../utils/configs/';

export default class LeavesScreenBusiness {

  
  // domain : là điều kiện lọc , nếu [] là không lọc.
  // fields : là danh sách các fields cần lấy , nếu [] là lấy hết.
  // offset : vị trí bắt đâu lấy trên server.
  // limit : số lượng phần tử cần lấy.
  // orderBy : sấp xếp DESC , ASC theo 1 hay nhiều field chọn lựa.
  // url : địa chỉ url
  // method : tên function cần server thực hiện (vì đây là JsonRPC)
  
    getListLeaves = (domain =[],fields=[],offset=0,limit=0,orderBy="",url="",method="") => {
      return new Promise(async (resolve, reject) => {
        const resLeaveService = new ResLeaveService();
        let leaves = await resLeaveService.listLeaves(domain,fields,offset,limit,orderBy,url,method)
        console.log("kt",leaves);
        if (leaves.status == DATA_STATUS.SUCCESS) {
          resolve(leaves)
        } else {
          resolve(leaves);
        }
      });
    };
  }