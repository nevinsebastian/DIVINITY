import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListItem, Avatar } from 'react-native-elements'

const CustomListItem = ({id,chatName, enterChat}) => {
  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} buttomDivider >
        <Avatar
        rounded
        source={{
            uri:
            "https://assets-global.website-files.com/610d1cd6f18c817c8ccc47f4/62ff4b08229c46020db1910c_Z3985V.jpg",
        }}
        />
        <ListItem.Content>
            <ListItem.Title style={{ fontWeight:"800"}}>
                {chatName}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                shit about us
            </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})