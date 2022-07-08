import React , {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import colors from "../colors";
import { CommonActions } from '@react-navigation/routers';
import ColorSelector from '../components/ColorSelector';
const colorList=[
    "blue",
    "teal",
    "green",
    "olive",
    "yellow",
    "orange",
    "red",
    "pink",
    "purple",
    "blueGray",
];


export default ({navigation,route})=>{
 const[title , setTitle] =useState(route.params.title || "") ;
 const[color , setColor] =useState(route.params.color || colors.blue) ;
 const[isValid, setValidity] = useState(true);

   return(
<View style={styles.container}>
    <View>
      <View style={{flexDirection:"row"}}>
        <Text style={styles.label}>List Name</Text>
        {!isValid&&<Text style={{marginLeft:4,color:colors.red , fontSize:13}}>
            *List Name connot be empty
        </Text>}
        </View>
        <TextInput
          underlineColorAndroid={"transparent"}
          selectionColor={"transparent"}
          autoFocus={true}
          value={title}
          onChangeText={(text)=>{
           setTitle(text);
           setValidity(true);
          }}
          placeholder={"New List Name"}
          maxLength={30}
          style={[styles.input /*,{outline:"none"}*/]}
        />
        <Text style={styles.label}>Choose Color</Text>
        <ColorSelector
        onSelect={(color)=>{
            setColor(color);
            navigation.dispatch
            (CommonActions.setParams({color}))
        }}
        selectedColor={color}
        colorOptions={colorList}
        />
    </View>
    <TouchableOpacity style={styles.saveButton} onPress={()=>{
        if(title.length >0){
            route.params.saveChanges({title,color});
            navigation.dispatch(CommonActions.goBack());
        }else{
            setValidity(false);
        }
    }}>
        <Text style ={{color:"white", fontSize:24, fontWeight:"bold"}}>Save</Text>

    </TouchableOpacity>
</View>

);
}

const styles = StyleSheet.create({
container:{
    flex : 1,
    backgroundColor:"#fff",
    padding:5,
    justifyContent:"space-between",
},
input:{
    color:colors.darkGray,
    borderBottomColor:colors.lightGray,
    borderBottomWidth:0.5,
    marginHorizontal:5,
    padding:3,
    height:30,
    fontSize:24,
},
saveButton:{
    borderRadius:25,
    backgroundColor: colors.darkGray,
    height:48,
    margin:16,
    justifyContent:"center",
    alignItems:"center",
},
label:{
    color:colors.black,
    fontWeight:"bold",
    fontSize:16,
    marginBottom:8,   
}
});


