import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import TextInp from './components/TextInp';
import Button from './components/Button';
import { Colours, Dim } from './Constants';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { client } from './Client';

const API_URL = 'http://192.168.1.6:3000';

export default function Sign() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [name, setname] = useState('')
    const navigation = useNavigation();
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLoginPress = async () => {
      navigation.navigate('Dashboard')
      // axios.post(`${API_URL}/login`, { username, password })
      // .then((res) => {
      //   setLoggedIn(res.data);
      //   if(loggedIn){
      //     console.log('logged in successfully')
      //   }
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    };
    const handleNameInputChange = (name) => {
        setname(name)
    }
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
              fontFamily: "intertbold",
              color: "white",
              fontSize: 30,
            }}
          >
            Log into your account.
          </Text>
        </View>
        <View style={styles.inpcontainer}>
          <TextInp 
            icon={'user'}
            value={username}
            name={"Name"}
            placeholder={"Your name here"}
            oCText={handleNameInputChange}
          ></TextInp>
          <TextInp 
            icon={'at'}
            value={username}
            name={"Username"}
            placeholder={"Your username here"}
            oCText={handleUsernameInputChange}
          ></TextInp>
          <TextInp
            icon={'lock'}
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
        <View style={{
          width:Dim.imgWidth,
          height:Dim.imgHeight/8,
          alignItems:'center',
          justifyContent:'space-between'
        }}>
          <Button btnText={"Log in"} btnPress={handleLoginPress}></Button>
          <Text
          style={{
            fontFamily: "intertmedium",
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
              fontFamily:'intertbold',
              color: Colours.primary,
            }}
          >
            {" "}
            Sign up
          </Text>
        </Text>
        </View>
        
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
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        backgroundColor:'#1C1C1C',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});