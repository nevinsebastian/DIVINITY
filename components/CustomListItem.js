import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ListItem, Avatar } from 'react-native-elements'
import { db } from '../firebase';
import { onSnapshot } from 'firebase/firestore';

const CustomListItem = ({id,chatName, enterChat}) => {
    const [chatMessages, setChatMessages] = useState([]);

useEffect(() => {
    const unsubscribe = db
    .collection('chats')
    .doc(id)
    .collection('messages')
    .orderBy('timestamp','desc')
    .onSnapshot((snapshot) => 
        setChatMessages(snapshot.docs.map(doc => doc.data()))
    );
    return unsubscribe;
})

  return (
    <ListItem  onPress={() => enterChat(id, chatName)} key={id} buttomDivider >
       
        <Avatar
        rounded
        source={{
            uri: chatMessages?.[0]?.photoURL ||
            "https://assets-global.website-files.com/610d1cd6f18c817c8ccc47f4/62ff4b08229c46020db1910c_Z3985V.jpg",
        }}
        />
        <ListItem.Content>
            <ListItem.Title style={{ fontWeight:"800"}}>
                {chatName}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                {chatMessages?.[0]?.displayName}:{chatMessages?.[0]?.message}
            </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})