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
import {tyrForgotpass} from "../../store/actions/index";
import {COLOR} from '../../utility/colors'

class forgotPassword extends Component {
state = {
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
    controls: {
        email: {
            value: "",
            valid: false,
            validationRules: {
                minLength: 6
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

constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
}

componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
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
        email: this.state.controls.email.value,
        role: this.props.role,
    };
    this.props.onForgotPass(authData);
    //startMainTabs();
};


render() {

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
        submitButton = <ActivityIndicator></ActivityIndicator>
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
                <Text style={styles.textHeader}>Forgot Password</Text>
                <View style={styles.containerInput}>
                    <View style={styles.imageLayout}>
                        <Icon name="ios-mail" color={COLOR.ICON_COLOR} size={35} />
                        <Text style={styles.textTitle}>Email OR Mobile</Text>

                    </View>
                    <DefaultInput
                        placeholder="Enter Email/Mobile Number"
                        style={styles.input}
                        value={this.state.controls.email.value}
                        onChangeText={val => this.updateInputState("email", val)}
                        valid={this.state.controls.email.valid}
                        touched={this.state.controls.email.touched}
                        returnKeyType='done'
                        keyboardType={'email-address'}
                        autoCapitalize='none'
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
   height:"100%"
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
    onForgotPass: authData => dispatch(tyrForgotpass(authData))
    // , onAutoSignIn: () => dispatch(authAutoSignIn())
};
};

export default connect(mapStateToProps, mapDispatchToProps)(forgotPassword);

