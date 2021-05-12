import {DATA_STATUS} from '../../utils/configs/index'
const addleaveState={
    listDataAddLeave: [],
    
};
const addleaveReducer = (state = addleaveState, action) => {
    switch (action.type){
        case 'ADDLEAVE_SCREEN_ADDLEAVE':
            state = {...state, listDataAddLeave: action.data.data}; 
        break;
    }
    return state;
}



export default addleaveReducer;
