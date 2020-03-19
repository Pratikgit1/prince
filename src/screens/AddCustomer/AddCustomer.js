import React, { Component } from 'react'
import { StyleSheet, View, Text, Picker, ScrollView, ActivityIndicator, DatePickerIOS, TouchableNativeFeedback, DatePickerAndroid } from 'react-native'
import { connect } from "react-redux";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput"
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import validate from "../../utility/validation";
import { closeComplaintSubmitData, onForwardForwardTo, addCustomerSubmitData, getCity } from "../../store/actions/index";
import HeadingText from '../../components/UI/HeadingText/HeadingText'

import { COLOR } from '../../utility/colors'
import startMainTabs from "../../screens/startMainTabs/startMainTabs";
import { Navigation } from 'react-native-navigation';
import BaseComponent from "../BaseComponent/BaseComponent"

var moment = require('moment');

class AddCustomer extends BaseComponent {
    state = {
        controls: {
            dob: {
                date: new Date(),
                value: "",
                valid: true,
            },
            minority: {
                choosenIndex: -1,
                value: "",
                valid: false,
            },


            city: {
                choosenIndex: -1,
                value: "",
                valid: false,
            },

            state: {
                choosenIndex: -1,
                value: "",
                valid: false,
            },


            title: {
                choosenIndex: 0,
                value: "",
                valid: false,
                titleValue: [{ id: "", name: "---Select Title---" }, { id: "1", name: "Miss." }, { id: "2", name: "Mr." }, { id: "3", name: "Mrs." }]
            },
            exCust: {
                choosenIndex: 0,
                value: "",
                valid: false,
                exCustValue: [{ id: "", name: "--- Select Existing Customer --" }, { id: "1", name: "Yes" }, { id: "2", name: "No" }]
            },

            status: {
                choosenIndex: 0,
                value: "",
                valid: false,
                statusValue: [{ id: "", name: "---Select Status--" }, { id: "0", name: "Active" }, { id: "1", name: "In-Active" }]
            },

            gender: {
                choosenIndex: 0,
                value: "",
                valid: false,
                genderValue: [{ id: "", name: "---Select Gender---" }, { id: "1", name: "Male" }, { id: "2", name: "Female" }]
            },

            name: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 4
                },
                touched: false
            },
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            alt_email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            mobile: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 10
                },
                touched: false
            },

            alt_mobile: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 10
                },
                touched: false
            },

            pin_code: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            address: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },

        }
    };


    updateInputState = (key, value) => {
        let connectedValue = {};

        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,

                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                            value,
                            prevState.controls[key].validationRules,
                            connectedValue
                        ),
                        touched: true
                    }
                }
            };
        });
    };


    loginHandler = () => {


        const authData = {

            name: this.state.controls.name.value,
            email: this.state.controls.email.value,
            alt_email: this.state.controls.alt_email.value,
            mobile: this.state.controls.mobile.value,
            alt_mobile: this.state.controls.alt_mobile.value,
            pin_code: this.state.controls.pin_code.value,
            address: this.state.controls.address.value,
            dob: this.state.controls.dob.value,


            title: this.state.controls.title.titleValue[this.state.controls.title.choosenIndex].id,
            exCust: this.state.controls.exCust.exCustValue[this.state.controls.exCust.choosenIndex].id,
            status: this.state.controls.status.statusValue[this.state.controls.status.choosenIndex].id,
            gender: this.state.controls.gender.genderValue[this.state.controls.gender.choosenIndex].id,

            minorityCommunity: (this.state.controls.minority.choosenIndex === -1 ? "" : this.props.minorityCommunity[this.state.controls.minority.choosenIndex].Minor_code),
            state: (this.state.controls.state.choosenIndex === -1 ? "" : this.props.state[this.state.controls.state.choosenIndex].StateCode),
            city: (this.props.city.length > 0 ? (this.state.controls.city.choosenIndex === -1 ? "" : this.props.city[this.state.controls.city.choosenIndex].Ct_Code) : ""),
        };
        this.props.onSubmitData(authData);
    };


    showPicker = async (stateKey, options) => {
        try {
            var newState = {};
            const { action, year, month, day } = await DatePickerAndroid.open(options);
            if (action === DatePickerAndroid.dismissedAction) {
                newState[stateKey + 'Text'] = 'dismissed';
            } else {
                var date = new Date(year, month, day);

                newState[stateKey + 'Text'] = date.toLocaleDateString();
                //  newState[stateKey + 'Date'] = date;

                // this.setState({ date: date });

                this.setState(prevState => {
                    return {
                        controls: {
                            ...prevState.controls,
                            dob: {
                                ...prevState.controls.dob,
                                value: moment(date).format('DD/MM/YYYY'),
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
            <ButtonWithBackground
                color="yellow"
                onPress={this.loginHandler}
                disabled={
                    !this.state.controls.email.valid ||
                    !this.state.controls.title.valid ||
                    !this.state.controls.name.valid ||
                    !this.state.controls.mobile.valid 
                   // || !this.state.controls.status.valid
                }
            >
                SEND
       </ButtonWithBackground>
        );

        if (this.props.isLoadind) {
            submitButton = <ActivityIndicator></ActivityIndicator>
        }
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <HeadingText style={{ fontSize: 22, color: "white", margin: 20 }} >{this.props.titleData.title}</HeadingText>
                <View style={styles.detailContainer}>
                    <Text style={styles.textStyle}>Title</Text>
                    <View style={styles.picker}>
                        <Picker style={styles.pickerStyle}
                            mode="dropdown"
                            selectedValue={this.state.controls.title.value}
                            onValueChange={(itemValue, itemPosition) => {
                                if (itemPosition !== 0) {

                                    this.setState(prevState => {
                                        return {
                                            controls: {
                                                ...prevState.controls,
                                                title: {
                                                    value: itemValue,
                                                    choosenIndex: itemPosition,
                                                    valid: true,
                                                    titleValue: prevState.controls.title.titleValue
                                                }

                                            }
                                        };
                                    });


                                    //this.setState({ controls:{title: { value: itemValue, choosenIndex: itemPosition, valid: true } }})
                                }

                            }


                            }   >

                            {this.state.controls.title.titleValue.map((item, index) => {
                                return (<Picker.Item label={item.name} value={index} key={index} />)
                            })}

                        </Picker>
                    </View>

                    <Text style={styles.textStyle}>Name</Text>
                    <DefaultInput
                        placeholder="Enter Name"
                        style={styles.input}
                        value={this.state.controls.name.value}
                        onChangeText={val => this.updateInputState("name", val)}
                        valid={this.state.controls.name.valid}
                        touched={this.state.controls.name.touched}


                    />
                    <Text style={styles.textStyle}>Email</Text>
                    <DefaultInput
                        placeholder="Enter Email"
                        style={styles.input}
                        value={this.state.controls.email.value}
                        onChangeText={val => this.updateInputState("email", val)}
                        valid={this.state.controls.email.valid}
                        touched={this.state.controls.email.touched}
                        keyboardType={'email-address'}

                    />
                    <Text style={styles.textStyle}>Alternate Email</Text>
                    <DefaultInput
                        placeholder="Enter Alternate Email"
                        style={styles.input}
                        value={this.state.controls.alt_email.value}
                        onChangeText={val => this.updateInputState("alt_email", val)}
                        valid={this.state.controls.alt_email.valid}
                        touched={this.state.controls.alt_email.touched}
                        keyboardType={'email-address'}

                    />

                    <Text style={styles.textStyle}> Mobile</Text>
                    <DefaultInput
                        placeholder="Enter Mobile no"
                        style={styles.input}
                        value={this.state.controls.mobile.value}
                        onChangeText={val => this.updateInputState("mobile", val)}
                        valid={this.state.controls.mobile.valid}
                        touched={this.state.controls.mobile.touched}
                        maxLength={10}
                        keyboardType={'numeric'}

                    />

                    <Text style={styles.textStyle}>Alternate Mobile</Text>
                    <DefaultInput
                        placeholder="Enter Alternate Mobile no"
                        style={styles.input}
                        value={this.state.controls.alt_mobile.value}
                        onChangeText={val => this.updateInputState("alt_mobile", val)}
                        valid={this.state.controls.alt_mobile.valid}
                        touched={this.state.controls.alt_mobile.touched}
                        keyboardType={'numeric'}

                    />

                    <Text style={styles.textStyle}> Gender</Text>
                    <View style={styles.picker}>
                        <Picker style={styles.pickerStyle}
                            mode="dropdown"
                            selectedValue={this.state.controls.gender.value}
                            onValueChange={(itemValue, itemPosition) =>

                                this.setState(prevState => {
                                    return {
                                        controls: {
                                            ...prevState.controls,
                                            gender: {
                                                value: itemValue,
                                                choosenIndex: itemPosition,
                                                valid: true,
                                                genderValue: prevState.controls.gender.genderValue
                                            }

                                        }
                                    };
                                })


                                //</View>/this.setState({controls:{ gender: { value: itemValue, choosenIndex: itemPosition } }})
                            }   >

                            {this.state.controls.gender.genderValue.map((item, index) => {
                                return (<Picker.Item label={item.name} value={index} key={index} />)
                            })}

                        </Picker>
                    </View>
                    <Text style={styles.textStyle}>DOB</Text>
                    <TouchableNativeFeedback >
                        <Text style={[styles.input, { padding: 15 }]}
                            onPress={this.showPicker.bind(this, 'default', {
                                date: this.state.controls.dob.date, mode: 'default',
                                maxDate: this.state.controls.dob.date
                            })}>>
                   {(this.state.controls.dob.value)}</Text>
                    </TouchableNativeFeedback>


                    <Text style={[styles.textStyle, { marginTop: 10 }]}>Minority Community</Text>
                    <View style={styles.picker}>
                        <Picker style={styles.pickerStyle}
                            selectedValue={this.state.controls.minority.value}
                            onValueChange={(itemValue, itemPosition) => {
                                if (itemPosition !== 0) {

                                    this.setState(prevState => {
                                        return {
                                            controls: {
                                                ...prevState.controls,
                                                minority: {
                                                    value: itemValue,
                                                    choosenIndex: itemPosition - 1,
                                                    valid: true,
                                                }

                                            }
                                        };
                                    })


                                    // this.setState({controls:{ minority: { value: itemValue, choosenIndex: itemPosition - 1, valid: true } }})
                                }
                            }
                            } >
                            <Picker.Item label="--Select Minority Community --" value="00" />
                            {this.props.minorityCommunity.map((item, index) => {
                                return (<Picker.Item label={item.Minority} value={index} key={index} />)
                            })}

                        </Picker>

                    </View>

                    <Text style={[styles.textStyle, { marginTop: 10 }]}>State</Text>
                    <View style={styles.picker}>
                        <Picker style={styles.pickerStyle}
                            selectedValue={this.state.controls.state.value}
                            onValueChange={(itemValue, itemPosition) => {
                                if (itemPosition !== 0) {
                                    this.props.onGetCity(this.props.state[itemPosition - 1].StateCode),

                                        this.setState(prevState => {
                                            return {
                                                controls: {
                                                    ...prevState.controls,
                                                    state: {
                                                        value: itemValue,
                                                        choosenIndex: itemPosition - 1,
                                                        valid: true,
                                                    }

                                                }
                                            };
                                        })

                                    // this.setState({ controls:{state: { value: itemValue, choosenIndex: itemPosition - 1, valid: true }} })
                                }
                            }
                            } >
                            <Picker.Item label="--Select State --" value="00" />
                            {this.props.state.map((item, index) => {
                                return (<Picker.Item label={item.StateNm} value={index} key={index} />)
                            })}

                        </Picker>

                    </View>

                    <Text style={[styles.textStyle, { marginTop: 10 }]}>City</Text>
                    <View style={styles.picker}>
                        <Picker style={styles.pickerStyle}
                            selectedValue={this.state.controls.city.value}
                            onValueChange={(itemValue, itemPosition) => {
                                if (itemPosition !== 0) {

                                    this.setState(prevState => {
                                        return {
                                            controls: {
                                                ...prevState.controls,
                                                city: {
                                                    value: itemValue,
                                                    choosenIndex: itemPosition - 1,
                                                    valid: true,
                                                }

                                            }
                                        };
                                    })


                                    // this.setState({controls:{ city: { value: itemValue, choosenIndex: itemPosition - 1, valid: true }} })
                                }
                            }
                            } >
                            <Picker.Item label="--Select City --" value="00" />
                            {this.props.city.map((item, index) => {
                                return (<Picker.Item label={item.Ct_Name} value={index} key={index} />)
                            })}

                        </Picker>
                    </View>

                    <Text style={styles.textStyle}>Pin Code</Text>
                    <DefaultInput
                        placeholder="Enter Pin Code"
                        style={styles.input}
                        value={this.state.controls.pin_code.value}
                        onChangeText={val => this.updateInputState("pin_code", val)}
                        valid={this.state.controls.pin_code.valid}
                        touched={this.state.controls.pin_code.touched}

                    />


                    <Text style={styles.textStyle}>Address</Text>
                    <DefaultInput
                        placeholder="Enter Address"
                        style={styles.input}
                        value={this.state.controls.address.value}
                        onChangeText={val => this.updateInputState("address", val)}
                        valid={this.state.controls.address.valid}
                        touched={this.state.controls.address.touched}
                        numberOfLines={3}

                    />

                    <Text style={styles.textStyle}> Existing Customer</Text>
                    <View style={styles.picker}>
                        <Picker style={styles.pickerStyle}
                            mode="dropdown"
                            selectedValue={this.state.controls.exCust.value}
                            onValueChange={(itemValue, itemPosition) =>

                                this.setState(prevState => {
                                    return {
                                        controls: {
                                            ...prevState.controls,
                                            exCust: {
                                                value: itemValue,
                                                choosenIndex: itemPosition,
                                                valid: true,
                                                exCustValue: prevState.controls.exCust.exCustValue,
                                            }

                                        }
                                    };
                                })

                                // this.setState({controls:{ exCust: { value: itemValue, choosenIndex: itemPosition }} })
                            }   >

                            {this.state.controls.exCust.exCustValue.map((item, index) => {
                                return (<Picker.Item label={item.name} value={index} key={index} />)
                            })}

                        </Picker>

                    </View>
                   {/*  <Text style={styles.textStyle}>Status</Text>
                    <View style={styles.picker}>
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
                                                    statusValue: prevState.controls.status.statusValue,
                                                }

                                            }
                                        };
                                    })

                                    // this.setState({ controls:{status: { value: itemValue, choosenIndex: itemPosition, valid: true }} })
                                }
                            }

                            }   >

                            {this.state.controls.status.statusValue.map((item, index) => {
                                return (<Picker.Item label={item.name} value={index} key={index} />)
                            })}

                        </Picker>
                    </View> */}
                    <View style={styles.button}>
                        {submitButton}
                    </View>
                </View>
            </ScrollView>
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
        marginTop: 8,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: "left",
        fontFamily: "Poppins-Bold",
        fontWeight: "bold"
    },
    picker: {
        backgroundColor: "#eee",
        borderColor: "#bbb",
        fontFamily: "Poppins-Regular",
        marginTop: 4,
        borderWidth: 1,

    },
    pickerStyle: {
        height: 45,
        width: "90%",
        color: '#344953',
        justifyContent: 'center',
    },
    input: {
        width: "100%",
        backgroundColor: "#eee",
        borderColor: "#bbb",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins-Regular"
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

    button: {
        width: "100%",

        alignItems: "center",
        justifyContent: "center"
    },
})

const mapDispatchToProps = dispatch => {
    return {
        onSubmitData: (authData) => dispatch(addCustomerSubmitData(authData)),
        onGetCity: (authData) => dispatch(getCity(authData)),
    };
};
const mapStateToProps = state => {
    return {
        minorityCommunity: state.user.minorityCommunity,
        state: state.user.state,
        city: state.user.city,
        isLoadind: state.ui.isLoading,
        complaintsData: state.user.complaintsData,
        titleData: state.user.titleData

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer)