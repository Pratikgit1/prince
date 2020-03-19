import React, { Component } from 'react'
import { StyleSheet, View, Text, Picker, ScrollView, ActivityIndicator, DatePickerIOS, TouchableNativeFeedback, DatePickerAndroid } from 'react-native'
import { connect } from "react-redux";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput"
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import validate from "../../utility/validation";
import { getCity, getProduct_type, getSub_type, getStateCityList, addComplaintsSubmitData,
    profileDetail, setBranchName,setSub_Type,setProduct_Type,setSelectedState,setSelectedCity
} from "../../store/actions/index";
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import { InputAutoSuggest } from 'react-native-autocomplete-search';
import { Navigation } from 'react-native-navigation'
import DocumentPicker from 'react-native-document-picker';
import { COLOR } from '../../utility/colors'

import startMainTabs from "../../screens/startMainTabs/startMainTabs";
import BaseComponent from '../../screens/BaseComponent/BaseComponent'

var moment = require('moment');

class AddComplaintsCustomer extends BaseComponent {
    state = {

        controls: {
            user_code: {
                value: this.props.customer_detail.username,
                valid: false,
                validationRules: {
                    minLength: 4
                },
                touched: false
            },
            mobile_no: {
                value: this.props.customer_detail.name,
                valid: false,
                validationRules: {
                    minLength: 10
                },
                touched: false
            },

            ppo_number: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 4
                },
                touched: false
            },

            Branch_Name: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 4
                },
                touched: false
            },

            email: {
                value: this.props.customer_detail.email,
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            source_of_complaint: {
                choosenIndex: 0,
                value: "",
                valid: false,
            },

            pension_type: {
                choosenIndex: 0,
                value: "",
                valid: false,
            },

            complaint_grievanceType: {
                choosenIndex: 0,
                value: "",
                valid: false,
            },

            city: {
                choosenIndex: 0,
                value: "",
                valid: false,
                click: false
            },

            state: {
                choosenIndex: 0,
                value: "",
                valid: false,
                click: false
            },
            request_cat: {
                choosenIndex: 0,
                value: "",
                valid: false,
            },

            Grievance_Category: {
                choosenIndex: 0,
                value: "",
                valid: false,
            },
            product_type: {
                choosenIndex: 0,
                value: "",
                valid: false,
            },

            sub_type: {
                choosenIndex: 0,
                value: "",
                valid: false,
            },
            branch: {
                choosenIndex: 0,
                value: "",
                valid: false,
                click: false
            },
            Registered_Account: {
                choosenIndex: 0,
                value: "",
                valid: false,
                Registered_AccountValue: [{ id: "", name: "---Select---" }, { id: "Yes", name: "Yes" }, { id: "No", name: "No" }]
            },
            Complaint_details: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            image: {
                value: null,
                type: null,
                valid: false,
                res: null
            },
            account_no: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 14
                },
                touched: false
            },

        }
    };

    componentDidMount() {
        //  this.props.onProfileDetail("")
    }

    imagePickedHandler = image => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            };
        });
    };

    async selectOneFile() {
        //Opening Document Picker for selection of one file
        try {
            const res = await DocumentPicker.pick({
                // type: [DocumentPicker.types.allFiles],
                //There can me more options as well
                type: [DocumentPicker.types.images, DocumentPicker.types.pdf, DocumentPicker.types.plainText],
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });
            //Printing the log realted to the file
            console.log('res : ' + JSON.stringify(res));
            console.log('URI : ' + res.uri);
            console.log('Type : ' + res.type);
            console.log('File Name : ' + res.name);
            console.log('File Size : ' + res.size);
            //Setting the state to show single file attributes

            this.setState(prevState => {
                return {
                    controls: {
                        ...prevState.controls,
                        image: {
                            value: res.name,
                            type: res.type,
                            valid: true,
                            res: res
                        }
                    }
                };
            });
            // this.setState({ singleFile: res });
        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Canceled from single doc picker');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    }

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

    submitDataHandler = () => {
        const authData = {
            user_code: this.props.customer_detail.username,
            mobile_no: this.state.controls.mobile_no.value,
            // ppo_number: this.state.controls.ppo_number.value,

            Branch_Name: this.props.branchName.id,
            email: this.state.controls.email.value,
            image: this.state.controls.image.res,
            Complaint_details: this.state.controls.Complaint_details.value,
            account_no: this.state.controls.account_no.value,
            ppo_number: this.state.controls.ppo_number.value,
            pension_type: this.props.pension_type[this.state.controls.pension_type.choosenIndex].id,

            complaint_source: this.props.complaint_source[this.state.controls.source_of_complaint.choosenIndex].id,
            complaint_type: this.props.complaint_type[this.state.controls.complaint_grievanceType.choosenIndex].id,
            Grievance_Category: this.props.grievance_cat[this.state.controls.Grievance_Category.choosenIndex].id,

            request_cat: this.props.request_cat[this.state.controls.request_cat.choosenIndex].id,
            state: this.state.controls.state.value,
            city: this.state.controls.city.value,
            Registered_Account: this.state.controls.Registered_Account.Registered_AccountValue[this.state.controls.Registered_Account.choosenIndex].id,

            product_type: this.props.product_type[this.state.controls.product_type.choosenIndex].id,
            sub_type: this.props.sub_type[this.state.controls.sub_type.choosenIndex].id,
            office: this.props.sub_type[this.state.controls.sub_type.choosenIndex].office,


        }

        //  alert("success");
        this.props.onSubmitData(authData)
    }

    componentWillUnmount() {
        this.props.onSetBranchName({})
        this.props.onSetBranchName({})
        this.props.onSetStateCity({})
    }
    loginHandler = () => {

        if (!this.state.controls.source_of_complaint.valid) {
            alert(" Source Of Complaint required")
        }
        else if (!this.state.controls.complaint_grievanceType.valid) {
            alert(" Complaint GrievanceType required")
        }
        else if (!this.props.branchName.id) {
            alert(" Branch Name required")
        }
        else if (!this.state.controls.state.value.length === 0) {
            alert(" state required")
        }
        else if (this.state.controls.city.value.length === 0) {
            alert(" city required")
        }
        else if (!this.state.controls.request_cat.valid) {
            alert(" Request category required")
        }
        else if (!this.state.controls.Grievance_Category.valid) {
            alert(" Grievance Category required")
        }
        else if (!this.state.controls.product_type.valid) {
            alert(" product type required")
        }
        else if (!this.state.controls.sub_type.valid) {
            alert(" sub type required")
        }
        else if (!this.state.controls.Registered_Account.valid) {
            alert(" Registered_Account required")
        }
        else if (!this.state.controls.Complaint_details.valid) {
            alert(" Complaint details required")
        }
        else if (this.props.complaint_type[this.state.controls.complaint_grievanceType.choosenIndex].id === "2") {
            if (!this.state.controls.ppo_number.valid) {
                alert(" PPO Number required")
            }
            else if (!this.state.controls.pension_type.valid) {

                alert(" Pension Type required")
            }
            else if (this.state.controls.Registered_Account.Registered_AccountValue[this.state.controls.Registered_Account.choosenIndex].id === "Yes") {
                if (!this.state.controls.account_no.valid) {
                    alert(" Account No required")
                }
                else {
                    this.submitDataHandler();
                }
            }
            else {
                this.submitDataHandler();
            }
        }
        else if (this.state.controls.Registered_Account.Registered_AccountValue[this.state.controls.Registered_Account.choosenIndex].id === "Yes") {
            if (!this.state.controls.account_no.valid) {
                alert(" Account No   required")
            }
            else if (this.props.complaint_type[this.state.controls.complaint_grievanceType.choosenIndex].id === "2") {
                if (!this.state.controls.ppo_number.valid) {
                    alert(" PPO Number  required")
                }
                else if (!this.state.controls.pension_type.valid) {
                    alert(" Pension Type required")
                }
                else {
                    this.submitDataHandler();
                }
            }
            else {
                this.submitDataHandler();

            }
        }
        else {
            this.submitDataHandler();
        }

    };

    addBranch = () => {

        Navigation.push("CustomerDashBoard", {
            component: {
                id: 'AddBranchCustomer',
                name: 'orgs.AddBranchCustomer',
                passProps: {
                    text: this.props.branch
                },
                options: {
                    topBar: {
                        visible: true,
                        title: {
                            text: "AddBranch", alignment: "center"
                        },
                    }
                },

            },
        });
    }


    componentDidUpdate(prevProps, prevState) {
        // console.log(prevProps)

        // console.log(prevState)
        if (prevProps.selectedCity.Ct_Code !== prevState.controls.city.value) {
            this.setState(prevState => {
                return {
                    controls: {
                        ...prevState.controls,
                        state: {
                            ...prevState.controls.state,
                            value: prevProps.selectedState.StateCode,
                            click: true,
                        },
                        city: {
                            ...prevState.controls.city,
                            value: prevProps.selectedCity.Ct_Code,
                            click: true,
                        }


                    }
                };
            })
        }



    }



    render() {
        let accountNO = null

        let submitButton = (
            <ButtonWithBackground
                color="yellow"
                onPress={this.loginHandler}

            > SUBMIT </ButtonWithBackground>
        );

        let pentionData = null

        if (this.props.isLoadind) {
            submitButton = <ActivityIndicator></ActivityIndicator>
        }



        if (this.props.complaint_type[this.state.controls.complaint_grievanceType.choosenIndex].id === "2") {
        
            pentionData = (
                <View>
                    <Text style={[styles.textStyle, { marginTop:15 }]}>Type of Pension:</Text>
                    <View style={styles.picker}>
                    <Picker style={styles.pickerStyle}
                        prompt="Type of Pension:"
                        selectedValue={this.state.controls.pension_type.value}
                        onValueChange={(itemValue, itemPosition) => {
                            if (itemPosition !== 0) {

                                this.setState(prevState => {
                                    return {
                                        controls: {
                                            ...prevState.controls,
                                            pension_type: {
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
                        {this.props.pension_type.map((item, index) => {
                            return (<Picker.Item label={item.name} value={index} key={index} />)
                        })}

                    </Picker>
                    </View>


                    <Text style={[styles.textStyle, { marginTop:15 }]}>PPO Number</Text>
                    <DefaultInput
                        placeholder="Enter PPO Number"
                        style={styles.input}
                        value={this.state.controls.ppo_number.value}
                        onChangeText={val => this.updateInputState("ppo_number", val)}
                        valid={this.state.controls.ppo_number.valid}
                        touched={this.state.controls.ppo_number.touched}

                    />


                </View>
            );
        }

        if (this.state.controls.Registered_Account.Registered_AccountValue[this.state.controls.Registered_Account.choosenIndex].id === "Yes") {
            accountNO = (
                <View>
                    <Text style={styles.textStyle}>Account No</Text>
                    <DefaultInput
                        placeholder="Account No"
                        style={styles.input}
                        value={this.state.controls.account_no.value}
                        onChangeText={val => this.updateInputState("account_no", val)}
                        valid={this.state.controls.account_no.valid}
                        touched={this.state.controls.account_no.touched}
                        maxLength={18}
                        keyboardType={'numeric'}

                    />
                </View>
            );
        }
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <HeadingText style={[styles.textHeader, { fontSize: 22, color: "white", margin: 20 }]} >ADD COMPLAINTS</HeadingText>
                <View style={styles.detailContainer}>
                    <Text style={styles.textStyle}>User Code</Text>
                    <DefaultInput
                        placeholder="User Code"
                        style={[styles.input, { fontFamily: "Poppins-Bold", fontWeight: "bold" }]}
                        editable={false}
                        value={this.props.customer_detail.username}
                        onChangeText={val => this.updateInputState("user_code", val)}
                        valid={this.state.controls.user_code.valid}
                        touched={this.state.controls.user_code.touched}

                    />



                    <Text style={styles.textStyle}>Mobile No</Text>
                    <DefaultInput
                        placeholder="Enter Mobile No"
                        style={[styles.input, { fontFamily: "Poppins-Bold", fontWeight: "bold" }]}
                        editable={false}
                        // value={this.state.controls.mobile_no.value}
                        value={this.props.customer_detail.mobile}
                        onChangeText={val => this.updateInputState("mobile_no", val)}
                        valid={this.state.controls.mobile_no.valid}
                        touched={this.state.controls.mobile_no.touched}

                    />
                    <Text style={styles.textStyle}>Email</Text>
                    <DefaultInput
                        placeholder="Enter Email"
                        style={[styles.input, { fontFamily: "Poppins-Bold", fontWeight: "bold" }]}
                        editable={false}
                        value={this.props.customer_detail.email}
                        onChangeText={val => this.updateInputState("email", val)}
                        valid={this.state.controls.email.valid}
                        touched={this.state.controls.email.touched}

                    />

                    <Text style={[styles.textStyle, { marginTop:15 }]}> Source of Complaint:</Text>
                    <View style={styles.picker}>
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


                    <Text style={[styles.textStyle, { marginTop:15 }]}>Complaint/GrievanceType:</Text>
                    <View style={styles.picker}>
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


                    {pentionData}

                    <Text style={[styles.textStyle, { marginTop:15 }]}>Branch Name</Text>
                    <View style={{ flex: 1, flexDirection: "row", marginRight: 90 }}>

                        <DefaultInput

                            placeholder="Branch"
                            style={[styles.input, { fontFamily: "Poppins-Bold", fontWeight: "bold", width: "80%" }]}
                            editable={false}
                            value={(this.props.branchName.id === undefined) ? "" : this.props.branchName.id + "-" + this.props.branchName.name} />


                        <ButtonWithBackground
                            style={{ width: "20%" }}
                            color="yellow"
                            onPress={this.addBranch} >   Add Branch    </ButtonWithBackground>
                    </View>


                    <Text style={[styles.textStyle, { marginTop:15 }]}>State</Text>
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
                                                        // click: true,
                                                    }

                                                }
                                            };
                                        })


                                }
                            }
                            }
                        >
                            <Picker.Item label="--Select State --" value="00" />
                            {this.props.state.map((item, index) => {
                                return (<Picker.Item label={item.StateNm} value={item.StateCode} key={index} />)
                            })}

                        </Picker>
                    </View>


                    <Text style={[styles.textStyle, { marginTop:15 }]}>City</Text>
                    <View style={styles.picker}>
                        <Picker style={styles.pickerStyle}
                            selectedValue={this.state.controls.city.value}
                            // selectedValue={ ( this.props.selectedCity.Ct_Name) ?this.props.selectedCity.Ct_Name :this.state.controls.city.value }
                            // selectedValue={this.props.selectedCity.Ct_Name}
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
                                                    // click: true,
                                                }

                                            }
                                        };
                                    })
                                }
                            }
                            } >
                            <Picker.Item label="--Select City --" value="00" />
                            {this.props.city.map((item, index) => {
                                return (<Picker.Item label={item.Ct_Name} value={item.Ct_Code} key={index} />)
                            })}

                        </Picker>
                    </View>

                    <Text style={[styles.textStyle, { marginTop:15 }]}>Request Category:</Text>
                    <View style={styles.picker}>
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

                    <Text style={[styles.textStyle, { marginTop:15 }]}>Grievance Category:</Text>
                    <View style={styles.picker}>
                        <Picker style={styles.pickerStyle}
                            selectedValue={this.state.controls.Grievance_Category.value}
                            onValueChange={(itemValue, itemPosition) => {
                                if (itemPosition !== 0) {
                                    this.props.onProduct_type(this.props.grievance_cat[itemPosition - 1].id),
                                    this.props.onProduct_typeNull([])
                                    this.props.onSub_typeNull([])
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

                    <Text style={[styles.textStyle, { marginTop:15 }]}>Type/Product & Services:</Text>
                    <View style={styles.picker}>
                        <Picker style={styles.pickerStyle}
                            selectedValue={this.state.controls.product_type.value}
                            onValueChange={(itemValue, itemPosition) => {
                                if (itemPosition !== 0) {
                                    this.props.onSub_type(this.props.product_type[itemPosition - 1].id),
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

                    <Text style={[styles.textStyle, { marginTop:15 }]}>Sub Type/Nature of Complaint:</Text>
                    <View style={styles.picker}>
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
                            <Picker.Item label="---Select Sub Type--- " value="00" />
                            {this.props.sub_type.map((item, index) => {
                                return (<Picker.Item label={item.name} value={index} key={index} />)
                            })}

                        </Picker>
                    </View>

                    <Text style={[styles.textStyle, { marginTop:15 }]}> Registered Account ?:</Text>
                    <View style={styles.picker}>
                        <Picker style={styles.pickerStyle}
                            mode="dropdown"
                            selectedValue={this.state.controls.Registered_Account.value}
                            onValueChange={(itemValue, itemPosition) =>

                                this.setState(prevState => {
                                    return {
                                        controls: {
                                            ...prevState.controls,
                                            Registered_Account: {
                                                value: itemValue,
                                                choosenIndex: itemPosition,
                                                valid: true,
                                                Registered_AccountValue: prevState.controls.Registered_Account.Registered_AccountValue
                                            }

                                        }
                                    };
                                })


                                //</View>/this.setState({controls:{ gender: { value: itemValue, choosenIndex: itemPosition } }})
                            }   >

                            {this.state.controls.Registered_Account.Registered_AccountValue.map((item, index) => {
                                return (<Picker.Item label={item.name} value={index} key={index} />)
                            })}

                        </Picker>
                    </View>
                    {accountNO}

                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>

                        <ButtonWithBackground

                            color="yellow"
                            onPress={this.selectOneFile.bind(this)} >   Add Document   </ButtonWithBackground>
                        <Text style={[styles.textStyle, { color: "red", fontSize: 12, width: "70%" }]}>{this.state.controls.image.value}</Text>

                    </View>

                    <Text style={[{ fontSize: 12, marginTop: 5, fontFamily: "Poppins-Regular" }]}>Only PDF,JPGE,PNG And ZIP File are allowed. </Text>

                    <Text style={[styles.textStyle, { marginTop:15 }]}>Complaint details/summary</Text>
                    <DefaultInput
                        placeholder="Complaint details/summary"
                        style={styles.input}
                        value={this.state.controls.Complaint_details.value}
                        onChangeText={val => this.updateInputState("Complaint_details", val)}
                        valid={this.state.controls.Complaint_details.valid}
                        touched={this.state.controls.Complaint_details.touched}
                        numberOfLines={3}
                    />

                    <Text style={[{ fontSize: 12, fontFamily: "Poppins-Regular" }]}> Maximum 2000 characters Accepted  </Text>

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

        fontSize: 15,
        fontWeight: 'bold',
        textAlign: "left",

        fontFamily: "Poppins-Bold",
        fontWeight: "bold"
    },
    textHeader: {
        fontSize: 10,
        // fontFamily: "Poppins-Regular",
        fontFamily: "Poppins-Bold",
        fontWeight: "bold"
    },
    pickerStyle: {
        height: 45,
        width: "80%",
        color: '#344953',
        justifyContent: 'center',
    },
    picker: {
        backgroundColor: "#eee",
        borderColor: "#bbb",
        fontFamily: "Poppins-Regular",
        marginTop: 4,
        borderWidth: 1,

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
        onProfileDetail: (state) => dispatch(profileDetail(state)),
        onSubmitData: (authData) => dispatch(addComplaintsSubmitData(authData, "customer")),
        
        onProduct_typeNull:data=> dispatch(setProduct_Type(data)),
        onGetCity: (authData) => dispatch(getCity(authData)),
        onSub_typeNull:data=> dispatch(setSub_Type(data)),
        onProduct_type: id => dispatch(getProduct_type(id)),
        onSub_type: id => dispatch(getSub_type(id)),
        onGetStateCityList: data => dispatch(getStateCityList(data)),
        onSetBranchName: branchName => dispatch(setBranchName(branchName)),
        onSetStateCity: (authData) => dispatch(setSelectedState(authData)),
        onSetCity: (authData) =>  dispatch(setSelectedCity(authData))
    };
};
const mapStateToProps = state => {
    return {
        complaint_source: state.user.complaint_source,
        complaint_type: state.user.complaint_type,
        grievance_cat: state.user.grievance_cat,
        pension_type: state.user.pension_type,
        request_cat: state.user.request_cat,
        userData: state.user.userData,
        state: state.user.state,
        city: state.user.city,
        product_type: state.user.product_type,
        sub_type: state.user.sub_type,
        branch: state.user.branch,
        branchName: state.user.branchName,

        selectedState: state.user.selectedState,
        selectedCity: state.user.selectedCity,
        customer_detail: state.user.customer_detail
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(AddComplaintsCustomer)