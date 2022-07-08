import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from "../colors";
import * as firebase from 'firebase';

export default ({navigation})=>{
    const cikis =()=>{
        firebase.auth()
        .signOut()
        .then(() => navigation.replace("loginScreen"))
        .catch((error) => {
          console.log(error);
        });
    }
   return(
    <View style={styles.container}>
    <TouchableOpacity style={styles.saveButton} onPress={cikis}>
        <Text style ={{color:"white", fontSize:24, fontWeight:"bold"}}>Log Out</Text>
    </TouchableOpacity>
    </View>
);}

const styles = StyleSheet.create({
container:{
    flex : 1,
    backgroundColor:"#fff",
    padding:5,
    justifyContent:"space-between",
},
saveButton:{
    borderRadius:25,
    backgroundColor: colors.darkGray,
    height:48,
    margin:16,
    justifyContent:"center",
    alignItems:"center",
},
});


