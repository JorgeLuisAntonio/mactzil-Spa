import React from "react";
// se imprta el componente
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login"
import Registro from "../screens/Registro"
import CuentaNavigation from "./CuentaNavigation"
const Stack = createStackNavigator();

export default function Navigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
    
        <Stack.Screen
        name="login"
        component={Login}
        options={{headerShown:false }}
      />   
      <Stack.Screen
        name="registro"
        component={Registro}
        options={{ title: "Registro" ,headerStyle: {
          backgroundColor: '#ffffff',
          
        },
        headerTintColor: '#0060C1',
        
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: "auto"
        },}}
      /> 
   
   <Stack.Screen
        name="cuenta"
        component={CuentaNavigation}
       options={{headerShown:false}}
     //  options={{ title: "CuentaStack" }}
      /> 
     
      </Stack.Navigator>

      </NavigationContainer>
   

    );
  } 
  
