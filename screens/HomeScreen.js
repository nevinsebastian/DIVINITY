import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from 'react-native-elements'
import { auth,db } from '../firebase'
import { AntDesign, SimpleLineIcons} from "@expo/vector-icons";

const HomeScreen = ({navigation}) => {

    const [chats, setChats] = useState([]);

    const signOutUser = () => {
      auth.signOut().then(() => {
        navigation.replace("Sinister Entryway");
      });
    };

    useEffect (() => {
      const unsubscribe = db.collection('chats').onSnapshot(snapchot => (
        setChats(snapchot.docs.map(doc => ({
          id: doc.id,    // doc is firebase ile first branch on chat and id is the chat inte sanam
          data: doc.data()
        })))
      ));

        return unsubscribe;
    },[])


    useLayoutEffect(() =>{
      navigation.setOptions({
        title:"ForbiddenForum",
        headerStyle : { backgroundColor:"#fff"},
        headerTitleStyle:{color:"darkolivegreen"},
        headerTintColor:"black",
        headerLeft: () => (
          <View style={{marginLeft:20}}>
            <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
              <Avatar rounded source={{ uri: auth?.currentUser?.photoURL}} />
            </TouchableOpacity>
          </View>
        ),
        headerRight: () => (
          <View style={{
            flexDirection:"row",
            justifyContent:"space-between",
            width: 80,
            marginRight: 20,
          }}>
            <TouchableOpacity activeOpacity={0.5}>
              <AntDesign name='camerao' size={24} color="darkgreen"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
              <SimpleLineIcons name="pencil" size={24} color="darkgreen"/>
            </TouchableOpacity>

          </View>
        ),
      });
    },[navigation]);

    const enterChat = (id, chatName) => {
      navigation.navigate('Chat', {
        id,
        chatName,
      })
    }
    
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
              {chats.map(({id, data: { chatName}}) => (
                <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
              ))}
            
        </ScrollView>    
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    height:"100%",
  }
})