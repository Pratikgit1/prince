import React, { Component } from 'react'
import { StyleSheet, View, Text, Picker, ScrollView, ActivityIndicator } from 'react-native'
import { connect } from "react-redux";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput"
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import validate from "../../utility/validation";
import { complaintFormLevelHandler, onForwardForwardTo, forwardComplaintSubmitData } from "../../store/actions/index";
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import startMainTabs from "../../screens/startMainTabs/startMainTabs";
import {Navigation} from 'react-native-navigation';
import { COLOR } from '../../utility/colors'
import BaseComponent from "../BaseComponent/BaseComponent"
import DialogProgress from 'react-native-dialog-progress'

class forwardComplaint extends BaseComponent {
    options = {
        title:"Loading",
        message:"Please Wait...",
        isCancelable:true
    }

    componentDidMount(){
      this.props.onGetLevelData()
    }

    state = {
        level: {
            choosenIndex: 0,
            value: "",
            valid: false,
        },
        forwardTo: {
            choosenIndex: 0,
            value: "",
            valid: false,
        },

        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 8
                },
                touched: false
            },

        }
    };
    

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


    loginHandler = () => {


        const authData = {
            level: this.props.forwardLevelData[this.state.level.choosenIndex].id,
            forwardTo: this.props.forwardToData[this.state.forwardTo.choosenIndex].code,
            remarks: this.state.controls.email.value
        };
        this.props.onSubmitData(authData, this.props.complaintsData);
    };







    render() {
        DialogProgress.hide()
        let submitButton = (
            <ButtonWithBackground
                color="yellow"
                onPress={this.loginHandler}
                disabled={
                    !this.state.controls.email.valid ||
                    !this.state.level.valid ||
                    !this.state.forwardTo.valid

                }
            >
                SEND
       </ButtonWithBackground>
        );

        if (this.props.isLoadind) {
         //   submitButton = <ActivityIndicator></ActivityIndicator>
         DialogProgress.show(this.options)
        }
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <HeadingText style={{ fontSize: 22, color: "white", margin: 20 }} > FORWARD DETAILS</HeadingText>
                <View style={styles.detailContainer}>
                    <Text style={[styles.textStyle,{marginTop:10}]}>Level</Text>
                    <View style={styles.picker}>
                    <Picker style={styles.pickerStyle}
                        selectedValue={this.state.level.value}
                        onValueChange={(itemValue, itemPosition) => {
                            if (itemPosition !== 0) {
                                this.props.onForwardForward(this.props.forwardLevelData[itemPosition-1].id),
                                    this.setState({ level: { value: itemValue, choosenIndex: itemPosition-1, valid: true } })
                            }
                        }
                        } >
                        <Picker.Item label="--Select Level --" value="00" />
                        {this.props.forwardLevelData.map((item, index) => {
                            return (<Picker.Item label={item.name} value={index} key={index} />)
                        })}

                    </Picker>
                    </View>
                    <Text style={styles.textStyle}>Forward To</Text>
                    <View style={styles.picker}>
                    <Picker style={styles.pickerStyle}
                        selectedValue={this.state.forwardTo.value}
                        onValueChange={(itemValue, itemPosition) => {
                            if (itemPosition !== 0) {
                                this.setState({ forwardTo: { value: itemValue, choosenIndex: itemPosition-1, valid: true } })
                            }
                        }

                        }  >

                        <Picker.Item label="--Forward To--" value="00" />

                        {this.props.forwardToData.map((item, index) => {
                            return (<Picker.Item label={item.name} value={index} key={index} />)
                        })}

                    </Picker>
                    </View>

                    <Text style={styles.textStyle}>Comments</Text>
                    <DefaultInput
                        placeholder="Complaint Details Summery"
                        style={styles.input}
                        value={this.state.controls.email.value}
                        onChangeText={val => this.updateInputState("email", val)}
                        valid={this.state.controls.email.valid}
                        touched={this.state.controls.email.touched}
                        numberOfLines={4}
                        autoCapitalize='words'
                        multiline={true}
                    />
                    <View style={styles.button}>
                        {submitButton}
                    </View>
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",

        backgroundColor: COLOR.ICON_COLOR
    },
    textStyle: {

        fontSize: 15,
        fontWeight: 'bold',
        textAlign: "left",
        fontFamily: "Poppins-Bold",
        fontWeight: "bold",
        marginTop:10
    },
    pickerStyle: {
        height: 45,
        width: "90%",
        color: '#344953',
        justifyContent: 'center',
    },
    input: {
        width: "100%",
        backgroundColor: "#eee",
        borderColor: "#bbb",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins-Regular"
    },
    detailContainer: {
        flex: 1,
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: 'white',
        borderTopRightRadius: 28,
        borderTopLeftRadius: 28,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 10

    },
    picker: {
        backgroundColor: "#eee",
        borderColor: "#bbb",
        fontFamily: "Poppins-Regular",
        marginTop: 4,
        borderWidth: 1,

    },

    button: {
        width: "100%",

        alignItems: "center",
        justifyContent: "center"
    },
})

const mapDispatchToProps = dispatch => {
    return {
        onForwardForward: (authData) => dispatch(onForwardForwardTo(authData)),
        onSubmitData: (authData, complaintsData) => dispatch(forwardComplaintSubmitData(authData, complaintsData)),
        onGetLevelData: () => dispatch(complaintFormLevelHandler())


    };
};
const mapStateToProps = state => {
    return {
        forwardLevelData: state.user.forwardLevelData,
        forwardToData: state.user.forwardToData,
        isLoadind: state.ui.isLoading,
        complaintsData: state.user.complaintsData

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(forwardComplaint)