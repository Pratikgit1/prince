import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableNativeFeedback  } from "react-native";
import { connect } from "react-redux";
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import Icon from 'react-native-vector-icons/Ionicons'
import ReplyHistoryList from "../../components/ReplyHistory/ReplyHistoryList";
import { closeComplaintsFromHandler,callForwardComplaintScreen} from "../../store/actions/index";
import { Navigation } from 'react-native-navigation';
import { COLOR } from '../../utility/colors'
import startMainTabs from "../../screens/startMainTabs/startMainTabs";
import BaseComponent from '../../screens/BaseComponent/BaseComponent'
import DialogProgress from 'react-native-dialog-progress'

class ReplyHistory extends BaseComponent {

  options = {
    title:"Loading",
    message:"Please Wait...",
    isCancelable:true
}
  

  closeHandler = (detailData) => {
     this.props.onCloseHandler(detailData)
  }

  forwardHandler = (detailData) => {
     //this.props.onForwardHandler(detailData)
     callForwardComplaintScreen()
  }


  render() {
    DialogProgress.hide()
    if (this.props.isLoadind) {
      //submitButton = <ActivityIndicator></ActivityIndicator>
      DialogProgress.show(this.options)
  }
    let closeForwardView=''
    if ((this.props.titleData.title === "New Complaints" || 
    this.props.titleData.title === "Forward To Us Complaints"   ||
    this.props.titleData.title === "Esclatted To Us Complaints" ) ||  this.props.complaintsDetails.status !== "1" 
   ) {
      closeForwardView=(  <View style={styles.containerBottom}>

      <TouchableNativeFeedback onPress={this.closeHandler}>
        <View style={{ width: "30%", justifyContent: "flex-end", alignItems: "center" }}>
          <Icon name="ios-close-circle-outline" color={COLOR.ICON_COLOR} size={35} />
          <HeadingText style={{ fontSize: 15, color: "black" , fontFamily: "Poppins-Bold",}} >CLOSE</HeadingText>
        </View>
      </TouchableNativeFeedback>

      <TouchableNativeFeedback onPress={this.forwardHandler}>
        <View style={{ width: "30%", justifyContent: "flex-end", alignItems: "center" }}>
          <Icon name="ios-fastforward" color={COLOR.ICON_COLOR} size={35} />
          <HeadingText style={{ fontSize: 15, color: "black" , fontFamily: "Poppins-Bold",}} >FORWARD</HeadingText>
        </View>

      </TouchableNativeFeedback>

    </View>
      )
      
    }
    else{
      closeForwardView=(
        <View></View>
      )
    }
    return (  
    <View style={[styles.container, { padding: 0 }]}>
         {closeForwardView}

       
          <View  style={[styles.container, { padding: 5 }]}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReplyHistory);
