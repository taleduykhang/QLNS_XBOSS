import ResCompanyService from '../services/ResCompanyService';
import ResLanguageService from '../services/ResLanguageService';
import {DATA_STATUS} from '../utils/configs/';

export default class SettingBusiness {
  // domain : là điều kiện lọc , nếu [] là không lọc.
  // fields : là danh sách các fields cần lấy , nếu [] là lấy hết.
  // offset : vị trí bắt đâu lấy trên server.
  // limit : số lượng phần tử cần lấy.
  // orderBy : sấp xếp DESC , ASC theo 1 hay nhiều field chọn lựa.
  // url : địa chỉ url
  // method : tên function cần server thực hiện (vì đây là JsonRPC)

  getListCompany = (
    domain = [],
    fields = [],
    offset = 0,
    limit = 0,
    orderBy = '',
    url = '',
    method = '',
  ) => {
    return new Promise(async (resolve, reject) => {
      const resCompanyService = new ResCompanyService();
      let company = await resCompanyService.listCompany(
        domain,
        fields,
        offset,
        limit,
        orderBy,
        url,
        method,
      );
      if (company.status == DATA_STATUS.SUCCESS) {
        resolve(company);
      } else {
        resolve(company);
      }
    });
  };
  getChangeCompany = (
    domain = [],
    fields = {},
    // offset = 0,
    // limit = 0,
    // orderBy = '',
    url = '',
    method = '',
  ) => {
    return new Promise(async (resolve, reject) => {
      const resCompanyService = new ResCompanyService();
      //console.log('KT update employee', updateEmployees);
      let changeCompany = await resCompanyService.changeDataCompany(
        domain,
        fields,
        // offset,
        // limit,
        // orderBy,
        url,
        method,
      );
      if (changeCompany.status == DATA_STATUS.SUCCESS) {
        resolve(changeCompany);
      } else {
        resolve(changeCompany);
      }
    });
  };
  getListLanguage = (domain = [], fields = [], url = '', method = '') => {
    return new Promise(async (resolve, reject) => {
      const resLanguageService = new ResLanguageService();
      let language = await resLanguageService.listLanguage(
        domain,
        fields,
        url,
        method,
      );
      if (language.status == DATA_STATUS.SUCCESS) {
        resolve(language);
      } else {
        resolve(language);
      }
    });
  };
  getChangeLanguage = (domain = [], fields = [], url = '', method = '') => {
    return new Promise(async (resolve, reject) => {
      const resLanguageService = new ResLanguageService();
      //console.log('KT update employee', updateEmployees);
      let changeLanguage = await resLanguageService.changeLanguage(
        domain,
        fields,
        // offset,
        // limit,
        // orderBy,
        url,
        method,
      );
      if (changeLanguage.status == DATA_STATUS.SUCCESS) {
        resolve(changeLanguage);
      } else {
        resolve(changeLanguage);
      }
    });
  };
}
