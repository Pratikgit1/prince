import React from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";

import CustomerListItem from "../CustomerListItem/CustomerListItem";

const ComplaintsListItemCustomer = props => {
    return (
        <FlatList
            {...props}
            style={styles.listContainer}
            data={props.places}
            renderItem={(info) => (
                <CustomerListItem
                    complaint_no={info.item.Complaint_no}
                    created_on={info.item.created_on}
                    reopen={info.item.reopen}
                    c_status={info.item.c_status}

                    onView={() => props.onViewHandler(info.item.key)}
                    onFeedback={() => props.onFeedbackHandler(info.item.key)}
                    onTrack={() => props.onTrackHandler(info.item.key)}
                    onReopen={() => props.onReopenHandler(info.item.key)}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        marginTop: 5
    },

});

export default ComplaintsListItemCustomer;
