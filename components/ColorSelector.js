import React , {useState} from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import colors from "../colors";

const ColorButton=({onPress,isSelect,color}) =>{
    return(
        <TouchableOpacity
        onPress={onPress}
        style={[styles.colorButton ,
        {borderWidth: isSelect ? 3 : 0,backgroundColor:color}]}
        />
    );
};
export default ({selectedColor,colorOptions,onSelect})=>{
   
    return(
        <View style={styles.container}>
            {colorOptions.map((colorName)=>{
                return(
                <ColorButton 
                    onPress={()=>onSelect(colors[colorName])}
                    color={colors[colorName]}
                    isSelect={colors[colorName]==selectedColor}
                />
                );
            })}
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        flex:1,
        flexWrap:"wrap",
        justifyContent:"center",
        alignItems:"center",
    },
    colorButton:{
        height:32,
        width:32,
        borderColor:colors.lightGray,
        borderRadius:24,
        margin:10,
    }
});