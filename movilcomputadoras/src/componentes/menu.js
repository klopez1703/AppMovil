import React from 'react';
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
            <Stack.Screen name="confirmar" component={confirmar} />
            <Stack.Screen name="Recuperar" component={Recuperar} />
            <Stack.Screen name="Cliente" component={Cliente} />
            <Stack.Screen name="checkin" component={checkin} />
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}