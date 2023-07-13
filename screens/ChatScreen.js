import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { auth, db } from '../firebase';
import firebase from 'firebase/compat/app';

import 'firebase/firestore';
import { orderBy } from 'firebase/firestore';


const ChatScreen = ({ navigation, route }) => {

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "chat",
      headerBackTitleVisible: false,
      headerStyle: { backgroundColor: "#fff" },
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{
          flexDirection: "row",
          alignItems: "center",
        }}>
          <Avatar rounded source={{
            
            uri: messages[0]?.data.photoURL,
          }} />
          <Text style={{ color: "darkolivegreen", marginLeft: 10, fontWeight: "700" }}>{route.params.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={{ margin: 10 }} onPress={navigation.goBack}>
          <AntDesign name='arrowleft' size={24} color="darkolivegreen" />
        </TouchableOpacity>
      )

    });
  }, [navigation, messages])

  const sendMessage = () => {
    Keyboard.dismiss();
    
    db.collection('chats').doc(route.params.id).collection('messages').add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
    })

    setInput('')
  };

  useLayoutEffect(() => {
    const unsubscribe = db
    .collection("chats").doc(route.params.id).collection("messages").orderBy("timestamp", "desc").onSnapshot(snapshot => {
      setMessages(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      );
    });

    return unsubscribe;
  },[route]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >

        <>
        <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
            {messages.map(({id, data}) => (
              data.email === auth.currentUser.email ? (
                <View key={id} style={styles.reciver}>
                    <Avatar 
                    rounded
                    containerStyle={{     // for the web
                      position:"absolute",
                      bottom: -15,
                      right:-5,
                    }}
                    bottom={-15}
                    right={-5}
                    position="absolute"
                    size={30}
                    source={{
                      uri:data.photoURL,
                    }}
                    />
                    <Text style={styles.reciverText}>{data.message}</Text>
                </View>
              ):(
                <View key={id} style={styles.sender}>
                    <Avatar rounded
                    containerStyle={{     // for the web
                      position:"absolute",
                      bottom: -15,
                      right:-5,
                    }}
                    bottom={-15}
                    right={-5}
                    position="absolute"
                    size={30}
                    source={{
                      uri:data.photoURL,
                    }}/>
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>

                </View>
              )
              )
            )}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput value={input} onChangeText={(text) => setInput(text)} onSubmitEditing={sendMessage} placeholder='Message' style={styles.TextInput} />
            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5} >
              <Ionicons name="send" size={24} color="darkolivegreen" />
            </TouchableOpacity>
          </View>
        </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  reciver:{
    padding:15,
    backgroundColor:"#ECECEC",
    alignSelf:"flex-end",
    borderRadius:20,
    marginRight:15,
    marginBottom:20,
    maxWidth:"80%",
    position: "relative"
  },
  sender:{
    padding:15,
    backgroundColor:"#2B6BE6",
    alignSelf:"flex-start",
    borderRadius:20,
    margin:15,
    maxWidth:"80%",
    position: "relative"
  },
  senderText:{
    color:"white",
    fontWeight:"500",
    marginLeft:10,
    marginBottom:15
  },
  reciverText:{
    color:"black",
    fontWeight:"500",
    marginLeft:10,
  },
  senderName:{
    left:10,
    paddingRight:10,
    fontSize:10,
    color:"white"
  },
  footer: {
    flexDirection:"row",
    alignItems:"center",
    width:"100%",
    padding: 15,
  },
  TextInput: {
    bottom: 0,
    height:40,
    flex:1,
    marginRight:15,
    borderColor:"transparent",
    backgroundColor:"#ECECEC",
    padding:10,
    color:"grey",
    borderRadius:30,
  },
  
  
});
