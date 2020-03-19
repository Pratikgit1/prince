import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  View,
  StyleSheet,
  Platform
} from "react-native";

const buttonWithBackground = props => {
  const content = (
    <View
      style={[
        styles.button,
        { backgroundColor: props.color },
        props.disabled ? styles.disabled : null
      ]}
    >
      <Text style={props.disabled ? styles.disabledText : null}>
        {props.children}
      </Text>
    </View>
  );
  if (props.disabled) {
    return content;
  }
  if (Platform.OS === "android") {
    return (
      <TouchableNativeFeedback onPress={props.onPress}>
  
       {content}
      </TouchableNativeFeedback>
    );
  }
  return <TouchableOpacity onPress={props.onPress}>
  {content}
  </TouchableOpacity>;
};

const styles = StyleSheet.create({
  button: {
    paddingLeft: 30,
    paddingRight:30,
    paddingTop:10,
    paddingBottom:10,
    margin: 5,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "yellow",
    justifyContent:"center",
    alignItems:"center"
  },
  disabled: {
    backgroundColor: "#eee",
    borderColor: "#aaa"
  },
  disabledText: {
    color: "#aaa",
    fontWeight:"bold",
    fontFamily:"Poppins-Bold"
  }
});

export default buttonWithBackground;
