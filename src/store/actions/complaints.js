import { AsyncStorage } from "react-native";
import {
    uiStartLoading, uistopLoading, setComplaintsListData, setReplyHistory,
    setCLoseRequestCategory, setCLoseAction, setComplaintsData, setForwardLevel, setScreenTitle,
    authGetToken, authGetUserName, authGetRole, authGetbr_code
    , authGetUser_type, setCustomerComplaintItem,complaintsDetails
} from '../actions/index'
import {
    CLOSE_COMPLAINTS, KEY, FORWARD_FROM_US_COMPLAINTS, ALL_COMPLAINTS, FORWARD_TO_US_COMPLAINTS,
    ESC_TO_US_COMPLAINTS, ESC_FROM_US_COMPLAINTS,
    CLOSED_COMPLAINTS_HISTORY, FORWARD_COMPLAINTS_HISTORY, REPLY_HISTORY_DATA, CLOSE_COMPLAINTS_FORM,
    FORWARD_COMPLAINTS_LEVEL, NEW_COMPLAINTS, CHECK_FEEDBACK
} from '../../utility/urlConstant'
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import { COLOR } from '../../utility/colors'

export const closeComplaintsHandler = authData => {
    const title = { title: "Close Complaints" }
    return dispatch => {
        dispatch(setScreenTitle(title, CLOSE_COMPLAINTS.CLOSE_COMPLAINTS_URL));
        dispatch(complaints(authData, CLOSE_COMPLAINTS.CLOSE_COMPLAINTS_URL));
    };
};

export const complaintsHandler = (title) => {

    return dispatch => {

        Navigation.mergeOptions('DashBoard', {
            sideMenu: {
                left: {
                    visible: false
                },
                right: {
                    visible: false
                },
            }
        });

        dispatch(setScreenTitle(title));
        callComplaintsScreen()

    };
};

export const complaintsHandlerCustomer = (title) => {

    return dispatch => {
        dispatch(setScreenTitle(title));
        callComplaintsLodgeScreenCustomer()

    };
};


export const callComplaintsLodgeScreenCustomer = () => {

    Navigation.mergeOptions('CustomerDashBoard', {
        sideMenu: {
            left: {
                visible: false
            },
        }
    });

    Navigation.push("CustomerDashBoard", {
        component: {
            id: "LodgetNewConplaintsCutomer",
            name: 'orgs.LodgetNewConplaintsCutomer',
            options: {
                topBar: {
                    visible: true,

                    title: {
                        text: "Lodge New Complaint", alignment: "center"
                    },
                }
            },
        },
    });

};

export const complaintsHandlerIO = (title) => {

    return dispatch => {

        Navigation.mergeOptions('InternaObdusmanDashBoard', {
            sideMenu: {
                left: {
                    visible: false
                },
                right: {
                    visible: false
                },
            }
        });

        dispatch(setScreenTitle(title));
        callComplaintsScreenIO()

    };
};

export const closeComplaintsFromHandler = () => {
    return dispatch => {
        dispatch(closeComplaintForm(CLOSE_COMPLAINTS_FORM.CLOSE_COMPLAINTS_FORM_URL));
    };
};

export const complaintFormLevelHandler = () => {
    return dispatch => {
        dispatch(forwardComplaintFormLevel(FORWARD_COMPLAINTS_LEVEL.FORWARD_COMPLAINTS_LEVEL_URL));
    };
};



export const replyHistory = (data) => {
    return dispatch => {
        dispatch(replyHistoryData(data, REPLY_HISTORY_DATA.REPLY_HISTORY_DATA_URL));
    };
};



export const forwardFromUsComplaintsHandler = authData => {
    const title = { title: "Forward From Us Complaints" }
    return dispatch => {
        dispatch(setScreenTitle(title, FORWARD_FROM_US_COMPLAINTS.FORWARD_FROM_US_COMPLAINTS_URL));
        dispatch(complaints(authData, FORWARD_FROM_US_COMPLAINTS.FORWARD_FROM_US_COMPLAINTS_URL));
    };
};


export const forwardToUsComplaintsHandler = authData => {
    const title = { title: "Forward To Us Complaints" }
    return dispatch => {
        dispatch(setScreenTitle(title, FORWARD_TO_US_COMPLAINTS.FORWARD_TO_US_COMPLAINTS_URL));
        dispatch(complaints(authData, FORWARD_TO_US_COMPLAINTS.FORWARD_TO_US_COMPLAINTS_URL));
    };
};

export const escToUsComplaintsHandler = authData => {
    const title = { title: "Esclatted To Us Complaints" }
    return dispatch => {
        dispatch(setScreenTitle(title));
        dispatch(complaints(authData, ESC_TO_US_COMPLAINTS.ESC_TO_US_COMPLAINTS_URL));
    };
};

export const escFromUsComplaintsHandler = authData => {
    const title = { title: "Esclatted From Us Complaints" }
    return dispatch => {
        dispatch(setScreenTitle(title, ESC_FROM_US_COMPLAINTS.ESC_FROM_US_COMPLAINTS_URL));
        dispatch(complaints(authData, ESC_FROM_US_COMPLAINTS.ESC_FROM_US_COMPLAINTS_URL));
    };
};


export const allComplaintsHandler = authData => {
    const title = { title: "All Complaints" }
    return dispatch => {
        dispatch(setScreenTitle(title, ALL_COMPLAINTS.ALL_COMPLAINTS_URL));
        dispatch(complaints(authData, ALL_COMPLAINTS.ALL_COMPLAINTS_URL));
    };
};

export const checkFeedBack = (data) => {
    return dispatch => {
        dispatch(checkFeedBackAPI(data, CHECK_FEEDBACK.CHECK_FEEDBACK_URL));
    };
};

export const checkFeedBackAPI = (data, URL) => {

    return dispatch => {

        dispatch(uiStartLoading())
        let formData = new FormData();

        formData.append('complaint_no', data.Complaint_no);
        formData.append('key', KEY.KEY_VALUE);
        fetch(URL, {
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



                    dispatch(setCustomerComplaintItem(data))

                    callComplaintsScreenCustomer()



                }
            });
    }
};

const callComplaintsScreenCustomer = () => {
    Navigation.push("CustomerDashBoard", {
        component: {
            id: 'FeedbackCustomer',
            name: 'orgs.FeedbackCustomer',
            options: {
                topBar: {
                    visible: true,
                    title: {
                        text: "Feedback",
                        alignment: "center",
                        fontSize: 16,
                        // color: 'red',
                        fontFamily: "Poppins-Bold",
                    },
                }
            }
        },
    });
}



export const callComplaintsScreenIO = () => {


    Promise.all([
        Icon.getImageSource("ios-menu", 50)

    ]).then(sources => {
        Navigation.push("InternaObdusmanDashBoard", {

            component: {
                id: "ComplaintsListIO",
                name: 'orgs.ComplaintsListIO',
                options: {
                    topBar: {

                        title: {
                            text: "ComplaintsList",
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

    });


};





export const forwardComplaintFormLevel = (URL) => {

    return dispatch => {

        dispatch(uiStartLoading())
        let formData = new FormData()

        formData.append('key', KEY.KEY_VALUE);
        fetch(URL, {
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

                    let level = [];


                    for (let key in parsedRes.level) {
                        level.push({
                            ...parsedRes.level[key],
                            id: parsedRes.level[key].id,
                            name: parsedRes.level[key].name,
                            key: key
                        });
                    }

                    // level.splice(0,0,{id:"",
                    //     name:"--Select Level --",
                    //     key:2222}),



                    dispatch(setForwardLevelData(level));

                    //  callForwardComplaintScreen()
                }
            });
    }
};


export const callForwardComplaintScreen = () => {
    Promise.all([
        Icon.getImageSource("ios-menu", 50)

    ]).then(sources => {
        Navigation.push("DashBoard", {

                    component: {
                        id: "ForwardComplaint",
                        name: 'orgs.ForwardComplaint',
                        options: {
                            topBar: {
                                title: {
                                    text: "ForwardComplaint",
                                    alignment: "center",
                                    fontSize: 16,
                                    // color: 'red',
                                    fontFamily: "Poppins-Bold",
                                },
                                rightButtons: [
                                    {
                                        id: 'sideDrawerRight',
                                        icon: sources[0],

                                        color: COLOR.ICON_COLOR,
                                    },
                                ],
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
}

export const setForwardLevelData = (level) => {
    return dispatch => {
        dispatch(setForwardLevel(level));

    };
};

export const closeComplaintForm = (URL) => {

    return dispatch => {

        dispatch(uiStartLoading())
        let formData = new FormData()

        formData.append('key', KEY.KEY_VALUE);
        fetch(URL, {
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

                    let action = [];
                    let request_category = [];


                    for (let key in parsedRes.action) {
                        action.push({
                            ...parsedRes.action[key],
                            id: parsedRes.action[key].id,
                            name: parsedRes.action[key].name,
                            key: key
                        });
                    }

                    for (let key in parsedRes.request_category) {
                        request_category.push({
                            ...parsedRes.request_category[key],
                            id: parsedRes.request_category[key].id,
                            name: parsedRes.request_category[key].name,
                            key: key
                        });
                    }



                    dispatch(setAction(action));
                    dispatch(setRequestCategory(request_category));

                    callCloseComplaintScreen()




                }
            });
    }
};

const callCloseComplaintScreen = () => {

    Promise.all([
        Icon.getImageSource("ios-menu", 50)

    ]).then(sources => {
        Navigation.push("DashBoard", {

                    component: {
                        id: "CloseComplaint",
                        name: 'orgs.CloseComplaint',
                        options: {
                            topBar: {
                                title: {
                                    text: "CloseComplaint",
                                    alignment: "center",
                                    fontSize: 16,
                                    // color: 'red',
                                    fontFamily: "Poppins-Bold",
                                },
                                rightButtons: [
                                    {
                                        id: 'sideDrawerRight',
                                        icon: sources[0],

                                        color: COLOR.ICON_COLOR,
                                    },
                                ],
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
}

export const setAction = (complaintsList) => {
    return dispatch => {
        dispatch(setCLoseAction(complaintsList));

    };
};

export const setRequestCategory = (complaintsList) => {
    return dispatch => {
        dispatch(setCLoseRequestCategory(complaintsList));

    };
};

export const replyHistoryData = (authData, URL) => {

    return dispatch => {

        // dispatch(uiStartLoading())
        let formData = new FormData();
        dispatch(authGetUserName())
            .catch(() => {
                // alert("Invalid Credential");
            })
            .then(userName => {
                formData.append('username', userName);
            })

        dispatch(authGetUser_type())
            .catch(() => {
                //  alert("Invalid Credential");
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
                // alert("Invalid Credential");
            })
            .then(br_code => {
                formData.append('br_code', br_code);
            })

        dispatch(authGetToken())
            .catch(() => {
                // alert("Invalid Credential");
            })
            .then(user_id => {
                console.log(user_id)
                formData.append('user_id', user_id);
                formData.append('comp_id', authData.id);

                formData.append('key', KEY.KEY_VALUE);
                fetch(URL, {
                    method: "POST",

                    body: formData
                })
                    .catch(err => {
                        console.log(err)
                        alert("Authentication failed, please try again!");
                        // dispatch(uistopLoading())
                    })
                    .then(res => res.json())
                    .then(parsedRes => {
                        console.log(parsedRes);

                        //  dispatch(uistopLoading())



                        if (parsedRes.status === "false") {
                            alert(parsedRes.response);
                        } else {

                            let complaints = [];


                            for (let key in parsedRes.data) {
                                complaints.push({
                                    ...parsedRes.data[key],
                                    comment: parsedRes.data[key].comment,
                                    comment_date: parsedRes.data[key].comment_date,
                                    status: parsedRes.data[key].status,
                                    comment_by: parsedRes.data[key].comment_by,
                                    reply_by: parsedRes.data[key].reply_by
                                    ,
                                    key: key
                                });
                            }

                            dispatch(setComplaintsDataCLick(authData));
                            dispatch(setReplyHistoryList(complaints));
                           // dispatch(complaintsDetails(authData,"customer"))



                        }
                    })
            });
    }
};

// export const complaintsHistroy = (authData,URL) => {

//     return dispatch => {

//         dispatch(uiStartLoading())
//         let formData = new FormData();
//         formData.append('role',"1");
//         formData.append('username', "admin");
//         formData.append('br_code', "001");
//         formData.append('user_type', "1");
//         formData.append('user_id', "1");

//         formData.append('key',  KEY.KEY_VALUE);
//         fetch(URL, {
//             method: "POST",

//             body: formData
//         })
//             .catch(err => {
//                 console.log(err)
//                 alert("Authentication failed, please try again!");
//                 dispatch(uistopLoading())
//             })
//             .then(res => res.json())
//             .then(parsedRes => {
//                 console.log(parsedRes);

//                 dispatch(uistopLoading())



//                 if (parsedRes.status==="false") {
//                     alert(parsedRes.response);
//                 } else {

//                     let complaints =[];


//                     for (let key in parsedRes.data) {
//                         complaints.push({
//                         ...parsedRes.data[key],
//                         id: parsedRes.data[key].id,
//                         UserCode: parsedRes.data[key].UserCode,
//                         created_on: parsedRes.data[key].created_on,
//                         Complaint_no: parsedRes.data[key].Complaint_no
//                         ,
//                         key: key
//                       });
//                     }


//                         dispatch(setCloseCopmlaintList(complaints));

//                         callComplaintsScreen()

//                       //  startMainTabs();



//                 }
//             });
//     }
// };


export const complaints = (URL, complaintsList, offset) => {

    return dispatch => {


        dispatch(uiStartLoading())
        let formData = new FormData()

        dispatch(authGetUserName())
            .catch(() => {
                //  alert("Invalid Credential");
            })
            .then(userName => {
                formData.append('username', userName);
            })

        dispatch(authGetUser_type())
            .catch(() => {
                // alert("Invalid Credential");
            })
            .then(user_type => {
                formData.append('user_type', user_type);
            })

        dispatch(authGetRole())
            .catch(() => {
                //alert("Invalid Credential");
            })
            .then(role => {
                formData.append('role', role);
            })

        dispatch(authGetbr_code())
            .catch(() => {
                // alert("Invalid Credential");
            })
            .then(br_code => {
                formData.append('br_code', br_code);
            })

        dispatch(authGetToken())
            .catch(() => {
                //alert("Invalid Credential");
            })
            .then(user_id => {
                console.log(user_id)
                formData.append('user_id', user_id);
                formData.append('pageno', offset + "");
                formData.append('key', KEY.KEY_VALUE);
                console.log(offset);
                fetch(URL, {
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

                            let complaints = [];

                            for (let key in parsedRes.data) {
                                complaints.push({
                                    ...parsedRes.data[key],
                                    id: parsedRes.data[key].id,
                                    UserCode: parsedRes.data[key].UserCode,
                                    created_on: parsedRes.data[key].created_on,
                                    Complaint_no: parsedRes.data[key].Complaint_no
                                    ,
                                    key: complaintsList.length + parseInt(key)
                                });
                            }
                            // dispatch(setComplaintsListData(complaints));

                            dispatch(setComplaintsListData(complaints.concat(complaintsList)));

                        }
                    })
            });
    }
};

export const setComplaintsDataCLick = (data) => {
    return dispatch => {
        dispatch(setComplaintsData(data));

    };
};

export const setReplyHistoryList = (complaints) => {
    return dispatch => {
        dispatch(setReplyHistory(complaints));

    };
};



export const callComplaintsScreen = () => {


    Promise.all([
        Icon.getImageSource("ios-menu", 50)

    ]).then(sources => {
        Navigation.push("DashBoard", {

            component: {
                id: "ComplaintsList",
                name: 'orgs.ComplaintsList',
                options: {
                    topBar: {

                        title: {
                            text: "ComplaintsList",
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



