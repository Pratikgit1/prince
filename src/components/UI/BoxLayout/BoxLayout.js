import React from 'react'
import { View, Text, StyleSheet, Image, TouchableNativeFeedback } from 'react-native'
import HeadingText from '../HeadingText/HeadingText'
import LinearGradient from 'react-native-linear-gradient'

const boxLayout = props => (
    <TouchableNativeFeedback onPress={props.onPress}>
        <LinearGradient colors={props.colors}  {...props} style={styles.boxLayout}
        >
            <Image style={styles.image}
                source={props.image}></Image>
            <HeadingText style={styles.count}>{props.count}</HeadingText>
            <HeadingText style={styles.title}>{props.text}</HeadingText>

        </LinearGradient>
    </TouchableNativeFeedback>
);

const styles = StyleSheet.create({

    image: {
        width: 50,
        height: 50

    },

    count: {
        color: "white",
        fontSize: 38,
        fontFamily: "Poppins-Bold",
        fontWeight: "bold"


    },

    title: {
        color: "white", 
        fontSize: 13,
        fontFamily: "Poppins-Regular",
        fontWeight: "normal"

    },

    boxLayout: {
        width: "48%",
        height: 180,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        position: 'relative',
        margin: 5
    },


})



export default boxLayout