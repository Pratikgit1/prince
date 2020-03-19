import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import { Navigation } from 'react-native-navigation';

class WebViewCustomer extends Component {

   
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this, props.screen)

    var lastPart = props.url.substr(props.url.lastIndexOf('.') + 1);
    if (lastPart === "pdf") {        
      var DEFAULT_URL = 'http://docs.google.com/gview?embedded=true&url='+props.url;
      this.state={url:DEFAULT_URL}
   } 
else{
    this.state={url:props.url}
}

    //this.url = props.url;
    
  }

  onNavigationStateChange = navState => {
  //   var wb_url=navState.url;
  //   var lastPart = wb_url.substr(wb_url.lastIndexOf('.') + 1);
  //   if (lastPart === "pdf") {        
  //     var DEFAULT_URL = 'http://docs.google.com/gview?embedded=true&url='+wb_url;
  //     this.setState({url:DEFAULT_URL})
  //  }         
}
    render() {
      return (
        <WebView
        source={{ uri: this.state.url}}
         // source={{uri: '49.50.66.154/ogrs.syndicatebank.in/ogrs_new/uploads/documents/IMG_20191211_15171710.jpg'}}
         automaticallyAdjustContentInsets={false}
    javaScriptEnabled={true}
    domStorageEnabled={true}
    decelerationRate="normal"
    onNavigationStateChange={this.onNavigationStateChange}
    startInLoadingState={true}
          // javaScriptEnabled={true}
          // domStorageEnabled={true}
          // originWhitelist={['*']}
          // startInLoadingState={true}
          style={{flex:1,  width: "100%",}}
        />
      );
    }
  }
  export default WebViewCustomer