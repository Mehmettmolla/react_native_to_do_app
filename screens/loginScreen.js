import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Alert,tag } from 'react-native';
import firebase from"firebase";
import 'firebase/firestore';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

function loginScreen({navigation}){
    const [email ,setEmail]=useState("");
    const [password ,setPassword]=useState("");
    const [error, setError] = useState("");
 
   const Giris=async ()=>{
    try {
        let response = await firebase.auth().signInWithEmailAndPassword(email, password)
        if (response && response.user) {
          Alert.alert("Success ✅", "Giriş başarılı")
          navigation.navigate("homeScreen")
        }
      } catch (e) {s
        console.error(e.message)
      }
    }
    const UyeOl = () => {
        if (!email) {
          setError("Email required *")
          setValid(false)
          return
        } else if (!password && password.trim() && password.length > 6) {
          setError("Weak password, minimum 5 chars")
          setValid(false)
          return
        } 
        KullaniciOlustur(email, password)
      }
      const dbh =firebase.firestore();
    const KullaniciOlustur = async () =>{
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(({user})=>{
              dbh.collection("users").doc(user.uid).set({});
            });
            Alert.alert("Success ✅", "Kayıt başarılı")
          } catch (e) {
            console.error(e.message)
          }
        }
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>ToDoApp</Text>
        <View style={styles.inputView} >
          <TextInput  
           keyboardType="email-address"
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            onChangeText={setEmail}
            />
        </View>
        <View style={styles.inputView} >
          <TextInput  
            keyboardType="numeric"
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={setPassword}
            />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={Giris}>
            
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={UyeOl}>
          <Text style={styles.loginText}>SignUp</Text>
        </TouchableOpacity>  
      </View>
    );
  }
export default loginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:70,
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white",
    fontSize:16
  }
});