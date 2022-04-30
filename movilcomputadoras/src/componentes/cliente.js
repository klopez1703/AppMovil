import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Fontisto';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';



export default function guardarcliente({ navigation }) {

  useEffect(() => {
    buscarCliente();
});
const buscarCliente = async () => {
  var cliente = JSON.parse(await AsyncStorage.getItem('cliente'));
  if(!cliente){
    setUsuario(null);
  }
  else{
      console.log(cliente.cliente.nombre+" "+cliente.cliente.apellido);
      setUsuario(cliente.cliente.nombre + " " + cliente.cliente.apellido);
  }
};

  const [idcliente, setId]= useState(null);
  const [usuario, setUsuario]= useState(null);
  const [nombre, setNombre]= useState(null);
  const [apellido, setApellido]= useState(null);
  const [fechanac, setFechanac]= useState(null);
  const [genero, setGenero]= useState(null);
  const [correo, setCorreo]= useState(null);
  const [cargardo, setCargando]= useState(false);
  const [imagen, setImagen]= useState(null);
  const idusuario = null;
  const [ejecucion, setEjecucion] = useState(null);


  const presCrearCliente = async () => {
    if(!nombre || !apellido || !fechanac || !genero || !correo){
      Alert.alert("Debe Escribir los datos completos");
    }
    else{
        
        const response = await fetch('http://192.168.0.7:3101/api/usuarios/maximo', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                    'Content-Type': 'application/json'
                    }
                });

            const jason = await response.json();

      try {
        const response = await fetch('http://192.168.0.7:3101/api/clientes/guardar', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre: nombre,
            apellido: apellido,
            fechanac: fechanac,
            genero: genero,
            correo: correo,
            idusuario: jason,
          })
        });
        const json = await response.text();
        console.log(json);
        Alert.alert(json);
        navigation.navigate('movil');
        console.log("Datos almacenados")
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
                      <Text style={{position: "absolute" , left: 100, color:"white", fontSize: 20, fontWeight: "bold"}}>
                        Registrar Cliente
                      </Text>
                    </View>
                  </View>

                  <View style={styles.controles}>
                  <Icon 
                    name="account"
                    style={styles.iconuser}
                   />
                    <TextInput
                      value={nombre}
                      onChangeText={setNombre}
                      placeholder="Nombre"
                      style={styles.entradas}
                    >
                    </TextInput>
                    <Icon 
                    name="account"
                    style={styles.iconuser}
                   />
                    <TextInput
                       value={apellido}
                       onChangeText={setApellido}
                       placeholder="Apellido"
                       style={styles.entradas}
                    >
                    </TextInput>
                    <Icon1 
                         name="date"
                         style={styles.iconuser}
                    />
                    <TextInput
                       value={fechanac}
                       dateFormat={'DD/MM/YYYY'}
                       onChangeText={setFechanac}
                       placeholder="Fecha Nacimiento"
                       style={styles.entradas}
                    >
                    </TextInput>
                    <Icon1 
                       name="intersex"
                       style={styles.iconuser}
                    />
                    <TextInput
                       value={genero}
                       onChangeText={setGenero}
                       placeholder="Genero"
                       style={styles.entradas}
                    >
                    </TextInput>
                    <Icon1
                      name="email"
                      style={styles.iconuser}
                    />
                    <TextInput
                       value={correo}
                       onChangeText={setCorreo}
                       placeholder="Correo"
                       style={styles.entradas}
                    >
                    </TextInput>
                    <Icon 
                      name="account-box"
                      style={styles.iconuser}
                    />
                  </View>

                  <View style={styles.contenedorBotones}>
                    <View style={styles.boton}>
                      <Button title="Crear Cuenta" color="white" style={{fontWeight:"bold"}}
                        onPress={presCrearCliente}
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
    marginBottom: 1, 
    paddingLeft: 25,
    paddingTop: 10
  },
  controles:{
    flex:4,
    //backgroundColor: "#29291f",
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
    marginBottom: 5
  },

  iconuser:{
    width: "8%",
    right: 0,
    top: 40,
    color:"#ccc",
    fontSize: 20
  }
});