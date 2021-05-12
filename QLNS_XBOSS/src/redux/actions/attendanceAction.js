// export function attendanceList(data){
//     return{
//         type:'ATTENDANCE_SCREEN_ATTENDANCE',
//         data: data,
//     }
// }
export function attendanceList(data) {
  return {
    type: 'ATTENDANCE_SCREEN_LOAD_LIST',
    data: data,
  };
}
export function searchList(data) {
  return {
    type: 'ATTENDANCE_SCREEN_SEARCH_LIST',
    data: data,
  };
}
