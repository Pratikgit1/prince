import {
    USER_DATA, AUTH_DATA, COMPLAINTS_DATA, FORWARD_LEVEL, FORWARD_TO, SCREEN_TITLE, MINORITY_COMMUNITY, STATE_LIST,
    CITY_LIST, CUSTOMER_LIST_DATA, REQUEST_CAT, PENSION_TYPE, GRIEVANCE_CAT, COMPLAINT_TYPE, COMPLAINT_SOURCE, ADD_COMP_USER_DATA,
    PRODUCT_TYPE, SUB_TYPE, BRANCH, BRANCH_NAME, SELECTED_STATE, SELECTED_CITY, CUSTOMER_DETAIL, IS_PROFILE_UPDATED, CUSTOMER_COMPLAINTS,
    CUSTOMER_COMPLAINTS_ITEM, CGRO_REPORT_SEARCH_DATA, CGRO_REPORT_DATA,TOTAL_COUNT,USER_ROLE
} from '../actions/actionTypes'

const initialState = {
    userData: {},
    authData: {},
    complaintsData: {},
    forwardLevelData: [],
    minorityCommunity: [],
    forwardToData: [],
    titleData: {},
    state: [],
    city: [],
    customerList: [],
    complaint_source: [],
    complaint_type: [],
    grievance_cat: [],
    pension_type: [],
    request_cat: [],
    product_type: [],
    sub_type: [],
    branch: [],
    branchName: {},
    selectedState: {},
    customer_detail: {},
    selectedCity: {},
    IS_PROFILE_UPDATED: {},
    customer_complaints: [],
    customer_complaints_item: {},
    cgro_report_search_data: {}, 
    total_count: {}, 
    cgro_report_data: [],
    role:{}

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_ROLE:
            return {
                ...state,
                role: action.role
            }
        case USER_DATA:
            return {
                ...state,
                userData: action.userData
            }
        case CGRO_REPORT_SEARCH_DATA:
            return {
                ...state,
                cgro_report_search_data: action.CGROReportSearchData
            }

        case CGRO_REPORT_DATA:
            return {
                ...state,
                cgro_report_data: action.cgroreportData
            }
            case TOTAL_COUNT:
                return {
                    ...state,
                    total_count: action.total_count
                }

        case CUSTOMER_DETAIL:
            return {
                ...state,
                customer_detail: action.customer_detail
            }
        case CUSTOMER_COMPLAINTS_ITEM:
            return {
                ...state,
                customer_complaints_item: action.customer_complaints_item
            }

        case AUTH_DATA:
            return {
                ...state,
                authData: action.authData
            }
        case IS_PROFILE_UPDATED:
            return {
                ...state,
                IS_PROFILE_UPDATED: action.IS_PROFILE_UPDATED
            }

        case COMPLAINTS_DATA:
            return {
                ...state,
                complaintsData: action.complaintsData
            }

        case CUSTOMER_COMPLAINTS:
            return {
                ...state,
                customer_complaints: action.customer_complaints
            }
        case FORWARD_LEVEL:
            return {
                ...state,
                forwardLevelData: action.forwardLevel
            }
        case FORWARD_TO:
            return {
                ...state,
                forwardToData: action.forwardTo
            }
        case MINORITY_COMMUNITY:
            return {
                ...state,
                minorityCommunity: action.minorityCommunity
            }

        case STATE_LIST:
            return {
                ...state,
                state: action.state
            }

        case CITY_LIST:
            return {
                ...state,
                city: action.city
            }

        case SCREEN_TITLE:
            return {
                ...state,
                titleData: action.titleData
            }
        case CUSTOMER_LIST_DATA:
            return {
                ...state,
                customerList: action.customerList
            }


        case COMPLAINT_SOURCE:
            return {
                ...state,
                complaint_source: action.complaint_source
            }
        case COMPLAINT_TYPE:
            return {
                ...state,
                complaint_type: action.complaint_type
            }
        case GRIEVANCE_CAT:
            return {
                ...state,
                grievance_cat: action.grievance_cat
            }
        case PENSION_TYPE:
            return {
                ...state,
                pension_type: action.pension_type
            }
        case REQUEST_CAT:
            return {
                ...state,
                request_cat: action.request_cat
            }

        case ADD_COMP_USER_DATA:
            return {
                ...state,
                user_Data: action.user_data
            }
        case PRODUCT_TYPE:
            return {
                ...state,
                product_type: action.product_type
            }
        case SUB_TYPE:
            return {
                ...state,
                sub_type: action.sub_type
            }

        case BRANCH:
            return {
                ...state,
                branch: action.branch
            }

        case BRANCH_NAME:
            return {
                ...state,
                branchName: action.branchName
            }
        case SELECTED_STATE:
            return {
                ...state,
                selectedState: action.selectedState
            }
        case SELECTED_CITY:
            return {
                ...state,
                selectedCity: action.selectedCity
            }


        default:
            return state
    }
}

export default reducer