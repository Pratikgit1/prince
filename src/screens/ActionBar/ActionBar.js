import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground, ScrollView,
    Dimensions, Activity
} from 'react-native'

//import logo from "../../assets/logo2.png";
import logo from "../../assets/logo1.png";

class ActionBar extends Component {

    render() {
        return (
            <Image
                style={styles.imageTOP}
                source={logo}
            />

        )
    }

}


const styles = StyleSheet.create({

    imageTOP: {
        width: 150,
        height: "90%",
        
    },

});

export default ActionBar

