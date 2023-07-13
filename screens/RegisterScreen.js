import { StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Button,Input , Image,Text } from 'react-native-elements';
import { auth } from '../firebase';

const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState("");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
          headerBackTitle: "Login",
        });
      }, [navigation]);

      const register = () => {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((authUser) => {
            authUser.user
              .updateProfile({
                displayName: name,
                photoURL:
                  imageUrl ||
                  "https://as1.ftcdn.net/v2/jpg/05/16/27/58/1000_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg",
              })
              .then(() => {
                // Profile update successful
                // Redirect or perform any other actions
                navigation.replace('ForbiddenForum');
              })
              .catch((error) => {
                // Error updating profile
                console.log(error);
              });
          })
          .catch((error) => alert(error.message));
      };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style='light'/>
      <Text h3 style={{ marginBottom: 50}}>
        Summon Your Identity      
      </Text>
      <View style={styles.inputContainer}>
        <Input placeholder="Full name" autofocus type='text' value={name} onChangeText={(text) => setName(text)} />
        <Input placeholder="Email"  type='Email' value={email} onChangeText={(text) => setEmail(text)} />
        <Input placeholder="Password" secureTextEntry type='password' value={password} onChangeText={(text) => setPassword(text)} />
        <Input placeholder="Profile pic url(venonkii)" autofocus type='text' value={imageUrl} onChangeText={(text) => setImageUrl(text)} onSubmitEditing={register} />
      </View>
      <Button  containerStyle={styles.button} raised onPress={register} title="Register" />
      <View style={{height:100}} />
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        backgroundColor:"white",
    },
    button:{
        width:200,
        marginTop:10,

    },
    inputContainer:{
        width:300,
    },

});