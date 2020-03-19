import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,ScrollView,
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
import { tryResetPassword, tyrOtp } from "../../store/actions/index";

class resetPassword extends Component {

    state = {
        users: {},
        controls: {
        
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: "password"
                },
                touched: false
            }
        }
    };

    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        });
    };



    updateInputState = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }
        if (key === "password") {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid:
                            key === "password"
                                ? validate(
                                    prevState.controls.confirmPassword.value,
                                    prevState.controls.confirmPassword.validationRules,
                                    connectedValue
                                )
                                : prevState.controls.confirmPassword.valid
                    },
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

    componentDidMount() {
        //this.props.onAutoSignIn();
    }

    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        });
    };


    loginHandler = () => {
        const authData = {
            password: this.state.controls.password.value,
            confirmPassword: this.state.controls.confirmPassword.value,
            role:this.props.role
        };
        this.props.onResetPassword(authData);
        //startMainTabs();
    };


    render() {
        let headingText = null;

        let submitButton = (
            <ButtonWithBackground
                color="yellow"
                onPress={this.loginHandler}
                disabled={
                    !this.state.controls.password.valid ||
                    !this.state.controls.confirmPassword.valid

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
                    <Text style={styles.textHeader}>Reset Password</Text>
                    <View style={styles.containerInput}>
                        <View style={styles.imageLayout}>
                            <Icon name="md-lock" color="red" size={35} />
                            <Text style={styles.textTitle}>New Password</Text>

                        </View>
                        <DefaultInput
                            placeholder="New Password"
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
                            <Icon name="md-lock" color="red" size={35} />
                            <Text style={styles.textTitle}>Confirm Password</Text>

                        </View>

                        <DefaultInput
                            placeholder="Confirm Password"
                            style={styles.input}
                            value={this.state.controls.confirmPassword.value}
                            onChangeText={val =>
                                this.updateInputState("confirmPassword", val)}
                            valid={this.state.controls.confirmPassword.valid}
                            touched={this.state.controls.confirmPassword.touched}
                            secureTextEntry={true}
                                returnKeyType='done'
                                autoCapitalize='none'
                        />
                    </View>

                    <View >
                      

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
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop:60
    },
    loginButton: {
        backgroundColor: "yellow",
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'yellow'
    },
    containerInput: {
        width: "85%",
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
        width:250,
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
        fontSize: 25, 
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
        fontFamily: "Poppins-Regular"
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
        onResetPassword: (authData) => dispatch(tryResetPassword(authData)),

        // , onAutoSignIn: () => dispatch(authAutoSignIn())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(resetPassword);
