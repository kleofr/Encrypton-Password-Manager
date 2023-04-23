import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import TextInp from './components/TextInp';
import Button from './components/Button';
import { Colours, Dim } from './Constants';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Sign() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const navigation = useNavigation();
    const handleLoginPress = () => {
        navigation.replace('Dashboard')
        // if (!(username == '' || password == '')) {
        //     if(username == '2kleo' && password == 'Himanish123'){
        //         AsyncStorage.setItem('username',username)
        //         navigation.replace('Dashboard')
        //     }
        //     else{
        //         alert('Invalid Credentials')
        //     }
            
        // }else{
        //     alert('Both fields are required')
        // }
        // navigation.navigate('Dashboard');
    };
    const handleUsernameInputChange = (username) => {
        setUsername(username)
    };
    const handlePasswordInputChange = (password) => {
        setPassword(password)
    };
    const handleBackPress = () => {
        navigation.navigate('Home');
    };
    const handleRegisterPress = () => {
        navigation.navigate('Register')
    };
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View
          style={{
            //backgroundColor:'#282828',
            marginStart: 20,
            marginBottom: 50,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              fontFamily: "intersemibold",
              color: "white",
              fontSize: 30,
            }}
          >
            Log into your account
          </Text>
        </View>
        <View style={styles.inpcontainer}>
          <TextInp
            value={username}
            name={"Username"}
            placeholder={"Your username here"}
            oCText={handleUsernameInputChange}
          ></TextInp>
          <TextInp
            value={password}
            name={"Password"}
            placeholder={"Your password here"}
            oCText={handlePasswordInputChange}
            pass={true}
          ></TextInp>
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></View>
      </View>
      <View style={styles.footer}>
        <View style={{}}>
          <Button btnText={"Log in"} btnPress={handleLoginPress}></Button>
        </View>
        <Text
          style={{
            fontFamily: "interlight",
            display: "flex",
            color: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Don't have an account?
          <Text
            onPress={handleRegisterPress}
            style={{
              color: Colours.primary,
            }}
          >
            {" "}
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'black',
    },
    body:{
        //backgroundColor: '#d0d0d0',
        flex:8,
        justifyContent:'center'

    },
    header:{
        flex:1,
        //backgroundColor: '#383838',
        width:Dim.imgWidth,
        display:'flex',
        alignItems:'flex-start',
        justifyContent:'center'
    },
    inpcontainer:{
        //backgroundColor: '#d0d0d0',
        alignItems:'center',
        marginBottom:25

    },
    footer:{
        flex: 2,
        //backgroundColor:'#d0d0d0',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});