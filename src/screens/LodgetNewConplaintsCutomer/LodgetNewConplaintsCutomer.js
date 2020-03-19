import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableNativeFeedback } from "react-native";
import { connect } from "react-redux";
import {
    tryGetComplaintsList, complaintsDetails, replyHistory, addState,checkFeedBack,AddComplaintsDataCustomer,setCustomerComplaintList,
    setCustomerComplaintItem,profileDetail
} from '../../store/actions/index'
import { Keyboard } from 'react-native';
import { COLOR } from '../../utility/colors'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import Icon from 'react-native-vector-icons/Ionicons'
//import Popop from '../../example/Popop'
import { Navigation } from 'react-native-navigation';
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import validate from "../../utility/validation";
import ComplaintsListItemCustomer from "../../components/ComplaintsListItemCustomer/ComplaintsListItemCustomer";
import startMainTabs from "../../screens/startMainTabs/startMainTabs";
import DialogProgress from 'react-native-dialog-progress'

class LodgetNewConplaintsCutomer extends Component {


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
      //  this.props.onProfileDetail()
        this.props.onGetComplaintsList(this.props.titleData.url,this.props.titleData.c_staus);

    }

    updateInputState = (key, value) => {
        let connectedValue = {};

        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                            value,
                            prevState.controls[key].validationRules,
                            connectedValue
                        ),
                        touched: true
                    }
                }
            };
        });
    };



    AddComplaints = () => {
        this.props.onAddState()
        this.props.onAddComplaints("customer");
        this.props.onProfileDetail("")
    }
    itemViewdHandler = key => {
        const compDeta = this.props.customer_complaints.find(place => {
            return place.key === key;
        });
        
        this.props.onComplaintsDetails(compDeta)
        this.props.onReplyHistory(compDeta)

    };

    itemTrackHandler = key => {
        const compDeta = this.props.customer_complaints.find(place => {
            return place.key === key;
        });

        this.props.onCustomerSetComplaints(compDeta)

    };

    itemReOpenHandler = key => {
        const compDeta = this.props.customer_complaints.find(place => {
            return place.key === key;
        });

        this.props.onCustomerSetComplaints(compDeta)
        Navigation.push("CustomerDashBoard", {
            component: {
                id: 'Reopen',
                name: 'orgs.Reopen',
                options: {
                    topBar: {
                        visible: true,
                        title: {
                            text: "Re-Open",
                            alignment: "center",
                            fontSize: 16,
                            // color: 'red',
                            fontFamily: "Poppins-Bold",
                        },
                    }
                }
            },
        });

    };

    componentWillUnmount(){
   this.props.onsetDataNull()
    }

    itemFeedbackHandler = key => {
        const compDeta = this.props.customer_complaints.find(place => {
            return place.key === key;
        });

        this.props.onCheckComplaints(compDeta)
       
        // Navigation.push("CustomerDashBoard", {
        //     component: {
        //         id: 'FeedbackCustomer',
        //         name: 'orgs.FeedbackCustomer',
        //         options: {
        //             topBar: {
        //                 visible: true,
        //                 title: {
        //                     text: "Feedback",
        //                     alignment: "center",
        //                     fontSize: 16,
        //                     // color: 'red',
        //                     fontFamily: "Poppins-Bold",
        //                 },
        //             }
        //         }
        //     },
        // });
    };

    render() {
        DialogProgress.hide()
    if (this.props.isLoadind) {
      DialogProgress.show(this.options)
    }
        let data = null
        let addComplaints = null

        addComplaints = (
            <TouchableNativeFeedback >
                {/* <View style={styles.button}> */}
                <ButtonWithBackground
                    color="yellow"
                    onPress={this.AddComplaints}

                >
                    Add Complaints
         </ButtonWithBackground>

            </TouchableNativeFeedback>
        )



        data = (
            <View style={{ flex: 1 }}>


                <View style={styles.containerTop}>
        <HeadingText style={[styles.textTitle, { fontSize: 18, marginTop: 10 }]} > {this.props.titleData.title}</HeadingText>
                </View>

                <View style={styles.detailContainer}>
                    <ComplaintsListItemCustomer
                        places={this.props.customer_complaints}
                        onViewHandler={this.itemViewdHandler}
                        onFeedbackHandler={this.itemFeedbackHandler}
                        onTrackHandler={this.itemTrackHandler}
                        onReopenHandler={this.itemReOpenHandler}
                    />
                </View>

                {addComplaints}


            </View>
        )




        return (
            <View style={[styles.container, { padding: 0 }]}>

                {data}


            </View>

        );
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "flex-start",
        padding: 20,
        backgroundColor: COLOR.ICON_COLOR

    },

    containerTop: {

        justifyContent: "flex-start",
        padding: 20,
        backgroundColor: COLOR.ICON_COLOR

    },


    bottomDataDetail: {

        justifyContent: "center",
        alignItems: "center"

    },


    button: {

        width: "50"

    },


    textDetails: {
        color: "white",
        fontSize: 18,
        fontFamily: "Poppins-Regular"
    },

    textTitle: {
        color: "white",
        fontFamily: "Poppins-Bold",
        fontSize: 15,
        width: "100%",

    },

    input: {
        backgroundColor: "#eee",
        borderColor: "#bbb",
        width: "60%"
    },

    containerBottom: {

        justifyContent: "center",

        padding: 10,
        backgroundColor: 'white',
        flexDirection: "row",
        shadowColor: COLOR.ICON_COLOR,
        shadowRadius: 10,
        shadowOpacity: 0.6,
        elevation: 18

    },

    detailContainer: {
        padding: 10,
        marginTop: 0,
        backgroundColor: 'white',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        borderWidth: 1,
        borderColor: '#fff',
        flex: 1
    },


});

const mapDispatchToProps = dispatch => {
    return {
        onGetComplaintsList: (url,c_status) => dispatch(tryGetComplaintsList(url,c_status)),
        onProfileDetail: (state) => dispatch(profileDetail(state)),
        onAddComplaints: (data) => dispatch(AddComplaintsDataCustomer(data)),
        onAddState: () => dispatch(addState()),
        onComplaintsDetails: authData => dispatch(complaintsDetails(authData,"customer")),
        onReplyHistory: authData => dispatch(replyHistory(authData)),
       // onProfileDetail: () => dispatch(profileDetail("")),
         onCustomerSetComplaints:(authData)=>dispatch(setCustomerComplaintItem(authData)),

        onCheckComplaints:(authData)=>dispatch(checkFeedBack(authData)),

       onsetDataNull:() => dispatch(setCustomerComplaintList([])),

    };
};
const mapStateToProps = state => {
    return {
        customer_complaints: state.user.customer_complaints,
        isLoadind: state.ui.isLoading,
        titleData: state.user.titleData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LodgetNewConplaintsCutomer);
