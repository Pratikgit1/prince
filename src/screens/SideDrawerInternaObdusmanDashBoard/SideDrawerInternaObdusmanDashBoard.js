import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimentions, Image, ScrollView, TouchableNativeFeedback, ImageBackground } from 'react-native'
import { Navigation } from 'react-native-navigation'
import logoutImage from "../../assets/logout.png";
import changePasswordImage from "../../assets/change_password.png";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import ComplaintView from '../SideDrawer/ComplaintView'
import { connect } from "react-redux";
import { COLOR } from '../../utility/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import { setAdd_Comp_user, complaintsHandlerIO, removeAuthData, setScreenTitle } from "../../store/actions/index";
import { DIS_AGREED_COMPLAINTS, AGREED_COMPLAINTS, NEW_COMPLAINTS} from '../../utility/urlConstant'




class SideDrawerInternaObdusmanDashBoard extends Component {

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this, props.screen)
    }

    newComplaintsHandler = () => {
        const authData = { title: "New Complaints",url:NEW_COMPLAINTS.NEW_COMPLAINTS_URL }
        this.props.onComplaintClicked(authData);
    }


    disAgreedComplaintsHandler = () => {
        const authData = { title: "Disagreed Complaints",url:DIS_AGREED_COMPLAINTS.DIS_AGREED_COMPLAINTS_URL }
        this.props.onComplaintClicked(authData);
    }

    agreedComplaintsHandler = () => {
        const authData = { title: "Agreed Complaints",url:AGREED_COMPLAINTS.AGREED_COMPLAINTS_URL }
        this.props.onComplaintClicked(authData);
    }

    logOut = () => {

        this.props.onLogout();
    }

    changePasswordHandler = () => {

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

    callCGROReportScreen= () => {
    
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
                id: "CGRO_REPORT_IO",
                 name: 'orgs.CGRO_REPORT_IO',
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

    }


    callSearchScreen = () => {
        const authData = { title: "Search Complaints",url:"" }
        this.props.onAddTitle(authData)
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
                id: "SearchComplaintIO",
                 name: 'orgs.SearchComplaintIO',
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



    }


    render() {
        let loginDat = ""

        if (this.props.userData !== undefined) {
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
                    <TouchableNativeFeedback onPress={this.callSearchScreen}>
                        <View style={styles.topRowContainer}>
                        <Icon name="md-search" color="white" size={25} />
                            <HeadingText style={styles.topTextStyle}>Search Complaints</HeadingText>
                        </View>
                    </TouchableNativeFeedback>

                    <View style={styles.lineStyle}></View>
                    <TouchableNativeFeedback onPress={this.callCGROReportScreen}>
                        <View style={styles.topRowContainer}>
                        <Icon name="md-search" color="white" size={25} />
                            <HeadingText style={styles.topTextStyle}>Genetare CGRO Report</HeadingText>
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
                            count={this.props.dashboard.Agree}
                            text="AGREED COMPLAINTS"
                            onPress={this.agreedComplaintsHandler}></ComplaintView>

                        <View style={styles.lineStyle}></View>

                        <ComplaintView
                            count={this.props.dashboard.Disagree}
                            text="DISAGREED COMPLAINTS"
                            onPress={this.disAgreedComplaintsHandler}></ComplaintView>

                        <View style={styles.lineStyle}></View>



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
        onAddTitle: (title) => dispatch(setScreenTitle(title)),

        onComplaintClicked: authData => {
           
            dispatch(complaintsHandlerIO(authData ))
        },
       
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SideDrawerInternaObdusmanDashBoard)