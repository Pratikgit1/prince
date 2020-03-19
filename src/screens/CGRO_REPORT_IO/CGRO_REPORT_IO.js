import React, { Component } from 'react'
import { StyleSheet, View, Text, Picker, ScrollView, ActivityIndicator, ImageBackground, DatePickerAndroid, TouchableNativeFeedback } from 'react-native'
import { connect } from "react-redux";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput"
import startMainTabs from "../../screens/startMainTabs/startMainTabs";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import validate from "../../utility/validation";
import {
    getProduct_type, getSub_type, CGROReportData, complaintFormLevelHandler,
    onForwardForwardTo, addCGROReeportSubmit,setCGROReportSearchData,setSub_Type
} from "../../store/actions/index";
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import backgroundImage from "../../assets/bg1.jpg"
import Icon from 'react-native-vector-icons/Ionicons';
import { COLOR } from '../../utility/colors'
import { Navigation } from 'react-native-navigation';

var moment = require('moment');

class CGRO_REPORT_IO extends Component {
    state = {
        controls: {

            source_of_complaint: {
                choosenIndex: -1,
                value: "",
                valid: false,
            },


            complaint_grievanceType: {
                choosenIndex: -1,
                value: "",
                valid: false,
            },


            request_cat: {
                choosenIndex: -1,
                value: "",
                valid: false,
            },

            Grievance_Category: {
                choosenIndex: -1,
                value: "",
                valid: false,
            },
            product_type: {
                choosenIndex: -1,
                value: "",
                valid: false,
            },

            sub_type: {
                choosenIndex: -1,
                value: "",
                valid: false,
            },

            office_type: {
                choosenIndex: -1,
                value: "",
                valid: false,
            },
            offices: {
                choosenIndex: -1,
                value: "",
                valid: false,
            },

            from_date: {
                date:new Date(),
                maxDate:new Date(),
                value: "",
                valid: true,
            },
            to_date: {
                date: new Date(),
                maxDate:new Date(),
                value: "",
                valid: true,
            },
            status: {
                choosenIndex: 0,
                value: "",
                valid: false,
                statusValue: [{ id: "", name: "---Select---" }, { id: "0", name: "Open" }, { id: "1", name: "Closed" }]
            },

        }
    };
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this, props.screen)
    }

    componentDidMount() {
        this.props.onSetListData()
        this.props.onGetOfficeType()
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId == 'optionMunu') {
            startMainTabs();
        }

    }

  

    loginHandler = () => {


        const authData = {

            from_date: this.state.controls.from_date.value,
            to_date: this.state.controls.to_date.value,


            status: this.state.controls.status.statusValue[this.state.controls.status.choosenIndex].id,


            complaint_source: (this.state.controls.source_of_complaint.choosenIndex === -1 ? "" : this.props.complaint_source[this.state.controls.source_of_complaint.choosenIndex].id),
            complaint_type: (this.state.controls.complaint_grievanceType.choosenIndex === -1 ? "" : this.props.complaint_type[this.state.controls.complaint_grievanceType.choosenIndex].id),
            Grievance_Category: (this.state.controls.Grievance_Category.choosenIndex === -1 ? "" : this.props.grievance_cat[this.state.controls.Grievance_Category.choosenIndex].id),
            request_cat: (this.state.controls.request_cat.choosenIndex === -1 ? "" : this.props.request_cat[this.state.controls.request_cat.choosenIndex].id),
            product_type: (this.props.product_type.length > 0 ? (this.state.controls.product_type.choosenIndex === -1 ? "" : this.props.product_type[this.state.controls.product_type.choosenIndex].id) : ""),
            sub_type: (this.props.sub_type.length > 0 ? (this.state.controls.sub_type.choosenIndex === -1 ? "" : this.props.sub_type[this.state.controls.sub_type.choosenIndex].id) : ""),

            office_type: (this.state.controls.office_type.choosenIndex === -1 ? "" : this.props.officeType[this.state.controls.office_type.choosenIndex].id),
            offices: (this.props.officeListData.length > 0 ? (this.state.controls.offices.choosenIndex === -1 ? "" : this.props.officeListData[this.state.controls.offices.choosenIndex].code) : ""),
            pageno: 1
        };
      //  this.props.onSubmitData(authData);
      this. callCGROReportListScreen()
      this.props.onSubmitData(authData);
    };

     callCGROReportListScreen = (data) => {
        Navigation.mergeOptions('InternaObdusmanDashBoard', {
            sideMenu: {
                left: {
                    visible: false
                },
                right: {
                    visible: false
                },
            }
        });
        
            Navigation.push("InternaObdusmanDashBoard", {
                component: {
                    id: 'CGROReportListIO',
                    name: 'orgs.CGROReportListIO',
                  //   passProps: {
                  //     complaintsList: data
                  //   },
                    options: {
                        topBar: {
                            visible: true,
                            title: {
                                text: "CGROReportListIO", alignment: "center"
                            },
                        }
                    },
                },
            });
      }

    showPickerFromDate = async (stateKey, options) => {
        try {

            const { action, year, month, day } = await DatePickerAndroid.open(options);
            if (action === DatePickerAndroid.dismissedAction) {

            } else {
                const date = new Date(year, month, day);

                this.setState(prevState => {
                    return {
                        controls: {
                            ...prevState.controls,
                            from_date: {
                                ...prevState.controls.from_date,
                                date: date,
                                value: moment(date).format('DD-MM-YYYY'),
                                valid: true,
                            }

                        }
                    };
                });
            }

        } catch ({ code, message }) {
            console.warn(`Error in example '${stateKey}': `, message);
        }
    };

    showPickerToDate = async (stateKey, options) => {
        try {

            const { action, year, month, day } = await DatePickerAndroid.open(options);
            if (action === DatePickerAndroid.dismissedAction) {

            } else {
                var date = new Date(year, month, day);

                this.setState(prevState => {
                    return {
                        controls: {
                            ...prevState.controls,
                            to_date: {
                                ...prevState.controls.to_date,
                                value: moment(date).format('DD-MM-YYYY'),
                                valid: true,
                            }

                        }
                    };
                });
            }

        } catch ({ code, message }) {
            console.warn(`Error in example '${stateKey}': `, message);
        }
    };


    render() {
        let submitButton = (
            <ScrollView contentContainerStyle={styles.container}>
                <HeadingText style={{ fontSize: 22, color: "white", margin: 20 }} >CGRO REPORT</HeadingText>
                <View style={styles.detailContainer}>




                    <View style={styles.picker}>
                        <Text style={styles.textStyle}> Source of Complaint:</Text>
                        <Picker style={styles.pickerStyle}
                            selectedValue={this.state.controls.source_of_complaint.value}

                            onValueChange={(itemValue, itemPosition) => {
                                if (itemPosition !== 0) {

                                    this.setState(prevState => {
                                        return {
                                            controls: {
                                                ...prevState.controls,
                                                source_of_complaint: {
                                                    value: itemValue,
                                                    choosenIndex: itemPosition - 1,
                                                    valid: true,
                                                }

                                            }
                                        };
                                    })

                                }
                            }
                            } >
                            <Picker.Item label="--- Select ---" value="" />
                            {this.props.complaint_source.map((item, index) => {
                                return (<Picker.Item label={item.name} value={index} key={index} />)
                            })}

                        </Picker>

                    </View>
                    <View style={styles.picker}>
                        <Text style={styles.textStyle}>Complaint/GrievanceType:</Text>
                        <Picker style={styles.pickerStyle}
                            selectedValue={this.state.controls.complaint_grievanceType.value}
                            onValueChange={(itemValue, itemPosition) => {
                                if (itemPosition !== 0) {

                                    this.setState(prevState => {
                                        return {
                                            controls: {
                                                ...prevState.controls,
                                                complaint_grievanceType: {
                                                    value: itemValue,
                                                    choosenIndex: itemPosition - 1,
                                                    valid: true,
                                                }

                                            }
                                        };
                                    })

                                }
                            }
                            } >
                            <Picker.Item label="--- Select ---" value="" />
                            {this.props.complaint_type.map((item, index) => {
                                return (<Picker.Item label={item.name} value={index} key={index} />)
                            })}

                        </Picker>

                    </View>
                    <View style={styles.picker}>
                        <Text style={[styles.textStyle, { marginTop: 10 }]}>Request Category:</Text>
                        <Picker style={styles.pickerStyle}
                            selectedValue={this.state.controls.request_cat.value}
                            onValueChange={(itemValue, itemPosition) => {
                                if (itemPosition !== 0) {
                                    this.setState(prevState => {
                                        return {
                                            controls: {
                                                ...prevState.controls,
                                                request_cat: {
                                                    value: itemValue,
                                                    choosenIndex: itemPosition - 1,
                                                    valid: true,
                                                }

                                            }
                                        };
                                    })


                                }
                            }
                            } >
                            <Picker.Item label="--Select Request Category--" value="00" />
                            {this.props.request_cat.map((item, index) => {
                                return (<Picker.Item label={item.name} value={index} key={index} />)
                            })}

                        </Picker>
                    </View>
                    <View style={styles.picker}>

                        <Text style={[styles.textStyle, { marginTop: 10 }]}>Grievance Category:</Text>
                        <Picker style={styles.pickerStyle}
                            selectedValue={this.state.controls.Grievance_Category.value}
                            onValueChange={(itemValue, itemPosition) => {
                                if (itemPosition !== 0) {
                                    this.props.onProduct_type(this.props.grievance_cat[itemPosition - 1].id),
                                        this.setState(prevState => {
                                            return {
                                                controls: {
                                                    ...prevState.controls,
                                                    Grievance_Category: {
                                                        value: itemValue,
                                                        choosenIndex: itemPosition - 1,
                                                        valid: true,
                                                    }

                                                }
                                            };
                                        })
                                }
                            }
                            } >
                            <Picker.Item label="--Select Category --" value="00" />
                            {this.props.grievance_cat.map((item, index) => {
                                return (<Picker.Item label={item.name} value={index} key={index} />)
                            })}

                        </Picker>
                    </View>
                    <View style={styles.picker}>
                        <Text style={[styles.textStyle, { marginTop: 10 }]}>Type/Product & Services:</Text>
                        <Picker style={styles.pickerStyle}
                            selectedValue={this.state.controls.product_type.value}
                            onValueChange={(itemValue, itemPosition) => {
                                if (itemPosition !== 0) {
                                    this.props.onSub_type(this.props.product_type[itemPosition - 1].id),
                                    this.props.onSub_typeNull([])
                                        this.setState(prevState => {
                                            return {
                                                controls: {
                                                    ...prevState.controls,
                                                    product_type: {
                                                        value: itemValue,
                                                        choosenIndex: itemPosition - 1,
                                                        valid: true,
                                                    }

                                                }
                                            };
                                        })
                                }
                            }
                            } >
                            <Picker.Item label="--Select Category --" value="00" />
                            {this.props.product_type.map((item, index) => {
                                return (<Picker.Item label={item.name} value={index} key={index} />)
                            })}

                        </Picker>

                    </View>
                    <View style={styles.picker}>
                        <Text style={[styles.textStyle, { marginTop: 10 }]}>Sub Type/Nature of Complaint:</Text>
                        <Picker style={styles.pickerStyle}
                            selectedValue={this.state.controls.sub_type.value}
                            onValueChange={(itemValue, itemPosition) => {
                                if (itemPosition !== 0) {
                                    // this.props.onSub_type(this.props.product_type[itemPosition - 1].cat_id),
                                    this.setState(prevState => {
                                        return {
                                            controls: {
                                                ...prevState.controls,
                                                sub_type: {
                                                    value: itemValue,
                                                    choosenIndex: itemPosition - 1,
                                                    valid: true,
                                                }

                                            }
                                        };
                                    })
                                }
                            }
                            } >
                            <Picker.Item label="---Select--- " value="" />
                            {this.props.sub_type.map((item, index) => {
                                return (<Picker.Item label={item.name} value={index} key={index} />)
                            })}

                        </Picker>
                    </View>
                    <View style={styles.picker}>
                        <Text style={[styles.textStyle, { marginTop: 10 }]}>Office Type</Text>
                        <Picker style={styles.pickerStyle}
                            selectedValue={this.state.controls.office_type.value}
                            onValueChange={(itemValue, itemPosition) => {
                                if (itemPosition !== 0) {
                                    this.props.onGetOfficeList(this.props.officeType[itemPosition - 1].id),


                                        this.setState(prevState => {
                                            return {
                                                controls: {
                                                    ...prevState.controls,
                                                    office_type: {
                                                        value: itemValue,
                                                        choosenIndex: itemPosition - 1,
                                                        valid: true,
                                                    }

                                                }
                                            };
                                        })
                                }
                            }
                            } >
                            <Picker.Item label="--Select Level --" value="" />
                            {this.props.officeType.map((item, index) => {
                                return (<Picker.Item label={item.name} value={index} key={index} />)
                            })}

                        </Picker>
                    </View>
                    <View style={styles.picker}>
                        <Text style={styles.textStyle}>Offices</Text>
                        <Picker style={styles.pickerStyle}
                            selectedValue={this.state.controls.offices.value}
                            onValueChange={(itemValue, itemPosition) => {
                                if (itemPosition !== 0) {
                                    this.setState(prevState => {
                                        return {
                                            controls: {
                                                ...prevState.controls,
                                                offices: {
                                                    value: itemValue,
                                                    choosenIndex: itemPosition - 1,
                                                    valid: true,
                                                }

                                            }
                                        };
                                    })
                                }
                            }

                            }  >

                            <Picker.Item label="--Select--" value="00" />

                            {this.props.officeListData.map((item, index) => {
                                return (<Picker.Item label={item.name} value={index} key={index} />)
                            })}

                        </Picker>
                    </View>
                    <View style={styles.picker}>
                        <Text style={styles.textStyle}>Status</Text>
                        <Picker style={styles.pickerStyle}
                            mode="dropdown"
                            selectedValue={this.state.controls.status.value}
                            onValueChange={(itemValue, itemPosition) => {
                                if (itemPosition !== 0) {

                                    this.setState(prevState => {
                                        return {
                                            controls: {
                                                ...prevState.controls,
                                                status: {
                                                    value: itemValue,
                                                    choosenIndex: itemPosition,
                                                    valid: true,
                                                    statusValue: prevState.controls.status.statusValue
                                                }
                                            }
                                        };
                                    });
                                }
                            }
                            }   >
                            {this.state.controls.status.statusValue.map((item, index) => {
                                return (<Picker.Item label={item.name} value={index} key={index} />)
                            })}

                        </Picker>
                    </View>
                    <View style={styles.picker}>
                        <Text style={[styles.textStyle]}>From Date</Text>
                        <TouchableNativeFeedback >
                            <View style={styles.imageLayout}>
                                <Icon name="md-calendar" color="red" size={25} style={{ paddingLeft: 25 }} />
                                <Text style={[styles.input, { padding: 15 }]}
                                    onPress={this.showPickerFromDate.bind(this, 'default', {
                                        date: this.state.controls.from_date.date, 
                                        mode: 'default',
                                        maxDate: this.state.controls.from_date.maxDate
                                    })}>>
                   {((this.state.controls.from_date.value === "" ? "" : this.state.controls.from_date.value))}</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.picker}>

                        <Text style={[styles.textStyle]}>To Date</Text>
                        <TouchableNativeFeedback >
                            <View style={styles.imageLayout}>
                                <Icon name="md-calendar" color="red" size={25} style={{ paddingLeft: 25 }} />
                                <Text style={[styles.input, { padding: 15 }]}
                                    onPress={this.showPickerToDate.bind(this, 'default', {
                                        date: this.state.controls.from_date.date, mode: 'default',
                                        minDate:this.state.controls.from_date.date,
                                        maxDate: this.state.controls.to_date.maxDate
                                        
                                    })}>>
                   {(this.state.controls.to_date.value)}</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>

                    <ButtonWithBackground color="yellow"
                        onPress={this.loginHandler}  >  Generate Report </ButtonWithBackground>
                </View>
            </ScrollView>
        )
        if (this.props.isLoadind) {
            submitButton = <ActivityIndicator size="large" color="#0000ff" style={{
                flex: 1, flexDirection: 'row',
                justifyContent: 'center', alignItems: "center",
                padding: 10
            }}></ActivityIndicator>
        }


        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                {/* // dashboard= {this.props.dashboard} */}
                {submitButton}
            </ImageBackground>
        );

    }


}

const styles = StyleSheet.create({
    container: {

        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",

        backgroundColor: COLOR.ICON_COLOR
    },
    textStyle: {
        fontFamily: "Poppins-Bold",
        fontWeight: "bold",
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: "left",
    },
    pickerStyle: {
        height: 45,
        width: "90%",
        color: '#344953',
        justifyContent: 'center',
    },
    input: {
        width: "100%",
        fontFamily: "Poppins-Regular",
        alignItems: "center",
        justifyContent: "center"
    },
    imageLayout: {
        flexDirection: "row",
        justifyContent: "flex-start",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d6d4d4",
        borderColor: "#bbb",
        marginTop: 20

    },
    detailContainer: {
        flex: 1,
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: 'white',
        borderTopRightRadius: 28,
        borderTopLeftRadius: 28,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 10

    },
    backgroundImage: {
        width: "100%",
        flex: 1,
    },
    button: {
        width: "100%",

        alignItems: "center",
        justifyContent: "center"
    },

    picker: {
        backgroundColor: "#eee",
        borderColor: "#bbb",
        fontFamily: "Poppins-Regular",
        padding: 10,
        marginTop: 10,
        borderWidth: 1,
    },
})




const mapDispatchToProps = dispatch => {
    return {

        onSetListData: (authData) => dispatch(CGROReportData(authData)),

        onProduct_type: id => dispatch(getProduct_type(id)),
        onSub_type: id => dispatch(getSub_type(id)),
        onGetOfficeType: () => dispatch(complaintFormLevelHandler()),
        onGetOfficeList: (authData) => dispatch(onForwardForwardTo(authData)),

      //  onSubmitData: (authData) => dispatch(addCGROReeportSubmit(authData,"IO")),
      onSubmitData: (authData) => dispatch(setCGROReportSearchData(authData)),
      onSub_typeNull:data=> dispatch(setSub_Type(data))

    };
};
const mapStateToProps = state => {
    return {
        complaint_source: state.user.complaint_source,
        complaint_type: state.user.complaint_type,
        grievance_cat: state.user.grievance_cat,

        request_cat: state.user.request_cat,
        userData: state.user.userData,

        product_type: state.user.product_type,
        sub_type: state.user.sub_type,

        officeType: state.user.forwardLevelData,
        officeListData: state.user.forwardToData,

        isLoadind: state.ui.isLoading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CGRO_REPORT_IO)