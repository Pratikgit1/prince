import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    ImageBackground,
    Dimensions,ActivityIndicator
  } from "react-native";
import { connect } from "react-redux";
import { setBranchName,getStateCityList} from "../../store/actions/index";
import { InputAutoSuggest } from 'react-native-autocomplete-search';

import { Navigation } from 'react-native-navigation'

class AddBranchCustomer extends Component {


     constructor(props) {
        super(props);
       //this.state={branch:props.text}
      }
    
    
     
    
      render() {
        return (
            
            <InputAutoSuggest
            style={{ flex: 1 }}
            staticData={ this.props.branch }

            itemFormat={{ id: 'BR_CODE', name: 'BR_NAME' , tags:['BR_CODE']}}
            onDataSelectedChange={data => {

                if(data!==null){
                Navigation.pop("AddBranchCustomer")
                this.props.onSetBranchName(data)
                this.props.onGetStateCityList(data.id)
                }
               
                console.log(data)

            }
        }

        />
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
      backgroundImage: {
        width: "100%",
        flex: 1
      },
      inputContainer: {
        width: "80%"
      },
      input: {
        backgroundColor: "#eee",
        borderColor: "#bbb"
      },
      landscapePasswordContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
      },
      portraitPasswordContainer: {
        flexDirection: "column",
        justifyContent: "flex-start"
      },
      landscapePasswordWrapper: {
        width: "45%"
      },
      portraitPasswordWrapper: {
        width: "100%"
      }
    });

    const mapDispatchToProps = dispatch => {
      return {
  
        onGetStateCityList: data => dispatch(getStateCityList(data)),
          onSetBranchName: branchName => dispatch(setBranchName(branchName)),
  
      };
  };
  const mapStateToProps = state => {
      return {
          branch: state.user.branch,
  
      };
  };

 
      export default connect(mapStateToProps, mapDispatchToProps)(AddBranchCustomer);