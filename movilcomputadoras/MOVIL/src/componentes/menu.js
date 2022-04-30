import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import { StyleSheet, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';

import carga from './SplashScreen';
import Inicio from './inicio';
import Productos from './listar';
import Login from './movil';
import crearusuario from './create';
import checkin from './checkin';
import confirmar from './confirmar';
import Cliente from './cliente';
import Recuperar from './recuperar';
import Profile from './profileuser';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/*const Drawer = createDrawerNavigator();


const AuthStack = () => {
  return(
  <NavigationContainer>
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} 
    screenOptions={{
      headerShown: false,
      headerTintColor: '#000',
      drawerActiveBackgroundColor: "#042996",
      drawerActiveTintColor: "#fff",
      drawerInactiveTintColor: "#333",
      drawerLabelStyle: {
        marginLeft: -25, 
        fontSize: 15,
        fontWeight: "bold"
        },
      }}>
      <Drawer.Screen name="Inicio" component={Inicio} 
      options={{
        drawerIcon: ({size, color}) => (
          <Ionicons 
          name="home-outline" size={size} color={color}
          />
        )
      }}/>
      <Drawer.Screen name="Productos" component={Productos}
       options={{
        drawerIcon: ({size, color}) => (
          <Ionicons 
          name="pricetags" size={size} color={color}
          />
        )
      }}
      />
      <Drawer.Screen name="Login" component={Login}
       options={{
        drawerIcon: ({size, color}) => (
          <Icon 
          name="account-circle" size={size} color={color}
          />
        )
      }}
      />
      <Drawer.Screen name="Carrito" component={Carrito}
      options={{
        drawerIcon: ({size, color}) => (
          <Icon 
          name="add-shopping-cart" size={size} color={color}
          />
        )
      }}
      />
    </Drawer.Navigator>
    
  </NavigationContainer>
  
  );
};

export default AuthStack;*/
const Stack = createNativeStackNavigator();
export default function menu() {
    
  return (
    <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
            <Stack.Screen name="Splash" component={carga}/>
            <Stack.Screen name="movil" component={Login} />
            <Stack.Screen name="Computadoras" component={Inicio}/>
            <Stack.Screen name="crearusuario" component={crearusuario} />
            <Stack.Screen name="listar" component={Productos} />
            <Stack.Screen name="checkin" component={checkin} />
            <Stack.Screen name="confirmar" component={confirmar} />
            <Stack.Screen name="Cliente" component={Cliente} />
            <Stack.Screen name="Recuperar" component={Recuperar} />
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}