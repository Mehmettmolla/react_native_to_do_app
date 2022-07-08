import React , {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import colors from "../colors";

export default ({isChecked,onChecked,...props})=>{
    return(
     <TouchableOpacity style={styles.checkbox} onPress={onChecked}>
          <Text style={{color:colors.lightGray}} >{isChecked ? "✓":""}</Text>
     </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
checkbox:{
    width:20,
    height:20,
    margin:5,
    backgroundColor:"#fff0",
    color:colors.lightGray,
    borderWidth:1,
    borderRadius:3,
    borderColor:colors.lightGray,
    alignItems:"center",
    justifyContent:"center"
},
});