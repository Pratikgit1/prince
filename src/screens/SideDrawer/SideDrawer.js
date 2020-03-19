import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimentions, Image, ScrollView, TouchableNativeFeedback, ImageBackground } from 'react-native'
import { Navigation } from 'react-native-navigation'
import logoutImage from "../../assets/logout.png";
import changePasswordImage from "../../assets/change_password.png";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import ComplaintView from './ComplaintView'
import { connect } from "react-redux";
import { COLOR } from '../../utility/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import { setAdd_Comp_user, complaintsHandler, removeAuthData, authGetUserName } from "../../store/actions/index";
import {
    CLOSE_COMPLAINTS, FORWARD_FROM_US_COMPLAINTS, ALL_COMPLAINTS, FORWARD_TO_US_COMPLAINTS,
    ESC_TO_US_COMPLAINTS, ESC_FROM_US_COMPLAINTS, NEW_COMPLAINTS
} from '../../utility/urlConstant'




class SideDrawer extends Component {

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this, props.screen)
    }

    newComplaintsHandler = () => {
        const authData = { title: "New Complaints", url: NEW_COMPLAINTS.NEW_COMPLAINTS_URL }
        this.props.onComplaintClicked(authData);
    }

    closeComplaintsHandler = () => {
        const authData = { title: "Close Complaints", url: CLOSE_COMPLAINTS.CLOSE_COMPLAINTS_URL }
        this.props.onComplaintClicked(authData);
    }

    forwardFromUsComplaintsHandler = () => {
        const authData = { title: "Forward From Us Complaints", url: FORWARD_FROM_US_COMPLAINTS.FORWARD_FROM_US_COMPLAINTS_URL }
        this.props.onComplaintClicked(authData);
    }

    forwardToUsComplaintsHandler = () => {
        const authData = { title: "Forward To Us Complaints", url: FORWARD_TO_US_COMPLAINTS.FORWARD_TO_US_COMPLAINTS_URL }
        this.props.onComplaintClicked(authData);
    }

    escFromUsComplaintsHandler = () => {
        const authData = { title: "Esclatted From Us Complaints", url: ESC_FROM_US_COMPLAINTS.ESC_FROM_US_COMPLAINTS_URL }
        this.props.onComplaintClicked(authData);
    }

    escToUsComplaintsHandler = () => {
        const authData = { title: "Esclatted To Us Complaints", url: ESC_TO_US_COMPLAINTS.ESC_TO_US_COMPLAINTS_URL }
        this.props.onComplaintClicked(authData);
    }

    allComplaintsHandler = () => {
        const authData = { title: "All Complaints", url: ALL_COMPLAINTS.ALL_COMPLAINTS_URL }
        this.props.onComplaintClicked(authData);
    }

    logOut = () => {

        this.props.onLogout();
    }


    // componentDidMount() {
    //     this.props.onGetUserName();
    // }

    changePasswordHandler = () => {

        Navigation.mergeOptions('DashBoard', {
            sideMenu: {
                left: {
                    visible: false
                },
            }
        });

        Promise.all([
            Icon.getImageSource("md-home", 50)

        ]).then(sources => {
            Navigation.push("DashBoard", {
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

        });
    }




    render() {
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
                </View>

                <View style={{ padding: 20, }}>
                    <HeadingText style={{ fontSize: 18, fontFamily: "Poppins-Regular", }}>Complaints</HeadingText>

                    <View style={{ marginTop: 10 }}>

                        <ComplaintView
                            count={this.props.dashboard.new_complaints}
                            text="NEW COMPLAINTS"
                            onPress={this.newComplaintsHandler}></ComplaintView>


                        <View style={styles.lineStyle}></View>


                        <ComplaintView
                            count={this.props.dashboard.Forward_to_us}
                            text="FORWARD TO US"
                            onPress={this.forwardToUsComplaintsHandler}></ComplaintView>

                        <View style={styles.lineStyle}></View>

                        <ComplaintView
                            count={this.props.dashboard.Forward_from_us}
                            text="FORWARD FROM US"
                            onPress={this.forwardFromUsComplaintsHandler}></ComplaintView>

                        <View style={styles.lineStyle}></View>

                        <ComplaintView
                            count={this.props.dashboard.Escallated_to_us}
                            text="ESCLATTED TO US"
                            onPress={this.escToUsComplaintsHandler}></ComplaintView>

                        <View style={styles.lineStyle}></View>

                        <ComplaintView
                            count={this.props.dashboard.Escallated_from_us}
                            text="ESCLATTED FROM US"
                            onPress={this.escFromUsComplaintsHandler}></ComplaintView>

                        <View style={styles.lineStyle}></View>
                        <ComplaintView
                            count={this.props.dashboard.Closed_complaints}
                            text="CLOSE COMPLAINTS"
                            onPress={this.closeComplaintsHandler} ></ComplaintView>

                        <View style={styles.lineStyle}></View>

                        <ComplaintView
                            count={this.props.dashboard.All_complaints}
                            text="All COMPLAINTS"
                            onPress={this.allComplaintsHandler}></ComplaintView>

                    </View>
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
        dashboard: state.dashboard.dashboard
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(removeAuthData()),
        // , onAutoSignIn: () => dispatch(authAutoSignIn())

        onComplaintClicked: authData => {

            dispatch(complaintsHandler(authData))
        },

        // onGetUserName: () => dispatch(authGetUserName())
        //     .catch(() => {
        //         alert("Invalid Credential");
        //     })
        //     .then(userName => {
        //         dispatch(setAdd_Comp_user(userName));
        //     })

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer)