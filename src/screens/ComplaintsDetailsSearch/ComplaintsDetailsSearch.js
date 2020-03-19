import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableNativeFeedback } from "react-native";
import { connect } from "react-redux";
import {
    setCustomerListData, setComplaintsListData, complaintsDetails, replyHistory, minorityCommunity,
    addState, trySearchComplaints, AddComplaintsData
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
import ComplaintsListItem from "../../components/ComplaintsList/ComplaintsList";
import startMainTabs from "../../screens/startMainTabs/startMainTabs";

class ComplaintsDetailsSearch extends Component {

    state = {
        click: false,
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 4
                },
                touched: false
            },

        }
    };


    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this, props.screen)
    }
    
    navigationButtonPressed({ buttonId }) {
        if (buttonId == 'optionMunu') {
            startMainTabs();
        }
        
    }

    // componentWillUnmount() {
    //     let customerDetail = [];
    //     let complaint_details = [];
    //     this.props.onSetComplaintsDetails(customerDetail);
    //     this.props.onSetComplaintsList(complaint_details);

    // }

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



    navigationButtonPressed({ buttonId }) {
        if (buttonId == 'back') {

        }
        else if (buttonId == 'optionMunu') {
            this.onPress()
        }
    }


    submitHandler = () => {

        Keyboard.dismiss()
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                },
                click: true
            };
        })

        const authData = {
            email: this.state.controls.email.value,

        };
        this.props.onSetComplaintsNullList() 
        this.props.onSetComplaintsDetailsNull()

        this.props.onSearchComplaints(authData);

    }

    AddComplaints = () => {
        this.props.onAddState()
        this.props.onAddComplaints(this.props.customerList[0]);
    }

    AddCustomer = () => {

        this.props.onAddMinorityCommunity();
        this.props.onAddState()

    }

    itemSelectedHandler = key => {
        const compDeta = this.props.complaintsList.find(place => {
            return place.key === key;
        });

        this.props.onComplaintsDetails(compDeta)
        this.props.onReplyHistory(compDeta)

    };

    componentWillUnmount(){
     this.props.onSetComplaintsNullList() 
     this.props.onSetComplaintsDetailsNull()
    }


    render() {
        let data = null
        let addComplaints = null
        if (!this.props.isLoadind && this.props.titleData.title === "Lodge New Complaint") {
            if (this.state.click) {
                data = (
                    <View style={{ flex: 1 }}>


                        <View style={styles.containerTop}>
                        <HeadingText style={[styles.textTitle, { fontSize: 14, marginTop: 10,padding:10,backgroundColor:"white",color:"red" }]} >Customer is not registered in OGRFS. Please click on add customer before loging complaint. </HeadingText>
                        <View style={{marginTop:10}}>
                            <TouchableNativeFeedback >

                                <ButtonWithBackground color="yellow" onPress={this.AddCustomer} > Add Customer </ButtonWithBackground>

                            </TouchableNativeFeedback>
                            </View>
                        </View>
                    </View>
                )
            }
        }

        if (this.props.titleData.title === "Lodge New Complaint") {
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
        }

        if (this.props.customerList.length > 0) {


            data = (
                <View style={{ flex: 1 }}>


                    <View style={styles.containerTop}>
                        <HeadingText style={[styles.textTitle, { fontSize: 20 }]} > {this.props.customerList[0].id}</HeadingText>
                        <View style={{ width: "100%", flexDirection: "row", borderBottomColor: 'white', borderBottomWidth: 1, marginTop: 10 }}></View>
                        <HeadingText style={[styles.textTitle, { fontSize: 16, marginTop: 10 }]} > CUSTOMER NAME</HeadingText>

                        <HeadingText style={styles.textDetails} > {this.props.customerList[0].name}</HeadingText>
                        <View style={{ flex: 1, flexDirection: "row", marginTop: 5 }}>

                            <View style={{ width: "65%", flexDirection: "column" }}>
                                <HeadingText style={[styles.textTitle, { fontSize: 16, marginTop: 7 }]} >EMAIL</HeadingText>

                                <HeadingText style={styles.textDetails} > {this.props.customerList[0].email}</HeadingText>
                            </View>
                            <View style={{ width: "35%", flexDirection: "column" }}>
                                <HeadingText style={[styles.textTitle, { fontSize: 16, marginTop: 7 }]} >MOBILE NO</HeadingText>

                                <HeadingText style={styles.textDetails}> {this.props.customerList[0].mobile}</HeadingText>
                            </View>
                        </View>


                    </View>

                    <View style={styles.detailContainer}>
                        <ComplaintsListItem
                            places={this.props.complaintsList}
                            onItemSelected={this.itemSelectedHandler}
                        />
                    </View>

                    {addComplaints}


                </View>
            )

        }


        return (
            <View style={[styles.container, { padding: 0 }]}>
                <View style={styles.containerBottom}>


                    <DefaultInput
                        placeholder="Mobile/Email/Name"
                        style={styles.input}
                        value={this.state.controls.email.value}
                        onChangeText={val => this.updateInputState("email", val)}
                        valid={this.state.controls.email.valid}
                        touched={this.state.controls.email.touched}
                    />
                    <TouchableNativeFeedback >
                        <ButtonWithBackground
                            color="yellow"
                            onPress={this.submitHandler}
                            disabled={
                                !this.state.controls.email.valid
                            }
                        >
                            SUBMIT
                         </ButtonWithBackground>

                    </TouchableNativeFeedback>

                </View>

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
        fontSize: 16,
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
        marginTop: 60,
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
        onSearchComplaints: authData => dispatch(trySearchComplaints(authData)),
        onComplaintsDetails: authData => dispatch(complaintsDetails(authData)),
        onReplyHistory: authData => dispatch(replyHistory(authData)),

        onAddMinorityCommunity: () => dispatch(minorityCommunity()),
        onAddState: () => dispatch(addState()),
        // onSetComplaintsDetails: (customerDetail) => dispatch(setCustomerListData(customerDetail)),
        // onSetComplaintsList: (data) => dispatch(setComplaintsListData(data)),

        onAddComplaints: (data) => dispatch(AddComplaintsData(data)),

        onSetComplaintsNullList: () => dispatch(setCustomerListData([])),
        onSetComplaintsDetailsNull: () => dispatch(setComplaintsListData([])),


    };
};
const mapStateToProps = state => {
    return {
        complaintsList: state.dashboard.complaintsList,
        customerList: state.user.customerList,
        isLoadind: state.ui.isLoading,
        titleData: state.user.titleData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintsDetailsSearch);
