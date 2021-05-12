import {DATA_STATUS} from '../../utils/configs/index';
const employeeState = {
  listDataEmployee: [],
  status: DATA_STATUS.NONE,
  update_Employee: DATA_STATUS,
  listDataPosition: [],
  listDataLV: [],
  listDataDepartment: [],
  searchEmployee: '',
};
const employeeReducer = (state = employeeState, action) => {
  switch (action.type) {
    case 'EMPLOYEE_SCREEN_EMPLOYEE':
      state = {...state, listDataEmployee: action.data.data};
    case 'UPDATE_EMPLOYEE_SCREEN_DETAIL_EMPLOYEE':
      state = {...state, update_Employee: action.data.data};
      console.log('Kiem tra update employee tren reducer', action.data);
    case 'LV_EMPLOYEE_SCREEN_DETAIL_EMPLOYEE':
      state = {...state, listDataLV: action.data.data};
    case 'POSITION_SCREEN_DETAIL_EMPLOYEE':
      state = {...state, listDataPosition: action.data.data};
    case 'DEPARTMENT_SCREEN_DETAIL_EMPLOYEE':
      state = {...state, listDataDepartment: action.data.data};
      break;
    case 'EMPLOYEE_SCREEN_SEARCH_LIST':
      state = {...state, searchEmployee: action.data};
      break;
  }
  return state;
};

export default employeeReducer;
