import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { COLOR } from '../../utility/colors'
import ComplaintsListItem from "../../components/ComplaintsList/ComplaintsList";
import { addCGROReeportSubmit, setCGROReportData ,tyrSendCGROReport,totalCount} from "../../store/actions/index";
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import { Navigation } from 'react-native-navigation';
import BaseComponent from '../../screens/BaseComponent/BaseComponent'
import DialogProgress from 'react-native-dialog-progress'

class CGROReportListIO extends BaseComponent {

  options = {
    title: "Loading",
    message: "Please Wait...",
    isCancelable: true
  }

  state = {
    offset: 1
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this, props.screen)

    // this.complaintsList = props.complaintsList;

  }

  componentDidMount() {
    let complaints = [];
    //this.props.onsetComplaintsListData(complaints)
    this.props.onSetListDataCGROIO(this.props.cgro_report_search_data, complaints, this.state.offset)
  }

  itemSelectedHandler = key => {


  };

  sendReport = () => {
    this.props.onSendReport(this.props.cgro_report_search_data);
  }
  componentWillUnmount(){
        this.props.ontotalCount()
  }

  render() {
    DialogProgress.hide()
    if (this.props.isLoadind) {
      DialogProgress.show(this.options)
    }
    return (
      <View style={styles.container}>
  <HeadingText style={{ fontSize: 22, color: "white", marginTop: 20,marginLeft:20 }} >Total Records Found: {this.props.total_count.total_count} </HeadingText>

        <View style={styles.detailContainer}>

        {this.props.total_count.total_count !=="0" ?

<HeadingText style={{ fontSize: 14, color: "blue", marginTop: 0,marginLeft:20}}  >Report has been sent on registered email address, please check. </HeadingText>
:<HeadingText style={{ fontSize: 16, color: "blue", marginTop: 0,marginLeft:20}}  >No Report Found </HeadingText>
}
          {/* <ComplaintsListItem
            places={this.props.complaintsList}
            onItemSelected={this.itemSelectedHandler}
            onEndReached={() => {
              //  this.offset=this.offset+1
               // this.setState({offset:this.state.offset+1})
               this.setState(prevState => {
                return {
                  offset:prevState.offset+1
                    
                   
                };
            });
                this.props.onSetListDataCGRO(this.props.cgro_report_search_data,this.props.complaintsList,this.state.offset+1)     
              }
            }
          /> */}
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
    onSetListDataCGROIO: (authData, complaintsList, offset) => dispatch(addCGROReeportSubmit(authData, complaintsList, offset)),
    onsetComplaintsListData: (complaints) => dispatch(setCGROReportData(complaints)),
    onSendReport: (report) => dispatch(tyrSendCGROReport(report, "IO")),
    ontotalCount: () => dispatch(totalCount({total_count:"0"}))


  };
};
const mapStateToProps = state => {
  return {
    cgro_report_search_data: state.user.cgro_report_search_data,
    complaintsList: state.user.cgro_report_data,
    isLoadind: state.ui.isLoading,
    total_count: state.user.total_count
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CGROReportListIO);

