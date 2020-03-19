import React, { Component } from 'react';
import { View } from 'react-native';
import {  LoginManager,LoginButton,AccessToken,GraphRequest,GraphRequestManager } from 'react-native-fbsdk';
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
//import { GoogleSignin, GoogleSigninButton,statusCodes  } from 'react-native-google-signin';

export default class FBLoginButton extends Component {

    // _signIn = async () => {
    //     try {
    //       await GoogleSignin.hasPlayServices();
    //       const userInfo = await GoogleSignin.signIn();
    //       this.setState({ userInfo });
    //     } catch (error) {
    //       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //         // user cancelled the login flow
    //       } else if (error.code === statusCodes.IN_PROGRESS) {
    //         // operation (e.g. sign in) is in progress already
    //       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //         // play services not available or outdated
    //       } else {
    //         // some other error happened
    //       }
    //     }
    //   };
  render() {
    return (
      <View>
          <ButtonWithBackground
                        color="yellow"
                        onPress={this.loginAsCustomerHandler} > Login as Customer</ButtonWithBackground>
{/* 
<GoogleSigninButton
    style={{ width: 192, height: 48 }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={this._signIn}
   /> */}
          
        <LoginButton
        //   publishPermissions={["email"]}
        publishPermissions={['publish_actions']}
        readPermissions={['public_profile']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + error.message);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      const infoRequest = new GraphRequest(
                        '/me?fields=name,picture',
                        null,
                        this._responseInfoCallback
                      );
                      // Start the graph request.
                      new GraphRequestManager().addRequest(infoRequest).start();
                    }
                  )
                
                alert("Login was successful with permissions: " + result.grantedPermissions)
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
      </View>
    );
  }

  loginAsCustomerHandler = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
        function(result) {
          if (result.isCancelled) {
            alert('Login was cancelled');
          } else {
            AccessToken.getCurrentAccessToken().then(
                (data) => {
                  const infoRequest = new GraphRequest(
                    '/me?fields=name,picture',
                    null,
                    (error, result) => {
                        if (error) {
                          alert('Error fetching data: ' + error.toString());
                        } else {
                            console.log(result)
                          alert('Result Name: ' + result.name);
                        }
                      }
                    
                  );
                  // Start the graph request.
                  new GraphRequestManager().addRequest(infoRequest).start();
                }
              )
            
            // alert('Login was successful with permissions: '
            //   + result.grantedPermissions.toString());
          }
        },
        function(error) {
          alert('Login failed with error: ' + error);
        }
      );
}


//Create response callback.
_responseInfoCallback = (error, result) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      alert('Result Name: ' + result.name);
    }
  }

};

module.exports = FBLoginButton;