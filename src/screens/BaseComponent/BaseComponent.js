import React, { Component } from 'react'
import { StyleSheet, View, Text, Picker, ScrollView, ActivityIndicator } from 'react-native'
import { connect } from "react-redux";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput"
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import validate from "../../utility/validation";
import { closeComplaintSubmitData } from "../../store/actions/index";
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import DocumentPicker from 'react-native-document-picker';
import { COLOR } from '../../utility/colors'
import {Navigation} from 'react-native-navigation';
import startMainTabs from "../../screens/startMainTabs/startMainTabs";

class BaseComponent extends Component {

    
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this, props.screen)

   // this.offset = 1;
    
  }
  
navigationButtonPressed({ buttonId }) {
  if (buttonId == 'sideDrawerRight') {
    Navigation.mergeOptions('orgs.sideMenu', {
        sideMenu: {
            right: {
                visible: true
            },
        }
    });
}
}
}

export default BaseComponent