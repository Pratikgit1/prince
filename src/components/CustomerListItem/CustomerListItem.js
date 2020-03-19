import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Sepra } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { COLOR } from '../../utility/colors'
import HeadingText from "../../components/UI/HeadingText/HeadingText";
var moment = require('moment');

const CustomerListItem = props => {
  let reOpen = <View></View>
  let feedback = <View></View>
  if (props.c_status === "1" && props.reopen === "0") {
    reOpen = (
      <TouchableOpacity onPress={props.onReopen}>
        {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Icon name="ios-paper-plane" color={COLOR.ICON_COLOR} size={25} />
          <Text style={[styles.textDate, { marginStart: 0 }]}>ReOpen  </Text>
        </View> */}
      </TouchableOpacity>
    )
  }

  if (props.c_status === "1" ) {
    feedback = (
      <TouchableOpacity onPress={props.onFeedback}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Icon name="md-chatbubbles" color={COLOR.ICON_COLOR} size={25} />
          <Text style={[styles.textDate, { marginStart: 0 }]}>Feedback  </Text>
        </View>
      </TouchableOpacity>
    )
  }
  return (

    <View style={styles.listItem}>

      <View style={{ width: "90%" }}>

        <HeadingText style={styles.textStyle} >{props.complaint_no}</HeadingText>

        <View style={[styles.listItem2]}>
          <Icon name="md-calendar" color={COLOR.ICON_COLOR} size={25} width="10%" />

          <Text style={styles.textDate}> {moment(props.created_on).format('DD MMM YYYY')}   </Text>
          <Icon style={{ marginStart: 20 }} name="md-clock" color={COLOR.ICON_COLOR} size={25} width="10%" />
          <Text style={styles.textDate}> {moment(props.created_on).format('HH:mm:ss')}   </Text>
        </View>

        <View style={{ borderBottomColor: COLOR.ICON_COLOR, borderBottomWidth: 1, marginTop: 8 }}></View>

        <View style={[styles.listItem2, { justifyContent: "space-around", marginTop: 8 }]}>

          <TouchableOpacity onPress={props.onView}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Icon name="md-eye" color={COLOR.ICON_COLOR} size={25} />
              <Text style={[styles.textDate, { marginStart: 0 }]}>View  </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onTrack}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Icon name="ios-pin" color={COLOR.ICON_COLOR} size={25} />
              <Text style={[styles.textDate, { marginStart: 0 }]}>Track  </Text>
            </View>
          </TouchableOpacity>

          {feedback}
          {reOpen}


        </View>
      </View>

      {/* <Icon name="ios-arrow-forward" color={COLOR.ICON_COLOR} size={35} width="10%" /> */}
    </View>


  )
};

const styles = StyleSheet.create({
  listItem: {

    margin: 5,
    padding: 10,
    backgroundColor: "white",

    shadowRadius: 10,
    shadowOpacity: 0.6,
    elevation: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  listItem2: {
    width: "100%",
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  textStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
  },
  textDate: {
    fontFamily: "Poppins-Regular",
    marginStart: 5
  },
});

export default CustomerListItem;
