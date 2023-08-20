import React, { useLayoutEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Text } from 'react-native-elements';
import axios from 'axios';
import { StyleSheet, View } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Replace useNavigate with navigation.navigate
  // Also, the function name should match the one in the onPress event
  const register = async () => {
    try {
      const data = {
        email: email,
        password: password,
        confirm_Password: confirmPassword,
      };

      // Use axios for the fetch request
      const response = await axios.post(
        'https://glupingtest.onrender.com/docs#/Users/create_user_users__post',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        // User registered successfully
        const result = response.data;
        navigation.navigate('Sinister Entryway');
      } else if (response.status === 422) {
        // Validation error
        const errorData = response.data;
        // Handle validation errors here
      } 
    } catch (error) {
      console.log(error);
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Sinister Entryway',
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Summon Your Identity
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          type="email" // Use lowercase 'email' instead of 'Email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Confirm Password"
          secureTextEntry
          type="password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>
      {/* Use the 'register' function in the onPress event */}
      <Button
        containerStyle={styles.button}
        raised
        onPress={register}
        title="Register"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  inputContainer: {
    width: 300,
  },
});
