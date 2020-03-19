import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableNativeFeedback } from "react-native";
import { connect } from "react-redux";

import { COLOR } from '../../utility/colors'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import Icon from 'react-native-vector-icons/Ionicons'
//import Popop from '../../example/Popop'
import { closeComplaintsFromHandler ,forwardComplaintsFromHandler} from "../../store/actions/index";
import { Navigation } from 'react-native-navigation';
import {checkStringNull} from "../../utility/validation";
import startMainTabs from "../../screens/startMainTabs/startMainTabs";
import BaseComponent from '../../screens/BaseComponent/BaseComponent'
import DialogProgress from 'react-native-dialog-progress'
import { IMG_BASE_URL} from '../../utility/urlConstant'

var moment = require('moment');

class ComplaintsDetailCustomer extends BaseComponent {

  options = {
    title:"Loading",
    message:"Please Wait...",
    isCancelable:true
}


  closeHandler = (detailData) => {
    this.props.onCloseHandler(detailData)
  }

  forwardHandler = () => {
    this.props.onForwardHandler()
  }

  showDocument = () => {
    //this.props.showDocumentHamdler()

    ((this.props.complaintsDetails.document == null || this.props.complaintsDetails.document == "") ? "" :
     Navigation.push("CustomerDashBoard", {
      component: {
          id: 'WebViewCustomer',
          name: 'orgs.WebViewCustomer',
          passProps: {
          //  url: "http://49.50.66.154/ogrs.syndicatebank.in/ogrs_new/uploads/documents/"+this.props.complaintsDetails.document
          url: IMG_BASE_URL+"/uploads/documents/"+this.props.complaintsDetails.document
          },
          options: {
              topBar: {
                  visible: true,
                  title: { text: "Document", alignment: "center" },
              },
          }
      },
  }))

    

  }


  render() {
    DialogProgress.hide()
    let status=""
    if (this.props.isLoadind) {
      DialogProgress.show(this.options)
    }
    if (this.props.complaintsDetails.status === "0") {
     // status="Open"
     status=( <HeadingText style={[styles.textDetail,{color:"black"}]} > Open  </HeadingText>)
    }
    else if (this.props.complaintsDetails.status === "1") {
     // status="closed"
      status=( <HeadingText style={[styles.textDetail,{color:"red",  fontSize: 18,}]} > close  </HeadingText>)
    }

    else if (this.props.complaintsDetails.status === "2") {
     // status="Reopen"

      status=( <HeadingText style={[styles.textDetail,{color:"black"}]} > Reopen  </HeadingText>)
    }

  

    return (
      <View style={[styles.container, { padding: 0 }]}>

        <ScrollView>
          <View style={styles.container}>
            <HeadingText style={[styles.textTitle,{fontSize:22}]} >{checkStringNull( this.props.complaintsDetails.Complaint_no)}</HeadingText>
            <View style={{ width: "100%", flexDirection: "row", borderBottomColor: 'white', borderBottomWidth: 1, marginTop: 10 }}></View>
            <HeadingText style={[styles.textTitle,{fontSize:18,marginTop:10}]}> COMPLAINT NAME</HeadingText>

            <HeadingText style={styles.textDetails} >{checkStringNull( this.props.complaintsDetails.complaint_name)}</HeadingText>
            <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>

              <View style={{ width: "65%", flexDirection: "column" }}>
                <HeadingText style={[styles.textTitle,{fontSize:18,marginTop:10}]}>EMAIL</HeadingText>

                <HeadingText  style={styles.textDetails} > {checkStringNull( this.props.complaintsDetails.email)}</HeadingText>
              </View>
              <View style={{ width: "35%", flexDirection: "column" }}>
                <HeadingText style={[styles.textTitle,{fontSize:15,marginTop:10}]} >MOBILE NO</HeadingText>

                <HeadingText  style={styles.textDetails}> {checkStringNull( this.props.complaintsDetails.mobile)}</HeadingText>
              </View>
            </View>
          </View>

          <View style={styles.detailContainer}>

            <View style={styles.viewContainer}>
              <HeadingText style={[styles.textTitle,{color:"black"}]} > Complaint Lodge Date</HeadingText>
              <HeadingText style={[styles.textDetail,{color:"black"}]}  > {checkStringNull(moment(this.props.complaintsDetails.created_on).format('DD MMM YYYY') +" at " +
              moment(this.props.complaintsDetails.created_on).format('HH:mm:ss'))}</HeadingText>
            </View>

            <View style={styles.viewContainer}>
              <HeadingText style={[styles.textTitle,{color:"black"}]} > Pention Type</HeadingText>
              <HeadingText style={[styles.textDetail,{color:"black"}]} >{checkStringNull( this.props.complaintsDetails.pension_type)}</HeadingText>
            </View>

            <View style={styles.viewContainer}>
              <HeadingText style={[styles.textTitle,{color:"black"}]}> PPO Number</HeadingText>
              <HeadingText style={[styles.textDetail,{color:"black"}]} > {checkStringNull(this.props.complaintsDetails.PPO_Number)}</HeadingText>
            </View>


            <View style={styles.viewContainer}>
              <HeadingText style={[styles.textTitle,{color:"black"}]}>Request Category</HeadingText>
              <HeadingText style={[styles.textDetail,{color:"black"}]} > {checkStringNull( this.props.complaintsDetails.Request_Category)}</HeadingText>
            </View>

            <View style={styles.viewContainer}>
              <HeadingText style={[styles.textTitle,{color:"black"}]}>Grievence Category</HeadingText>
              <HeadingText style={[styles.textDetail,{color:"black"}]} > {checkStringNull( this.props.complaintsDetails.Grevience_Category)}</HeadingText>
            </View>

            <View style={styles.viewContainer}>
              <HeadingText style={[styles.textTitle,{color:"black"}]}>Sub Category</HeadingText>
              <HeadingText style={[styles.textDetail,{color:"black"}]} > {checkStringNull( this.props.complaintsDetails.sub_category)}</HeadingText>
            </View>

            <View style={styles.viewContainer}>
              <HeadingText style={[styles.textTitle,{color:"black"}]} >Sub Type</HeadingText>
              <HeadingText style={[styles.textDetail,{color:"black"}]} > {checkStringNull( this.props.complaintsDetails.sub_type)}</HeadingText>
            </View>

            <View style={styles.viewContainer}>
              <HeadingText style={[styles.textTitle,{color:"black"}]}>Acount No</HeadingText>
              <HeadingText style={[styles.textDetail,{color:"black"}]} > {checkStringNull( this.props.complaintsDetails.account_number)}</HeadingText>
            </View>

            <View style={styles.viewContainer}>
              <HeadingText style={[styles.textTitle,{color:"black"}]}>Current Esclation (Esc Date)</HeadingText>
              <HeadingText style={[styles.textDetail,{color:"black"}]} > {checkStringNull( this.props.complaintsDetails.current_escallation + " (" + this.props.complaintsDetails.Escalated_date + ")")}</HeadingText>
            </View>

            <View style={styles.viewContainer}>
              <HeadingText style={[styles.textTitle,{color:"black"}]}>Complaint Text</HeadingText>
              <HeadingText style={[styles.textDetail,{color:"black"}]} > {checkStringNull( this.props.complaintsDetails.Complaint_Text)}</HeadingText>
            </View>
            <TouchableNativeFeedback onPress={this.showDocument}>
            <View style={styles.viewContainer}>
              <HeadingText style={[styles.textTitle,{color:"black"}]}>Document</HeadingText>
              <HeadingText style={[styles.textDetail,{color:"red"}]} > {checkStringNull( this.props.complaintsDetails.document)}</HeadingText>
            </View>
</TouchableNativeFeedback>

            <View style={styles.viewContainer}>
              <HeadingText style={[styles.textTitle,{color:"black"}]}>Status</HeadingText>
              {/* <HeadingText style={[styles.textDetail,{color:"black"}]} > {status}  </HeadingText> */}
              {status}
            </View>
          </View>
        </ScrollView>
      </View>

    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: COLOR.ICON_COLOR

  },


  bottomDataDetail: {

    justifyContent: "center",
    alignItems: "center"

  },


  textDetail: {
    fontSize: 15,
    color: "black",
    width: "100%",
    fontWeight: "normal"
  },

  viewContainer: {
    flexDirection: "column",
    marginTop: 20
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

  textDetails: {
    color:"white",
    fontSize: 18, 
    fontFamily: "Poppins-Regular"
},

textTitle: {
     color:"white",
    fontFamily: "Poppins-Bold",
    fontSize: 15,
    width: "100%",

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
    onForwardHandler: () => dispatch(forwardComplaintsFromHandler()),
    showDocumentHamdler: () => dispatch(forwardComplaintsFromHandler())
  };
};
const mapStateToProps = state => {
  return {
    complaintsDetails: state.dashboard.complaintsDetails,
    titleData: state.user.titleData,
    isLoadind: state.ui.isLoading,
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintsDetailCustomer);
