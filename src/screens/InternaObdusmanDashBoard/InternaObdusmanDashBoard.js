import React, { Component } from 'react'
import { ImageBackground, StyleSheet, View, ScrollView, Image, ActivityIndicator } from 'react-native'
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import backgroundImage from "../../assets/bg1.jpg";
import BoxLayout from '../../components/UI/BoxLayout/BoxLayout'
import { Navigation } from 'react-native-navigation';
import { connect } from "react-redux";
import { dashboard,complaintsHandlerIO ,setAdd_Comp_user,authGetUserName} from "../../store/actions/index";
import { DIS_AGREED_COMPLAINTS, AGREED_COMPLAINTS, NEW_COMPLAINTS} from '../../utility/urlConstant'
import icon1 from "../../assets/icon_1.png";
import icon2 from "../../assets/icon_2.png";
import icon3 from "../../assets/icon_3.png";
import icon4 from "../../assets/icon_4.png";
import icon5 from "../../assets/icon_5.png";
import icon6 from "../../assets/icon_6.png";
import icon7 from "../../assets/icon_7.png";
import girlImage from "../../assets/girl.png";
import DialogProgress from 'react-native-dialog-progress'

class InternaObdusmanDashBoard extends Component {
    options = {
        title:"Loading",
        message:"Please Wait...",
        isCancelable:true
    }


    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this, props.screen)
    }


    componentDidMount() {
        this.props.onDashboard();
        this.props.onGetUserName();
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId == 'back') {

        }
     

         if (buttonId == 'sideDrawerLeft') {
            Navigation.mergeOptions('InternaObdusmanDashBoard', {
                sideMenu: {
                    left: {
                        visible: true
                    },
                }
            });
        }
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
   

    render() {
        DialogProgress.hide()
        console.log(this.props.dashboard)

        let dataView = (

            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.topLayyyy}>
                    <View style={styles.layoutHior}>
                        <HeadingText style={styles.textStyle} >Online </HeadingText>
                        <HeadingText style={[styles.textStyle,{marginTop:-20}]}>Grievance</HeadingText>
                        <HeadingText style={styles.textSmall} >Redressal and</HeadingText>
                        <HeadingText style={styles.textSmall}>Feedback System</HeadingText>
                    </View>
                    <Image style={styles.layoutImage} source={girlImage}></Image>
                </View>
                <View style={[styles.boxContainer, { marginTop: -14}]} >

                <BoxLayout
                        colors={['#f85032', '#e73827']}
                        image={icon7}
                        count={this.props.dashboard.new_complaints}
                        text="NEW COMPLAINTS"
                        onPress={this.newComplaintsHandler} >
                    </BoxLayout>

                    <BoxLayout
                        colors={['#96c93d', '#00b09b']}
                        image={icon6}
                        count={this.props.dashboard.Agree}
                        text="AGREED COMPLAINTS"
                        onPress={this.agreedComplaintsHandler}>
                    </BoxLayout>


                   
                </View>

                <View style={[styles.boxContainer, { marginTop: -12 }]} >

                <BoxLayout
                        colors={['#4b6cb7', '#182848']}
                        image={icon5}
                        count={this.props.dashboard.Disagree}
                        text="DISAGREED COMPLAINTS"
                        onPress={this.disAgreedComplaintsHandler}>
                    </BoxLayout>

                    {/* <BoxLayout
                        colors={['#c94b4b', '#4c144f']}
                        image={icon4}
                        count={this.props.dashboard.Escallated_to_us}
                        text="SEARCH COMPLAINTS"
                        onPress={this.escToUsComplaintsHandler}>
                    </BoxLayout> */}

                
                </View>
               
                {/* <View style={[styles.boxContainer, { marginTop: -12 }]} >
                <BoxLayout style={[{ marginTop: 0 }]}
                        colors={['#f12711', '#f5af19']}
                        image={icon1}
                        count={this.props.dashboard.All_complaints}
                        onPress={this.allComplaintsHandler}
                        text="GENERATE CGRO REPORT" >
                    </BoxLayout>

                </View> */}
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
        padding: 10,

    },

    image: {
        width: 50,
        height: 50

    },

    layoutHior: {
        width: "60%",

        flexDirection: "column",
        justifyContent: "flex-start"
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

        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5
    },

    scrollView: {

    },
    textStyle: {
      
        fontSize: 28,
        fontFamily: "Poppins-Bold",
       
    },

    textSmall: {
        marginTop:-5,
        fontSize: 18,
        fontFamily: "Poppins-Regular"
    }


})


const mapStateToProps = state => {
    return {
        isLoadind: state.ui.isLoading,
        dashboard: state.dashboard.dashboard
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDashboard: () => dispatch(dashboard("")),
        onComplaintClicked: authData => {
           
            dispatch(complaintsHandlerIO(authData ))
        },

        onGetUserName :()=> dispatch(authGetUserName())
        .catch(() => {
          alert("Invalid Credential");
        })
        .then(userName => {
            dispatch(setAdd_Comp_user({name:userName}));
        })  

       
        // , onAutoSignIn: () => dispatch(authAutoSignIn())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InternaObdusmanDashBoard);
