
import { NavigationContainer } from '@react-navigation/native';
import "react-native-gesture-handler"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import react from 'react';
import LoginScreen from './screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor:"#2C6BED"},
  headerTitleStyle: { color:"white"},
  headerTinitColor:"white",

}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      //initialRouteName='ForbiddenForum' 
      screenOptions={globalScreenOptions}>
        <Stack.Screen  name='Sinister Entryway' component={LoginScreen} />
        <Stack.Screen  name='Mystic Enrollment' component={RegisterScreen} />
        <Stack.Screen  name='ForbiddenForum' component={HomeScreen} />
        <Stack.Screen  name='AddChat' component={AddChatScreen} />
        <Stack.Screen  name='Chat' component={ChatScreen} />



      </Stack.Navigator>  
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
