export function leavesList(data) {
  return {
    type: 'LEAVE_SCREEN_LEAVE',
    data: data,
  };
}
export function searchListLeave(data) {
  return {
    type: 'LEAVE_SCREEN_SEARCH_LIST',
    data: data,
  };
}
