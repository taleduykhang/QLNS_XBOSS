// import ResUserIdService from '../services/ResUserIdService';
// import {DATA_STATUS} from '../utils/configs';

// export default class UserIdBusiness {


//   getUserId = (
    
//     fields = [],
 
//     url = '',
//     method = '',
//   ) => {
//     return new Promise(async (resolve, reject) => {
//       const resUserIdService = new ResUserIdService();
//       let userid = await resUserIdService.getUserId(
        
//         fields,
       
//         url,
//         method,
//       );
//       //console.log("kiem tra newattendence",listNewAttendances);
//       if (userid.status == DATA_STATUS.SUCCESS) {
//         resolve(userid);
//       } else {
//         resolve(userid);
//       }
//     });
//   };
// }
import ResUserIdService from '../services/ResUserIdService';
import {DATA_STATUS,EMPLOYEE_ID} from '../utils/configs';

export default class UserIdBusiness {

    employeeid = (uid='') => {
        try {
          return new Promise(async (resolve, reject) => {
            const resUserIdService = new ResUserIdService();
            let userid = await resUserIdService.getUserId(
            id,
             
            );
            if (userid.status == DATA_STATUS.SUCCESS) {
              let customData = {
                uid: userid.data.id != undefined ? userid.data.id : 0,
               
              };
             EMPLOYEE_ID.id = customData.id;
            
             console.log('customdataa',customData);
              resolve({
                
                data: customData,
                status: DATA_STATUS.SUCCESS,
              });
            } else {
              resolve(userid);
            }
          });
        } catch (error) {
          resolve({
            data: [],
            status: DATA_STATUS.FAILED,
          });
        }
      };
      
    getUserId = (
    domain = [],
    fields = [],
    offset = 0,
    limit = 0,
    orderBy = '',
    url = '',
    method = '',
  ) => {
    return new Promise(async (resolve, reject) => {
        const resUserIdService = new ResUserIdService();
        let userid = await resUserIdService.getUserId(
          
        domain,
        fields,
        offset,
        limit,
        orderBy,
        url,
        method,
      );
      console.log('kiem tra user id tại business', userid);
      if (userid.status == DATA_STATUS.SUCCESS) {
        resolve(userid);
      } else {
        resolve(userid);
      }
    });
  };
}
