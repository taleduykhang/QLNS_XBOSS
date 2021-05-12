export function newAttendanceList(data) {
  return {
    type: 'NEWATTENDANCE_SCREEN_NEWATTENDANCE',
    data: data,
  };
}
export function searchListRequest(data) {
  return {
    type: 'NEWATTENDANCE_SCREEN_SEARCH_LIST',
    data: data,
  };
}
