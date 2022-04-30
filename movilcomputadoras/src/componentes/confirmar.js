import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, FlatList, TextInput, Button, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons';


export default function VerProductos({navigation}) {

    const [cargardo, setCargando]= useState(false);

    const BorrarProducto = async (id) => {
        console.log(id);
        try {
            const response = await fetch("http://192.168.0.7:3101/api/temporal/eliminar/?id=" + parseInt(id),
            {
                method: 'DELETE',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                }
            });
            Alert.alert("Producto Eliminado");
            navigation.navigate('confirmar');
            } catch (error) {
                console.error(error);
            }

    }

    const [direccion, setDireccion]= useState(null);

    const GuardarFactura = async () => {

        const response = await fetch('http://192.168.0.7:3101/api/temporal/sumar', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json'
                    }
                });

            const json = await response.json();

        var cliente = JSON.parse(await AsyncStorage.getItem('cliente'));

        if(!direccion)
        {
            Alert.alert("Debe escribir los datos completos");
        }
        else
        {
            
            try
            {
                const response = await fetch('http://192.168.0.7:3101/api/Factura/guardar', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fecha: Date(),
                    direccion: direccion,
                    idcliente: cliente.cliente.id,
                    estadoEntrega: true,
                    subtotal: json,
                    impuesto: "15%",
                    descuento: 0
                })
                });


                try
                {
                    const response = await fetch('http://192.168.0.7:3101/api/temporal/modificar', {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    });
                    
                    navigation.navigate('Computadoras');
                }
                catch
                {
                    console.log(error);
                }


                navigation.navigate('Computadoras');
            }
            catch
            {
                console.log(error);
            }
        }
    }



    const [info,setinfo] = useState([]);
    const [ejecucion, setEjecucion] = useState(null);

    if(ejecucion==null){
        try {
            const response = fetch("http://192.168.0.7:3101/api/temporal")
            .then((response) => response.json())
            .then((json) => {
                setinfo(json);
            });
            setEjecucion(false);
        } 
        catch (error) {
            setEjecucion(false);
            console.error(error);
        }

    }
    return (
                <View style={styles.contenedorPantalla}>
                  <View style={styles.conte1}>
                    <View style={{flex: 2, flexDirecion: "row", justifyContent: "space-between", width: "100%"}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Computadoras')} style={{position: "absolute", left: 0}}>
                        <Ionicons name="chevron-back" style={{fontSize: 30, color: "white"}} />
                      </TouchableOpacity>
                      <Text style={{position: "absolute" , left: 120, color:"white", fontSize: 20, fontWeight: "bold"}}>
                        Confirmar
                      </Text>
                    </View>
                  </View>

                  <Text style={{fontSize: 15, fontWeight: "bold", top: 15, textAlign: "center" }}>Digite su dirección</Text>

                  <View style={styles.controles}>
                  <Icon1
                    name="directions"
                    style={styles.iconuser}
                   />
                    <TextInput
                      value={direccion}
                      onChangeText={setDireccion}
                      placeholder="Escriba la direccion"
                      style={styles.entradas}
                    >
                    </TextInput>
                  </View>

                  <View style={{bottom: 0}}>
                    <FlatList
                        data={info}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => {
                            return(
                                <View style={{top: 20}}>
                                    <View style={styles.listar}>
                                        <Text style={{fontSize: 12,  color:"white"}}>ID: {item.id}</Text>
                                        <Text style={{fontSize: 12,  color:"white", width: "90%"}}>DESCRIPCION:  {item.descripcion_producto}</Text>
                                        <Text style={{fontSize: 12,  color:"white"}}>PRECIO: {item.cantidad}</Text>
                                    </View>
                                <View style={styles.boton}>
                                <TouchableOpacity  onPress={() => BorrarProducto(item.id)} style={{position: "absolute", right: 0}}>
                                     <Icon name="delete" style={{fontSize: 30, color: "#042996", right: 10}} />
                                </TouchableOpacity>
                                </View>
                            </View>
                            )
                        }
                    }
                    />
                </View>

                  <View style={styles.contenedorBotones}>
                    <View style={styles.boton1}>
                      <Button title="Comprar" color="white" style={{fontWeight:"bold"}}
                        onPress={GuardarFactura}
                      ></Button>
                    </View>
                  </View> 

                </View>
            )
}
const styles = StyleSheet.create({
    conte1:{
      width: "100%", 
      height: 100,
      backgroundColor: "#042996", 
      paddingTop: 40, 
      paddingLeft: 20,
      paddingRight: 25, 
      borderBottomLeftRadius: 80,
      borderBottomRightRadius: 80,
      alignItems: "stretch",
      justifyContent: 'center',
    },
    contenedor: {
      backgroundColor: '#fff',
      margin:0,
      padding: 20,
    },
    contenedorPantalla: {
        backgroundColor: "#fff",
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
      paddingTop:1,
      paddingLeft:40,
      paddingRight:10,
      bottom: 15
    },
    contenedorBotones:{
      flex:1,
      padding: 10,
      justifyContent:"space-evenly",
      flexDirection: "row",
      marginBottom: 60
    },
    listar:
    {
      width: "90%",
      backgroundColor: "#042996", 
      marginTop: 5,
      padding: 15, 
      borderRadius: 25, 
      marginLeft: 20,  
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    boton:{
        width: "15.5%",
        height: 45,
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flex:1,
        alignItems:"stretch",
        marginLeft:10,
        marginRight:10,
        justifyContent: "center",
        bottom: 45,
        left: 290
      },
      boton1:{
        width: "40%",
        height: 45,
        backgroundColor: "#042996",
        borderRadius: 20,
        flex:1,
        alignItems:"stretch",
        marginLeft:10,
        marginRight:10,
        justifyContent: "center",
        marginBottom: 5
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