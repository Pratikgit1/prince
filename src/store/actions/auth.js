
import { uiStartLoading, uistopLoading, addAuthData, addUser, callLogin, setAdd_Comp_user } from '../actions/index'
import startMainTabs from "../../screens/startMainTabs/startMainTabs";
import StartMainTabsCustomer from "../../screens/startMainTabs/StartMainTabsCustomer";
import StartMainStabsInternalObdusman from "../../screens/StartMainStabsInternalObdusman/StartMainStabsInternalObdusman";
import { LOGIN, KEY } from '../../utility/urlConstant'
import { Navigation } from 'react-native-navigation';
import AsyncStorageReact from '@react-native-community/async-storage';


export const tryAuth = authData => {
    return dispatch => {
        dispatch(authSignup(authData));
    };
};


export const authSignup = authData => {

    return dispatch => {

        dispatch(uiStartLoading())
        let formData = new FormData();

        formData.append('password', authData.password);
        if (authData.role === "8") {
            formData.append('emailphone', authData.email);
        }
        else {
            formData.append('username', authData.email);
        }
        formData.append('role', authData.role);
        formData.append('key', KEY.KEY_VALUE);
        fetch(LOGIN.LOGIN_URL, {
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
                alert(err);
                console.log(err.message)
            })
            .then(parsedRes => {
                console.log(parsedRes);

                dispatch(uistopLoading())



                if (parsedRes.status === "false") {
                    alert(parsedRes.response);
                } else {

                    let users = {};

                    users = { ...parsedRes.user }
                    console.log(users)
                    storeData(users, authData)
                    // authStore(users)
                    // dispatch(authOtpStore(users));

                    //  dispatch(authStoreData(users));\
                    


                }
            });
    }
};

const changePasswordHandler = () => {



    Navigation.push("AuthScreen", {
        component: {
            id: 'ChangePassword',
            name: 'orgs.ChangePassword',
            options: {
                topBar: {
                    visible: true,
                    title: {
                        text: "ChangePassword", alignment: "center"
                    },
                }
            },
        },


    });
}


export const removeAuthData = authData => {

    return dispatch => {

        clearAuthData()
    }
};

const clearAuthData = async () => {

    try {
        // await AsyncStorageReact.setItem('@storage_Key', 'stored value')
        await AsyncStorageReact.removeItem("ap:auth:user_id");
        await AsyncStorageReact.removeItem("ap:auth:role");
        await AsyncStorageReact.removeItem("ap:auth:username");
        await AsyncStorageReact.removeItem("ap:auth:br_code");
        await AsyncStorageReact.removeItem("ap:auth:user_type");
        await AsyncStorageReact.removeItem("ap:auth:password");
        await AsyncStorageReact.removeItem("ap:auth:updated");

        callLogin()
    } catch (e) {
        console.log(e)

    }
}



const storeData = async (user, authData) => {
    try {
        await AsyncStorageReact.setItem("ap:auth:user_id", user.id);
        await AsyncStorageReact.setItem("ap:auth:username", user.username);
        await AsyncStorageReact.setItem("ap:auth:role", user.role);

        if (user.role === "27") { // IO
            await AsyncStorageReact.setItem("ap:auth:br_code", user.br_code);
            await AsyncStorageReact.setItem("ap:auth:user_type", user.user_type);
            StartMainStabsInternalObdusman();
        }

        else if(user.role === "8"){  //Customer
            await AsyncStorageReact.setItem("ap:auth:password", user.is_password_change);
            if (user.updated===null) {
                await AsyncStorageReact.setItem("ap:auth:updated", "");
            }
            else{
                await AsyncStorageReact.setItem("ap:auth:updated", user.updated);
            }
            

            if (user.is_password_change === "0") {
                changePasswordHandler()
            }

            else {
                StartMainTabsCustomer()
            }
        }

       else {
            await AsyncStorageReact.setItem("ap:auth:br_code", user.br_code);
            await AsyncStorageReact.setItem("ap:auth:user_type", user.user_type);
            startMainTabs();
        }
       

    } catch (e) {
        console.log(e)
    }
}


export const authAutoSignIn = (users) => {
    return dispatch => {
        dispatch(authGetRole())
            .catch(() => {

            })
            .then(role => {
                console.log(role)

                
                if (role === undefined) {
                    setTimeout(() => {

                        callLoginTypeScreen()

                    }, 2000);
                }

              else  if (role === "27") {
                    setTimeout(() => {

                        StartMainStabsInternalObdusman()

                    }, 2000);
                }
                else if (role === "8") {
                    setTimeout(() => {

                        dispatch(authGetIsPasswordChange())
                        .catch(() => {
                            //  alert("Invalid Credential");
                        })
                        .then(is_pass_change => {
                           if (is_pass_change==="0") {
                            callLoginTypeScreen()
                           }

                           else{
                            StartMainTabsCustomer();
                           }
                        })
            

                        

                    }, 2000);
                }
                else {
                    setTimeout(() => {

                        startMainTabs();

                    }, 2000);
                }


            })

    };
};


const callLoginTypeScreen =()=>{
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


export const authOtpStore = (users) => {
    return dispatch => {
        dispatch(addUser(users));

    };
};

export const authStoreData = (users) => {
    return dispatch => {
        dispatch(addAuthData(users));


    };
};

export const authStore = (user) => {

    // AsyncStorage.setItem("ap:auth:id",user.id);
    // AsyncStorage.setItem("ap:auth:id",user.role);
    // AsyncStorage.setItem("ap:auth:id",user.username);
    // AsyncStorage.setItem("ap:auth:id",user.br_code  );
    // AsyncStorage.setItem("ap:auth:id",user.user_type);


};






export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {

            let fetchedToken;
            AsyncStorageReact.getItem("ap:auth:user_id")
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

export const authGetUser_type = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {

            let fetchedToken;
            AsyncStorageReact.getItem("ap:auth:user_type")
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


export const authGetbr_code = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {

            let fetchedToken;
            AsyncStorageReact.getItem("ap:auth:br_code")
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


export const authGetRole = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {

            let fetchedToken;
            AsyncStorageReact.getItem("ap:auth:role")
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

export const authGetUserName = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {

            let fetchedToken;
            AsyncStorageReact.getItem("ap:auth:username")
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


export const authGetIsPasswordChange = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {

            let fetchedToken;
            AsyncStorageReact.getItem("ap:auth:password")
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

export const authGetIsProfileUpdated = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {

            let fetchedToken;
            AsyncStorageReact.getItem("ap:auth:updated")
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


export const authUserKeyData = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().user.userData;
            if (!token) {
                reject();
            } else {
                resolve(token);
            }
        });
        return promise;
    };
};

export const authCustomerComplaintsList = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().user.customer_complaints;
            if (!token) {
                reject();
            } else {
                resolve(token);
            }
        });
        return promise;
    };
};



export const authUserAuthData = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().user;
            if (!token) {
                reject();
            } else {
                resolve(token);
            }
        });
        return promise;
    };
};