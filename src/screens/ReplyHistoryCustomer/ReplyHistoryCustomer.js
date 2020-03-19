import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";

import ReplyHistoryList from "../../components/ReplyHistory/ReplyHistoryList";
import { addRole, forwardComplaintsFromHandler } from "../../store/actions/index";
import { Navigation } from 'react-native-navigation';
import { COLOR } from '../../utility/colors'

import DialogProgress from 'react-native-dialog-progress'

class ReplyHistoryCustomer extends Component {

       
    
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this, props.screen)
  }
    options = {
        title: "Loading",
        message: "Please Wait...",
        isCancelable: true
    }

    render() {
        DialogProgress.hide()
        if (this.props.isLoadind) {
            //submitButton = <ActivityIndicator></ActivityIndicator>
            DialogProgress.show(this.options)
        }
        return (
            <View style={[styles.container, { padding: 0 }]}>
                <View style={[styles.container, { padding: 5 }]}>
                    <ReplyHistoryList
                        replyHistory={this.props.replyHistoryList}
                        //onItemSelected={this.itemSelectedHandler}
                    />
                </View>


            </View>
        );
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "space-around",
        padding: 20,
    },
    bottomDataDetail: {
        justifyContent: "center",
        alignItems: "center"
    },
    containerBottom: {
        justifyContent: "center",
        padding: 10,
        backgroundColor: 'white',
        flexDirection: "row",
        shadowColor: COLOR.ICON_COLOR,
        shadowRadius: 10,
        shadowOpacity: 0.6,
        elevation: 18
    },
    detailContainer: {
        padding: 20,
        justifyContent: "flex-start",
        backgroundColor: 'white',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        borderWidth: 1,
        borderColor: '#fff'

    },
});

const mapDispatchToProps = dispatch => {
    return {
        onGetUserName: (role) => dispatch(addRole(role))
    };
};

const mapStateToProps = state => {
    return {
        replyHistoryList: state.dashboard.replyHistoryList,
        isLoadind: state.ui.isLoading,
    };
};
export default connect( mapStateToProps,mapDispatchToProps)(ReplyHistoryCustomer);
