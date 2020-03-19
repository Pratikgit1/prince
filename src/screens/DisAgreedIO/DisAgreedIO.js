import React, { Component } from 'react'
import { StyleSheet, View, Text, Picker, ScrollView, ActivityIndicator } from 'react-native'
import { connect } from "react-redux";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput"
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import validate from "../../utility/validation";
import { agreedIOSubmitData } from "../../store/actions/index";
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import DocumentPicker from 'react-native-document-picker';
import { COLOR } from '../../utility/colors'
import { Navigation } from 'react-native-navigation';
import startMainTabs from "../../screens/startMainTabs/startMainTabs";
import BaseComponent from "../BaseComponent/BaseComponent"
import DialogProgress from 'react-native-dialog-progress'

class DisAgreedIO extends BaseComponent {
    options = {
        title: "Loading",
        message: "Please Wait...",
        isCancelable: true
    }

    state = {

        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 8
                },
                touched: false
            },
          
            image: {
                value: null,
                type: null,
                valid: false,
                res: null
            },
           
        },

    };

    async selectOneFile() {
        //Opening Document Picker for selection of one file
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                //There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });
            //Printing the log realted to the file
            console.log('res : ' + JSON.stringify(res));
            console.log('URI : ' + res.uri);
            console.log('Type : ' + res.type);
            console.log('File Name : ' + res.name);
            console.log('File Size : ' + res.size);
            //Setting the state to show single file attributes

            this.setState(prevState => {
                return {
                    controls: {
                        ...prevState.controls,
                        image: {
                            value: res.name,
                            type: res.type,
                            valid: true,
                            res: res
                        }
                    }
                };
            });
            // this.setState({ singleFile: res });
        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Canceled from single doc picker');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
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


    loginHandler = () => {
        const authData = {
            remarks: this.state.controls.email.value,
            doc: this.state.controls.image.res,
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
                    !this.state.controls.email.valid

                }
            >
                SEND
       </ButtonWithBackground>
        );

        if (this.props.isLoadind) {
            //submitButton = <ActivityIndicator></ActivityIndicator>
            DialogProgress.show(this.options)
        }
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <HeadingText style={{ fontSize: 22, color: "white", margin: 20 }} > DisAgreed</HeadingText>
                <View style={styles.detailContainer}>
                    
                   
                    <Text style={[styles.textStyle, { marginTop: 10 }]}>Comments</Text>
                    <DefaultInput
                        placeholder="Complaint Details Summery"
                        style={styles.input}
                        value={this.state.controls.email.value}
                        onChangeText={val => this.updateInputState("email", val)}
                        valid={this.state.controls.email.valid}
                        touched={this.state.controls.email.touched}
                        numberOfLines={4}
                        multiline={true}
                        autoCapitalize='words'
                    />


                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>

                        <ButtonWithBackground

                            color="yellow"
                            onPress={this.selectOneFile.bind(this)} >   Attach Document   </ButtonWithBackground>
                        <Text style={[styles.textStyle, { color: "red", fontSize: 12, width: "70%" }]}>{this.state.controls.image.value}</Text>

                    </View>


                    <Text style={[{ fontSize: 12, fontFamily: "Poppins-Regular" }]}>
                    Only PDF,JPGE, PNG, GIF, DOC, DOCX, TXT, XLS, XLSX,ZIP File are allowed And file size should be less than 5MB.  </Text>
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

        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",

        backgroundColor: COLOR.ICON_COLOR
    },
    textStyle: {

        fontSize: 15,
        fontFamily: "Poppins-Bold",
        fontWeight: "bold",
        textAlign: "left",
    },
    pickerStyle: {
        height: 45,
        width: "90%",
        color: '#344953',
        justifyContent: 'center',
        marginTop: -5
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

        onSubmitData: (authData, complaintsData) => dispatch(agreedIOSubmitData(authData, complaintsData,"disAgreed")),


    };
};
const mapStateToProps = state => {
    return {
        closeAction: state.dashboard.closeAction,
        closeRequestCategory: state.dashboard.closeRequestCategory,
        isLoadind: state.ui.isLoading,
        complaintsData: state.user.complaintsData

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(DisAgreedIO)