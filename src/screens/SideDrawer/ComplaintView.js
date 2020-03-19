import React from 'react'
import { View, StyleSheet, Text, Image,TouchableNativeFeedback } from 'react-native'
import HeadingText from "../../components/UI/HeadingText/HeadingText";

const complaintView = props => (
    <TouchableNativeFeedback onPress={props.onPress}>
    <View {...props} style={styles.container}>
        
        <Text style={[styles.textHeading, props.style]}>
            {props.text}
        </Text>
        {/* <View style={styles.count}> */}
        <Text style={styles.countStyle}>
          ( {props.count} )
        </Text>
        {/* </View> */}
    </View>
    </TouchableNativeFeedback>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center"
    },
    textHeading: {
        fontSize: 14,
      
       // marginLeft:10,
        fontFamily: "Poppins-Regular",
    },

    countStyle: {
        marginLeft:10,
        fontFamily: "Poppins-Bold",
        fontSize:16,
        color:"red"
    },
    count: {
        flex:1,
        width: 30,
        height:30,
        borderRadius: 30/2,
        padding:5,
       borderWidth:1,
       marginLeft:10,
       borderColor:"black",
       backgroundColor:"#DADADA",
       fontSize:15,
       justifyContent:"center",
       alignItems:"center",
    },
    image: {
        width: 30,
        height: 30
    }
});

export default complaintView;

