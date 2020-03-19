import React, { Component } from "react";
import { View, Text, StyleSheet ,TouchableOpacity,ActivityIndicator} from "react-native";
import { connect } from "react-redux";
import { COLOR } from '../../utility/colors'
import ComplaintsListItem from "../../components/ComplaintsList/ComplaintsList";
import { complaintsDetails, replyHistory ,complaints,setComplaintsListData} from "../../store/actions/index";

import HeadingText from '../../components/UI/HeadingText/HeadingText'
import startMainTabs from "../../screens/startMainTabs/startMainTabs";
import {Navigation} from 'react-native-navigation';
import BaseComponent from '../../screens/BaseComponent/BaseComponent'
import DialogProgress from 'react-native-dialog-progress'

class ComplaintsList extends BaseComponent {

  state = {
    offset:1
  }


  options = {
    title:"Loading",
    message:"Please Wait...",
    isCancelable:true
}

  componentDidMount() {
    let complaints = [];
    this.props.onsetComplaintsListData(complaints)
    this.props.onSetListData(this.props.titleData.url,complaints,this.state.offset)
  }



  itemSelectedHandler = key => {
    const compDeta = this.props.complaintsList.find(place => {
      return place.key === key;
    });

    this.props.onComplaintsDetails(compDeta)
    this.props.onReplyHistory(compDeta)

  };


 

  render() {
    DialogProgress.hide()
    if (this.props.isLoadind) {
      DialogProgress.show(this.options)
    }
    return (
      <View style={styles.container}>
        <HeadingText style={{ fontSize: 22, color: "white", marginTop: 20 }} > {this.props.titleData.title}</HeadingText>
        <View style={styles.detailContainer}>
          <ComplaintsListItem
            places={this.props.complaintsList}
            onItemSelected={this.itemSelectedHandler}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
            //  this.offset=this.offset+1
             // this.setState({offset:this.state.offset+1})
             this.setState(prevState => {
              return {
                offset:prevState.offset+1
                  
                 
              };
          });
              this.props.onSetListData(this.props.titleData.url,this.props.complaintsList,this.state.offset+1)     
            }
          }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
    backgroundColor: COLOR.ICON_COLOR

  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },


  detailContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-start",
    backgroundColor: 'white',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 10

  },


});
const mapDispatchToProps = dispatch => {
  return {
    onComplaintsDetails: authData => dispatch(complaintsDetails(authData,"admin")),
    onReplyHistory: authData => dispatch(replyHistory(authData)),
    onSetListData: (url,complaintsList,offset) => dispatch(complaints(url,complaintsList,offset)),
    onsetComplaintsListData: (complaints) => dispatch(setComplaintsListData(complaints))


  };
};
const mapStateToProps = state => {
  return {
    complaintsList: state.dashboard.complaintsList,
    titleData: state.user.titleData,
    isLoadind: state.ui.isLoading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintsList);
