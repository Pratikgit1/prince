import React from "react";
import { StyleSheet, FlatList ,TouchableOpacity} from "react-native";

import ListItem from "../ListItem/ListItem";

const complaintsList = props => {
  return (
    <FlatList
    {...props}
      style={styles.listContainer}
      data={props.places}
      renderItem={(info) => (
        <ListItem
        complaint_no={info.item.Complaint_no}
        created_on={info.item.created_on}
  
          onItemPressed={() => props.onItemSelected(info.item.key)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
   marginTop:5
  },
 
});

export default complaintsList;
