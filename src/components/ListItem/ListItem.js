import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { COLOR } from '../../utility/colors'
import HeadingText from "../../components/UI/HeadingText/HeadingText";
var moment = require('moment');

const listItem = props => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem}>

      <View style={{ width: "90%" }}>

        <HeadingText  style={styles.textStyle} >{props.complaint_no}</HeadingText>

        <View style={styles.listItem2}>
          <Icon name="md-calendar" color={COLOR.ICON_COLOR} size={25} width="10%" />
         
          <Text style={styles.textDate}> {moment(props.created_on).format('DD MMM YYYY')}   </Text>
          <Icon style={{ marginStart: 20 }} name="md-clock" color={COLOR.ICON_COLOR} size={25} width="10%" />
          <Text style={styles.textDate}> {moment(props.created_on).format('HH:mm:ss')}   </Text>
        </View>
      </View>

      <Icon name="ios-arrow-forward" color={COLOR.ICON_COLOR} size={35} width="10%" />
    </View>
    <View></View>
  </TouchableOpacity>
);

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

export default listItem;
