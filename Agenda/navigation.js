//la carpeta componentes tiene las pantallas
import React from "react";
//Para la nevgación
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
//Variables de pantallas
import Login from './componentes/login';
import Register from './componentes/register';

const Tab = createBottomTabNavigator();

function MyTabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name='Login' component={Login}></Tab.Screen>
            <Tab.Screen name="Registro" component={Register}></Tab.Screen>
        </Tab.Navigator>
    );
}

//Creación de controlador para navegar
export default function Navigation(){
    <NavigationContainer>
        <MyTabs />
    </NavigationContainer>
}