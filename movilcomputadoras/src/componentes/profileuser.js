import React, { useState, useEffect, Component } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, ActivityIndicator, TextInput, Button, ImageBackground, Image, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { NavigationContainer } from '@react-navigation/native';


export default function profileuser({ navigation }) {

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

  const [idcliente, setId]= useState(null);
  const [usuario, setUsuario]= useState(null);
  const [cargardo, setCargando]= useState(false);
  const [nombre, setNombre]= useState(null);
  const [apellido, setApellido]= useState(null);
  const [fechanacimiento, setFecha]= useState(null);
  const [genero, setGenero]= useState(null);
  const [email, setEmail]= useState(null);
  const [imagen, setImagen]= useState(null);
  const [ejecucion, setEjecucion] = useState(null);

  const [profileImage, setProfileImage] = useState('');
  
  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }

    if (status === 'granted') {
      var response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!response.cancelled) {
        setProfileImage(response.uri);
      }
    }
  };

  const uploadProfileImage = async () => {

      const image = new FormData();
      image.append('img',{
        uri: profileImage,
        type: 'image/jpg',
        name: 'img.jpg'
      });

      image.append('id', idcliente);

      try{

        const response = await fetch('http://192.168.0.7:3101/api/Archivos/img',
          {
            method: 'POST',
            body: image,
          }
        );
          Alert.alert("Imagen cargada");
      }
      catch(error)
      {
          console.log(error);
      }
  };

  const DatosUsuario = async () => {
    var cliente = JSON.parse(await AsyncStorage.getItem('cliente'));
    setId(cliente.cliente.id);
    setUsuario(cliente.cliente.nombre + " "+ cliente.cliente.apellido);
    setNombre(cliente.cliente.nombre);
    setApellido(cliente.cliente.apellido);
    setFecha(cliente.cliente.fechanac);
    setGenero(cliente.cliente.genero);
    setEmail(cliente.cliente.correo);
    setImagen(cliente.cliente.imagen);
    //console.log(cliente.cliente.apellido);
  }

  if(ejecucion==null){
    DatosUsuario();
  }

  const cerrarSesion = async () =>{
    var sesion = JSON.parse(await AsyncStorage.getItem('cliente'));
    if(!sesion){
      Alert.alert("Sesion No Ingresada");
      setUsuario(null);
    }
    else
    {
      await AsyncStorage.removeItem('cliente');
      const response = await fetch("http://192.168.0.7:3101/api/temporal/borrarnull",
      {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
      });
      console.log("Sesion Cerrada");
      buscarCliente();
      Alert.alert("Sesion Cerrada");
      navigation.navigate('movil');
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
                        Perfil de Usuario
                      </Text>
                    </View>

                    
                    <View>
        <TouchableOpacity
          onPress={openImageLibrary}
          style={{bottom: 50}}
        >
          {profileImage ? (
            <ImageBackground style={{padding: 20}}
              source={{ uri: profileImage }}
              style={{height:100, width:100}}
              imageStyle={{borderRadius: 15}}
            />
            
          ) : (
           <View style={{width: "30%", height: 100, borderRadius: 15 }}>
                <ImageBackground style={{padding: 20}}
                            source={{uri:"http://192.168.0.7:3101/usuario/img/"+ imagen}}
                                style={{height:100, width:100, padding: 25}}
                                imageStyle={{borderRadius: 15}}
                        >
                  <View style={{backgroundColor: "white", borderRadius: 20, width: "80%", height: "80%", left: 52, top: 40}}>
                  <Icon name="camera" size={25} color="black" style={{
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                height: 50,
                                padding: 7.5
                            }}>

                            </Icon>
                  </View>
                </ImageBackground>
           </View>
          )}
        </TouchableOpacity>
        
      </View>                                    
                    <Text style={{color:"white", fontWeight: "bold", fontSize: 25, bottom: 30}}>
                        {usuario}
                    </Text>
                  </View>

                        <View style={styles.contdatos}>
                            <Text style={{fontSize: 15, fontWeight: "bold",color:"#B1B1B3"}}>Nombre</Text>
                            <Text style={{fontSize: 15, fontWeight: "bold"}}>{nombre}</Text>
                        </View>

                        <View style={styles.contdatos}>
                            <Text style={{fontSize: 15, fontWeight: "bold",color:"#B1B1B3"}}>Apellido</Text>
                            <Text style={{fontSize: 15, fontWeight: "bold"}}>{apellido}</Text>
                        </View>

                        <View style={styles.contdatos}>
                            <Text style={{fontSize: 15, fontWeight: "bold",color:"#B1B1B3"}}>Fecha Nacimiento</Text>
                            <Text style={{fontSize: 15, fontWeight: "bold"}}>{fechanacimiento}</Text>
                        </View>

                        <View style={styles.contdatos}>
                            <Text style={{fontSize: 15, fontWeight: "bold",color:"#B1B1B3"}}>Genero</Text>
                            <Text style={{fontSize: 15, fontWeight: "bold"}}>{genero}</Text>
                        </View>

                        <View style={styles.contdatos}>
                            <Text style={{fontSize: 15, fontWeight: "bold",color:"#B1B1B3"}}>Correo</Text>
                            <Text style={{fontSize: 15, fontWeight: "bold"}}>{email}</Text>
                        </View>

                      {profileImage ? (
          <Button
            title = "Upload"
            onPress={uploadProfileImage}
            style={[
              { backgroundColor: 'green', color: 'white', borderRadius: 8 },
            ]}
          >
          </Button>
        ) : null}

                  <View style={styles.contenedorBotones}>
                    <View style={styles.boton}>
                      <Button title="Logout" color="white" style={{fontWeight:"bold"}}
                        onPress={cerrarSesion}
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
  },
  contdatos:{
    flexDirection: "row", 
    justifyContent: "space-between", 
    width: "90%", 
    left: 10, 
    borderBottomColor: "#B1B1B3", 
    borderBottomWidth: 3, 
    paddingBottom: 5,
    borderRadius: 2,
    marginTop: 15
  }
});