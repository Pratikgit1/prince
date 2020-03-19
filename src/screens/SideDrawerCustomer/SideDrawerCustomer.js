import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimentions, Image, ScrollView, TouchableNativeFeedback, ImageBackground } from 'react-native'
import { Navigation } from 'react-native-navigation'
import logoutImage from "../../assets/logout.png";
import changePasswordImage from "../../assets/change_password.png";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import { connect } from "react-redux";
import { COLOR } from '../../utility/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import { minorityCommunity, addState, setScreenTitle, profileDetail, removeAuthData, } from "../../store/actions/index";
import DialogProgress from 'react-native-dialog-progress'
import {CUSTOMER_MY_COMPLAINTS} from '../../utility/urlConstant' 

class SideDrawerCustomer extends Component {

    options = {
        title:"Loading",
        message:"Please Wait...",
        isCancelable:true
    }

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this, props.screen)
    }

    logOut = () => {

        this.props.onLogout();
    }
    callLodgeNewComplaints = () => {
        if (this.props.IS_PROFILE_UPDATED.is_profile_update != undefined) {
            const authData = { title: "My Complaints", url: CUSTOMER_MY_COMPLAINTS.CUSTOMER_MY_COMPLAINTS_URL,c_staus:"3"  }
            this.props.onAddTitle(authData)

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
        }

    }

    changePasswordHandler = () => {

        Navigation.mergeOptions('CustomerDashBoard', {
            sideMenu: {
                left: {
                    visible: false
                },
            }
        });
        Navigation.push("CustomerDashBoard", {
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


    callUpdateProfile = () => {
      //  if (this.props.IS_PROFILE_UPDATED.is_profile_update != undefined) {
            const authData = { title: "Profile", url: "" }
            this.props.onAddTitle(authData)
            this.props.onProfileDetail("profile")

      //  }

    }



    render() {
        DialogProgress.hide()
        if (this.props.isLoadind) {
            DialogProgress.show(this.options)
        }
        let loginDat = ""

        if (this.props.userData!==undefined) {
            loginDat = this.props.userData.name.toUpperCase()
        }
        return (
            <ScrollView style={[styles.container, { width: 280 }]}>

                <View style={styles.userContainer}>

                    <View style={styles.userLayout}>

                        <Image
                            style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                            source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/01/2_img.png' }}
                        />
                        <HeadingText style={[styles.topTextStyle, { marginLeft: 5, fontSize: 18 }]}>Hello , </HeadingText>
                        <HeadingText style={[styles.topTextStyle, { marginLeft: 5, fontSize: 18 }]}>{loginDat}</HeadingText>
                    </View>

                    <TouchableNativeFeedback onPress={this.logOut}>
                        <View style={[styles.topRowContainer, { marginTop: 10 }]}>

                            <Image
                                source={logoutImage}
                                style={{ width: 20, height: 30 }}>
                            </Image>
                            <HeadingText style={styles.topTextStyle}>LogOut</HeadingText>

                        </View>
                    </TouchableNativeFeedback>

                    <View style={styles.lineStyle}></View>
                    <TouchableNativeFeedback onPress={this.changePasswordHandler}>
                        <View style={styles.topRowContainer}>
                            <Image
                                source={changePasswordImage}
                                style={{ width: 20, height: 30 }}>
                            </Image>
                            <HeadingText style={styles.topTextStyle}>Change Password</HeadingText>
                        </View>
                    </TouchableNativeFeedback>

                    <View style={styles.lineStyle}></View>
                    <TouchableNativeFeedback onPress={this.callLodgeNewComplaints}>
                        <View style={styles.topRowContainer}>
                            <Image
                                source={changePasswordImage}
                                style={{ width: 20, height: 30 }}>
                            </Image>
                            <HeadingText style={styles.topTextStyle}>Lodge New Complaint</HeadingText>
                        </View>
                    </TouchableNativeFeedback>

                    <View style={styles.lineStyle}></View>
                    <TouchableNativeFeedback onPress={this.callUpdateProfile}>
                        <View style={styles.topRowContainer}>
                            <Image
                                source={changePasswordImage}
                                style={{ width: 20, height: 30 }}>
                            </Image>
                            <HeadingText style={styles.topTextStyle}>Update Profile</HeadingText>
                        </View>
                    </TouchableNativeFeedback>
                </View>

            </ScrollView>

        )
    }


}



const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    userContainer: {
        padding: 22,
        backgroundColor: COLOR.ICON_COLOR,

    },
    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'white',
        margin: 10,
    },

    userLayout: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",


    },
    topTextStyle: {
        marginLeft: 20,
        fontFamily: "Poppins-Regular",
        fontSize: 16,
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
        userData: state.user.user_Data,
        IS_PROFILE_UPDATED: state.user.IS_PROFILE_UPDATED

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(removeAuthData()),
        onProfileDetail: (state) => dispatch(profileDetail(state)),

        onAddTitle: (title) => dispatch(setScreenTitle(title)),

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SideDrawerCustomer)