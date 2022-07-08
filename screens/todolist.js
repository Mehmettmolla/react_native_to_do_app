import React , {useState,useLayoutEffect,useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList,Alert } from 'react-native';
import TodoItem from "../components/TodoItem";
import colors from "../colors";
import {onSnapshot,addDoc,removeDoc,updateDoc} from "../services/collections";
import {firestore,auth} from "firebase";
import 'firebase/firestore';


const renderAddListIcon=(addItemToLists,text,id)=>{
  return(
    <TouchableOpacity onPress={() => addItemToLists(id=id,text)}>
       <Text style={styles.icon}>+</Text>
    </TouchableOpacity>
  );
}
function todolist({navigation,route}){
  let [toDoItems,setToDoItems] = useState([]);
  const[newItem,setNewItem]=useState();
  const toDoItemsRef =firestore().collection("users")
  .doc(auth().currentUser.uid).collection("lists").doc(route.params.listId)
  .collection("todoItems");

  useEffect(() => {
    onSnapshot(toDoItemsRef,
      (newToDoItems)=>{
      setToDoItems(newToDoItems);
    },{
      sort:(a,b)=>{
         if(a.isChecked && !b.isChecked){
           return 1;
         }
         if(b.isChecked && !a.isChecked){
           return -1;
         }
         return 0;
      },
    });
   }, []);

  const addItemToLists = () => {
    setNewItem({text:"",isChecked:false,new:true});
  }
  
  const removeItemFromLists = (index) => {
      toDoItems.splice(index,1);
      setToDoItems([...toDoItems]);
  }

  useLayoutEffect(()=>{
     navigation.setOptions({
       headerRight:()=>renderAddListIcon(addItemToLists),
     })
  });
  if(newItem){
    toDoItems=[newItem,...toDoItems];
  }
    return(
    <View style={styles.container}>
      <Text style={{marginLeft:13,marginTop:10,fontSize:15,color:"red"}}>
      Please tick to add task!</Text>
      <FlatList
      data={toDoItems}
      renderItem={({item :{id,text, isChecked, ...params},index}) =>{
        return <TodoItem 
        {...params}
        text={text} 
        isChecked={isChecked}
        onChecked={()=>{
          let data={text,isChecked: !isChecked};
          if(id){
            data.id=id;
          }
          addDoc(toDoItemsRef,data);
        }}
        onChangeText={(newText)=>{
          if(params.new){
            setNewItem({
              text:newText,
              isChecked,
              new:params.new
            });
          }else{
            toDoItems[index].text =newText;
            setToDoItems([...toDoItems]);
          }
        }}
        onDelete={()=>{
          params.new ? setNewItem(null):removeItemFromLists(index);
          id && removeDoc(toDoItemsRef,id)
        }}
        onBlur={()=>{
          if(text.lenght > 1){
            let data = {text,isChecked}
            if(id){
              data.id=id;
            }
            addDoc(toDoItemsRef,data);
            params.new && setNewItem(null)
          }else{
            params.new ? setNewItem(null) : removeItemFromLists(index);
          } 
        }}
        />  
      }}
      keyExtractor={(item,index)=>index.toString()}
      />
    </View>
    );
}

export default todolist;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    icon:{
        padding:5,
        fontSize:32,
        color:"white",
      },
});
