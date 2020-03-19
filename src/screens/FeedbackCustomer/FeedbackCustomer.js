import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground, ScrollView,
    Dimensions, ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import backgroundImage from "../../assets/bg.jpg";
import logo from "../../assets/logo1.png";
import validate from "../../utility/validation";
import { tyrFeedbackSubmit } from "../../store/actions/index";
import { COLOR } from '../../utility/colors'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import DialogProgress from 'react-native-dialog-progress'

class FeedbackCustomer extends Component {
    options = {
        title: "Loading",
        message: "Please Wait...",
        isCancelable: true
    }


    radio_props = [
        { label: 'Excellent', value: 'Excellent' },
        { label: 'Very good', value: 'Very good' },
        { label: 'Good', value: 'Good' },
        { label: 'Satisfactory', value: 'Satisfactory' },
        { label: 'Average', value: 'Average' },
        { label: 'Not satisfied', value: 'Not satisfied' }
    ];

    state = {
        controls: {
            comments: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 4
                },
                touched: false
            },

            feedback: {
                value: "Excellent",

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


    constructor(props) {
        super(props);

        // this.userData(props.)

    }

    componentWillUnmount() {

    }

    componentDidMount() {
        //this.props.onAutoSignIn();
    }


    loginHandler = () => {
        const authData = {
            comment: this.state.controls.comments.value,
            feedback: this.state.controls.feedback.value,

        };
        this.props.onComments(authData, this.props.customer_complaints);
        
    };


    render() {
        DialogProgress.hide()
        if (this.props.isLoadind) {
            DialogProgress.show(this.options)
        }

        let submitButton = (
            <ButtonWithBackground
                color="yellow"
                onPress={this.loginHandler}
                disabled={
                    !this.state.controls.comments.valid

                }
            >
                SEND
   </ButtonWithBackground>
        );

      
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <ScrollView>
                    <View style={styles.containerTop}>
                        <Image
                            style={styles.imageTOP}
                            source={logo}
                        />
                    </View>

                    <View
                        style={styles.container}>
                        <Text style={styles.text}>OGRFS</Text>
                        <Text style={styles.textHeader}>FeedBack</Text>
                        <View style={styles.containerInput}>
                            <View style={[styles.imageLayout, { marginTop: 0 }]}>
                                <Icon name="md-chatbubbles" color="red" size={25} />
                                <Text style={styles.textTitle}>Feedback</Text>

                            </View>
                            <RadioForm
                                radio_props={this.radio_props}
                                initial={0}
                                formHorizontal={false}
                                labelHorizontal={true}
                                buttonColor={COLOR.ICON_COLOR}
                                animation={true}
                                onPress={(itemValue) => {
                                    this.setState(prevState => {
                                        return {
                                            controls: {
                                                ...prevState.controls,

                                                feedback: {
                                                    value: itemValue,

                                                },
                                            }
                                        };
                                    })
                                }}
                            />
                            <View style={styles.imageLayout}>
                                <Icon name="md-chatbubbles" color="red" size={25} />
                                <Text style={styles.textTitle}>Comments</Text>

                            </View>
                            <DefaultInput
                                placeholder="Complaint details/summery"
                                style={styles.input}
                                value={this.state.controls.comments.value}
                                onChangeText={val => this.updateInputState("comments", val)}
                                valid={this.state.controls.comments.valid}
                                touched={this.state.controls.comments.touched}
                                numberOfLines={4}
                                autoCapitalize='words'
                                multiline={true}
                            />
                        </View>
                        <View >
                            {/* <ButtonWithBackground   color="yellow" onPress={() => MainTabs()} >
                    Login
                 </ButtonWithBackground> */}

                            {submitButton}

                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}


const styles = StyleSheet.create({

    containerTop: {
        marginTop: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    loginButton: {
        backgroundColor: "yellow",
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'yellow'
    },
    containerInput: {
        width: "90%",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        position: 'relative'
    },
    backgroundImage: {
        width: "100%",
        flex: 1
    },
    imageTOP: {
        width: 250,
        height: 90
    },
    imageLayout: {
        flexDirection: "row",
        justifyContent: "flex-start",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20

    },
    text: {
        fontSize: 30,
        fontFamily: "Poppins-Bold",
        fontWeight: "bold"
    },

    textHeader: {
        fontSize: 20,
        fontFamily: "Poppins-Regular"
    },

    textTitle: {
        marginLeft: 10,
        fontFamily: "Poppins-Bold",
        fontWeight: "bold",
        fontSize: 16,
    },
    inputContainer: {
        width: "90%"
    },
    input: {
        backgroundColor: "#eee",
        borderColor: "#bbb",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    landscapePasswordContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    portraitPasswordContainer: {
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    landscapePasswordWrapper: {
        width: "45%"
    },
    portraitPasswordWrapper: {
        width: "100%"
    }
});

const mapStateToProps = state => {
    return {
        isLoadind: state.ui.isLoading,
        role: state.user.userData,
        customer_complaints: state.user.customer_complaints_item,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onComments: (authData, customer_complaints) => dispatch(tyrFeedbackSubmit(authData, customer_complaints)),

        // , onAutoSignIn: () => dispatch(authAutoSignIn())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackCustomer);
