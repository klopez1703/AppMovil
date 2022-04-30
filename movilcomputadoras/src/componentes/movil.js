import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, ActivityIndicator, TextInput, Button, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';

export default function inicio({ navigation }) {

  
  const [usuario, setUsuario]= useState(null);
  const [contrasena, setContrasena]= useState(null);
  const [cargardo, setCargando]= useState(false);
  const [focusNombre, setFocusNombre]= useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const presIniciarSesion = async () => {
    if(!usuario || !contrasena){
      console.log("Debe Escribir los datos completos");
      Alert.alert("TechnoComp", "Debe Escribir los datos completos");
    }
    else{
      try {
        const response = await fetch('http://192.168.0.7:3101/api/autenticacion/iniciosesion', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            usuario: usuario,
            contrasena: contrasena
          })
        });
        const json = await response.json();
        console.log(json);
        if(json.data.length==0){
          console.log(json.msj);
          Alert.alert("TechnoComp", json.msj);
        }
        else{
          const cliente=JSON.stringify(json.data);
          await AsyncStorage.setItem('cliente', cliente);
          console.log(json.msj);
          navigation.push('Computadoras');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const verAlmacenamiento = async () => {
    var cliente = JSON.parse(await AsyncStorage.getItem('cliente'));
    if(!cliente){
      console.log("Usuario no autenticado");
      Alert.alert("TechnoComp", "Usuario no autenticado");
    }
    else{
      var token = cliente.token;
      console.log('Bearer ' + token)
      try {
        const response = await fetch('http://192.168.0.7:3101/api/usuarios', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          }
        });
        const json = await response.json();
        console.log(json);
        if(json.data.length==0){
          Alert.alert("TechnoComp", json.msj);
        }
        else{
          Alert.alert("TechnoComp", json.msj);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const cerrarSesion = async () =>{
    await AsyncStorage.removeItem('cliente');
    console.log("Sesion Cerrada");
    Alert.alert("TechnoComp", "Sesion Cerrada");
  };

  return (
    <ScrollView style={styles.contenedor}>
        {
            cargardo ? (
                <ActivityIndicator 
                    visible={cargardo}
                    size="large"
                    textContent={'Espere...'}
                    textStyle={styles.activiti}
                />
            ) : (
                <View style={styles.contenedorPantalla}>
                  <View style={styles.conte1}>
                    <View style={{flex: 2, flexDirecion: "row", justifyContent: "space-between", width: "100%"}}>
                    {/*<TouchableOpacity onPress={() => navigation.goBack()} style={{position: "absolute", left: 0}}>
                        <Ionicons name="chevron-back" style={{fontSize: 30, color: "white"}} />
            </TouchableOpacity>*/}
                      <Text style={{position: "absolute" , left: 140, color:"white", fontSize: 20, fontWeight: "bold"}}>
                        Login
                      </Text>
                    </View>
                  </View>

                  <ImageBackground style={{padding: 20}}>
                    <Image source={require('../../assets/logotechnocomp.png')}
                    style={{width: 180, height: 40 , tintColor: "black", marginLeft:55, marginTop: 40}} />
                  </ImageBackground>

                  <Text style={{fontSize: 15, fontWeight: "bold", marginBottom: 0, textAlign: "center" }}>Inicio de Sesión</Text>

                  <View style={styles.controles}>
                    
                    <Icon 
                      name="account-box"
                      style={styles.iconuser}
                   />
                    <TextInput
                      value={usuario}
                      onChangeText={setUsuario}
                      placeholder="User"
                      style={styles.entradas}
                      autoFocus={focusNombre}
                    >
                    </TextInput>
                    <Icon 
                      name="lock"
                      style={styles.iconuser}
                   />
                    <TextInput
                      value={contrasena}
                      onChangeText={setContrasena}
                      placeholder="Password"
                      style={styles.entradas}
                      passwordRules=""
                      secureTextEntry={!showPassword}
                    >
                    </TextInput>
                    <Icon 
                          name={showPassword ? "eye-off-outline" : "eye-outline"}
                          style={styles.icon}
                          onPress={() =>  setShowPassword(!showPassword)}
                    />

                  </View>

                  <View style={styles.contenedorBotones}>
                    <View style={styles.boton}>
                      <Button title="Iniciar Sesión" color="white"
                        onPress={presIniciarSesion}
                      ></Button>
                    </View>
                    <View style={styles.boton1}>
                      <Button title="Crear Cuenta"  color="#042996" style={{fontWeight:"bold"}}
                        onPress={() => navigation.navigate('crearusuario')}
                      ></Button>
                    </View>
                  </View> 

                </View>
            )
        }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conte1:{
    width: "115%", 
    height: 100,
    backgroundColor: "#042996", 
    paddingTop: 40, 
    paddingLeft: 20,
    paddingRight: 25, 
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    transform: [
      {translateX: -20}, {translateY: -20}
    ]
  },
  contenedor: {
    backgroundColor: '#fff',
    margin:0,
    padding: 20,
    width:"100%",
    height:"100%",
  },
  contenedorPantalla: {
    alignItems: "stretch",
    justifyContent: 'center',
    height: "100%",
    width: "100%",
  },
  nav:{
    flex: 3,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25
  },
  contproduct:{
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    width:"106%",
    height: 200, 
    backgroundColor: "gray",
    transform: [
      {translateX: -10}
    ]
  },
  text:{
    color: "white",
    fontWeight: "bold"
  },
  textcar:{
    color: "black",
    fontWeight: "bold"
  },
  btnProducto:{
    width: "100%",
    flex:1,
    alignItems: "center",
    padding: 20,
    marginLeft:10,
    marginRight:10,
    backgroundColor: "#12A8E0",
    color: "white",
    borderRadius: 15,
  },

  btnCarrito:{
    width: "100%",
    flex:1,
    alignItems: "center",
    padding: 20,
    marginTop: 10,
    backgroundColor: "#F5F5F5",
    color: "white",
    borderRadius: 15,
  },

  btnCerrar:{
    width: "100%",
    flex:1,
    alignItems: "center",
    padding: 20,
    marginLeft:10,
    marginRight:10,
    marginTop: 10,
    backgroundColor: "#CA0505",
    color: "white",
    borderRadius: 15,
  },
  sombraControles: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
 titulo:{
    position: "relative",
    right: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10
 }, 
  activiti:{
      color: "#495057",
  },
  entradas:{
    width: "90%",
    height: 50,
    borderColor: "black",
    borderStyle: "solid",
    borderBottomWidth: 2,
    marginTop: 10, 
    paddingLeft: 25,
    paddingTop: 10
  },
  controles:{
    flex:4,
    //backgroundColor: "#29291f",
    marginBottom: 10,
    paddingTop:1,
    paddingLeft:40,
    paddingRight:10,
  },
  contenedorBotones:{
    width: "100%",
    flex:1,
    marginBottom: 10,
    paddingLeft: 50,
    flexDirection: "column",
  },
  boton:{
    width: "60%",
    height: 50,
    backgroundColor: "#042996",
    borderRadius: 20,
    flex:1,
    alignItems: "stretch",
    marginLeft:40,
    justifyContent: "center",
    marginTop: 10
  },
  boton1:{
    width: "60%",
    height: 50,
    borderColor: "#042996",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 20,
    flex:1,
    alignItems: "stretch",
    marginLeft:40,
    justifyContent: "center",
    marginTop: 10
  },
  icon:{
    width: "8%",
    left: 235,
    bottom: 28,
    color:"black",
    fontSize: 20
  },
  iconuser:{
    width: "8%",
    right: 0,
    top: 50,
    color:"#ccc",
    fontSize: 20
  }
});