
import CustomerDashBoard from '../CustomerDashBoard/CustomerDashBoard'
import {Navigation} from 'react-native-navigation';
import SideDrawerCustomer from '../SideDrawerCustomer/SideDrawerCustomer'
import ChangePassword from '../ChnagePassword/ChangePassword'
import LodgetNewConplaintsCutomer from '../LodgetNewConplaintsCutomer/LodgetNewConplaintsCutomer'
import Icon from 'react-native-vector-icons/Ionicons'
import CustomerProfile from '../CustomerProfile/CustomerProfile'
import ReplyHistoryCustomer from '../ReplyHistoryCustomer/ReplyHistoryCustomer'
import ComplaintsDetailCustomer from '../ComplaintsDetailCustomer/ComplaintsDetailCustomer'
import AddComplaintsCustomer from '../AddComplaintsCustomer/AddComplaintsCustomer'
import WebViewCustomer from '../WebViewCustomer/WebViewCustomer'
import React from 'react'
import configureStore from "../../store/configureStore";
import AddBranchCustomer from '../AddBranchCustomer/AddBranchCustomer'
import { Provider } from "react-redux";
import {COLOR} from '../../utility/colors'
import menu_icon from '../../assets/menu_icon.png'
import ActionBar from '../ActionBar/ActionBar'
import FeedbackCustomer from '../FeedbackCustomer/FeedbackCustomer'
import Reopen from '../Reopen/Reopen'

const store = configureStore();

const RNReduxSideDrawerCustomer = () => (
  <Provider store={store}>
      <SideDrawerCustomer screen="SideDrawerCustomer"/>
  </Provider>
);     

const RNReduxCustomerDashBoard = () => (
  <Provider store={store}>
      <CustomerDashBoard screen="CustomerDashBoard"/>
  </Provider>
);    
const RNReduxReplyHistory = () => (
  <Provider store={store}>
      <ReplyHistoryCustomer screen="ReplyHistoryCustomer"/>
  </Provider>
);

const RNReduxFeedbackCustomer = () => (
  <Provider store={store}>
      <FeedbackCustomer screen="FeedbackCustomer"/>
  </Provider>
);

const RNReduxComplaintsDetails = () => (
  <Provider store={store}>
      <ComplaintsDetailCustomer screen="ComplaintsDetailCustomer"/>
  </Provider>
);  

const RNReduxAddComplaintsCustomer= () => (
  <Provider store={store}>
      <AddComplaintsCustomer screen="AddComplaintsCustomer"/>
  </Provider>
);


const RNReduxLodgetNewConplaintsCutomer= () => (   
  <Provider store={store}>
      <LodgetNewConplaintsCutomer screen="LodgetNewConplaintsCutomer"/>
  </Provider>
);   

const RNReduxReopen= () => (   
  <Provider store={store}>
      <Reopen screen="Reopen"/>
  </Provider>
);   

const RNReduxCustomerProfile= () => (   
  <Provider store={store}>
      <CustomerProfile screen="CustomerProfile"/>
  </Provider>
);   

const RNReduxChangePassword= () => (   
  <Provider store={store}>
      <ChangePassword screen="ChangePassword"/>
  </Provider>  
); 

const RNReduxAddBranch= () => (   
  <Provider store={store}>
      <AddBranchCustomer screen="AddBranchCustomer"/>
  </Provider>  
);

Navigation.registerComponent(`orgs.AddComplaintsCustomer`, () => RNReduxAddComplaintsCustomer);
Navigation.registerComponent(`orgs.CustomerProfile`, () => RNReduxCustomerProfile);
Navigation.registerComponent(`orgs.SideDrawerCustomer`, () => RNReduxSideDrawerCustomer);
 Navigation.registerComponent(`orgs.LodgetNewConplaintsCutomer`, () => RNReduxLodgetNewConplaintsCutomer);
 Navigation.registerComponent(`orgs.ChangePassword`, () => RNReduxChangePassword);   
 Navigation.registerComponent(`orgs.CustomerDashBoard`, () => RNReduxCustomerDashBoard); 
 Navigation.registerComponent(`orgs.ActionBar`, () => ActionBar); 
 Navigation.registerComponent(`orgs.ComplaintsDetailCustomer`, () => RNReduxComplaintsDetails);
Navigation.registerComponent(`orgs.ReplyHistoryCustomer`, () => RNReduxReplyHistory);
Navigation.registerComponent(`orgs.AddBranchCustomer`, () => RNReduxAddBranch);  
Navigation.registerComponent(`orgs.WebViewCustomer`, () => WebViewCustomer);
Navigation.registerComponent(`orgs.FeedbackCustomer`, () => RNReduxFeedbackCustomer);
Navigation.registerComponent(`orgs.Reopen`, () => RNReduxReopen);

export const StartMainTabsCustomer = (props) => {

   
  Promise.all([
    Icon.getImageSource("ios-menu",50)
  
  ]).then(sources =>{
    Navigation.setRoot({
      root: {
        sideMenu: {
          id: "orgs.sideMenu",
          left: {
            visible: true,
            component: {
              id: "Drawer",
              name: "orgs.SideDrawerCustomer"
            },
            
          },
          center: {
            stack: {
              children: [
                {
                  component: {
                    id:"CustomerDashBoard",
                    name: 'orgs.CustomerDashBoard',
                    options:{
                      topBar:{
                        title: {
                        component: {
                              name: 'orgs.ActionBar',
                              alignment: 'center'
                            }
                          },
                        leftButtons: [
                          {
                            id: 'sideDrawerLeft',
                           icon: sources[0],
                       
                            color: COLOR.ICON_COLOR,
                          },
                        ],
                       
                      }
                    }
                  },
                },
              ],
              options: {
                topBar: {
                  visible: true,
                },
                statusBar: {
                  visible: true,
                },
              },
            },
          }
        },
       
        
      },
    });
  
  })


  }
  export default StartMainTabsCustomer
  
// })