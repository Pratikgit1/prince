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
import logo from "../../assets/logo2.png";
import validate from "../../utility/validation";
import { tyrCustomerRegistration } from "../../store/actions/index";
import { COLOR } from '../../utility/colors'
import captchaImage from "../../assets/captcha.png";
import DialogProgress from 'react-native-dialog-progress'

class CustomerRegistration extends Component {
    
    options = {
        title:"Loading",
        message:"Please Wait...",
        isCancelable:true
    }

    state = {
        componentId: "",
        randomNumberOne: 0,
        checkLoop: false,
        
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            name: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },

            mobile: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 10
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


    updateInputState = (key, value) => {
        let connectedValue = {};

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
       // Dimensions.addEventListener("change", this.updateStyles);
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
            name: this.state.controls.name.value,
            mobile: this.state.controls.mobile.value,
            role: this.props.role,
        };
        this.props.onRegistration(authData);
        //startMainTabs();
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
                SUBMIT
   </ButtonWithBackground>
        );

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

        if (this.state.viewMode === "portrait") {
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
                        <Text style={styles.textHeader}>Customer Registration</Text>
                        <View style={styles.containerInput}>
                            <View style={styles.imageLayout}>
                                <Icon name="md-person" color={COLOR.ICON_COLOR} size={35} />
                                <Text style={styles.textTitle}>Name</Text>

                            </View>
                            <DefaultInput
                                placeholder="Enter Name"
                                style={styles.input}
                                value={this.state.controls.name.value}
                                onChangeText={val => this.updateInputState("name", val)}
                                valid={this.state.controls.name.valid}
                                touched={this.state.controls.name.touched}
                                returnKeyType='next'
                                keyboardType={'default'}
                                autoCapitalize='sentences'
                            />



                            <View style={styles.imageLayout}>
                                <Icon name="ios-mail" color={COLOR.ICON_COLOR} size={35} />
                                <Text style={styles.textTitle}>Email</Text>

                            </View>
                            <DefaultInput
                                placeholder="Enter Email"
                                style={styles.input}
                                value={this.state.controls.email.value}
                                onChangeText={val => this.updateInputState("email", val)}
                                valid={this.state.controls.email.valid}
                                touched={this.state.controls.email.touched}
                                returnKeyType='next'
                                keyboardType={'email-address'}
                                autoCapitalize='none'
                            />


                            <View style={styles.imageLayout}>
                                <Icon name="ios-tablet-landscape" color={COLOR.ICON_COLOR} size={35} />
                                <Text style={styles.textTitle}>Mobile No</Text>

                            </View>
                            <DefaultInput
                                placeholder="Enter Mobile No"
                                style={styles.input}
                                value={this.state.controls.mobile.value}
                                onChangeText={val => this.updateInputState("mobile", val)}
                                valid={this.state.controls.mobile.valid}
                                touched={this.state.controls.mobile.touched}
                                returnKeyType='next'
                                maxLength={10}
                                keyboardType={'numeric'}
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
                        <View style={{marginTop:-23}}>
                        {submitButton}</View>
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}


const styles = StyleSheet.create({

    containerTop: {
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20

    },
    imageStyle: {
        width: 35,
        height: 35
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
        height: "100%"
    },
    imageTOP: {
        width: 250,
        height: 80
    },
    imageLayout: {
        flexDirection: "row",
        justifyContent: "flex-start",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10

    },
    text: {
        fontSize:25,
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
        role: state.user.userData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegistration: authData => dispatch(tyrCustomerRegistration(authData))
        // , onAutoSignIn: () => dispatch(authAutoSignIn())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerRegistration);

