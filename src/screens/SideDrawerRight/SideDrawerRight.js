import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimentions, Image, ScrollView, TouchableNativeFeedback } from 'react-native'
import { Navigation } from 'react-native-navigation'
import logoutImage from "../../assets/logout.png";
import changePasswordImage from "../../assets/change_password.png";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from "react-redux";
import { setAdd_Comp_user,authGetUserName} from "../../store/actions/index";
import {  minorityCommunity,  addState ,setScreenTitle} from '../../store/actions/index'
import { COLOR } from '../../utility/colors'
//import changePasswordImage from "../../assets/change_password.png";

class SideDrawerRight extends Component {

    callSearchScreen = () => {
        const authData = { title: "Search Complaints",url:"" }
        this.props.onAddTitle(authData)
        Navigation.mergeOptions('DashBoard', {
            sideMenu: {
                right: {
                    visible: false
                },
            }
        });
        
    Promise.all([
        Icon.getImageSource("md-home", 50)

    ]).then(sources => {
        Navigation.push("DashBoard", {
            component: {
                id: "ComplaintsDetailsSearch",
                 name: 'orgs.ComplaintsDetailsSearch',
                options: {
                    topBar: {
                        visible: true,
                       
                        title: {
                            text: "Search Complaint", alignment: "center"
                        },
                    }
                },
            },
        });

    });


    }

    userChnagePassword= () => {
    
        Navigation.mergeOptions('DashBoard', {
            sideMenu: {
                right: {
                    visible: false
                },
            }
        });
        
    Promise.all([
        Icon.getImageSource("md-home", 50)

    ]).then(sources => {
        Navigation.push("DashBoard", {
            component: {
                id: "UserChangePassword",
                 name: 'orgs.UserChangePassword',
                options: {
                    topBar: {
                        visible: true,
                    
                        title: {
                            text: "User Change Password", alignment: "center"
                        },
                    }
                },
            },
        });

    });


    }


    componentWillMount(){
        this.props.onGetUserName()
    }

    callCGROReportScreen= () => {
    
        Navigation.mergeOptions('DashBoard', {
            sideMenu: {
                right: {
                    visible: false
                },
            }
        });
        
    Promise.all([
        Icon.getImageSource("md-home", 50)

    ]).then(sources => {
        Navigation.push("DashBoard", {
            component: {
                id: "CGROReport",
                 name: 'orgs.CGROReport',
                options: {
                    topBar: {
                        visible: true,
                    
                        title: {
                            text: "CGRO REPORT", alignment: "center"
                        },
                    }
                },
            },
        });

    });


    }


    callLodgeNewComplaints = () => {
        const authData = { title: "Lodge New Complaint",url:"" }
        this.props.onAddTitle(authData)

        Navigation.mergeOptions('DashBoard', {
            sideMenu: {
                right: {
                    visible: false
                },
            }
        });
        
    Promise.all([
        Icon.getImageSource("md-home", 50)

    ]).then(sources => {
        Navigation.push("DashBoard", {
            component: {
                id: "ComplaintsDetailsSearch",
                 name: 'orgs.ComplaintsDetailsSearch',
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

    });


    }

    callAddCustomerScreen = () => {
        const authData = { title: "Add Customer",url:"" }
        this.props.onAddTitle(authData)

        Navigation.mergeOptions('DashBoard', {
            sideMenu: {
                right: {
                    visible: false
                },
            }
        });

   

        this.props.onAddComplaints();
        this.props.onAddState()





    }

    render() {
        return (
            <ScrollView style={[styles.container]}>

                <View style={styles.userContainer}>
                    <TouchableNativeFeedback onPress={this.callLodgeNewComplaints}>
                    <View
                        style={styles.topRowContainer}>
                        <Icon name="ios-home" color="white" size={30} />
                        <HeadingText style={styles.topTextStyle}>Lodge New Complaint</HeadingText>

                    </View>
                    
                    </TouchableNativeFeedback>
                    <View style={styles.lineStyle}></View>

                    <TouchableNativeFeedback onPress={this.callSearchScreen}>
                    <View
                        style={styles.topRowContainer}>
                        <Icon name="md-search" color="white" size={30} />
                        <HeadingText style={styles.topTextStyle}>Search Complaint</HeadingText>

                    </View>
                    
                    </TouchableNativeFeedback>

                    <View style={styles.lineStyle}></View>

                    <TouchableNativeFeedback onPress={this.callCGROReportScreen}>
                    <View
                        style={styles.topRowContainer}>
                        <Icon name="md-search" color="white" size={30} />
                        <HeadingText style={styles.topTextStyle}>CGRO Report</HeadingText>

                    </View>
                    
                    </TouchableNativeFeedback>

                    <View style={styles.lineStyle}></View>


                    <TouchableNativeFeedback onPress={this.callAddCustomerScreen}>
                    <View
                        style={styles.topRowContainer}>
                        <Icon name="md-person-add" color="white" size={30} />
                        <HeadingText style={styles.topTextStyle}>Add Customer</HeadingText>

                    </View>
                    </TouchableNativeFeedback>
                    {
                      (this.props.userData!==undefined)?
                      (this.props.userData.name==="admin" )?
                        <View >
                         <View style={styles.lineStyle}></View>
                         <TouchableNativeFeedback onPress={this.userChnagePassword}>
                         <View
                             style={styles.topRowContainer}>
                             {/* <Icon name="md-search" color="white" size={30} /> */}
                             <Image
                                source={changePasswordImage}
                                style={{ width: 30, height: 30 }}>
                            </Image>
                             <HeadingText style={styles.topTextStyle}>User Change Password</HeadingText>
     
                         </View>
                         
                         </TouchableNativeFeedback>
                         </View>
                         :
                         <View></View>
                         :
                         <View></View>
                    }
                   

                </View>


            </ScrollView>

        )
    }


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginLeft: 30,
        width: "100%",

    },
    userContainer: {
        padding: 16,
        backgroundColor: COLOR.ICON_COLOR,

    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'white',
        margin: 10,
    },
    topTextStyle: {
        marginLeft: 10,
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        color: "white"

    },
    textStyle: {
        paddingTop: 22,
        backgroundColor: 'pink',

    },
    topRowContainer: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center"

    },
    placeImage: {
        width: 250,
        fontWeight: "bold",
        color: 'red',
        textAlign: "center",
        fontSize: 28
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    deleteButton: {
        alignItems: "center"
    }
});


const mapStateToProps = state => {
    return {
        isLoadind: state.ui.isLoading,
        dashboard: state.dashboard.dashboard,
        userData:state.user.user_Data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // , onAutoSignIn: () => dispatch(authAutoSignIn())
        onAddComplaints: () => dispatch(minorityCommunity("")),
        onAddState: () => dispatch(addState()),
        onAddTitle: (title) => dispatch(setScreenTitle(title)),
        onGetUserName :()=> dispatch(authGetUserName())
        .catch(() => {
         // alert("Invalid Credential");
        })
        .then(userName => {
            dispatch(setAdd_Comp_user({name:userName}));
        })  
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SideDrawerRight)