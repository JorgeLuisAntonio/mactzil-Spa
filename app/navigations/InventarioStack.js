import React from "react";
import {createStackNavigator } from "@react-navigation/stack";

import Inventario from "../screens/Inventario/Inventario";
import AddProducto from "../screens/Inventario/AddProducto";
import Producto from "../screens/Inventario/Producto";

const Stack = createStackNavigator();

export default function InventarioStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="inventarios"
          component={Inventario}
          options={{ title: "Inventario" }}
        />

<Stack.Screen
          name="add-producto"
          component={AddProducto}
          options={{ title: "Registrar Producto" }}
         
        />
        <Stack.Screen
        name="producto"
        options={{ title: "Producto" }}
          component={Producto}        
        />
  </Stack.Navigator>
   
    );
  }