import { View, Text, TouchableOpacity, TouchableHighlight, Dimensions } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colours, Icons, Dim } from '../Constants'

export default function Button({btnText, btnPress}) {
  return (
    <TouchableOpacity style={{
        display:'flex',
        flexDirection:'row',
        backgroundColor:Colours.primary,
        alignItems:'center',
        justifyContent:'center',
        width:Dim.imgWidth/1.2,
        height:Dim.imgHeight/13,
        borderRadius:30,
    }} onPress={btnPress}>
        <Text style={{
            fontSize:16,
            fontFamily:'intertbold',
            color:'white'
        }}>
            {btnText}
        </Text>
    </TouchableOpacity>
  )
}