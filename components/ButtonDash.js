import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colours, Dim } from '../Constants'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function ButtonDash({upperText, lowerText,  }) {
  return (
    <TouchableOpacity style={{
      display:'flex',
      width:Dim.imgWidth,
      height:Dim.imgHeight/4,
      justifyContent:'center',
      alignItems:'center'
    }}>
      <View style={{
        display:'flex',
        width:Dim.imgWidth/1.1,
        height:Dim.imgHeight/5,
        backgroundColor: '#0a0a0a',
        borderRadius:25,
        flexDirection:'row',
        alignItems:'flex-start'
      }}>
        <View style={{
          flex:1,
          width:Dim.imgWidth/1.1,
          height:Dim.imgHeight/5,
          backgroundColor:Colours.dark_gray,
          borderRadius:25,
        }}>
        </View>
        <View style={{
          width:Dim.imgWidth/1.1,
          height:Dim.imgHeight/5,
          flex:1,
          backgroundColor:'#0a0a0a',
          justifyContent:'center',
          marginLeft:20,
          borderRadius:25,

        }}>
          <Text style={{
            color:'white',
            fontFamily:'intertbold',
            fontSize:20,
          }}>{upperText}</Text>
          <Text style={{
            color:'#666666',
            fontFamily:'intertregular',
            fontSize:15
          }}>{lowerText}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}