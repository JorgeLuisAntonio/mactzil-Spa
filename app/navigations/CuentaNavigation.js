import React from "react";
// se imprta el componente
import { Icon } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
//se importa la funcion createbotton tab
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// la funcion tab va crear un componente
import InventarioStack from "./InventarioStack";
import TrabajadorStack from "./TrabajadorStack";
//import TopRestaurantsStack from "./TopRestaurantsStack";



const Tab = createBottomTabNavigator();

export default function CuentaNavigation() {
    return (
   
        <Tab.Navigator 
         initialRouteName="inventarios"
         tabBarOptions={{
           inactiveTintColor: "#646464",
           activeTintColor: "#0060C1",
         }}
        
         screenOptions={({ route }) => ({
           tabBarIcon: ({ color }) => screenOptions(route, color),
         })}
        
        >
          <Tab.Screen
            name="inventarios"
            component={InventarioStack}
            options={{ title: "Inventarios" }}
          />
          <Tab.Screen
            name="trabajadores"
            component={TrabajadorStack}
            options={{ title: "Trabajadores" }}
          />

        </Tab.Navigator>
  
    );
  } 
  
  function screenOptions(route, color) {
    let iconName;
  
    switch (route.name) {
      case "inventarios":
        iconName = "clipboard-list-outline";
        break;
      case "trabajadores":
        iconName = "badge-account-outline";
        break;
      case "top-restaurants":
        iconName = "star-outline";
        break;
      case "search":
        iconName = "magnify";
        break;
      case "account":
        iconName = "home-outline";
        break;
      default:
        break;
    }
    return (
      <Icon type="material-community" name={iconName} size={22} color={color} />
    );
  }
