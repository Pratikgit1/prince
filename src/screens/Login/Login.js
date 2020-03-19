import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import {
    View,
    Text,
    Image,
    Button,
    TextInput,
    StyleSheet,
    ImageBackground,
    Dimensions, ActivityIndicator, ScrollView
} from "react-native";
import { connect } from "react-redux";
import mainTab from '../startMainTabs/startMainTabs'
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import backgroundImage from "../../assets/bg.jpg";
import logo from "../../assets/logo1.png";
import captchaImage from "../../assets/captcha.png";
import validate from "../../utility/validation";
import { tryAuth, authAutoSignIn } from "../../store/actions/index";
import { Navigation } from 'react-native-navigation';
import { COLOR } from '../../utility/colors'
import DialogProgress from 'react-native-dialog-progress'

class LoginScreen extends Component {

    state = {
        componentId: "",
        randomNumberOne: 0,
        checkLoop: false,
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 4
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 4
                },
                touched: false
            },

            captcha: {
                value: "",
                valid: false,
                validationRules: {
                    captchaHolder: 6
                },
                touched: false
            }
        }
    };


     options = {
        title:"Loading",
        message:"Please Wait...",
        isCancelable:true
    }



    updateInputState = (key, value) => {
        let connectedValue = {};

        if (key === "password") {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }

        if (key === "captcha") {
            connectedValue = {
                ...connectedValue,
                captchaHolder: this.state.randomNumberOne
            };
        }
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
        Dimensions.addEventListener("change", this.updateStyles);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    componentDidMount() {
        //this.props.onAutoSignIn();
        this.generateCaptcha();
        // Navigation.pop("SplashScreen")


    }
    generateCaptcha = () => {
        let numberOne = Math.floor(Math.random() * 1000000) + 1;
        this.setState({ randomNumberOne: numberOne });

    }



    loginHandler = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
            role: this.props.role,
        };
        this.props.onLogin(authData);

    };


    forgotPassword = () => {


        Navigation.push("AuthScreen", {
            component: {
                id: 'ForgotPassword',
                name: 'orgs.ForgotPassword',
                options: {
                    topBar: {
                        visible: true,
                        title: {
                            text: "ForgotPassword",
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


    signUpCall = () => {
        Navigation.push("AuthScreen", {
            component: {
                id: 'CustomerRegistration',
                name: 'orgs.CustomerRegistration',
                options: {
                    topBar: {
                        visible: true,
                        title: {
                            text: "CustomerRegistration",
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


    render() {
        DialogProgress.hide()
        let placeHolde = "";
        let title = "";
        let signup = null;
        let titleText = ""
        let submitButton = (
            <ButtonWithBackground
                color="yellow"
                onPress={this.loginHandler}
                disabled={
                    !this.state.controls.email.valid ||
                    !this.state.controls.password.valid
                    || !this.state.controls.captcha.valid
                }
            >
                Login
       </ButtonWithBackground>
        );

        if (this.props.role === "") {
            placeHolde = "Enter User Code"
            title = "User Code"
            titleText = "Dashboard Login"

        }
        else {
            placeHolde = "Enter Email/Phone No"
            title = "Mail/Phone no"
            titleText = "Sign in to Start your Session."
            signup = (<Text style={{
                fontSize: 15, color: "white", textDecorationLine: 'underline', fontFamily: "Poppins-Bold", marginLeft: 90,
                fontWeight: "bold"
            }}
                onPress={this.signUpCall}
            >SIGN UP </Text>)
        }

        // if (this.props.role==="8") {
        //     signup=( <Text style={{
        //         fontSize: 15, color: "white", textDecorationLine: 'underline', fontFamily: "Poppins-Bold", marginLeft:90,
        //         fontWeight: "bold"
        //     }}
        //         onPress={this.forgotPassword}
        //     >SIGN UP </Text>)
        // }

        if (this.props.isLoadind) {

            if (!this.state.checkLoop) {

                this.setState(prevState => {
                    return {
                        controls: {
                            ...prevState.controls,

                            captcha: {
                                //...prevState.controls[captcha],
                                value: "",
                                valid: false,
                                touched: false
                            }
                        },
                        checkLoop: true
                    };
                });
                this.generateCaptcha();
            }
          

           // submitButton = <ActivityIndicator></ActivityIndicator>
            DialogProgress.show(this.options)
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
                        <Text style={styles.textHeader}>{titleText}</Text>
                        <View style={styles.containerInput}>
                            <View style={styles.imageLayout}>
                                <Icon name="ios-mail" color={COLOR.ICON_COLOR} size={35} />
                                <Text style={styles.textTitle}>{title}</Text>

                            </View>
                            <DefaultInput
                                placeholder={placeHolde}
                                style={styles.input}
                                value={this.state.controls.email.value}
                                onChangeText={val => this.updateInputState("email", val)}
                                valid={this.state.controls.email.valid}
                                touched={this.state.controls.email.touched}
                                returnKeyType='next'
                                autoCapitalize='none'
                            />

                            <View style={styles.imageLayout}>
                                <Icon name="md-lock" color={COLOR.ICON_COLOR} size={35} />
                                <Text style={styles.textTitle}>Password</Text>

                            </View>
                            <DefaultInput
                                placeholder="Your Password"
                                style={styles.input}
                                value={this.state.controls.password.value}
                                onChangeText={val => this.updateInputState("password", val)}
                                valid={this.state.controls.password.valid}
                                touched={this.state.controls.password.touched}
                                secureTextEntry={true}
                                returnKeyType='next'
                                autoCapitalize='none'
                            />


                            <View style={styles.imageLayout}>
                                <Image source={captchaImage} style={styles.imageStyle} />
                                <Text style={styles.textTitle}>Captcha</Text>
                            </View>
                            <View style={[styles.imageLayout, { marginTop: 0 }]}>
                                <DefaultInput
                                    placeholder="Enter Captcha"
                                    style={[styles.input, { width: 150 }]}
                                    value={this.state.controls.captcha.value}
                                    onChangeText={val => this.updateInputState("captcha", val)}
                                    valid={this.state.controls.captcha.valid}
                                    touched={this.state.controls.captcha.touched}
                                    returnKeyType='done'
                                    keyboardType={'numeric'}

                                />
                                <Icon name="md-sync" color="red" size={35} style={{ marginStart: 10 }}
                                    onPress={this.generateCaptcha} />
                                <Image
                                    style={{ width: 100, height: 60, resizeMode: 'contain', marginStart: 20 }}
                                    source={{ uri: 'https://dummyimage.com/150x40/0091ea/fafafa.png&text=' + this.state.randomNumberOne }}
                                />
                            </View>

                        </View>
                        <View >

                            <View style={{ marginTop: -25 }}>
                                {submitButton}</View>

                        </View>

                        <View style={[{ marginTop: 20, justifyContent: "space-between", flexDirection: "row" }]}>
                            <Text style={{
                                fontSize: 15, color: "white", textDecorationLine: 'underline', fontFamily: "Poppins-Bold",
                                fontWeight: "bold"
                            }}
                                onPress={this.forgotPassword}
                            >FORGOT PASSWORD</Text>

                            {signup}
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
        alignItems: "center"
    },
    loginButton: {
        backgroundColor: "yellow",
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'yellow'
    },
    imageStyle: {
        width: 35,
        height: 35
    },

    containerInput: {
        width: "90%",
        marginTop: 50,
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

        alignItems: "center",
        marginTop: 10

    },

    text: {
        fontSize: 30,
        fontFamily: "Poppins-Bold",
        fontWeight: "bold"
    },

    textHeader: {
        fontSize: 22,
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
        borderColor: "#bbb",
        fontFamily: "Poppins-Regular",
        marginTop:0
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
        onLogin: authData => dispatch(tryAuth(authData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
