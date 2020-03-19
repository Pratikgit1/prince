import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground, ScrollView,
    Dimensions, Activity,AppState
} from 'react-native'
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import backgroundImage from "../../assets/bg.jpg";
import logo from "../../assets/logo1.png";
import { Navigation } from 'react-native-navigation';
import { setAdd_Comp_user,addRole } from "../../store/actions/index";
import { connect } from "react-redux";
import { COLOR } from '../../utility/colors'
class LoginType extends Component {
    state = {
        appState: AppState.currentState,
      };
      componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
      }
      componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
      }

      _handleAppStateChange = nextAppState => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
          console.log('App State: ' + 'App has come to the foreground!');
        //  alert('App State: ' + 'App has come to the foreground!');
        }
        console.log('App State: ' + nextAppState);
        //alert('App State: ' + nextAppState);
        this.setState({ appState: nextAppState });
      };

    loginAsAdminHandler = () => {

        this.props.onGetUserName("")
        Navigation.push("LoginType", {
            component: {
                id: 'AuthScreen',
                name: 'orgs.AuthScreen',

                options: {
                    topBar: {
                        visible: true,
                        title: {
                            text: "Bank Login", alignment: "center"
                        },
                    }
                    
                }
            },
        });
    }


    loginAsCustomerHandler = () => {
        this.props.onGetUserName("8")
        Navigation.push("LoginType", {
            component: {
                id: 'AuthScreen',
                name: 'orgs.AuthScreen',
                passProps: {
                    role: "8",
                },
                options: {
                    topBar: {
                        visible: true,
                       // background: {
                            // color: COLOR.ICON_COLOR,
                           // color: '#f59c64',
                           // translucent: true
                      //  },
                        title: {
                            text: "Customer Login", alignment: "center"
                        },
                    },

                }
            },
        });
    }


    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.containerTop}>
                    <Image
                        style={styles.imageTOP}
                        source={logo}
                    />
                </View>

                <View style={{ margin: 20 }}>
                    <ButtonWithBackground
                        color="yellow"
                        onPress={this.loginAsAdminHandler} >Bank Login</ButtonWithBackground>
                </View>
                <View style={{ margin: 20 }}>
                    <ButtonWithBackground
                        color="yellow"
                        onPress={this.loginAsCustomerHandler} > Customer Login</ButtonWithBackground>

                </View>
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
        flex: 1,
        justifyContent: 'center',

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
        userData: state.user.userData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetUserName: (role) => dispatch(addRole(role))
    };
};
export default connect(null, mapDispatchToProps)(LoginType)

