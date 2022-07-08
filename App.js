import React , {useState} from 'react';
import { NavigationContainer}  from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import loginScreen from "./screens/loginScreen";
import homeScreen from "./screens/homeScreen";
import todolist from "./screens/todolist";
import EditList from"./screens/EditList";
import Settings from"./screens/Settings";
import * as firebase from 'firebase';
import colors from "./colors";

const firebaseConfig = {
    apiKey: "AIzaSyC1lE3kP_U4cPiHOPPgT6cBFPL4LjUcO_A",
    authDomain: "todoapp-c1fd6.firebaseapp.com",
    projectId: "todoapp-c1fd6",
    storageBucket: "todoapp-c1fd6.appspot.com",
    messagingSenderId: "1010928092433",
    appId: "1:1010928092433:web:337af02562c0cc53d178b0"
  };
  if(firebase.apps.length ===0){
    firebase.initializeApp(firebaseConfig);
  }

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      
      <Stack.Screen name="homeScreen"
       component={homeScreen}
       options={{
        headerLeft: () => {
          return null;
        },
       }}
        />
        <Stack.Screen name="loginScreen"
       component={loginScreen}
       options={{
        headerLeft: () => {
          return null;
        },
       }}
       />
        <Stack.Screen 
         name="todolist" 
         component={todolist}
         options={({route})=>{
          return({
            title:route.params.title,
            headerStyle:{
            backgroundColor:route.params.color
             },
            headerTintColor:"white" 
            });
       }}/>
       <Stack.Screen 
       name="EditList" 
       component={EditList}
       options={({route})=>{
        return({
          title:route.params.title ? `Edit ${route.params.title} list` :"Create New List",
          headerStyle:{
          backgroundColor:route.params.color || colors.blue
         },
         headerTintColor:"white" 
        });
      }}/>
      <Stack.Screen name="Settings" component={Settings}/>
        </Stack.Navigator>
    </NavigationContainer>
    );
  }

  export default App; 