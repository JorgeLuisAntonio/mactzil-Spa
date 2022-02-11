import React from "react";
import {createStackNavigator } from "@react-navigation/stack";

import Trabajador from "../screens/Trabajador";

const Stack = createStackNavigator();

export default function TrabajadorStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="trabajador"
          component={Trabajador}
          options={{ title: "Trabajador" }}
        />
  </Stack.Navigator>
   
    );
  }