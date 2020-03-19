import React from "react";
import { StyleSheet, FlatList } from "react-native";

import ReplyHistoryItem from "../ListItem/ReplyHistoryItem";

const replyHistoryList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.replyHistory}
      renderItem={(info) => (
        <ReplyHistoryItem
        comment={info.item.comment}
        comment_date={info.item.comment_date}    
        comment_by={info.item.comment_by}
        reply_by={info.item.reply_by}
        status={info.item.status}
        //  onItemPressed={() => props.onItemSelected(info.item.key)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default replyHistoryList;
