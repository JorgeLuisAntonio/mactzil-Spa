import React,{useState} from "react";
import{Text,View,StyleSheet} from "react-native";
import {Input,Button} from "react-native-elements"


export default function ChangePrecioVentaForm(props) {
    const{displayPrecioV}=props;

  
    return (
        <View style={styles.view}>
                <Input
                 defaultValue={displayPrecioV}
                 editable = {false}
                 keyboardType = 'numeric'
        placeholder="Precio Venta"
       containerStyle={styles.input}
        rightIcon={{
            type:"material-community",
            name:"currency-usd",
            color:"#c2c2c2"

        }}
       
     
        />   
    
        </View>
    );
  }
  const styles = StyleSheet.create({
    view: {
      alignItems: "center",
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: "#ffffff",
      borderRadius:23,
    },
    input: {
     // marginBottom: 10,
    },
    btnContainer: {
      marginTop: 20,
      width: "95%",
    },
    btn: {
        marginHorizontal:20,
      backgroundColor: "#0060C1",
    },
  });
  

  