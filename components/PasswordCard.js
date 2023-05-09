import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colours, Dim } from '../Constants'
import { useState } from 'react';

export default function PasswordCard({object}) {
  const [Color, setColor] = useState('#666666')
  const [fontSize,setfontSize] = useState(12)
  const [fontChange, setfontChange] = useState('intertmedium')
  const [Password,setPassword] = useState(object.username)
  const [showPassword, setshowPassword] = useState(false)
  const [button, setButton] = useState('Show')
  const handleShowPassword = () => {
    if(showPassword == true){
      setButton('Hide')
      setshowPassword(false)
      setPassword(object.password)
      setfontChange('fragmono')
      setColor('white')
      setfontSize(15)
    }else{
      setButton('Show')
      setshowPassword(true)
      setPassword(object.username)
      setfontChange('intertmedium')
      setColor('#666666')
      setfontSize(12)
    }
  };
  return (
    <View style={{
      display:'flex',
      flexDirection:'row',
      marginBottom:10,
      borderRadius:20,
      backgroundColor:'#0a0a0a',
      width:Dim.imgWidth/1.1,
      height:Dim.imgHeight/12,
      justifyContent:'space-between'
      
    }}>
      <View style={{
        width:Dim.imgWidth,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
      }}>
        <View>
          <Text style={{
            color:'white',
            fontFamily:'intertbold',
            fontSize:13,
            marginLeft:20,

          }}>{object.domain}</Text>

          <TextInput readOnly={true} selectTextOnFocus={true} style={{
            marginLeft:20,
            fontSize:fontSize,
            color: Color,
            alignItems:'center',
            justifyContent:'center',
            fontFamily: fontChange
          }}>{Password}</TextInput>
        </View>
        <TouchableOpacity onPress={handleShowPassword} style={{
          backgroundColor:Colours.dark_gray,
          width:Dim.imgWidth/5,
          height:Dim.imgHeight/12,
          borderRadius:20,
          marginRight:30,
          justifyContent:'center',
          alignItems:'center',
        }}>
          <Text style={{
            color:'white',
            fontFamily:'intertmedium',
          }}>{button}</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}