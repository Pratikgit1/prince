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
import { tyrResendOtp, tyrOtp } from "../../store/actions/index";

class otp extends Component {

    state = {
        users: {},
        controls: {
            otp: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 4
                },
                touched: false,
                resendEnable:false
            }
        }
    };

    

    componentWillMount(){
        setTimeout(() => {
            this.setState(prevState => {
                return {
                    controls: {
                        ...prevState.controls,
                        otp: {
                            ...prevState.controls.otp,
                            resendEnable:true
                        }
                    }

                };
            })
         

        }, 2000);
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

    userData = user => {
        this.setState({
            users: { ...user }
        });
    };

    constructor(props) {
        super(props);

        // this.userData(props.)

    }

    componentWillUnmount() {

    }

    reSendOTP=()=>{
        this.props.onReSendOtp();
    }

    componentDidMount() {
        //this.props.onAutoSignIn();
    }

    

    loginHandler = () => {
        const authData = {
            otp: this.state.controls.otp.value,
            role: this.props.role,
        };
        this.props.onOtp(authData);
        //startMainTabs();
    };


    render() {
        let headingText = null;

        let submitButton = (
            <ButtonWithBackground
                color="yellow"
                onPress={this.loginHandler}
                disabled={
                    !this.state.controls.otp.valid

                }
            >
                SEND
   </ButtonWithBackground>
        );

        if (this.props.isLoadind) {
            submitButton = <ActivityIndicator></ActivityIndicator>
        }

        if (this.state.viewMode === "portrait") {
            headingText = (
                <MainText>
                    <HeadingText>Please Log In</HeadingText>
                </MainText>
            );
        }
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
                        <Text style={styles.textHeader}>OTP</Text>
                        <View style={styles.containerInput}>
                            <View style={styles.imageLayout}>
                                <Icon name="ios-mail" color="red" size={35} />
                                <Text style={styles.textTitle}>OTP</Text>

                            </View>
                            <DefaultInput
                                placeholder="Enter OTP"
                                style={styles.input}
                                value={this.state.controls.otp.value}
                                onChangeText={val => this.updateInputState("otp", val)}
                                valid={this.state.controls.otp.valid}
                                touched={this.state.controls.otp.touched}
                            />
                        </View>
                        <View >
                            <View style={[{ marginTop: 20, justifyContent: "space-between", flexDirection: "row" }]}>
                                <Text style={{
                                    fontSize: 20, color:this.state.controls.otp.resendEnable ? styles.disabledText : null, textDecorationLine: 'underline', fontFamily: "Poppins-Bold", }}
                                    onPress={this.reSendOTP} >Resend OTP</Text>


                            </View>
                            <View style={{ marginTop: 20 }}>
                                {submitButton}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}


const styles = StyleSheet.create({

    containerTop: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 60
    },
    loginButton: {
        backgroundColor: "yellow",
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'yellow'
    },
    disabledText: {
        color: "#aaa",
        fontWeight:"bold",
        fontFamily:"Poppins-Bold"
      },
    containerInput: {
        width: "80%",
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
        fontWeight: "bold"
    },
    inputContainer: {
        width: "80%"
    },
    input: {
        backgroundColor: "#eee",
        borderColor: "#bbb"
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
        role: state.user.role,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOtp: (authData) => dispatch(tyrOtp(authData)),
        onReSendOtp: () => dispatch(tyrResendOtp()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(otp);
