import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { COLOR } from '../../utility/colors'
import MainText from '../UI/MainText/MainText'
import HeadingText from '../UI/HeadingText/HeadingText'
var moment = require('moment');

const replyHistoryItem = props => (
    //<TouchableOpacity onPress={props.onItemPressed}>
        <View style={styles.listItem}>

            <View style={styles.listItem2}>
                <Icon name="md-calendar" color={COLOR.ICON_COLOR} size={20} width="10%" />
                <MainText style={styles.text}> Date</MainText>
            </View>
            <HeadingText style={[styles.textDetail]}>{(moment(props.comment_date).format('DD MMM YYYY')) +" at "+ 
            (moment(props.comment_date).format('HH:mm:ss'))} </HeadingText>

            <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" ,alignItems:"flex-end"}}>
                <View style={[{ width: "50%" }]}>
                    <View style={[styles.listItem2]}>
                        <Icon name="md-calendar" color={COLOR.ICON_COLOR} size={20} />
                        <MainText style={styles.text}> Comment By</MainText>
                    </View>
                    <HeadingText style={[styles.textDetail]}> {props.comment_by}</HeadingText>
                </View>
                <View style={{ width: "50%", justifyContent: "flex-end" }}>
                    <View style={[styles.listItem2]}>
                        <Icon name="md-calendar" color={COLOR.ICON_COLOR} size={20} width="10%" />
                        <MainText style={styles.text}> Reply By</MainText>
                    </View>
                    <HeadingText style={[styles.textDetail]}> {props.reply_by}</HeadingText>
                </View>
            </View>

            <View style={styles.listItem2}>
                <Icon name="md-calendar" color={COLOR.ICON_COLOR} size={20} width="10%" />
                <MainText style={styles.text}> Status</MainText>
            </View>
            <HeadingText style={[styles.textDetail,{color:"red"}]}> {props.status}</HeadingText>

            <View style={styles.listItem2}>
                <Icon name="md-calendar" color={COLOR.ICON_COLOR} size={20} width="10%" />
                <MainText style={styles.text}> Comment</MainText>
            </View>
            <HeadingText style={[styles.textDetail]}> {props.comment}</HeadingText>
        </View>
   // </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        margin: 10,
        padding: 10,
        backgroundColor: "white",
        shadowColor: COLOR.ICON_COLOR,
        shadowRadius: 10,
        shadowOpacity: 0.6,
        elevation: 18,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    listItem2: {
        flex: 1,
        marginTop: 4,

        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    textDetail: {
        fontFamily: "Poppins-Regular",
       
      
        fontSize: 14
    },

    text: {
        marginLeft: 5,
        fontSize: 15,
        fontFamily: "Poppins-Bold",
        
    },
});

export default replyHistoryItem;
