import React, { useState, useEffect, Component } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, ActivityIndicator, TextInput, Button, ImageBackground, Image, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


export default function profileuser({ navigation }) {


  const [usuario, setUsuario]= useState(null);
  const [contrasena, setContrasena]= useState(null);
  const [estado, setEstado]= useState(1);
  const [cargardo, setCargando]= useState(false);
  const [focusNombre, setFocusNombre]= useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [nombre, setNombre]= useState(null);
  const [apellido, setApellido]= useState(null);
  const [fechanacimiento, setFecha]= useState(null);
  const [genero, setGenero]= useState(null);
  const [email, setEmail]= useState(null);

  const [info,setinfo] = useState([]);
  const [ejecucion, setEjecucion] = useState(null);
  
  const GuardarFactura = async () => {
    var cliente = JSON.parse(await AsyncStorage.getItem('cliente'));
    setUsuario(cliente.cliente.nombre + " "+ cliente.cliente.apellido);
    setNombre(cliente.cliente.nombre);
    setApellido(cliente.cliente.apellido);
    setFecha(cliente.cliente.fechanac);
    setGenero(cliente.cliente.genero);
    setEmail(cliente.cliente.correo);
    //console.log(cliente.cliente.apellido);
  }

  if(ejecucion==null){
    GuardarFactura();
  }



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
                      <Text style={{position: "absolute" , left: 100, color:"white", fontSize: 20, fontWeight: "bold"}}>
                        Perfil de Usuario
                      </Text>
                    </View>

                    <TouchableOpacity onPress={()=>{}} style={{bottom: 50}}>
                        <ImageBackground style={{padding: 20}}
                            source={require('../../assets/avatar.jpg')}
                                style={{height:80, width:80}}
                                imageStyle={{borderRadius: 15}}
                        >

                        <View style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Icon name="camera" size={35} color="#fff" style={{
                                opacity: 0.7,
                                alignItems: "center",
                                justifyContent: "center",
                                borderWidth: 1,
                                borderColor: "#fff",
                                borderRadius: 10,
                            }}>

                            </Icon>

                        </View>
                                
                        </ImageBackground>
                    </TouchableOpacity>
                    <Text style={{color:"white", fontWeight: "bold", fontSize: 25, bottom: 30}}>
                        {usuario}
                    </Text>
                  </View>

                        <View>
                            <Text>{nombre}</Text>
                            <Text>{apellido}</Text>
                            <Text>{fechanacimiento}</Text>
                            <Text>{genero}</Text>
                            <Text>{email}</Text>
                        </View>

                  <View style={styles.contenedorBotones}>
                    <View style={styles.boton}>
                      <Button title="Crear Cuenta" color="white" style={{fontWeight:"bold"}}
                        onPress={"#"}
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
    height: 300,
    backgroundColor: "#042996", 
    paddingTop: 40, 
    paddingLeft: 20,
    paddingRight: 25, 
    borderBottomRightRadius: 100,
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