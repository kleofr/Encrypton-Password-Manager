import { View, Text, Modal } from 'react-native'
import React from 'react'
import { Dim } from '../Constants'
import TextInp from './TextInp'

export default function PasswordPopup({Visiblity}) {
  return (
    <View>
      <Modal visible={Visiblity} style={{
        flex:1,
        backgroundColor:'#0a0a0a',
        width:Dim.imgWidth,
        height:Dim.imgHeight,
        margin:20,
      }}>
        <View>
          <TextInp placeholder={'Domain'}></TextInp>
          <TextInp placeholder={'Username'}></TextInp>
          <TextInp placeholder={'Password'}></TextInp>
        </View>
      </Modal>
    </View>
  )
}