import { AsyncStorage } from "react-native";
import { AUTH_SET_TOKEN } from './actionTypes';
import {
  uiStartLoading, uistopLoading, addUser, authUserKeyData, setForwardToData, setCity, setProduct_Type,
  setSub_Type, setSelectedCity, setSelectedState, authGetToken, authGetUserName, authGetRole, authGetbr_code, authGetUser_type, callComplaintsScreen
  , authCustomerComplaintsList, setCustomerComplaintList,setCGROReportData,isProfileUpdated,totalCount,authDashBoard
} from '../actions/index'
import StartMainStabsInternalObdusman from "../../screens/StartMainStabsInternalObdusman/StartMainStabsInternalObdusman";
import { Navigation } from 'react-native-navigation';
import startMainTabs from "../../screens/startMainTabs/startMainTabs";
import StartMainTabsCustomer from "../../screens/startMainTabs/StartMainTabsCustomer";
import {
  FORGOT_PASSWORD, SEND_OTP, KEY, RESET_PASSWORD, CLOSE_COMPLAINT_SUBMIT_DATA, FORWARD_COMPLAINT_SUBMIT_DATA,
  FORWARD_FORWARD_TO, CITY_LIST, ADD_CUSTOMER, PRODUCT_TYPE, SUB_TYPE, STATE_CITY_LIST, ADD_COMPLAINTS, CGRO_SUBMIT, EDIT_CUSTOMER,
  CHANGE_PASSWORD, CUSTOMER_REGISTRATION, SUBMIT_FEEDBACK, RE_OPEN,AGREED_IO,DIS_AGREED_IO,RESEND_OTP,USER_CHANGE_PASSWORD,
  SEND_CGRO_REPORT
} from '../../utility/urlConstant'
import { COLOR } from '../../utility/colors'
import AsyncStorageReact from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons'

export const tyrForgotpass = authData => {
  return dispatch => {
    dispatch(forgotPassAPI(authData));
  };
};

export const tyrOtp = (authData) => {
  return dispatch => {
    dispatch(otp(authData));
  };
};


export const closeComplaintSubmitData = (authData, complaintsData, ) => {
  return dispatch => {
    dispatch(closeComplaintSubmitDataAPI(authData, complaintsData, CLOSE_COMPLAINT_SUBMIT_DATA.CLOSE_COMPLAINT_SUBMIT_DATA_URL));
  };
};

export const forwardComplaintSubmitData = (authData, complaintsData, ) => {
  return dispatch => {
    dispatch(forwardComplaintSubmitDataAPI(authData, complaintsData, FORWARD_COMPLAINT_SUBMIT_DATA.FORWARD_COMPLAINT_SUBMIT_DATA_URL));
  };
};

export const getCity = (authData) => {
  return dispatch => {
    dispatch(getCityAPI(authData, CITY_LIST.CITY_LIST_URL));
  };
};

export const addCustomerSubmitData = (authData) => {
  return dispatch => {
    dispatch(addCustomerSubmitDataAPI(authData, ADD_CUSTOMER.ADD_CUSTOMER_URL));
  };
};

export const getProduct_type = id => {
  return dispatch => {
    dispatch(getProduct_typeAPI(id, PRODUCT_TYPE.PRODUCT_TYPE_URL));
  };
};

export const getSub_type = id => {
  return dispatch => {
    dispatch(getSub_typeAPI(id, SUB_TYPE.SUB_TYPE_URL));
  };
};

export const getStateCityList = id => {
  return dispatch => {
    dispatch(getStateCityListAPI(id, STATE_CITY_LIST.STATE_CITY_LIST_URL));
  };
};

export const addComplaintsSubmitData = (authData, screen) => {
  return dispatch => {
    dispatch(addComplaintsSubmitDataAPI(authData, ADD_COMPLAINTS.ADD_COMPLAINTS_URL, screen));
  };
};

export const tyrCustomerRegistration = authData => {
  return dispatch => {
    dispatch(CustomerRegistration(authData));
  };
};

export const editCustomerDetails = (authData) => {
  return dispatch => {
    dispatch(editCustomerDetailsAPI(authData, EDIT_CUSTOMER.EDIT_CUSTOMER_URL));
  };
};

export const tyrFeedbackSubmit = (authData, customer_complaints) => {
  return dispatch => {
    dispatch(tyrFeedbackSubmitAPI(authData, customer_complaints));
  };
};


export const tyrReOpenSubmit = (authData, customer_complaints) => {
  return dispatch => {
    dispatch(tyrReOpenSubmitAPI(authData, customer_complaints));
  };
};

export const agreedIOSubmitData = (authData, complaintsData,complaintsList, screen) => {
  return dispatch => {
  
      dispatch(agreedIOSubmitDataAPI(authData, complaintsData,complaintsList, AGREED_IO.AGREED_IO_URL,screen));
  
    
  };
};


export const tyrResendOtp = () => {
  return dispatch => {
    dispatch(reSendotp());
  };
};

export const reSendotp = () => {

  return dispatch => {

    dispatch(uiStartLoading())


    dispatch(authUserKeyData())
      .catch((err) => {
        console.log(err)
        // alert("No valid token found!");
        dispatch(uistopLoading())
      })

      .then(token => {
        //  console.log(token)
        let formData = new FormData();
        formData.append('key', KEY.KEY_VALUE);
        formData.append('emailphone', token.email);
        formData.append('role', token.role);


        return fetch(RESEND_OTP.RESEND_OTP_URL, {
          method: "POST",
          body: formData
        })


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

        if (parsedRes.error) {
          alert("Authentication errr, please try again!");
        } else {
          if (parsedRes.status === "false") {
            alert(parsedRes.response);
          } else {
            alert(parsedRes.response);
           
            // dispatch(authSetToken(parsedRes.idToken));
            //dispatch(authStoreToken(users.id));

          }
        }
      });
  }
};


export const agreedIOSubmitDataAPI = (authData, customer_complaints,complaintsList,URL,screen) => {

  return dispatch => {

    dispatch(uiStartLoading())

    let formData = new FormData();
    formData.append('key', KEY.KEY_VALUE);
    formData.append('complaint_no', customer_complaints.Complaint_no);
    formData.append('complaint_id', customer_complaints.id);
    formData.append('io_remarks', authData.remarks);
    if (authData.doc != null) {
      formData.append('d_file', {
        uri: authData.doc.uri,
        type: authData.doc.type, // or photo.type
        name: authData.doc.name
      });
    }
if (screen==='agreed') {
  formData.append('action', 1);
}
else{
  formData.append('action', 4);
}
    dispatch(authGetToken())
    .catch(() => {
      // alert("Invalid Credential");
    })
    .then(user_id => {
      console.log(user_id)
    formData.append('user_id',user_id);
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

        if (parsedRes.error) {
          alert("Authentication errr, please try again!");
        } else {
          if (parsedRes.status === "false") {
            alert(parsedRes.response);
          } else {
           // alert(parsedRes.response);
            dispatch(authDashBoard(""));
            Navigation.popToRoot("InternaObdusmanDashBoard")
            alert(parsedRes.response);



                // if (screen==="agreed") {
                //   Navigation.pop("AgreedIO")
                // }
                // else{
                //   Navigation.pop("DisAgreedIO")
                // }

             
          

          }
        }
      });
    })
  }
};



export const tyrReOpenSubmitAPI = (authData, customer_complaints) => {

  return dispatch => {

    dispatch(uiStartLoading())

    let formData = new FormData();
    formData.append('key', KEY.KEY_VALUE);
    formData.append('complaint_no', customer_complaints.Complaint_no);
    formData.append('reason', authData.comments);
    formData.append('usercode', customer_complaints.UserCode);

    return fetch(RE_OPEN.RE_OPEN_URL, {
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

        if (parsedRes.error) {
          alert("Authentication errr, please try again!");
        } else {
          if (parsedRes.status === "false") {
            alert(parsedRes.response);
          } else {
            alert(parsedRes.response);
            dispatch(authCustomerComplaintsList())
              .catch(() => {
                //  alert("Invalid Credential");
              })
              .then(customer_complaintsGet => {
                const compDeta = customer_complaintsGet.find(place => {
                  return place.key === customer_complaints.key;
                });

                let customer_complaintsData = [...customer_complaintsGet]
                customer_complaintsData[compDeta] = {
                  ...compDeta,
                  ...compDeta.c_status = "0"
                }


                dispatch(setCustomerComplaintList(customer_complaintsData));
                Navigation.pop("Reopen")
              })

          }
        }
      });
  }
};


export const tyrFeedbackSubmitAPI = (authData, customer_complaints) => {

  return dispatch => {

    dispatch(uiStartLoading())

    //  console.log(token)
    let formData = new FormData();
    formData.append('key', KEY.KEY_VALUE);
    formData.append('complaint_no', customer_complaints.Complaint_no);
    formData.append('feedback', authData.feedback);
    formData.append('comment', authData.comment); 
    formData.append('usercode', customer_complaints.UserCode);

    return fetch(SUBMIT_FEEDBACK.SUBMIT_FEEDBACK_URL, {
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

        if (parsedRes.error) {
          alert("Authentication errr, please try again!");
        } else {
          if (parsedRes.status === "false") {
            alert(parsedRes.response);
          } else {
            dispatch(authCustomerComplaintsList())
              .catch(() => {
                //  alert("Invalid Credential");
              })
              .then(customer_complaintsGet => {
                const compDeta = customer_complaintsGet.find(place => {
                  return place.key === customer_complaints.key;
                });

                let customer_complaintsData = [...customer_complaintsGet]
                customer_complaintsData[compDeta] = {
                  ...compDeta,
                  ...compDeta.c_status = "0"
                }

                alert(parsedRes.response);
                dispatch(setCustomerComplaintList(customer_complaintsData));
                Navigation.pop("FeedbackCustomer")
              })




          }
        }
      });
  }
};


export const editCustomerDetailsAPI = (authData, url) => {

  return dispatch => {

    dispatch(uiStartLoading())
    let formData = new FormData();
    formData.append('Title', authData.title);
    formData.append('name', authData.name);
    formData.append('mobile', authData.mobile);
    formData.append('email', authData.email);
    formData.append('AlternateEmail', authData.alt_email);
    formData.append('gender', authData.gender);
    formData.append('tel_no1', authData.alt_mobile);
    formData.append('dob', authData.dob);
    formData.append('MinorityCommunity', authData.minorityCommunity);
    formData.append('Address', authData.address);
    formData.append('cust_exist', authData.exCust);
    formData.append('state', authData.state);
    formData.append('city', authData.city);
    formData.append('pin', authData.pin_code);
   // formData.append('status', authData.status);
    dispatch(authGetUserName())
      .catch(() => {
        //  alert("Invalid Credential");
      })
      .then(userName => {
        formData.append('username', userName);
      })

    dispatch(authGetToken())
      .catch(() => {
        // alert("Invalid Credential");
      })
      .then(user_id => {
        console.log(user_id)
        formData.append('user_id', user_id);

        formData.append('key', KEY.KEY_VALUE);
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
              alert(parsedRes.response);
              Navigation.pop("CustomerProfile")
              dispatch(isProfileUpdated({ is_profile_update: 1 }))
             // Navigation.pop("CustomerProfile")
              storeData("")

            }
          })
      });
  }
};


const storeData = async ( authData) => {
  try {
       await AsyncStorageReact.setItem("ap:auth:updated","000");
      
    
  } catch (e) {
      console.log(e)
  }
}


export const CustomerRegistration = authData => {

  return dispatch => {

    dispatch(uiStartLoading())
    let formData = new FormData();
    formData.append('email', authData.email);
    formData.append('name', authData.name);
    formData.append('mobile', authData.mobile);
    formData.append('key', KEY.KEY_VALUE);

    fetch(CUSTOMER_REGISTRATION.CUSTOMER_REGISTRATION_URL, {
      method: "POST",
      //  body: JSON.stringify(placeData)
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
          alert(parsedRes.response);
          let users = {};
          // for (let key in parsedRes.userdetails) {
          //     users.push({
          //         ...parsedRes.userdetails[key],

          //         key: key
          //     });
          // }

          users = { ...parsedRes.user }
          console.log(users)

          dispatch(addUser(users));
          callLogin()
          // dispatch(authSetToken(parsedRes.idToken));
          //  dispatch(authStoreToken(users.id));

        }
      });
  }
};

export const addComplaintsSubmitDataAPI = (data, URL, screen) => {

  return dispatch => {

    // dispatch(uiStartLoading())
    let formData = new FormData();

    // dispatch(authGetUserName())
    //   .catch(() => {
    //     alert("Invalid Credential");
    //   })
    //   .then(userName => {
    //     formData.append('username', userName);
    //   })

    // dispatch(authGetUser_type())
    //   .catch(() => {
    //     alert("Invalid Credential");
    //   })
    //   .then(user_type => {
    //     formData.append('user_type', user_type);
    //   })

    // dispatch(authGetRole())
    //   .catch(() => {
    //     alert("Invalid Credential");
    //   })
    //   .then(role => {
    //     formData.append('role', role);
    //   })


    dispatch(authGetToken())
      .catch(() => {
        alert("Invalid Credential");
      })
      .then(user_id => {
        formData.append('user_id', user_id);
        formData.append('Usercode', data.user_code);


        formData.append('br_code', data.Branch_Name);


        formData.append('Complaint_Text', data.Complaint_details);
        formData.append('Complaint_Source', data.complaint_source);
        if (data.complaint_type === "2") {
          formData.append('PPO_Number', data.ppo_number);
          formData.append('Pention_Type', data.pension_type);
        }
        if (data.Registered_Account === "Yes") {
          formData.append('Account_Type', data.account_no);
        }
        formData.append('Complaint_type', data.complaint_type);
        formData.append('Grevience_Categiry', data.Grievance_Category);

        formData.append('Request_Category', data.request_cat);
        formData.append('Account_State', data.state);
        formData.append('Account_City', data.city);
        formData.append('Against_Register', data.Registered_Account);
        formData.append('prod_id', data.product_type);
        formData.append('SubType_Id', data.sub_type);
        formData.append('ForwLvl', data.office);

        if (data.image != null) {
          formData.append('document', {
            uri: data.image.uri,
            type: data.image.type, // or photo.type
            name: data.image.name
          });
        }

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
              alert(parsedRes.response);
              if (screen === "customer") {
                //StartMainTabsCustomer()
                dispatch(authDashBoard("8"));
              //  Navigation.pop("AddComplaintsCustomer") 
              //  Navigation.pop("LodgetNewConplaintsCutomer")

              Navigation.popToRoot("CustomerDashBoard") 
             // Navigation.pop("LodgetNewConplaintsCutomer")
              }
              else {
                //  startMainTabs()
                dispatch(authDashBoard(""));
              //  Navigation.popToRoot("DashBoard") 
                Navigation.pop("AddComplaints")
                Navigation.pop("ComplaintsDetailsSearch")
              }


            }
          });
      })
  }
};


export const getStateCityListAPI = (data, URL) => {

  return dispatch => {

    // dispatch(uiStartLoading())
    let formData = new FormData();
    formData.append('br_code', data);
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

          let state = {};
          let city = {};

          state = { ...parsedRes.state[0] }
          city = { ...parsedRes.city[0] }

          dispatch(setSelectedState(state));
          dispatch(setSelectedCity(city));

          dispatch(getCityAPI(state.StateCode, CITY_LIST.CITY_LIST_URL));

        }
      });
  }
};


export const getSub_typeAPI = (id, URL) => {

  return dispatch => {

    // dispatch(uiStartLoading())
    let formData = new FormData();
    formData.append('prod_type', id);
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

          let prod_type = [];


          for (let key in parsedRes.prod_type) {
            prod_type.push({
              ...parsedRes.prod_type[key],
              id: parsedRes.prod_type[key].id,
              cat_id: parsedRes.prod_type[key].cat_id,
              sub_cat_id: parsedRes.prod_type[key].sub_cat_id,
              name: parsedRes.prod_type[key].name,

              key: key
            });
          }  

          // prod_type.splice(0,0,{id:"",
          // name:"---Select---",
          // key:2222}),

          dispatch(setSub_Type(prod_type));

        }
      });
  }
};


export const getProduct_typeAPI = (id, URL) => {

  return dispatch => {

    // dispatch(uiStartLoading())
    let formData = new FormData();
    formData.append('grievance_cat', id);
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

          let prod_type = [];


          for (let key in parsedRes.prod_type) {
            prod_type.push({
              ...parsedRes.prod_type[key],
              id: parsedRes.prod_type[key].id,
              cat_id: parsedRes.prod_type[key].cat_id,
              name: parsedRes.prod_type[key].name,

              key: key
            });  
          }

          
          // prod_type.splice(0,0,{id:"",
          // name:"--Select Category --",
          // key:2222}),

          dispatch(setProduct_Type(prod_type));

        }
      });
  }
};



export const addCustomerSubmitDataAPI = (authData, URL) => {

  return dispatch => {

     dispatch(uiStartLoading())
    let formData = new FormData();
    formData.append('Title', authData.title);
    formData.append('name', authData.name);
    formData.append('mobile', authData.mobile);
    formData.append('email', authData.email);
    formData.append('AlternateEmail', authData.alt_email);
    formData.append('gender', authData.gender);
    formData.append('tel_no1', authData.alt_mobile);
    formData.append('dob', authData.dob);
    formData.append('MinorityCommunity', authData.minorityCommunity);
    formData.append('Address', authData.address);
    formData.append('cust_exist', authData.exCust);
    formData.append('state', authData.state);
    formData.append('city', authData.city);
    formData.append('pin', authData.pin_code);
   // formData.append('status', authData.status);
    dispatch(authGetToken())
      .catch(() => {
        //alert("Invalid Credential");
      })
      .then(user_id => {
        console.log(user_id)
        formData.append('user_id', user_id);
      })
    formData.append('key', KEY.KEY_VALUE);
    fetch(URL, {
      method: "POST",

      body: formData
    })
      .catch(err => {
        console.log(err)
      //  alert("Authentication failed, please try again!");
        dispatch(uistopLoading())
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);

        dispatch(uistopLoading())



        if (parsedRes.status === "false") {
          alert(parsedRes.response);
        } else {
          alert(parsedRes.response);

         // Navigation.pop("AddCustomer")

         dispatch(authDashBoard(""));
         Navigation.popToRoot("DashBoard")
         alert(parsedRes.response);

        }
      });
  }
};


export const getCityAPI = (authData, URL) => {

  return dispatch => {

    // dispatch(uiStartLoading())
    let formData = new FormData();
    formData.append('stcode', authData);
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
        //  alert(parsedRes.response);
        } else {

          let states = [];


          for (let key in parsedRes.states) {
            states.push({
              ...parsedRes.states[key],
              id: parsedRes.states[key].id,
              Ct_Code: parsedRes.states[key].Ct_Code,
              Ct_Name: parsedRes.states[key].Ct_Name,
              Ct_StateCode: parsedRes.states[key].Ct_StateCode,

              key: key
            });
          }

          dispatch(setCity(states));

        }
      });
  }
};


export const forwardComplaintSubmitDataAPI = (authData, complaintsData, URL) => {

  return dispatch => {

    dispatch(uiStartLoading())
    let formData = new FormData();
    formData.append('comp_id', complaintsData.id);

    formData.append('Complaint_no', complaintsData.Complaint_no);
    formData.append('Forward_to', authData.forwardTo);
    formData.append('forward_level', authData.level);
    formData.append('remarks', authData.remarks);
    dispatch(authGetToken())
      .catch(() => {
        alert("Invalid Credential");
      })
      .then(user_id => {
        console.log(user_id)
        formData.append('user_id', user_id);

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
             
              dispatch(authDashBoard(""));
              Navigation.popToRoot("DashBoard")
              alert(parsedRes.response);
              // dispatch(popComponent("ForwardComplaint"))
              //   .catch(() => {
              //     //  alert("Invalid Credential");
              //   })
              //   .then(user_id => {
              //     console.log(user_id)
              //     alert(parsedRes.response);
              //   });


              //  alert(parsedRes.response);
            }
          })


      });
  }
};


export const popComponent = (componentId) => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {

      let fetchedToken;
      Navigation.pop(componentId)
        .catch(err => {
          console.log(err)
          reject()
        })
        .then(tokenFromStorage => {
          console.log(tokenFromStorage)
          fetchedToken = tokenFromStorage;
          if (!tokenFromStorage) {
            reject();
            return;
          }

          else {

            resolve(fetchedToken);
          }

        })

    });
    promise.catch(err => {

    });
    return promise;
  };
};


export const onForwardForwardTo = (authData, complaintsData, ) => {
  return dispatch => {
    dispatch(onForwardForwardToAPI(authData, complaintsData, FORWARD_FORWARD_TO.FORWARD_FORWARD_TO_URL));
  };
};

export const addCGROReeportSubmit = (authData,complaintsList, offset) => {
  return dispatch => {
    dispatch(addCGROReeportSubmitAPI(authData,complaintsList, CGRO_SUBMIT.CGRO_SUBMIT_URL,offset));
  };
};


export const tryResetPassword = (authData) => {
  return dispatch => {
    dispatch(resetPassword(authData));
  };
};

export const tryChangePassword = (authData) => {
  return dispatch => {
    dispatch(changePassword(authData));
  };
};

export const userChangePassword = (authData) => {
  return dispatch => {
    dispatch(userChangePasswordAPI(authData,USER_CHANGE_PASSWORD.URL));
  };
};


export const tyrSendCGROReport = (authData,screen) => {
  return dispatch => {
    dispatch(tyrSendCGROReportAPI(authData,screen,SEND_CGRO_REPORT.URL));
  };
};

export const tyrSendCGROReportAPI = (authData,screen,URL ) => {

  return (dispatch) => {

     dispatch(uiStartLoading())
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
       // alert("Invalid Credential");
      })
      .then(user_id => {
        formData.append('user_id', user_id)
        formData.append('start_date', authData.from_date);
        formData.append('end_date', authData.to_date);
        formData.append('Complaint_Source', authData.complaint_source);
        formData.append('Complaint_type', authData.complaint_type);
        formData.append('Grevience_Categiry', authData.Grievance_Category);
        formData.append('Request_Category', authData.request_cat);
        formData.append('prod_id', authData.product_type);
        formData.append('SubType_Id', authData.sub_type);
        formData.append('forward_level', authData.office_type);
        formData.append('forward_to', authData.offices);
        formData.append('c_status', authData.status);

        if(screen==="admin"){
   //  formData.append('pageno', offset);
        }
        else{
   //  formData.append('pageno', offset);
        }
      //  formData.append('pageno', offset);

        formData.append('key', KEY.KEY_VALUE);
        fetch(URL, {
          method: "POST",

          body: formData
        })
          .catch(err => {
            console.log(err)
           // alert("Authentication failed, please try again!");
            dispatch(uistopLoading())
          })
          .then(res => res.json())
          .catch(err => {
            console.log(err)
            //alert("Authentication failed, please try again!");
            dispatch(uistopLoading())
          })
          .then(parsedRes => {
            console.log(parsedRes);

            dispatch(uistopLoading())



            if (parsedRes.status === "false") {
              alert(parsedRes.response);
            } else {
             alert(parsedRes.response);

            }
          });
      })
  }
};


export const userChangePasswordAPI = (authData,url) => {

  return dispatch => {

    dispatch(uiStartLoading())

    let formData = new FormData();
    dispatch(authGetUserName())
    .catch(() => {
        //  alert("Invalid Credential");
    })
    .then(userName => {
        formData.append('adminname', userName);
    })
    dispatch(authGetToken())
    .catch(() => {
        alert("Invalid Credential");
    })
    .then(user_id => {
        console.log(user_id)
        formData.append('adminid', user_id);
        //  console.log(token)
      
        formData.append('password', authData.password);
        formData.append('username', authData.userCode);
        formData.append('key', KEY.KEY_VALUE);
        //  console.log(token)
     


        return fetch(url, {
          method: "POST",
          body: formData
        })


      })

      .catch(err => {
        console.log(err)
        //alert("Authentication failed, please try again!");
        dispatch(uistopLoading())
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);

        dispatch(uistopLoading())

        if (parsedRes.error) {
         //alert("Authentication errr, please try again!");
        } else {
          if (parsedRes.status === "false") {
            alert(parsedRes.response);
          } else {
            alert(parsedRes.response);
          Navigation.pop("UserChangePassword")

          }
        }
      });
  }
};

export const changePassword = authData => {

  return dispatch => {

    dispatch(uiStartLoading())
    let formData = new FormData();

    dispatch(authGetRole())
      .catch(() => {
        //  alert("Invalid Credential");
      })
      .then(role => {
        formData.append('role', role);
      })
    dispatch(authGetToken())
      .catch((err) => {
        console.log(err)
        //  alert("No valid token found!");
        dispatch(uistopLoading())
      })

      .then(user_id => {
        //  console.log(token)
      
        formData.append('password', authData.password);
        formData.append('username', authData.username);
        // formData.append('confirmPassword', authData.confirmPassword);
        formData.append('key', KEY.KEY_VALUE);
        formData.append('id', user_id);

        return fetch(CHANGE_PASSWORD.CHANGE_PASSWORD_URL, {
          method: "POST",
          body: formData
        })


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

        if (parsedRes.error) {
          alert("Authentication errr, please try again!");
        } else {
          if (parsedRes.status === "false") {
            alert(parsedRes.response);
          } else {
           
            
            // users = { ...parsedRes.user }
            // console.log(users)
            callLogin()
            alert(parsedRes.response);
            // dispatch(authSetToken(parsedRes.idToken));
            //dispatch(authStoreToken(users.id));

          }
        }
      });
  }
};


export const addCGROReeportSubmitAPI = (authData,complaintsList, URL,offset) => {

  return (dispatch) => {

     dispatch(uiStartLoading())
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
       // alert("Invalid Credential");
      })
      .then(user_id => {
        formData.append('user_id', user_id)
        formData.append('start_date', authData.from_date);
        formData.append('end_date', authData.to_date);
        formData.append('Complaint_Source', authData.complaint_source);
        formData.append('Complaint_type', authData.complaint_type);
        formData.append('Grevience_Categiry', authData.Grievance_Category);
        formData.append('Request_Category', authData.request_cat);
        formData.append('prod_id', authData.product_type);
        formData.append('SubType_Id', authData.sub_type);
        formData.append('forward_level', authData.office_type);
        formData.append('forward_to', authData.offices);
        formData.append('c_status', authData.status);
        formData.append('pageno', offset);

        formData.append('key', KEY.KEY_VALUE);
        fetch(URL, {
          method: "POST",

          body: formData
        })
          .catch(err => {
            console.log(err)
           // alert("Authentication failed, please try again!");
            dispatch(uistopLoading())
          })
          .then(res => res.json())
          .catch(err => {
            console.log(err)
            //alert("Authentication failed, please try again!");
            dispatch(uistopLoading())
          })
          .then(parsedRes => {
            console.log(parsedRes);

            dispatch(uistopLoading())



            if (parsedRes.status === "false") {
              alert(parsedRes.response);
              dispatch(totalCount({total_count:parsedRes.Total}));
            } else {

              let data = [];
            //  alert(parsedRes.response);

              for (let key in parsedRes.data) {
                data.push({
                  ...parsedRes.data[key],
                  id: parsedRes.data[key].id,
                  UserCode: parsedRes.data[key].UserCode,
                  Complaint_no: parsedRes.data[key].Complaint_no,
                  created_on: parsedRes.data[key].created_on,
                  key: complaintsList.length + parseInt(key)
                });
              }
              dispatch(totalCount({total_count:parsedRes.Total}));
              dispatch(setCGROReportData(data.concat(complaintsList)));

            // dispatch(setCGROReportData(data))

              // if (screen==="IO") {
              //   callCGROReportListScreenIO(data)
              // }
              // else{
              //   callCGROReportListScreen(data)
              // }
            

            }
          });
      })
  }
};

const callCGROReportListScreenIO = (data) => {
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

    Navigation.push("InternaObdusmanDashBoard", {
        component: {
            id: 'CGROReportListIO',
            name: 'orgs.CGROReportListIO',
            passProps: {
              complaintsList: data
            },
            options: {
                topBar: {
                    visible: true,
                    title: {
                        text: "CGROReportListIO", alignment: "center"
                    },
                }
            },
        },
    });
}



export const onForwardForwardToAPI = (authData, complaintsData, URL) => {

  return dispatch => {

    // dispatch(uiStartLoading())
    let formData = new FormData();

    formData.append('forw_level', authData);
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

          let forward_level = [];


          for (let key in parsedRes.forward_level) {
            forward_level.push({
              ...parsedRes.forward_level[key],
              id: parsedRes.forward_level[key].id,
              code: parsedRes.forward_level[key].code,
              name: parsedRes.forward_level[key].code + "-" + parsedRes.forward_level[key].name,
              key: key
            });
          }

          // forward_level.splice(0,0,{id:"",
          //               name:"--Select--",
          //               key:2222}),


          dispatch(setForwardLevel(forward_level));

        }
      });
  }
};

export const setForwardLevel = (users) => {
  return dispatch => {
    dispatch(setForwardToData(users));

  };
};




export const closeComplaintSubmitDataAPI = (authData, complaintsData, URL) => {

  return dispatch => {

    dispatch(uiStartLoading())
    let formData = new FormData();

    formData.append('comp_id', complaintsData.id);

    formData.append('Complaint_no', complaintsData.Complaint_no);
    formData.append('action', authData.action);
    formData.append('reply_type', authData.replyType);
    formData.append('remarks', authData.remarks);
    formData.append('closer_request', authData.requestCategory);
    if (authData.doc != null) {
      formData.append('document', {
        uri: authData.doc.uri,
        type: authData.doc.type, // or photo.type
        name: authData.doc.name
      });
    }

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
             
              dispatch(authDashBoard(""));
              Navigation.popToRoot("DashBoard")
              alert(parsedRes.response);
              // Navigation.pop("CloseComplaint")
              // alert(parsedRes.response);

              // dispatch(popComponent("CloseComplaint"))
              //   .catch(() => {
              //     //  alert("Invalid Credential");
              //   })
              //   .then(user_id => {
              //     console.log(user_id)
              //     alert(parsedRes.response);
              //   });



            }
          })
      });
  }
};



export const resetPassword = authData => {

  return dispatch => {

    dispatch(uiStartLoading())


    dispatch(authUserKeyData())
      .catch((err) => {
        console.log(err)
        //   alert("No valid token found!");
        dispatch(uistopLoading())
      })

      .then(token => {
        //  console.log(token)
        let formData = new FormData();

        formData.append('password', authData.password);
        formData.append('role', authData.role);
        formData.append('key', KEY.KEY_VALUE);
        formData.append('id', token.id);

        return fetch(RESET_PASSWORD.RESET_PASSWORD_URL, {
          method: "POST",
          body: formData
        })


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

        if (parsedRes.error) {
          alert("Authentication errr, please try again!");
        } else {
          if (parsedRes.status === "false") {
            alert(parsedRes.response);
          } else {
          Navigation.pop("resetPassword")
            callLogin()
            // dispatch(authSetToken(parsedRes.idToken));
           // dispatch(authStoreToken(users.id));

            alert(parsedRes.response);

          }
        }
      });
  }
};

export const callLogin = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              id: 'LoginType',
              name: 'orgs.LoginType',
            },

          },

        ],

        options: {
          topBar: {
            visible: false,
          },
          statusBar: {
            visible: true,
          },
        },


      },
    },
  });


}

export const otp = authData => {

  return dispatch => {

    dispatch(uiStartLoading())


    dispatch(authUserKeyData())
      .catch((err) => {
        console.log(err)
        // alert("No valid token found!");
        dispatch(uistopLoading())
      })

      .then(token => {
        //  console.log(token)
        let formData = new FormData();

        formData.append('otp', authData.otp);
        formData.append('role', authData.role);
        formData.append('key', KEY.KEY_VALUE);
        formData.append('id', token.id);

        return fetch(SEND_OTP.SEND_OTP_URL, {
          method: "POST",
          body: formData
        })


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

        if (parsedRes.error) {
          alert("Authentication errr, please try again!");
        } else {
          if (parsedRes.status === "false") {
            alert(parsedRes.response);
          } else {
           Navigation.pop("Otp")
            callRestPassword()
            alert(parsedRes.response);
            // dispatch(authSetToken(parsedRes.idToken));
            //dispatch(authStoreToken(users.id));

          }
        }
      });
  }
};


export const forgotPassAPI = authData => {

  return dispatch => {

    dispatch(uiStartLoading())
    let formData = new FormData();
    formData.append('emailphone', authData.email);
    formData.append('role', authData.role);
    formData.append('key', KEY.KEY_VALUE);

    fetch(FORGOT_PASSWORD.FORGOT_PASSWORD_URL, {
      method: "POST",
      //  body: JSON.stringify(placeData)
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

          users = { ...parsedRes.user }
          console.log(users)
          Navigation.pop("ForgotPassword")
          authData["id"]=users.id
          dispatch(addUser(authData));
          callOtp(users)
          alert(parsedRes.response);
        }
      });
  }
};

const callLoginPop = () => {

  Navigation.pop("AuthScreen")
    .catch(err => console.log)

};




const callRestPassword = () => {

  Navigation.push("LoginType", {
    component: {
      id: 'ResetPassword',
      name: 'orgs.resetPassword',
      options: {
        topBar: {
          visible: true,
          title: {
            text: "ResetPassword",
            alignment: "center",
            fontSize: 16,
            // color: 'red',
            fontFamily: "Poppins-Bold",
          },
        }
      },

    },
  });


};
const callOtp = (users) => {
  // dispatch(authOtpStore())

  Navigation.push("LoginType", {
    component: {
      id: 'Otp',
      name: 'orgs.Otp',
      options: {
        topBar: {
          visible: true,
          title: {
            text: "Otp",
            alignment: "center",
            fontSize: 16,
            // color: 'red',
            fontFamily: "Poppins-Bold",
          },
        }
      },
      passProps: {
        text: users.OTP
      }
    },
  });


};

export const authStoreToken = (token) => {
  return dispatch => {
    dispatch(authSetToken(token));

    // AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString());
  };
};



export const authSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    token: token
  };
};

