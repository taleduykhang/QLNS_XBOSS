export function employeeList(data) {
  return {
    type: 'EMPLOYEE_SCREEN_EMPLOYEE',
    data: data, //{data}
  };
}
export function searchListEmployee(data) {
  return {
    type: 'EMPLOYEE_SCREEN_SEARCH_LIST',
    data: data,
  };
}
