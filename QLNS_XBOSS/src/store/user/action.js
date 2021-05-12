const HANDLE_ADD_USER = "HANDLE_ADD_USER"
const LIST_USER = "LIST_USER"


const actHandleAddUser = (user) => {
   return {
      type: HANDLE_ADD_USER,
      payload: {
         user
      }
   }
}
const actHandleListUser = (listUser) => {
   return {
      type: LIST_USER,
      payload: {
         listUser
      }
   }
}

export {
   HANDLE_ADD_USER,
   LIST_USER,
   actHandleAddUser,
   actHandleListUser
}