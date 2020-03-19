
import InternaObdusmanDashBoard from '../InternaObdusmanDashBoard/InternaObdusmanDashBoard'
import {Navigation} from 'react-native-navigation';
import ChangePassword from '../ChnagePassword/ChangePassword'
import Icon from 'react-native-vector-icons/Ionicons'
import SideDrawerInternaObdusmanDashBoard from '../SideDrawerInternaObdusmanDashBoard/SideDrawerInternaObdusmanDashBoard'
import CGRO_REPORT_IO from '../CGRO_REPORT_IO/CGRO_REPORT_IO'
import SideDrawerIORight from '../SideDrawerIORight/SideDrawerIORight'
import React from 'react'
import configureStore from "../../store/configureStore";
import ComplaintsListIO from '../ComplaintsListIO/ComplaintsListIO'
import ComplaintsDetailsIO from '../ComplaintsDetailsIO/ComplaintsDetailsIO'
import AgreedIO from '../AgreedIO/AgreedIO'
import DisAgreedIO from '../DisAgreedIO/DisAgreedIO'
import SearchComplaintIO from '../SearchComplaintIO/SearchComplaintIO'
import ReplyHistoryIO from '../ReplyHistoryIO/ReplyHistoryIO'
import CGROReportListIO from '../CGROReportListIO/CGROReportListIO'
import { Provider } from "react-redux";
import {COLOR} from '../../utility/colors'
import menu_icon from '../../assets/menu_icon.png'
import ActionBar from '../ActionBar/ActionBar'
import WebViewIO from '../WebViewIO/WebViewIO'


const store = configureStore();


const RNReduxInternaObdusmanDashBoard = () => (
  <Provider store={store}>
      <InternaObdusmanDashBoard screen="InternaObdusmanDashBoard"/>
  </Provider>
);     
// const RNReduxReplyHistory = () => (
//   <Provider store={store}>
//       <ReplyHistoryCustomer screen="ReplyHistoryCustomer"/>
//   </Provider>
// );

const RNReduxSideDrawerInternaObdusmanDashBoard = () => (
    <Provider store={store}>
        <SideDrawerInternaObdusmanDashBoard screen="SideDrawerInternaObdusmanDashBoard"/>
    </Provider>
  );
  
  const RNReduxComplaintsList = () => (
    <Provider store={store}>
        <ComplaintsListIO screen="ComplaintsListIO"/>
    </Provider>
  );
  

  
const RNReduxChangePassword= () => (   
  <Provider store={store}>
      <ChangePassword screen="ChangePassword"/>
  </Provider>  
); 

const RNReduxComplaintsDetails = () => (
  <Provider store={store}>
      <ComplaintsDetailsIO screen="ComplaintsDetailsIO"/>
  </Provider>
);  ReplyHistoryIO

const RNReduxReplyHistoryIO = () => (
  <Provider store={store}>
      <ReplyHistoryIO screen="ReplyHistoryIO"/>
  </Provider>
);  

const RNReduxSideDrawerIORight = () => (
  <Provider store={store}>
      <SideDrawerIORight screen="SideDrawerIORight"/>
  </Provider>
);   

const RNReduxCGRO_REPORT_IO = () => (
  <Provider store={store}>
      <CGRO_REPORT_IO screen="CGRO_REPORT_IO"/>
  </Provider>
);

const RNReduxSearchComplaintIO = () => (
  <Provider store={store}>
      <SearchComplaintIO screen="SearchComplaintIO"/>
  </Provider>
);  

const RNReduxAgreedIO = () => (
  <Provider store={store}>
      <AgreedIO screen="AgreedIO"/>
  </Provider>
); 

const RNReduxDisAgreedIO = () => (
  <Provider store={store}>
      <DisAgreedIO screen="DisAgreedIO"/>
  </Provider>
); 

const RNReduxCGROReportListIO = () => (
  <Provider store={store}>
      <CGROReportListIO screen="CGROReportListIO"/>
  </Provider>
); 

Navigation.registerComponent(`orgs.ComplaintsListIO`, () => RNReduxComplaintsList);
 Navigation.registerComponent(`orgs.ChangePassword`, () => RNReduxChangePassword);   
 Navigation.registerComponent(`orgs.InternaObdusmanDashBoard`, () => RNReduxInternaObdusmanDashBoard); 
 Navigation.registerComponent(`orgs.ActionBar`, () => ActionBar); 
 Navigation.registerComponent(`orgs.SideDrawerInternaObdusmanDashBoard`, () => RNReduxSideDrawerInternaObdusmanDashBoard); 
//Navigation.registerComponent(`orgs.ReplyHistoryCustomer`, () => RNReduxReplyHistory);
Navigation.registerComponent(`orgs.ComplaintsDetailsIO`, () => RNReduxComplaintsDetails);
Navigation.registerComponent(`orgs.ReplyHistoryIO`, () => RNReduxReplyHistoryIO);
Navigation.registerComponent(`orgs.SideDrawerIORight`, () => RNReduxSideDrawerIORight);
Navigation.registerComponent(`orgs.CGRO_REPORT_IO`, () => RNReduxCGRO_REPORT_IO); 
Navigation.registerComponent(`orgs.SearchComplaintIO`, () => RNReduxSearchComplaintIO); 
Navigation.registerComponent(`orgs.CGROReportListIO`, () => RNReduxCGROReportListIO);
Navigation.registerComponent(`orgs.AgreedIO`, () => RNReduxAgreedIO);  
Navigation.registerComponent(`orgs.DisAgreedIO`, () => RNReduxDisAgreedIO);  
Navigation.registerComponent(`orgs.WebViewIO`, () => WebViewIO);

const StartMainStabsInternalObdusman = (props) => {

   
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
              id: "SideDrawerInternaObdusmanDashBoard",
              name: "orgs.SideDrawerInternaObdusmanDashBoard"
            },
            
          },
          right: {
            visible: true,
            component: {
              id: "SideDrawerIORight",
              name: "orgs.SideDrawerIORight"
            },
            
          },
          center: {
            stack: {
              children: [
                {
                  component: {
                    id:"InternaObdusmanDashBoard",
                    name: 'orgs.InternaObdusmanDashBoard',
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
 
  // Promise.all([
  //   Icon.getImageSource("ios-menu",50)
  
  // ]).then(sources =>{
  //   Navigation.setRoot({
  //     root: {
  //       sideMenu: {
  //         id: "orgs.sideMenu",
  //         left: {
  //           visible: true,
  //           component: {
  //             id: "Drawer",
  //             name: "orgs.SideDrawerCustomer"
  //           },
            
  //         },
  //        center: {
  //           stack: {
  //             children: [
  //               {
  //                 component: {
  //                   id:"DashBoard",
  //                   name: 'orgs.CustomerDashBoard',
  //                   options:{
  //                     topBar:{
  //                       title: {
  //                         component: {
  //                               name: 'orgs.ActionBar',
  //                               alignment: 'center'
  //                             }
  //                           },
  //                       leftButtons: [
  //                         {
  //                           id: 'sideDrawerLeft',
  //                          icon: sources[0],
                       
  //                           color: COLOR.ICON_COLOR,
  //                         },
  //                       ],
                        
  //                     }
  //                   }
  //                 },
  //               },
  //             ],
  //             options: {
  //               topBar: {
  //                 visible: true,
  //               },
  //               statusBar: {
  //                 visible: true,
  //               },
  //             },
  //           },
  //        }
  //      },
       
        
  //     },
  //   });
  
  // })

  }
  export default StartMainStabsInternalObdusman
  
// })