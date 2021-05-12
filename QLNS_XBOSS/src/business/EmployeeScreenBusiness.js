import ResEmployeeService from '../services/ResEmployeeService';
import {DATA_STATUS} from '../utils/configs/';
import ResLevelEmployeeService from '../services/ResLevelEmployeeService';
import ResPositionService from '../services/ResPositionService';
import ResDepartmentService from '../services/ResDepartmentService';
export default class EmployeeScreenBusiness {
  // domain : là điều kiện lọc , nếu [] là không lọc.
  // fields : là danh sách các fields cần lấy , nếu [] là lấy hết.
  // offset : vị trí bắt đâu lấy trên server.
  // limit : số lượng phần tử cần lấy.
  // orderBy : sấp xếp DESC , ASC theo 1 hay nhiều field chọn lựa.
  // url : địa chỉ url
  // method : tên function cần server thực hiện (vì đây là JsonRPC)

  getListEmployee = (
    domain = [],
    fields = [],
    offset = 0,
    limit = 0,
    orderBy = '',
    url = '',
    method = '',
  ) => {
    return new Promise(async (resolve, reject) => {
      const resEmployeeService = new ResEmployeeService();
      let employees = await resEmployeeService.listEmployees(
        domain,
        fields,
        offset,
        limit,
        orderBy,
        url,
        method,
      );
      if (employees.status == DATA_STATUS.SUCCESS) {
        resolve(employees);
      } else {
        resolve(employees);
      }
    });
  };
  getUpdateEmployee = (
    domain = [],
    fields = {},
    // offset = 0,
    // limit = 0,
    // orderBy = '',
    url = '',
    method = '',
  ) => {
    return new Promise(async (resolve, reject) => {
      const resEmployeeService = new ResEmployeeService();
      //console.log('KT update employee', updateEmployees);
      let updateEmployees = await resEmployeeService.updateDataEmployees(
        domain,
        fields,
        // offset,
        // limit,
        // orderBy,
        url,
        method,
      );
      if (updateEmployees.status == DATA_STATUS.SUCCESS) {
        resolve(updateEmployees);
      } else {
        resolve(updateEmployees);
      }
    });
  };
  getListDepartments = (
    domain = [],
    fields = [],
    offset = 0,
    limit = 0,
    orderBy = '',
    url = '',
    method = '',
  ) => {
    return new Promise(async (resolve, reject) => {
      const resDepartmentService = new ResDepartmentService();
      let departments = await resDepartmentService.listDepartment(
        domain,
        fields,
        offset,
        limit,
        orderBy,
        url,
        method,
      );
      if (departments.status == DATA_STATUS.SUCCESS) {
        resolve(departments);
      } else {
        resolve(departments);
      }
    });
  };
  getListPosition = (
    domain = [],
    fields = [],
    offset = 0,
    limit = 0,
    orderBy = '',
    url = '',
    method = '',
  ) => {
    return new Promise(async (resolve, reject) => {
      const resPositionService = new ResPositionService();
      let position = await resPositionService.listPosition(
        domain,
        fields,
        offset,
        limit,
        orderBy,
        url,
        method,
      );
      if (position.status == DATA_STATUS.SUCCESS) {
        resolve(position);
      } else {
        resolve(position);
      }
    });
  };
  getListLevelEmployee = (
    domain = [],
    fields = [],
    offset = 0,
    limit = 0,
    orderBy = '',
    url = '',
    method = '',
  ) => {
    return new Promise(async (resolve, reject) => {
      const resLevelEmployeeService = new ResLevelEmployeeService();
      let lvEmployee = await resLevelEmployeeService.listLevelEmployee(
        domain,
        fields,
        offset,
        limit,
        orderBy,
        url,
        method,
      );
      if (lvEmployee.status == DATA_STATUS.SUCCESS) {
        resolve(lvEmployee);
      } else {
        resolve(lvEmployee);
      }
    });
  };
}
