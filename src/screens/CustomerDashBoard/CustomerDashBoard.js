import React, { Component } from 'react'
import { ImageBackground, StyleSheet, View, ScrollView, Image, ActivityIndicator, TouchableNativeFeedback } from 'react-native'
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import backgroundImage from "../../assets/bg1.jpg";
import BoxLayout from '../../components/UI/BoxLayout/BoxLayout'
import { Navigation } from 'react-native-navigation';
import { connect } from "react-redux";
import {
    dashboard, complaintsHandler, setAdd_Comp_user, authGetUserName, authGetIsProfileUpdated,
    isProfileUpdated,setScreenTitle,profileDetail,complaintsHandlerCustomer
} from "../../store/actions/index";
import {CUSTOMER_MY_COMPLAINTS} from '../../utility/urlConstant'
import icon10 from "../../assets/icon_10.png";
import icon20 from "../../assets/icon_20.png";
import icon30 from "../../assets/icon_30.png";
import { COLOR } from '../../utility/colors'
import bg_cust from "../../assets/bg_cust.png";
import DialogProgress from 'react-native-dialog-progress'
import Icon from 'react-native-vector-icons/Ionicons'

class CustomerDashBoard extends Component {
    options = {
        title: "Loading",
        message: "Please Wait...",
        isCancelable: true
    }


    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this, props.screen)
    }


    componentDidMount() {
        this.props.onDashboard();
        this.props.onGetUserName();
        this.props.onGetIsProfileUdtaed();
        this.props.onProfileDetail("")
    }

    conponentDidUpdate(){
        this.props.onGetIsProfileUdtaed();
    }


    navigationButtonPressed({ buttonId }) {
        if (buttonId == 'back') {

        }
        else if (buttonId == 'sideDrawerLeft') {
           // if (this.props.IS_PROFILE_UPDATED.is_profile_update != undefined) {
                Navigation.mergeOptions('CustomerDashBoard', {
                    sideMenu: {
                        left: {
                            visible: true
                        },
                    }
                });
           // }

        }


    }

    
    callUpdateProfile= () =>{
        const authData = { title: "Profile",url:"" }
        this.props.onAddTitle(authData)
        this.props.onProfileDetail("Profile")

       
      

    }

    newComplaintsHandler = () => {
        const authData = { title: "New Complaints", url: CUSTOMER_MY_COMPLAINTS.CUSTOMER_MY_COMPLAINTS_URL,c_staus:"0"  }
        this.props.onComplaintClicked(authData);
    }

    closeComplaintsHandler = () => {
        const authData = { title: "Close Complaints", url: CUSTOMER_MY_COMPLAINTS.CUSTOMER_MY_COMPLAINTS_URL,c_staus:"1"  }
        this.props.onComplaintClicked(authData);
    }

    allComplaintsHandler = () => {
        const authData = { title: "New Complaints", url: CUSTOMER_MY_COMPLAINTS.CUSTOMER_MY_COMPLAINTS_URL ,c_staus:"3" }
        this.props.onComplaintClicked(authData);
    }


    render() {
        DialogProgress.hide()
        if (this.props.isLoadind) {
            DialogProgress.show(this.options)
          }
          

        let showUpdateProfile=<View></View>
        console.log(this.props.dashboard)
        if (this.props.IS_PROFILE_UPDATED.is_profile_update === undefined) {
         showUpdateProfile = (
            <TouchableNativeFeedback onPress={this.callUpdateProfile}>
            <View style={[styles.button, { width: "90%" }]}>
                <HeadingText style={[styles.textSmall, { color: "white", fontSize: 14 }]}>
                    Kindly update your details for full access of your dashboard
                        </HeadingText>
                <View style={styles.roundCircle}>
                    <Icon name="ios-arrow-forward" color="white" size={25} />
                </View>
            </View>
            </TouchableNativeFeedback>
        )
        }

        let dataView = (

            <ScrollView contentContainerStyle={styles.container}>
                <ImageBackground
                    source={bg_cust}
                    style={styles.topLayyyy}>
                    <View style={styles.layoutHior}>
                        <HeadingText style={[styles.textStyle, { color: "white" }]} >Online Grievance</HeadingText>
                        <HeadingText style={[styles.textSmall, { color: "white" }]} >Redressal and</HeadingText>
                        <HeadingText style={[styles.textSmall, { color: "white" }]}>Feedback System</HeadingText>
                    </View>
                    {showUpdateProfile}

                </ImageBackground>
                <View style={[styles.boxContainer, { marginTop: -14 }]} >

                    <TouchableNativeFeedback onPress={this.newComplaintsHandler}>
                        <View style={styles.listItem}>
                            <Image style={styles.image}
                                source={icon10}></Image>
                            <View style={{ width: "75%", marginLeft: 20 }}>
                                <HeadingText style={[styles.textStyle, { fontSize: 24, color: COLOR.ICON_COLOR }]} >{this.props.dashboard.new_complaints}</HeadingText>
                                <HeadingText style={[styles.textSmall, { fontSize: 14, }]}>NEW COMPLAINTS</HeadingText>
                            </View>
                            <Icon name="ios-arrow-forward" color={COLOR.ICON_COLOR} size={35} width="10%" />
                        </View>
                    </TouchableNativeFeedback>

                </View>
                <View style={[styles.boxContainer, { marginTop: -15 }]} >

                    <TouchableNativeFeedback onPress={this.closeComplaintsHandler}>
                        <View style={styles.listItem}>
                            <Image style={styles.image}
                                source={icon20}></Image>
                            <View style={{ width: "75%", marginLeft: 20 }}>
                                <HeadingText style={[styles.textStyle, { fontSize: 24, color: COLOR.ICON_COLOR }]} >{this.props.dashboard.Closed_complaints}</HeadingText>
                                <HeadingText style={[styles.textSmall, { fontSize: 14, }]}>CLOSE COMPLAINTS</HeadingText>
                            </View>
                            <Icon name="ios-arrow-forward" color={COLOR.ICON_COLOR} size={35} width="10%" />
                        </View>
                    </TouchableNativeFeedback>

                </View>

                <View style={[styles.boxContainer, { marginTop: -15 }]} >

                    <TouchableNativeFeedback onPress={this.allComplaintsHandler}>
                        <View style={styles.listItem}>
                            <Image style={styles.image}
                                source={icon30}></Image>
                            <View style={{ width: "75%", marginLeft: 20 }}>
                                <HeadingText style={[styles.textStyle, { fontSize: 24, color: COLOR.ICON_COLOR }]} >{this.props.dashboard.All_complaints}</HeadingText>
                                <HeadingText style={[styles.textSmall, { fontSize: 14, }]}>All COMPLAINTS</HeadingText>
                            </View>
                            <Icon name="ios-arrow-forward" color={COLOR.ICON_COLOR} size={35} width="10%" />
                        </View>
                    </TouchableNativeFeedback>

                </View>
            </ScrollView>
        )


        if (this.props.isLoadind) {
            dataView = <ActivityIndicator size="large" color="#0000ff" style={{
                flex: 1, flexDirection: 'row',
                justifyContent: 'center', alignItems: "center",
                padding: 10
            }}></ActivityIndicator>
        }

        return (
            // {dataView}

            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                {/* // dashboard= {this.props.dashboard} */}
                {dataView}
            </ImageBackground>
        )
    }

}

const styles = StyleSheet.create({
    backgroundImage: {
        width: "100%",
        flex: 1,
    },
    container: {

        justifyContent: "flex-start",


    },
    roundCircle: {
        borderRadius: 1000,
        borderColor: 'white',
    },
    listItem: {
        flexDirection: "row",
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5,
        padding: 10,
        backgroundColor: "white",

        shadowRadius: 10,
        shadowOpacity: 0.6,
        elevation: 18,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fff',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    listItem2: {
        width: "100%",
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    image: {
        width: 65,
        height: 65

    },
    button: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        paddingBottom: 10,
        margin: 5,
        borderRadius: 100,
        borderWidth: 1,
        flexDirection: "row",
        borderColor: "yellow",
        justifyContent: "center",
        alignItems: "center"
    },
    layoutHior: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center"
    },

    layoutImage: {
        width: "40%",

        height: "100%"
    },


    boxLayout: {
        width: "45%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        position: 'relative'
    },
    boxContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 5
    },
    topLayyyy: {
        width: "100%",

        height: 260,
    },

    scrollView: {

    },
    textStyle: {

        fontSize: 28,
        fontFamily: "Poppins-Bold",

    },

    textSmall: {
        marginTop: -5,
        fontSize: 18,
        fontFamily: "Poppins-Regular"
    }


})


const mapStateToProps = state => {
    return {
        isLoadind: state.ui.isLoading,
        dashboard: state.dashboard.dashboard,
        IS_PROFILE_UPDATED: state.user.IS_PROFILE_UPDATED
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDashboard: () => dispatch(dashboard("8")),
        onProfileDetail: (state) => dispatch(profileDetail(state)),
        onComplaintClicked: authData => {

            dispatch(complaintsHandlerCustomer(authData))
        },

        onGetUserName: () => dispatch(authGetUserName())
            .catch(() => {
                //alert("Invalid Credential");
            })
            .then(userName => {
                dispatch(setAdd_Comp_user({ name: userName }));
            }),

        onGetIsProfileUdtaed: () => dispatch(authGetIsProfileUpdated())
            .catch(() => {
                //alert("Invalid Credential");
            })
            .then(userName => {
                dispatch(isProfileUpdated({ is_profile_update: userName }));
            }),

            onAddTitle: (title) => dispatch(setScreenTitle(title)),

        // , onAutoSignIn: () => dispatch(authAutoSignIn())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashBoard);
