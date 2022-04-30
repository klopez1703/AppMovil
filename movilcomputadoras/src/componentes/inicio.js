import React, { useState, useEffect, Component } from 'react';
import { BackHandler, StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, ActivityIndicator, Pressable, Button, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';

export default function inicio({ navigation }) {

  const [usuario, setUsuario]= useState(null);
  const [contrasena, setContrasena]= useState(null);
  const [cargardo, setCargando]= useState(false);

  useEffect(() => {
    buscarCliente();
});

  const buscarCliente = async () => {
    var cliente = JSON.parse(await AsyncStorage.getItem('cliente'));
    if(!cliente){
      console.log("Usuario no autenticado");
      setUsuario(null);
    }
    else{
        console.log(cliente.cliente.nombre+" "+cliente.cliente.apellido);
        setUsuario(cliente.cliente.nombre + " " + cliente.cliente.apellido);
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
                      <Text style={styles.titulo}>
                        {usuario}
                      </Text>
                      <TouchableOpacity onPress={() => navigation.navigate('confirmar')} style={{position: "absolute", right: 0}}>
                        <Icon name="shopping-cart" style={{fontSize: 30, color: "white"}} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{position: "absolute", left: 0}}>
                        <Icon name="account-circle" style={{fontSize: 30, color: "white"}} />
                      </TouchableOpacity>
                    </View>
                  </View>

                <View style={{backgroundColor: "#F2F1F1", width: "100%", height: 200, borderRadius: 10}}>
                <View style={{width:"6%", height:"7%", backgroundColor:"red", borderRadius: "100%", padding: 6, top: 8, left: 8, marginBottom: 10}}></View>
                <ImageBackground style={{padding: 20}}
                       source={require('../../assets/bg.jpg')}
                      style={{height:150, width:320, padding: 25, top: 10, left:8}}
                      imageStyle={{borderRadius: 15}}
                    >
                    </ImageBackground>
                </View>

                  <Text style={{fontSize: 20, fontWeight: "bold", marginTop: 20, transform:[{translateX: -10}]}}>Popular Products</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('listar')} style={{left: 280, bottom: 20, backgroundColor: "#042996", padding: 5, borderTopLeftRadius: 10,  borderBottomLeftRadius: 10}}>
                    <Text style={{fontWeight: "bold", fontSize: 16, color:"white"}}>Ver más</Text>
                  </TouchableOpacity>

                  <View style={styles.contproduct}>
                    <View style={{width: "52%", height: "40%", backgroundColor: "white", borderRadius: 10, left: 15, top: 30}}>
                      <View style={{width:"6%", height:"12%", backgroundColor:"red", borderRadius: "100%", padding: 6, top: 8, left: 8}}></View>
                      <Text style={{fontSize: 18, fontWeight: "bold", padding: 10}}>Audífonos, mouse y Teclados</Text>
                    </View>
                    <ImageBackground style={{padding: 20}}
                       source={require('../../assets/mouseaudi.png')}
                      style={{height:130, width:130, padding: 25, right: 10, top:68, transform:[{rotate: "-15deg"}]}}
                      imageStyle={{borderRadius: 15}}
                    >

                    </ImageBackground>
                  </View>

                  <View style={styles.contproduct}>
                    <View style={{width: "52%", height: "40%", backgroundColor: "white", borderRadius: 10, left: 15, top: 30}}>
                      <View style={{width:"6%", height:"12%", backgroundColor:"red", borderRadius: "100%", padding: 6, top: 8, left: 8}}></View>
                      <Text style={{fontSize: 18, fontWeight: "bold", padding: 10, left: 10, top: 10}}>Impresoras</Text>
                    </View>
                    <ImageBackground style={{padding: 20}}
                       source={require('../../assets/impresora.png')}
                      style={{height:150, width:150, padding: 25, right: 10, top:55}}
                      imageStyle={{borderRadius: 15}}
                    >

                    </ImageBackground>
                  </View>

                  <View style={styles.contproduct}>
                    <View style={{width: "52%", height: "40%", backgroundColor: "white", borderRadius: 10, left: 15, top: 30}}>
                      <View style={{width:"6%", height:"12%", backgroundColor:"red", borderRadius: "100%", padding: 6, top: 8, left: 8}}></View>
                      <Text style={{fontSize: 18, fontWeight: "bold", padding: 10, left: 10, top: 10}}>Laptop</Text>
                    </View>
                    <ImageBackground style={{padding: 20}}
                       source={require('../../assets/laptop.png')}
                      style={{height:110, width:185, padding: 25, right: 30, top:75}}
                      imageStyle={{borderRadius: 15}}
                    >

                    </ImageBackground>
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
    flex:2,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F2F1F1",
    width:"100%",
    height: 200, 
    borderRadius: 15,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 20
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
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center"
 }, 
  activiti:{
      color: "#495057",
  }
});