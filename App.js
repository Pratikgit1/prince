
import LoginScreen from './src/screens/Login/Login'
import ForgotPassword from './src/screens/ForgotPassword/ForgotPassword'
import Otp from './src/screens/Otp/Otp'
import RestPassword from './src/screens/ResetPassword/ResetPassword'
import SplashScreen from './src/screens/SplashScreen/SplashScreen'
import LoginType from './src/screens/LoginType/LoginType'
import CustomerRegistration from './src/screens/CustomerRegistration/CustomerRegistration'
import Geolocation from './src/screens/Geolocation/Geolocation' 
//import CameraView from './src/screens/CameraView/CameraView'
import FBLoginButton from './src/screens/FBLoginButton/FBLoginButton'
import GoogleSigninSampleApp from './src/screens/GoogleSigninSampleApp/GoogleSigninSampleApp'
import Screen2 from './Screen2'
import configureStore from "./src/store/configureStore";
import { Provider } from "react-redux";
import React from 'react'
import {Navigation} from 'react-native-navigation';


//const App = (props) => {

  const store = configureStore();

const RNRedux = () => (
    <Provider store={store}>
        <LoginScreen screen="AuthScreen"/>
    </Provider>
);

const RNReduxForgotPass = () => (
  <Provider store={store}>
      <ForgotPassword screen="ForgotPassword"/>
  </Provider>
);

const RNReduxOtp = () => (
  <Provider store={store}>
      <Otp screen="Otp"/>
  </Provider>
);

const RNReduxResetPassword= () => (  
  <Provider store={store}>
      <RestPassword screen="Otp"/>
  </Provider>
);

const RNReduxSplashScreen= () => (  
  <Provider store={store}>
      <SplashScreen screen="SplashScreen"/>
  </Provider>
);

const RNReduxLoginType= () => (  
  <Provider store={store}>
      <LoginType screen="LoginType"/>
  </Provider>  
);

const RNReduxCustomerRegistration= () => (  
  <Provider store={store}>
      <CustomerRegistration screen="CustomerRegistration"/>
  </Provider>  
);



Navigation.registerComponent(`orgs.AuthScreen`, () =>RNRedux),
Navigation.registerComponent(`orgs.ForgotPassword`,() => RNReduxForgotPass);
Navigation.registerComponent(`orgs.Otp`,() => RNReduxOtp);
Navigation.registerComponent(`orgs.resetPassword`,() => RNReduxResetPassword);
Navigation.registerComponent(`orgs.SplashScreen`,() => RNReduxSplashScreen);
Navigation.registerComponent(`orgs.Screen2`,() => Screen2);
Navigation.registerComponent(`orgs.LoginType`,() => RNReduxLoginType);  
Navigation.registerComponent(`orgs.Geolocation`,() => Geolocation);   
//Navigation.registerComponent(`orgs.CameraView`,() => CameraView); 
Navigation.registerComponent(`orgs.FBLoginButton`,() => FBLoginButton);  
Navigation.registerComponent(`orgs.GoogleSigninSampleApp`,() => GoogleSigninSampleApp);
Navigation.registerComponent(`orgs.CustomerRegistration`,() => RNReduxCustomerRegistration); 

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              id: 'SplashScreen',
              name: 'orgs.SplashScreen',
            },

            // component: {
            //   id: 'GoogleSigninSampleApp',
            //   name: 'orgs.GoogleSigninSampleApp',
            // },
           
          },
          
        ],
        
        options: {
          topBar: {
            visible: false,
          },
          statusBar: {
            visible: true,
          },
        },

        
      },
    },
  });
 
});
//}
//export default App
