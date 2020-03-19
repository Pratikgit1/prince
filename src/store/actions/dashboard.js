import { AsyncStorage } from "react-native";
import { TRY_FORGOTPASS, AUTH_ID, DASHBOARD_DATA } from './actionTypes';
import {
    uiStartLoading, uistopLoading, authUserKeyData, setDashBoard, setDashBoardListData,
    setComplaintsDetails, setComplaintsListData, setMinorityCommunity, setState, setCustomerListData, setComplaint_source, setComplaint_type
    , setGrievance_cat, setPension_type, setRequest_cat, setAdd_Comp_user, setBranch, authGetToken, authGetUserName, authGetRole, authGetbr_code
    , authGetUser_type, setCustomerDetail, setCustomerComplaintList,addUser
} from '../actions/index'
import configureStore from '../../store/configureStore';
import { Navigation } from 'react-native-navigation';
import { Provider } from "react-redux";
import {
    DASHBOARD, KEY, NEW_COMPLAINTS, COMPLAINTS_DETAILS, SEARCH_COMPLAINTS, MINORITY_COMMUNITY, STATE, COMP_SOURCE_TYPE,
    CUSTOMER_MY_COMPLAINTS, PROFILE_DETAILS
} from '../../utility/urlConstant'
import { COLOR } from '../../utility/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import ReplyHistory from "../../assets/history-icon.png";
import AsyncStorageReact from '@react-native-community/async-storage';

const store = configureStore();

export const dashboard = (role) => {
    return dispatch => {
        dispatch(authDashBoard(role));
    };
};

export const dashboardClicked = () => {
    return dispatch => {
        dispatch(dashboardClickedItem());
    };
};

export const trySearchComplaints = (data) => {
    return dispatch => {
        dispatch(trySearchComplaintsAPI(data));
    };
};

export const minorityCommunity = (role) => {
    return dispatch => {
        dispatch(minorityCommunityAPI(role));
    };
};



export const addState = () => {
    return dispatch => {
        dispatch(selectStateAPI());
    };
};


export const trySearchComplaintsData = (data) => {
    return dispatch => {
        dispatch(trySearchComplaintsAPI(data));
    };
};


export const complaintsDetails = (data, screen) => {
    return dispatch => {
        dispatch(complaintsDetailsData(data, screen));
    };
};


export const AddComplaintsData = (data) => {
    return dispatch => {
        dispatch(AddComplaintsDataAPI(data));
    };
};

export const CGROReportData = () => {
    return dispatch => {
        dispatch(CGROReportAPI());
    };
};


export const profileDetail = (state) => {
    return dispatch => {
        dispatch(profileDetaileAPI(state));
    };
};


export const tryGetComplaintsList = (url,c_status) => {
    return dispatch => {
        dispatch(tryGetComplaintsListAPI(url,c_status));
    };
};

export const AddComplaintsDataCustomer = (data) => {
    return dispatch => {
        dispatch(AddComplaintsDataAPI(data));
    };
};

export const tryGetComplaintsListAPI = (url,c_status) => {

    return dispatch => {

        dispatch(uiStartLoading())
        let formData = new FormData();


        formData.append('key', KEY.KEY_VALUE);
        formData.append('c_status',c_status);

        dispatch(authGetUserName())
            .catch(() => {
                //  alert("Invalid Credential");
            })
            .then(userName => {
                formData.append('username', userName);
                fetch(url, {
                    method: "POST",

                    body: formData
                })
                    .catch(err => {
                        console.log(err)
                        alert("Authentication failed, please try again!");
                        dispatch(uistopLoading())
                    })
                    .then(res => res.json())
                    .then(parsedRes => {
                        console.log(parsedRes);

                        dispatch(uistopLoading())



                        if (parsedRes.status === "false") {
                            alert(parsedRes.response);
                        } else {

                            let customer_complaints = [];

                            for (let key in parsedRes.data) {
                                customer_complaints.push({
                                    id: parsedRes.data[key].id,
                                    created_on: parsedRes.data[key].created_on,
                                    Complaint_no: parsedRes.data[key].Complaint_no,
                                    reopen: parsedRes.data[key].reopen,
                                    c_status: parsedRes.data[key].c_status,
                                    UserCode: parsedRes.data[key].UserCode,
                                    key: key
                                });
                            }

                            dispatch(setCustomerComplaintList(customer_complaints));


                        }
                    });
            })


    }
};


export const profileDetaileAPI = (state) => {

    return dispatch => {

        dispatch(uiStartLoading())
        let formData = new FormData();


        formData.append('key', KEY.KEY_VALUE);

        dispatch(authGetUserName())
            .catch(() => {
                //  alert("Invalid Credential");
            })
            .then(userName => {
                formData.append('username', userName);
                fetch(PROFILE_DETAILS.PROFILE_DETAILS_URL, {
                    method: "POST",

                    body: formData
                })
                    .catch(err => {
                        console.log(err)
                        alert("Authentication failed, please try again!");
                        dispatch(uistopLoading())
                    })
                    .then(res => res.json())
                    .then(parsedRes => {
                        console.log(parsedRes);

                        dispatch(uistopLoading())



                        if (parsedRes.status === "false") {
                           // alert(parsedRes.response);
                        } else {

                            let customer_detail = {};
                            customer_detail = { ...parsedRes.data["0"] }
                            // for (let key in state) {
                            //     if (state[key].StateCode===parsedRes.data["0"].state) {
                            //         customer_detail= {
                            //             ...parsedRes.data["0"],
                            //             state:state[key].StateNm
                            //         }
                            //     }

                            // }
                            updateProfileData()
                            dispatch(setCustomerDetail(customer_detail));
                         if(state!=="")
                            callCustomerProfile()
                        }
                    });
            })


    }
};


const updateProfileData = async (user, authData) => {
    try {
         await AsyncStorageReact.setItem("ap:auth:updated", "1");
      
    } catch (e) {
        console.log(e)
    }
}

const callCustomerProfile = () => {
    Navigation.mergeOptions('CustomerDashBoard', {
        sideMenu: {
            left: {
                visible: false
            },
        }
    });

    Navigation.push("CustomerDashBoard", {

        component: {
            id: 'CustomerProfile',
            name: 'orgs.CustomerProfile',
            options: {
                topBar: {
                    visible: true,

                    title: {
                        text: "PROFILE", alignment: "center"
                    },
                }
            },
        },
    });


}


export const CGROReportAPI = () => {

    return dispatch => {

        dispatch(uiStartLoading())
        let formData = new FormData();


        formData.append('key', KEY.KEY_VALUE);
        fetch(COMP_SOURCE_TYPE.COMP_SOURCE_TYPE_URL, {
            method: "POST",

            body: formData
        })
            .catch(err => {
                console.log(err)
                alert("Authentication failed, please try again!");
                dispatch(uistopLoading())
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);

                dispatch(uistopLoading())



                if (parsedRes.status === "false") {
                    alert(parsedRes.response);
                } else {

                    let complaint_source = [];
                    let complaint_type = [];
                    let grievance_cat = [];
                    let pension_type = [];
                    let request_cat = [];
                    let branch = [];


                    for (let key in parsedRes.complaint_source) {
                        complaint_source.push({
                            ...parsedRes.complaint_source[key],
                            id: parsedRes.complaint_source[key].id,
                            name: parsedRes.complaint_source[key].name,
                            key: key
                        });
                    }

                    for (let key in parsedRes.complaint_type) {
                        complaint_type.push({
                            ...parsedRes.complaint_type[key],
                            id: parsedRes.complaint_type[key].id,
                            name: parsedRes.complaint_type[key].name,
                            key: key
                        });
                    }

                    for (let key in parsedRes.grievance_cat) {
                        grievance_cat.push({
                            ...parsedRes.grievance_cat[key],
                            id: parsedRes.grievance_cat[key].id,
                            name: parsedRes.grievance_cat[key].name,
                            key: key
                        });
                    }

                    for (let key in parsedRes.pension_type) {
                        pension_type.push({
                            ...parsedRes.pension_type[key],
                            id: parsedRes.pension_type[key].id,
                            name: parsedRes.pension_type[key].name,
                            key: key
                        });
                    }

                    for (let key in parsedRes.request_cat) {
                        request_cat.push({
                            ...parsedRes.request_cat[key],
                            id: parsedRes.request_cat[key].id,
                            name: parsedRes.request_cat[key].name,
                            key: key
                        });
                    } 

                   

                    for (let key in parsedRes.branch) {
                        branch.push({
                            ...parsedRes.branch[key],
                            id: parsedRes.branch[key].id,
                            BR_CODE: parsedRes.branch[key].BR_CODE,
                            BR_NAME: parsedRes.branch[key].BR_NAME,
                            key: key
                        });
                    }

                    // grievance_cat.splice(0,0,{id:"",
                    //     name:"--Select Category --",
                    //     key:2222}),

                    //     request_cat.splice(0,0,{id:"",
                    //     name:"--Select Request Category--",
                    //     key:2222}),

                    //     complaint_source.splice(0,0,{id:"",
                    //     name:"--Select--",
                    //     key:2222}),

                    //     complaint_type.splice(0,0,{id:"",
                    //     name:"--Select--",
                    //     key:2222}),

                    dispatch(setComplaint_source(complaint_source));
                    dispatch(setComplaint_type(complaint_type));
                    dispatch(setGrievance_cat(grievance_cat));
                    dispatch(setPension_type(pension_type));
                    dispatch(setRequest_cat(request_cat));
                    dispatch(setBranch(branch));



                    // dispatch(setComplaintsDetailsData(complaints));




                }
            });
    }
};

export const AddComplaintsDataAPI = (data) => {

    return dispatch => {

        dispatch(uiStartLoading())
        let formData = new FormData();


        formData.append('key', KEY.KEY_VALUE);
        fetch(COMP_SOURCE_TYPE.COMP_SOURCE_TYPE_URL, {
            method: "POST",

            body: formData
        })
            .catch(err => {
                console.log(err)
                alert("Authentication failed, please try again!");
                dispatch(uistopLoading())
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);

                dispatch(uistopLoading())



                if (parsedRes.status === "false") {
                    alert(parsedRes.response);
                } else {

                    let complaint_source = [];
                    let complaint_type = [];
                    let grievance_cat = [];
                    let pension_type = [];
                    let request_cat = [];
                    let branch = [];


                    for (let key in parsedRes.complaint_source) {
                        complaint_source.push({
                            ...parsedRes.complaint_source[key],
                            id: parsedRes.complaint_source[key].id,
                            name: parsedRes.complaint_source[key].name,
                            key: key
                        });
                    }

                    for (let key in parsedRes.complaint_type) {
                        complaint_type.push({
                            ...parsedRes.complaint_type[key],
                            id: parsedRes.complaint_type[key].id,
                            name: parsedRes.complaint_type[key].name,
                            key: key
                        });
                    }

                    for (let key in parsedRes.grievance_cat) {
                        grievance_cat.push({
                            ...parsedRes.grievance_cat[key],
                            id: parsedRes.grievance_cat[key].id,
                            name: parsedRes.grievance_cat[key].name,
                            key: key
                        });
                    }

                    for (let key in parsedRes.pension_type) {
                        pension_type.push({
                            ...parsedRes.pension_type[key],
                            id: parsedRes.pension_type[key].id,
                            name: parsedRes.pension_type[key].name,
                            key: key
                        });
                    }

                    for (let key in parsedRes.request_cat) {
                        request_cat.push({
                            ...parsedRes.request_cat[key],
                            id: parsedRes.request_cat[key].id,
                            name: parsedRes.request_cat[key].name,
                            key: key
                        });
                    }

                    for (let key in parsedRes.branch) {
                        branch.push({
                            ...parsedRes.branch[key],
                            id: parsedRes.branch[key].id,
                            BR_CODE: parsedRes.branch[key].BR_CODE,
                            BR_NAME: parsedRes.branch[key].BR_NAME,
                            key: key
                        });
                    }

                    dispatch(setComplaint_source(complaint_source));
                    dispatch(setComplaint_type(complaint_type));
                    dispatch(setGrievance_cat(grievance_cat));
                    dispatch(setPension_type(pension_type));
                    dispatch(setRequest_cat(request_cat));
                    dispatch(setBranch(branch));
                   
                    if (data === "customer") {
                        callAddComplaintScreenCustomer()
                    }
                    else {
                        dispatch(addUser(data));
                        callAddComplaintScreen()
                    }



                    // dispatch(setComplaintsDetailsData(complaints));




                }
            });
    }
};

const callAddComplaintScreenCustomer = () => {

    Navigation.push("CustomerDashBoard", {
        component: {
            id: "AddComplaintsCustomer",
            name: 'orgs.AddComplaintsCustomer',
            options: {
                topBar: {
                    title: {
                        text: "Add Complaints",
                        alignment: "center",
                        fontSize: 16,
                        // color: 'red',
                        fontFamily: "Poppins-Bold",
                    },

                }
            }
        },


        options: {
            topBar: {
                visible: true,
            },
            statusBar: {
                visible: true,
            },
        },




    });



};

const callAddComplaintScreen = () => {


    Promise.all([
        Icon.getImageSource("md-menu", 50)

    ]).then(sources => {
        Navigation.push("DashBoard", {

            component: {
                id: "AddComplaints",
                name: 'orgs.AddComplaints',
                options: {
                    topBar: {
                        title: {
                            text: "Add Complaints",
                            alignment: "center",
                            fontSize: 16,
                            // color: 'red',
                            fontFamily: "Poppins-Bold",
                        },
                        // rightButtons: [
                        //     {
                        //         id: 'sideDrawerRight',
                        //         icon: sources[0],

                        //         color: COLOR.ICON_COLOR,
                        //     },
                        // ],
                    }
                }
            },


            options: {
                topBar: {
                    visible: true,
                },
                statusBar: {
                    visible: true,
                },
            },

        });

    });


};


export const selectStateAPI = () => {

    return dispatch => {

        dispatch(uiStartLoading())
        let formData = new FormData();


        formData.append('key', KEY.KEY_VALUE);
        fetch(STATE.STATE_URL, {
            method: "POST",

            body: formData
        })
            .catch(err => {
                console.log(err)
                alert("Authentication failed, please try again!");
                dispatch(uistopLoading())
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);

                dispatch(uistopLoading())



                if (parsedRes.status === "false") {
                   // alert(parsedRes.response);
                } else {

                    let states = [];


                    for (let key in parsedRes.states) {
                        states.push({
                            ...parsedRes.states[key],
                            id: parsedRes.states[key].id,
                            StateCode: parsedRes.states[key].StateCode,
                            StateNm: parsedRes.states[key].StateNm,

                            key: key
                        });
                    }

                    dispatch(setState(states));


                    // dispatch(setComplaintsDetailsData(complaints));




                }
            });
    }
};

export const minorityCommunityAPI = (role) => {

    return dispatch => {

        dispatch(uiStartLoading())
        let formData = new FormData();


        formData.append('key', KEY.KEY_VALUE);
        fetch(MINORITY_COMMUNITY.MINORITY_COMMUNITY_URL, {
            method: "POST",

            body: formData
        })
            .catch(err => {
                console.log(err)
                alert("Authentication failed, please try again!");
                dispatch(uistopLoading())
            })
            .then(res => res.json())

            .catch(err => {
                console.log(err)
                alert(err);
                dispatch(uistopLoading())
            })
            .then(parsedRes => {
                console.log(parsedRes);

                dispatch(uistopLoading())



                if (parsedRes.status === "false") {
                   // alert(parsedRes.response);
                } else {

                    let minority_community = [];


                    for (let key in parsedRes.minority_community) {
                        minority_community.push({
                            ...parsedRes.minority_community[key],
                            id: parsedRes.minority_community[key].id,
                            Minor_code: parsedRes.minority_community[key].Minor_code,
                            Minority: parsedRes.minority_community[key].Minority,

                            key: key
                        });
                    }

                    dispatch(setMinorityCommunity(minority_community));
                    if (role != "8") {
                        callAddCustomercreen(role)
                    }


                    // dispatch(setComplaintsDetailsData(complaints));




                }
            });
    }
};

const callAddCustomercreen = (role) => {

    Navigation.push("DashBoard", {

        component: {
            id: 'AddCustomer',
            name: 'orgs.AddCustomer',
            options: {
                topBar: {
                    visible: true,

                    title: {
                        text: (role === "8" ? "PROFILE" : "ADD CUSTOMER"), alignment: "center"
                    },
                }
            },
        },
    });

};

export const trySearchComplaintsAPI = authData => {

    return dispatch => {

        dispatch(uiStartLoading())
        let formData = new FormData();
        formData.append('details', authData.email);

        formData.append('key', KEY.KEY_VALUE);
        fetch(SEARCH_COMPLAINTS.SEARCH_COMPLAINTS_URL, {
            method: "POST",

            body: formData
        })
            .catch(err => {
                console.log(err)
                alert("Authentication failed, please try again!");
                dispatch(uistopLoading())
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);

                dispatch(uistopLoading())



                if (parsedRes.status === "false") {
                    alert(parsedRes.response);
                } else {

                    let customer_details = [];

                    let complaint_details = [];

                    if(parsedRes.customer_details.length < 1){
                        alert(parsedRes.response);
                    }


                    for (let key in parsedRes.complaint_details) {
                        complaint_details.push({
                            ...parsedRes.complaint_details[key],
                            id: parsedRes.complaint_details[key].id,
                            UserCode: parsedRes.complaint_details[key].UserCode,
                            created_on: parsedRes.complaint_details[key].created_on,
                            Complaint_no: parsedRes.complaint_details[key].Complaint_no
                            ,
                            key: key
                        });
                    }

                    for (let key in parsedRes.customer_details) {
                        customer_details.push({
                            ...parsedRes.customer_details[key],
                            id: parsedRes.customer_details[key].id,
                            username: parsedRes.customer_details[key].username,
                            name: parsedRes.customer_details[key].name,
                            email: parsedRes.customer_details[key].email,
                            mobile: parsedRes.customer_details[key].mobile,
                            status: parsedRes.customer_details[key].status
                            ,
                            key: key
                        });
                    }


                    dispatch(setCustomerListData(customer_details));
                    dispatch(setComplaintsListData(complaint_details));
                    // dispatch(setComplaintsDetailsData(complaints));




                }
            });
    }
};

export const complaintsDetailsData = (authData, screen) => {

    return dispatch => {

        dispatch(uiStartLoading())
        let formData = new FormData();
        formData.append('comp_id', authData.id);


        formData.append('key', KEY.KEY_VALUE);
        fetch(COMPLAINTS_DETAILS.COMPLAINTS_DETAILS_URL, {
            method: "POST",

            body: formData
        })
            .catch(err => {
                console.log(err)
                alert("Authentication failed, please try again!");
                dispatch(uistopLoading())
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);

                dispatch(uistopLoading())



                if (parsedRes.status === "false") {
                    alert(parsedRes.response);
                } else {

                    let complaints = {};
                    complaints = { ...parsedRes.data["0"] }

                    dispatch(setComplaintsDetails(complaints));
                    if (screen === "customer") {
                        callComplaintsDetailsScreenCustomer()
                    }
                    else if (screen === "IO") {
                        callComplaintsDetailsScreenIO()
                    }
                    else {
                        callComplaintsDetailsScreen()
                    }



                    //  startMainTabs();



                }
            });
    }
};


const callComplaintsDetailsScreenIO = () => {



    Promise.all([
        Icon.getImageSource("ios-filing", 50),
        Icon.getImageSource("ios-refresh", 50),
        Icon.getImageSource("ios-menu", 50),

    ]).then(sources => {

        Navigation.push("InternaObdusmanDashBoard", {

            bottomTabs: {
                children: [{
                    stack: {
                        children: [
                            {
                                component: {
                                    id: "ComplaintsDetailsIO",
                                    name: 'orgs.ComplaintsDetailsIO',
                                    options: {
                                        topBar: {

                                            title: {
                                                text: "ComplaintsDetails",
                                                alignment: "center",
                                                fontSize: 16,
                                                // color: 'red',
                                                fontFamily: "Poppins-Bold",
                                            },
                                        }
                                    }
                                },
                            },
                        ],
                        options: {

                            bottomTab: {
                                text: 'Complaint Detail',
                                fontSize: 12,

                                textColor: "#000",
                                selectedTextColor: "#FF0000",
                                icon: sources[0],
                                iconColor: COLOR.ICON_COLOR,
                                selectedIconColor: 'red',
                            }
                        },
                    },
                   
                },

                {


                    stack: {
                        children: [
                            {
                                component: {
                                    id: "ReplyHistoryIO",
                                    name: 'orgs.ReplyHistoryIO',
                                    options: {
                                        topBar: {

                                            // rightButtons: [
                                            //     {
                                            //         id: 'sideDrawerRight',
                                            //         icon: sources[2],

                                            //         color: COLOR.ICON_COLOR,
                                            //     },
                                            // ],
                                            title: {
                                                text: "ReplyHistory",
                                                alignment: "center",
                                                fontSize: 16,
                                                // color: 'red',
                                                fontFamily: "Poppins-Bold",
                                            },
                                        }
                                    }
                                },
                            },
                        ],
                        options: {

                            bottomTab: {
                                text: 'Reply History',
                                icon: sources[1],
                                //  icon:ReplyHistory,
                                fontSize: 16,

                                textColor: "#000",
                                selectedTextColor: "#FF0000",

                                iconColor: COLOR.ICON_COLOR,
                                selectedIconColor: 'red',
                            }
                        },
                    },
                    //   }
                    //  },

                }
                ]
            }


        });
    });


};

const callComplaintsDetailsScreenCustomer = () => {


    Promise.all([
        Icon.getImageSource("ios-filing", 50),
        Icon.getImageSource("ios-refresh", 50),
        Icon.getImageSource("ios-menu", 50),

    ]).then(sources => {


        Navigation.push("CustomerDashBoard", {

            component: {
                id: "ReplyHistoryCustomer",
                name: 'orgs.ReplyHistoryCustomer',
                options: {
                    topBar: {
                        visible: true,
                        title: {
                            text: "ReplyHistory",
                            alignment: "center",
                            fontSize: 16,
                            // color: 'red',
                            fontFamily: "Poppins-Bold",
                        },
                    }
                }
            },

            bottomTabs: {
                children: [{


                    stack: {
                        children: [
                            {
                                component: {
                                    id: "ComplaintsDetailCustomer",
                                    name: 'orgs.ComplaintsDetailCustomer',
                                    options: {
                                        topBar: {


                                            title: {
                                                text: "ComplaintsDetails",
                                                alignment: "center",
                                                fontSize: 16,
                                                // color: 'red',
                                                fontFamily: "Poppins-Bold",
                                            },
                                        }
                                    }
                                },
                            },
                        ],
                        options: {

                            bottomTab: {
                                text: 'Complaint Detail',
                                fontSize: 12,

                                textColor: "#000",
                                selectedTextColor: "#FF0000",
                                icon: sources[0],
                                iconColor: COLOR.ICON_COLOR,
                                selectedIconColor: 'red',
                            }
                        },
                    },



                },

                {

                    stack: {
                        children: [
                            {
                                component: {
                                    id: "ReplyHistoryCustomer",
                                    name: 'orgs.ReplyHistoryCustomer',
                                    options: {
                                        topBar: {
                                            title: {
                                                text: "ReplyHistory",
                                                alignment: "center",
                                                fontSize: 16,
                                                // color: 'red',
                                                fontFamily: "Poppins-Bold",
                                            },
                                        }
                                    }
                                },
                            },
                        ],
                        options: {

                            bottomTab: {
                                text: 'Reply History',
                                icon: sources[1],
                                //  icon:ReplyHistory,
                                fontSize: 16,

                                textColor: "#000",
                                selectedTextColor: "#FF0000",

                                iconColor: COLOR.ICON_COLOR,
                                selectedIconColor: 'red',
                            }
                        },
                    },



                }
                ]
            }



        });
    });


};

export const setComplaintsDetailsData = (complaints) => {
    return dispatch => {
        dispatch(setComplaintsDetails(complaints));

    };
};


export const dashboardClickedItem = authData => {

    return dispatch => {

        dispatch(uiStartLoading())
        let formData = new FormData();
        dispatch(authGetUserName())
            .catch(() => {
                alert("Invalid Credential");
            })
            .then(userName => {
                formData.append('username', userName);
            })

        dispatch(authGetUser_type())
            .catch(() => {
                alert("Invalid Credential");
            })
            .then(user_type => {
                formData.append('user_type', user_type);
            })

        dispatch(authGetRole())
            .catch(() => {
                alert("Invalid Credential");
            })
            .then(role => {
                formData.append('role', role);
            })

        dispatch(authGetbr_code())
            .catch(() => {
                alert("Invalid Credential");
            })
            .then(br_code => {
                formData.append('br_code', br_code);
            })

        dispatch(authGetToken())
            .catch(() => {
                alert("Invalid Credential");
            })
            .then(user_id => {
                console.log(user_id)
                formData.append('user_id', user_id);

                formData.append('key', KEY.KEY_VALUE);
                fetch(NEW_COMPLAINTS.NEW_COMPLAINTS_URL, {
                    method: "POST",

                    body: formData
                })
                    .catch(err => {
                        console.log(err)
                        alert("Authentication failed, please try again!");
                        dispatch(uistopLoading())
                    })
                    .then(res => res.json())
                    .then(parsedRes => {
                        console.log(parsedRes);

                        dispatch(uistopLoading())



                        if (parsedRes.status === "false") {
                            alert(parsedRes.response);
                        } else {

                            let complaints = [];


                            for (let key in parsedRes.data) {
                                complaints.push({
                                    ...parsedRes.data[key],
                                    id: parsedRes.data[key].id,
                                    UserCode: parsedRes.data[key].UserCode,
                                    created_on: parsedRes.data[key].created_on
                                    ,
                                    key: key
                                });
                            }


                            dispatch(setDashBoardList(complaints));

                            callComplaintsScreen()

                            //  startMainTabs();



                        }
                    })
            });
    }
};

const callComplaintsDetailsScreen = () => {


    Promise.all([
        Icon.getImageSource("ios-filing", 50),
        Icon.getImageSource("ios-refresh", 50),
        Icon.getImageSource("ios-menu", 50),

    ]).then(sources => {

        Navigation.push("DashBoard", {

            bottomTabs: {
                children: [{

                    stack: {
                        children: [
                            {
                                component: {
                                    id: "ComplaintsDetails",
                                    name: 'orgs.ComplaintsDetails',
                                    options: {
                                        topBar: {
                                            title: {
                                                text: "ComplaintsDetails",
                                                alignment: "center",
                                                fontSize: 16,
                                                // color: 'red',
                                                fontFamily: "Poppins-Bold",
                                            },
                                        }
                                    }
                                },
                            },
                        ],
                        options: {

                            bottomTab: {
                                text: 'Complaint Detail',
                                fontSize: 12,

                                textColor: "#000",
                                selectedTextColor: "#FF0000",
                                icon: sources[0],
                                iconColor: COLOR.ICON_COLOR,
                                selectedIconColor: 'red',
                            }
                        },
                    },



                },

                {

                    stack: {
                        children: [
                            {
                                component: {
                                    id: "ReplyHistory",
                                    name: 'orgs.ReplyHistory',
                                    options: {
                                        topBar: {
                                            title: {
                                                text: "ReplyHistory",
                                                alignment: "center",
                                                fontSize: 16,
                                                // color: 'red',
                                                fontFamily: "Poppins-Bold",
                                            },
                                        }
                                    }
                                },
                            },
                        ],
                        options: {

                            bottomTab: {
                                text: 'Reply History',
                                icon: sources[1],
                                //  icon:ReplyHistory,
                                fontSize: 16,

                                textColor: "#000",
                                selectedTextColor: "#FF0000",

                                iconColor: COLOR.ICON_COLOR,
                                selectedIconColor: 'red',
                            }
                        },
                    },



                }
                ]
            }


        });
    });


};

const callComplaintsScreen = () => {

    Promise.all([
        Icon.getImageSource("md-home", 50)

    ]).then(sources => {
        Navigation.push("DashBoard", {
            component: {
                id: 'Complaints',
                name: 'orgs.ComplaintsList',
                options: {
                    topBar: {
                        visible: true,
                        rightButtons: [
                            {
                                id: 'optionMunu',
                                icon: sources[0],
                                color: "black",
                            },
                        ],
                        title: {
                            text: "ComplaintsDetails",
                            alignment: "center",
                            fontSize: 16,
                            // color: 'red',
                            fontFamily: "Poppins-Bold",
                        },
                    }
                },
            },
        });

    });

};
export const setDashBoardList = (complaints) => {
    return dispatch => {
        dispatch(setDashBoardListData(complaints));

    };
};

export const authDashBoard = (role) => {

    return dispatch => {
        let formData = new FormData();
        dispatch(uiStartLoading())

        dispatch(authGetUserName())
            .catch(() => {
                //  alert("Invalid Credential");
            })
            .then(userName => {
                formData.append('username', userName);
            })

        dispatch(authGetRole())
            .catch(() => {
                //  alert("Invalid Credential");
            })
            .then(role => {
                formData.append('role', role);
            })

        if (role != "8") {

            dispatch(authGetUser_type())
                .catch(() => {
                    // alert("Invalid Credential");
                })
                .then(user_type => {
                    formData.append('user_type', user_type);
                })

            dispatch(authGetbr_code())
                .catch(() => {
                    //  alert("Invalid Credential");
                })
                .then(br_code => {
                    formData.append('br_code', br_code);
                })

        }


        dispatch(authGetToken())
            .catch(() => {
                alert("Invalid Credential");
            })
            .then(user_id => {
                console.log(user_id)
                formData.append('user_id', user_id);

                formData.append('key', KEY.KEY_VALUE);
                fetch(DASHBOARD.DASHBOARD_URL, {
                    method: "POST",

                    body: formData
                })
                    .catch(err => {
                        console.log(err)
                        alert("Authentication failed, please try again!");
                        dispatch(uistopLoading())
                    })

                    .then(res => res.json())
                    .catch(err => {
                        console.log(err)
                        alert(err);
                        dispatch(uistopLoading())
                    })

                    .then(parsedRes => {
                        console.log(parsedRes);

                        dispatch(uistopLoading())


                        if (parsedRes.status === "false") {
                            alert(parsedRes.response);
                        } else {
                            let dashboard = {}
                            dashboard = {
                                ...parsedRes.complaints
                            }
                            console.log(dashboard)
                            dispatch(setDashBoardData(dashboard));

                        }

                    });
            })


    }
};



export const setDashBoardData = (dashboard) => {
    return dispatch => {
        dispatch(setDashBoard(dashboard));

    };
};



const callLogin = () => {

    Navigation.pop("AuthScreen")
        .catch(err => console.log)

    // const RNRedux = () => (
    //     <Provider store={store}>
    //         <App />
    //     </Provider>
    // );

    // AppRegistry.registerComponent('rncourse', () => RNRedux);

};

export const authStoreToken = (token) => {
    return dispatch => {
        dispatch(authSetToken(token));
        AsyncStorage.setItem("ap:auth:token", token);
        // AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString());
    };
};



export const authSetToken = token => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    };
};
