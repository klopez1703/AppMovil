import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, ActivityIndicator, TextInput, Button, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';


export default function crearusuario({ navigation }) {


  const [usuario, setUsuario]= useState(null);
  const [contrasena, setContrasena]= useState(null);
  const [tipo, setTipo]= useState("cliente");
  const [estado, setEstado]= useState(1);
  const [cargardo, setCargando]= useState(false);
  const [focusNombre, setFocusNombre]= useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const presCrearUsuario = async () => {
    if(!usuario || !contrasena){
      console.log("Debe Escribir los datos completos");
      Alert.alert("CompuTechn", "Debe Escribir los datos completos");
    }
    else{
      try {
        const response = await fetch('http://192.168.0.7:3101/api/usuarios/guardar', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            usuario: usuario,
            contrasena: contrasena,
            tipo : tipo,
            estado : estado,
          })
        });
        console.log("Datos almacenados")
        Alert.alert("CompuTechn", "Usuario Registrado");
        navigation.navigate('Cliente');
    } catch (error) {
        console.error(error);
    }
    }
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
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{position: "absolute", left: 0}}>
                        <Ionicons name="chevron-back" style={{fontSize: 30, color: "white"}} />
                      </TouchableOpacity>
                      <Text style={{position: "absolute" , left: 120, color:"white", fontSize: 20, fontWeight: "bold"}}>
                        Registrar
                      </Text>
                    </View>
                  </View>

                  <ImageBackground style={{padding: 20}}>
                    <Image source={require('../../assets/logotechnocomp.png')}
                    style={{width: 180, height: 40 , tintColor: "black", marginLeft:55, marginTop: 40}} />
                  </ImageBackground>

                  <Text style={{fontSize: 15, fontWeight: "bold", marginBottom: 0, textAlign: "center" }}>Registrar Usuario</Text>

                  <View style={styles.controles}>
                  <Icon 
                    name="account-box"
                    style={styles.iconuser}
                   />
                    <TextInput
                      value={usuario}
                      mode="outlined"
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
                      <Button title="Siguiente" color="white" style={{fontWeight:"bold"}}
                        onPress={presCrearUsuario}
                      ></Button>
                    </View>
                    <View style={styles.boton}>
                      <Button title="Cancelar"  color="white" style={{fontWeight:"bold"}}
                        onPress={() => navigation.goBack()}
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
    flex:1,
    padding: 10,
    justifyContent:"space-evenly",
    flexDirection: "row",
  },
  boton:{
    width: "40%",
    height: 45,
    backgroundColor: "#042996",
    borderRadius: 20,
    flex:1,
    alignItems:"stretch",
    marginLeft:10,
    marginRight:10,
    justifyContent: "center",
    marginTop: 15
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