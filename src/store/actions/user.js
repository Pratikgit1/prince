import {
    USER_DATA, AUTH_DATA, DASHBOARD_DATA, COMPLAINTS_LIST_DATA, COMPLAINTS_DETAILS_DATA,
    REPLY_HISTORY_DATA, CLOSE_ACTION, CLOSE_REQUEST_CATEGORY, COMPLAINTS_DATA, FORWARD_LEVEL, FORWARD_TO, SCREEN_TITLE, MINORITY_COMMUNITY,
    STATE_LIST, CITY_LIST, CUSTOMER_LIST_DATA, REQUEST_CAT, PENSION_TYPE, GRIEVANCE_CAT, COMPLAINT_TYPE, COMPLAINT_SOURCE,
    ADD_COMP_USER_DATA, PRODUCT_TYPE, SUB_TYPE, BRANCH, BRANCH_NAME,SELECTED_STATE,SELECTED_CITY,CUSTOMER_DETAIL,IS_PROFILE_UPDATED,
    CUSTOMER_COMPLAINTS,CUSTOMER_COMPLAINTS_ITEM,CGRO_REPORT_SEARCH_DATA,CGRO_REPORT_DATA,TOTAL_COUNT,USER_ROLE
} from './actionTypes';


export const addUser = (userData) => {
    return {
        type: USER_DATA,
        userData: userData

    };

};

export const addRole = (role) => {
    return {
        type: USER_ROLE,
        role: role

    };

};

export const addAuthData = (authData) => {
    return {
        type: AUTH_DATA,
        authData: authData

    };
};

export const setDashBoard = dashboard => {
    return {
        type: DASHBOARD_DATA,
        dashboard: dashboard
    };
};

export const setScreenTitle = data => {
    return {
        type: SCREEN_TITLE,
        titleData: data
    };
};

export const setComplaintsListData = complaintsList => {
    return {
        type: COMPLAINTS_LIST_DATA,
        complaintsList: complaintsList
    };
};  

export const setCGROReportSearchData = cgroreportData => {
    return {
        type: CGRO_REPORT_SEARCH_DATA,
        CGROReportSearchData: cgroreportData
    };
}; 


export const setCGROReportData = cgroreportData => {
    return {
        type: CGRO_REPORT_DATA,
        cgroreportData: cgroreportData
    };
}; 

export const setCustomerListData = data => {
    return {
        type: CUSTOMER_LIST_DATA,
        customerList: data
    };
};

export const setComplaintsDetails = dashboard => {
    return {
        type: COMPLAINTS_DETAILS_DATA,
        complaintsDetails: dashboard
    };
};

export const setMinorityCommunity = data => {
    return {
        type: MINORITY_COMMUNITY,
        minorityCommunity: data
    };
};

export const setState = data => {
    return {
        type: STATE_LIST,
        state: data
    };
};

export const setComplaint_source = data => {
    return {
        type: COMPLAINT_SOURCE,
        complaint_source: data
    };
};

export const setComplaint_type = data => {
    return {
        type: COMPLAINT_TYPE,
        complaint_type: data
    };
};

export const setGrievance_cat = data => {
    return {
        type: GRIEVANCE_CAT,
        grievance_cat: data
    };
};

export const setPension_type = data => {
    return {
        type: PENSION_TYPE,
        pension_type: data
    };
};

export const setRequest_cat = data => {
    return {
        type: REQUEST_CAT,
        request_cat: data
    };
};

export const setBranch = data => {
    return {
        type: BRANCH,
        branch: data
    };
};

export const setCustomerDetail = data => {
    return {
        type: CUSTOMER_DETAIL,
        customer_detail: data
    };
};

export const setCustomerComplaintList = data => {
    return {
        type: CUSTOMER_COMPLAINTS,
        customer_complaints: data
    };
};

export const setCustomerComplaintItem = data => {
    return {
        type: CUSTOMER_COMPLAINTS_ITEM,
        customer_complaints_item: data
    };
};


export const setAdd_Comp_user = data => {
    return {
        type: ADD_COMP_USER_DATA,
        user_data: data
    };
};

export const isProfileUpdated = data => {
    return {
        type: IS_PROFILE_UPDATED,
        IS_PROFILE_UPDATED: data
    };
};

export const totalCount = data => {
    return {
        type: TOTAL_COUNT,
        total_count: data
    };
};

export const setCity = data => {
    return {
        type: CITY_LIST,
        city: data
    };
};

export const setProduct_Type = data => {
    return {
        type: PRODUCT_TYPE,
        product_type: data
    };
};


export const setSub_Type = data => {
    return {
        type: SUB_TYPE,
        sub_type: data
    };
};


export const setReplyHistory = data => {
    return {
        type: REPLY_HISTORY_DATA,
        replyHistory: data
    };
};

export const setComplaintsData = data => {          ///////
    return {
        type: COMPLAINTS_DATA,
        complaintsData: data
    };
};

export const setForwardLevel = level => {
    return {
        type: FORWARD_LEVEL,
        forwardLevel: level
    };
};

export const setCLoseAction = replyHistory => {
    return {
        type: CLOSE_ACTION,
        closeAction: replyHistory
    };
};

export const setForwardToData = forwardLevel => {
    return {
        type: FORWARD_TO,
        forwardTo: forwardLevel
    };
};

export const setCLoseRequestCategory = replyHistory => {
    return {
        type: CLOSE_REQUEST_CATEGORY,
        closeRequestCategory: replyHistory
    };

};

export const setBranchName = data => {
    return {
        type: BRANCH_NAME,
        branchName: data
    };
};

export const setSelectedState = data => {
    return {
        type: SELECTED_STATE,
        selectedState: data
    };
};

export const setSelectedCity= data => {
    return {
        type: SELECTED_CITY,
        selectedCity: data
    };
};