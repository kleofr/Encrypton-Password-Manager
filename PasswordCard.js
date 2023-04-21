import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Colours, Dim } from './Constants'
import { useState } from 'react';

export default function PasswordCard({domain,password,name}) {
  const [showPassword, setshowPassword] = useState(true)
  const [button, setButton] = useState('Show')
  const handleShowPassword = () => {
    if(showPassword == true){
      setButton('Hide')
      setshowPassword(false)
    }else{
      setButton('Show')
      setshowPassword(true)
    }
  };
  return (
    <View style={{
      display:'flex',
      flexDirection:'row',
      marginBottom:10,
      borderRadius:10,
      backgroundColor:'#0a0a0a',
      width:Dim.imgWidth/1.13,
      height:Dim.imgHeight/8,
      justifyContent:'space-between'
      
    }}>
      <View style={{
        width:Dim.imgWidth/1.13,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
      }}>
        <View>
          <Text style={{
            color:'#666666',
            fontFamily:'interlight',
            fontSize:10,
            marginLeft:20,
            marginBottom:10

          }}>{domain}</Text>
          <Text style={{
            color:'white',
            fontFamily:'interlight',
            fontSize:15,
            marginLeft:20
          }}>{name}</Text>
          <TextInput readOnly={true} secureTextEntry={showPassword} style={{
            marginLeft:20,
            fontSize:17,
            color:'white',
          }}>{password}</TextInput>
        </View>
        <Text onPress={handleShowPassword} style={{
          color:Colours.primary,
          fontFamily:'interregular',
          marginRight:20
        }}>{button}</Text>
      </View>
    </View>
  )
}