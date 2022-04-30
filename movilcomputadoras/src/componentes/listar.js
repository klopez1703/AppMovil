import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Component, Item,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';


export default function VerProductos({navigation}) {

    const [info,setinfo] = useState([]);
    const [ejecucion, setEjecucion] = useState(null);
    const [cargardo, setCargando]= useState(false);

    if(ejecucion==null){
        try {
            const response = fetch("http://192.168.0.7:3101/api/productos")
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
                        Productos
                      </Text>
                    </View>
                  </View>

                  <View>
                    <FlatList
                        data={info}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => {
                            return(
                                <View style={{top: 20}}>
                                    <View style={styles.listar}>
                                        <Text style={{fontSize: 12,  color:"white"}}>ID: {item.id}</Text>
                                        <Text style={{fontSize: 12,  color:"white", width: "90%"}}>DESCRIPCION:  {item.descripcion}</Text>
                                        <Text style={{fontSize: 12,  color:"white"}}>PRECIO: {item.precio}</Text>
                                        <Text style={{fontSize: 12, color:"white"}}>EXISTENCIA: {item.existencia}</Text>
                                    </View>
                                <View style={styles.boton}>
                                <TouchableOpacity  onPress={() => {
                                navigation.navigate('checkin', { 
                                id: item.id,
                                descripcion: item.descripcion,
                                precio: item.precio,
                                        });
                                        }} style={{position: "absolute", right: 0}}>
                                     <Icon name="cart" style={{fontSize: 30, color: "#042996", right: 10}} />
                                </TouchableOpacity>
                                </View>
                            </View>
                            )
                        }
                    }
                    />
                </View>

                </View>
            )

}

const actionOnRow = (item) => {
    const value = "Selected Item : "+ item;
   console.log(value);
 };

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

    },
    contenedor: {
      backgroundColor: '#fff',
      margin:0,
      padding: 20,
      width:"100%",
      height:"100%",
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