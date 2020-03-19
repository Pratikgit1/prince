
import DashBoard from '../Dashboard/Dashboard'
import {Navigation} from 'react-native-navigation';
import SideDrawer from '../SideDrawer/SideDrawer'
import SideDrawerRight from '../SideDrawerRight/SideDrawerRight'
import ComplaintsList from '../ComplaintsList/ComplaintsList'
import ComplaintsDetails from '../ComplaintsDetails/ComplaintsDetails'
import ForwardComplaint from '../ForwardComplaint/ForwardComplaint'
import ReplyHistory from '../ReplyHistory/ReplyHistory'
import CloseComplaint from '../CloseComplaint/CloseComplaint'
import AddComplaints from '../AddComplaints/AddComplaints'
import UserChangePassword from '../UserChangePassword/UserChangePassword'
import CGROReport from '../CGRO_Report/CGROReport'
import AddBranch from '../AddBranch/AddBranch'
import AddCustomer from '../AddCustomer/AddCustomer'
import ChangePassword from '../ChnagePassword/ChangePassword'
import CGROReportList from '../CGROReportList/CGROReportList'
import ComplaintsDetailsSearch from '../ComplaintsDetailsSearch/ComplaintsDetailsSearch'

import ActionBar from '../ActionBar/ActionBar'
import MyWebView from '../WebView/MyWebView'
import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import configureStore from "../../store/configureStore";
import { Provider } from "react-redux";
import {COLOR} from '../../utility/colors'
import menu_icon from '../../assets/menu_icon.png'



const store = configureStore();

const RNReduxDashBoard = () => (
  <Provider store={store}>
      <DashBoard screen="DashBoard"/>
  </Provider>
);

const RNReduxComplaintsList = () => (
  <Provider store={store}>
      <ComplaintsList screen="ComplaintsList"/>
  </Provider>
);

const RNReduxReplyHistory = () => (
  <Provider store={store}>
      <ReplyHistory screen="ReplyHistory"/>
  </Provider>
);

const RNReduxComplaintsDetails = () => (
  <Provider store={store}>
      <ComplaintsDetails screen="ComplaintsDetails"/>
  </Provider>
);

const RNReduxCloseComplaints = () => (
  <Provider store={store}>
      <CloseComplaint screen="CloseComplaint"/>
  </Provider>
);   

const RNReduxForwardComplaint = () => (
  <Provider store={store}>
      <ForwardComplaint screen="ForwardComplaint"/>
  </Provider>
);

const RNReduxSideDrawer = () => (
  <Provider store={store}>
      <SideDrawer screen="SideDrawer"/>
  </Provider>
);     

const RNReduxSideDrawerRight= () => (
  <Provider store={store}>
      <SideDrawerRight screen="SideDrawerRight"/>
  </Provider>
); 

const RNReduxComplaintsDetailsSearch= () => (   
  <Provider store={store}>
      <ComplaintsDetailsSearch screen="ComplaintsDetailsSearch"/>
  </Provider>
);   

const RNReduxAddCustomer= () => (   
  <Provider store={store}>
      <AddCustomer screen="AddCustomer"/>
  </Provider>
);    

const RNReduxAddComplaints= () => (   
  <Provider store={store}>
      <AddComplaints screen="AddComplaints"/>
  </Provider>
);  

const RNReduxAddBranch= () => (   
  <Provider store={store}>
      <AddBranch screen="AddBranch"/>
  </Provider>  
); 

const RNReduxCGROReport= () => (   
  <Provider store={store}>
      <CGROReport screen="CGROReport"/>
  </Provider>  
); 

const RNReduxChangePassword= () => (   
  <Provider store={store}>
      <ChangePassword screen="ChangePassword"/>
  </Provider>  
); 

const RNReduxCGROReportList= () => (   
  <Provider store={store}>
      <CGROReportList screen="CGROReportList"/>
  </Provider>  
); 

const RNReduxUserChangePassword= () => (   
  <Provider store={store}>
      <UserChangePassword screen="UserChangePassword"/>
  </Provider>  
); 

Navigation.registerComponent(`orgs.sideDrawer`, () => RNReduxSideDrawer);
Navigation.registerComponent(`orgs.sideDrawerRight`, () => RNReduxSideDrawerRight);
Navigation.registerComponent(`orgs.DashBoard`, () => RNReduxDashBoard);
 Navigation.registerComponent(`orgs.ComplaintsList`, () => RNReduxComplaintsList);
Navigation.registerComponent(`orgs.ComplaintsDetails`, () => RNReduxComplaintsDetails);
Navigation.registerComponent(`orgs.ReplyHistory`, () => RNReduxReplyHistory);
Navigation.registerComponent(`orgs.CloseComplaint`, () => RNReduxCloseComplaints);
Navigation.registerComponent(`orgs.ForwardComplaint`, () => RNReduxForwardComplaint);
 Navigation.registerComponent(`orgs.ComplaintsDetailsSearch`, () => RNReduxComplaintsDetailsSearch);
 Navigation.registerComponent(`orgs.AddCustomer`, () => RNReduxAddCustomer);
 Navigation.registerComponent(`orgs.AddComplaints`, () => RNReduxAddComplaints);
 Navigation.registerComponent(`orgs.AddBranch`, () => RNReduxAddBranch);
 Navigation.registerComponent(`orgs.CGROReport`, () => RNReduxCGROReport);
 Navigation.registerComponent(`orgs.WebView`, () => MyWebView);
 Navigation.registerComponent(`orgs.ChangePassword`, () => RNReduxChangePassword);  
 Navigation.registerComponent(`orgs.CGROReportList`, () =>RNReduxCGROReportList );  
 Navigation.registerComponent(`orgs.UserChangePassword`, () => RNReduxUserChangePassword); 
 Navigation.registerComponent(`orgs.ActionBar`, () => ActionBar); 

export const StartMainTabs = (props) => {
 
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
              name: "orgs.sideDrawer"
            },
            
          },
          right: {
            visible: true,
            component: {
              id: "DrawerRight",
              name: "orgs.sideDrawerRight"
            },
            
          },
          center: {
            stack: {
              children: [
                {
                  component: {
                    id:"DashBoard",
                    name: 'orgs.DashBoard',
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
                        rightButtons: [
                          {
                            id: 'sideDrawerRight',
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
  export default StartMainTabs
  
// })