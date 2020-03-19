import {DASHBOARD_DATA,COMPLAINTS_LIST_DATA,COMPLAINTS_DETAILS_DATA,REPLY_HISTORY_DATA,
  CLOSE_ACTION,CLOSE_REQUEST_CATEGORY} from '../actions/actionTypes'

const initialState ={
 dashboard :{},
 complaintsList:[],
 complaintsDetails:{},
 replyHistory:[],
 closeAction:[],
 closeRequestCategory:[],
 replyHistoryList:[]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case DASHBOARD_DATA:
        return {
          ...state,
          dashboard: action.dashboard
        };
        case COMPLAINTS_LIST_DATA:
        return {
          ...state,
          complaintsList: action.complaintsList
        };
        case COMPLAINTS_DETAILS_DATA:
            return{
                ...state,
                complaintsDetails:action.complaintsDetails
            }
            case CLOSE_ACTION:
            return{
                ...state,
                closeAction:action.closeAction
            }
            case CLOSE_REQUEST_CATEGORY:
              return{
                  ...state,
                  closeRequestCategory:action.closeRequestCategory
              }
              case REPLY_HISTORY_DATA:
                return{
                    ...state,
                    replyHistoryList:action.replyHistory
                }
      default:
        return state;
    }
  };
  
  export default reducer;