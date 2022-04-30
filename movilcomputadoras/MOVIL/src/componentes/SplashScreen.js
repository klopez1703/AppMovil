import React, {Component} from 'react';
import {ScrollView, View, StatusBar, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class movil extends Component{

    goToScreen(routeName){
        this.props.navigation.navigate(routeName);
    }

    componentDidMount(){
        setTimeout( ()=>{
            this.goToScreen('movil');
        },3000,this);
    }

    render(){
        return(
            <ScrollView style={{width: "100%", heigth: 100,  backgroundColor:"#042996"}}>
            <View style={{width: "100%", height:670, flex: 3, justifyContent:"center" , alignItems: "center"}}>
                <StatusBar translucent/>
            <Animatable.Image
                animation="pulse"
                easing= "ease-in-back"
                iterationCount="infinite"

                source={require('../../assets/logotechnocomp.png')}
                style={{width:"69%", height: 50, tintColor: "white"}}
            />
            <Animatable.Text 
                animation="pulse"
                easing= "ease-in-back"
                iterationCount="infinite"

                style={{color: "white", fontWeight: "bold", fontStyle: "italic"
                        , top: 15, fontSize: 15}}>Tecnología a su alcance</Animatable.Text>
            </View>
            
        </ScrollView>
        )
    }
}