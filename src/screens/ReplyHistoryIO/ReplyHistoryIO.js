import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableNativeFeedback } from "react-native";
import { connect } from "react-redux";
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import Icon from 'react-native-vector-icons/Ionicons'
import ReplyHistoryList from "../../components/ReplyHistory/ReplyHistoryList";
import { closeComplaintsFromHandler, callForwardComplaintScreen } from "../../store/actions/index";
import { Navigation } from 'react-native-navigation';
import { COLOR } from '../../utility/colors'
import startMainTabs from "../../screens/startMainTabs/startMainTabs";
import BaseComponent from '../../screens/BaseComponent/BaseComponent'
import DialogProgress from 'react-native-dialog-progress'

class ReplyHistoryIO extends Component {


  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this, props.screen)

    // this.offset = 1;

  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId == 'sideDrawerRight') {
      Navigation.mergeOptions('InternaObdusmanDashBoard', {
        sideMenu: {
          right: {
            visible: true
          },
        }
      });
    }

  }

  options = {
    title: "Loading",
    message: "Please Wait...",
    isCancelable: true
  }


  agreedHandler = () => {

    Navigation.push("InternaObdusmanDashBoard", {
        component: {
            id: 'AgreedIO',
            name: 'orgs.AgreedIO',
            options: {
                topBar: {
                    visible: true,
                    title: {
                        text: "Agreed", alignment: "center"
                    },
                }
            },
        },
    });

}

disAgreedHandler = () => {

  Navigation.push("InternaObdusmanDashBoard", {
      component: {
          id: 'DisAgreedIO',
          name: 'orgs.DisAgreedIO',
          options: {
              topBar: {
                  visible: true,
                  title: {
                      text: "DisAgreed", alignment: "center"
                  },
              }
          },
      },
  });

}

  render() {
    DialogProgress.hide()
    if (this.props.isLoadind) {
      //submitButton = <ActivityIndicator></ActivityIndicator>
      DialogProgress.show(this.options)
    }

    return (
      <View style={[styles.container, { padding: 0 }]}>
         {this.props.titleData.title==="New Complaints" ?
        <View style={styles.containerBottom}>

          <TouchableNativeFeedback onPress={this.agreedHandler}>
            <View style={{ width: "30%", justifyContent: "flex-end", alignItems: "center" }}>
              <Icon name="ios-close-circle-outline" color={COLOR.ICON_COLOR} size={35} />
              <HeadingText style={{ fontSize: 15, color: "black", fontFamily: "Poppins-Bold", }} >AGREE</HeadingText>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={this.disAgreedHandler}>
            <View style={{ width: "30%", justifyContent: "flex-end", alignItems: "center" }}>
              <Icon name="ios-fastforward" color={COLOR.ICON_COLOR} size={35} />
              <HeadingText style={{ fontSize: 15, color: "black", fontFamily: "Poppins-Bold", }} >DIS-AGREED</HeadingText>
            </View>

          </TouchableNativeFeedback>

        </View>
         : <View></View>
        }

        <View style={[styles.container, { padding: 5 }]}>
          <ReplyHistoryList
            replyHistory={this.props.replyHistoryList}
          // onItemSelected={this.itemSelectedHandler}
          />
        </View>




        
      </View>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 20,

  },


  bottomDataDetail: {

    justifyContent: "center",
    alignItems: "center"

  },

  containerBottom: {

    justifyContent: "center",

    padding: 10,
    backgroundColor: 'white',
    flexDirection: "row",
    shadowColor: COLOR.ICON_COLOR,
    shadowRadius: 10,
    shadowOpacity: 0.6,
    elevation: 18

  },

  detailContainer: {

    padding: 20,
    justifyContent: "flex-start",
    backgroundColor: 'white',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    borderWidth: 1,
    borderColor: '#fff'

  },


});
const mapDispatchToProps = dispatch => {
  return {
    onCloseHandler: authData => dispatch(closeComplaintsFromHandler(authData)),
    //onForwardHandler: authData => dispatch(forwardComplaintsFromHandler(authData))
    onForwardHandler: authData => dispatch(callForwardComplaintScreen())
  };
};
const mapStateToProps = state => {
  return {
    replyHistoryList: state.dashboard.replyHistoryList,
    titleData: state.user.titleData,
    complaintsDetails: state.dashboard.complaintsDetails,
    isLoadind: state.ui.isLoading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReplyHistoryIO);
