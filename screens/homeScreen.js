import React , {useLayoutEffect,useState,useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import colors from "../colors";
import {Ionicons} from "@expo/vector-icons";
import firebase from"firebase";
import 'firebase/firestore';
import {onSnapshot,addDoc,removeDoc,updateDoc} from "../services/collections";
import {firestore,auth} from "firebase";


const ListButton= ({title,color,onDelete,onPress,onOptions}) =>{
  return(
  <TouchableOpacity 
      style={[styles.itemContainer,{backgroundColor:color}]}onPress={onPress}>
     <View>
        <Text style={styles.itemTitle}>
          {title}
        </Text>
     </View>
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={onOptions} >
          <Ionicons name="options-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
  </TouchableOpacity>
  );
}
const renderAddListIcon=(navigation,addItemtoLists)=>{
  return(
    <View style={{flexDirection:"row"}}>
      <TouchableOpacity style={{justifyContent:"center",marginRight:4,marginBottom:-3}}
      onPress={()=> navigation.navigate("Settings")}>
        <Ionicons name="settings" size={19}  />
      </TouchableOpacity>
     <TouchableOpacity onPress={()=> navigation.navigate
      ("EditList",{saveChanges:addItemtoLists})}>
       <Text style={styles.icon}>+</Text>
     </TouchableOpacity>
    </View>
  );
}

function homeScreen({navigation}){
  const [lists,setLists]=useState([])
  
  const listsRef =firestore().collection("users")
  .doc(auth().currentUser.uid).collection("lists");
  useEffect(() => {
    onSnapshot(listsRef,(newLists)=>{
      setLists(newLists);
    },{
      sort:(a,b)=>{
         if(a.index < b.index){
           return -1;
         }
         if(a.index > b.index){
           return 1;
         }
         return 0;
      }
    })
   }, [])
 

  const addItemtoLists = ({title,color}) => {
    const index = lists.length > 1 ? lists[lists.length-1].index + 1 :0 ;
    addDoc(listsRef,{title,color,index});
  }

  const removeItemFromLists = (id) => {
      removeDoc(listsRef,id);

  }

  const updateItemFromList=(id ,item)=>{
    updateDoc(listsRef, id ,item);
  }

  useLayoutEffect(()=>{
     navigation.setOptions({
       headerRight:()=>renderAddListIcon(navigation,addItemtoLists)
     })
  });

  return (
    <View style={styles.container}>
     <FlatList
     data={lists}
     keyExtractor={item=>item.title}
        renderItem={({item: {title,color,id,index}})=>{
          return(
            <ListButton 
            title={title} 
            color={color} 
            navigation={navigation}
            onPress={()=>{navigation.navigate("todolist",{title,color,listId:id,})}}
            onOptions={()=>{navigation.navigate("EditList",
            {title,color,
            saveChanges:(newItem)=>updateItemFromList(id,{index,...newItem})})}}
            onDelete={()=> removeItemFromLists(id)}
            />
          );
        }}
        
     />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemTitle:{fontSize: 24 , padding: 5, color:"white"},
  itemContainer:{
    flexDirection :"row",
    justifyContent:"space-between",
    alignItems:"center",
    height:100,
    flex:1,
    borderRadius:20,
    marginHorizontal:20,
    marginVertical:10,
    padding:15,
  },
  icon:{
    padding:5,
    fontSize:31,
    justifyContent:"center",
    marginRight:4
  },
  centeredView:{
    justifyContent:"center",
    alignItems:"center",
    marginTop:50,
  },
  modelView:{
    backgroundColor:"white",
    borderRadius:20,
    padding:35,
    alignItems:"center",
    shadowColor:"#000",
    shadowOffset:{
      width:0,
      height:2,
    },
    shadowOpacity:0.25,
    shadowRadius:3.84,
    elevation:5,
  },
});

export default homeScreen;