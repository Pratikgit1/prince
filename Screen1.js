import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';

class Screen1 extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this)
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId == 'back') {
      Navigation.dismissModal(this.props.componentId);
      console.log("Back pressed")
    }
    else if(buttonId=='search'){
      Navigation.dismissModal(this.props.componentId);
      console.log("Back pressed")
    }
  }

  loginHandler = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'rnntest.Screen2',
        options: {
          topBar: {
            visible:true,
            rightButtons: [
              {
                id: 'buttonOne',
                text: 'Button one'
              }
            ]
          }
        }
      },
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text
          onPress={this.loginHandler}>Screen 1</Text>
      </View>
    )
  }

  // return (
  //   <View style={styles.container}>
  //     <Text
  //     onPress ={loginHandler}>Screen 1</Text>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center'
   
  },
});

export default Screen1;
