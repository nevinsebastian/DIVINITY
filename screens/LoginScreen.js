import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button,Input , Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import { auth } from '../firebase';


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect (() => {
      const unsubascribe =auth.onAuthStateChanged((authUser) => {
        console.log(authUser);
        if(authUser){
          navigation.replace("ForbiddenForum");
        }
      });

      return unsubascribe;
    },[]);


    


    const signIn = () => {
      auth.signInWithEmailAndPassword(email,password).catch((error) => alert(error));
    };



  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar styles="light" />
      <Image
      source={{
        uri:"https://static.vecteezy.com/system/resources/previews/021/963/719/original/rolex-logo-editorial-illustration-free-vector.jpg",
      }}
      style={{ width: 200, height:200}}
      />
      <View style={styles.inputContainer}>
        <Input placeholder="Email" autoFocus type="Email" value={email} onChangeText={(text) => setEmail(text)}
        />
        <Input placeholder="Password" secureTextEntry type="Password" value={password} onChangeText={(text) => setPassword(text)}
        onSubmitEditing={signIn}
        />
      </View>
      <Button containerStyle={styles.button} onPress={signIn} title="Unlock the Forbidden"  /> 
      <Button containerStyle={styles.button} onPress={() => navigation.navigate("Mystic Enrollment")}  type='outline' title="Awaken the Night"  />
      <View style={{ height : 100}} />
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        backgroundColor:"white",
    },
    inputContainer:{
        width:300,
    },
    button:{
        width: 200,
        marginTop:10,
    },
});