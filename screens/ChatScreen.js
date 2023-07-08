import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'

const ChatScreen = ({navigation, route}) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            title:"chat",
            headerBackTitleVisible:false,
            headerTitleAlign:"left",
        })
    },[navigation])
  return (
    <View>
      <Text>{route.params.chatName}</Text>
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})