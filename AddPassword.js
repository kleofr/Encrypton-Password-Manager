import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import TextInp from './components/TextInp'
import Button from './components/Button'

export default function AddPassword() {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{
            marginLeft:40,
            color:'white',
            fontFamily:'intertbold',
            fontSize:30,
        }}>Add a new Password.</Text>
      </View>
      <View style={styles.body}>
        <TextInp name={'Domain'} icon={'globe'} placeholder={'your domain here'}/>
        <TextInp name={'Username'} icon={'user'} placeholder={'your username here'}/>
        <TextInp name={'Password'} icon={'lock'} placeholder={'your password here'} pass={true}/>
      </View>
      <View style={styles.footer}>
        <Button></Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black',
    },
    title:{
        flex:2,
        justifyContent:'center',
    },
    body:{
        flex:4,
        justifyContent:'center',
        alignItems:'center'
    },
    footer:{
        flex:1,
        backgroundColor:'#1c1c1c',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        justifyContent:'center',
        alignItems:'center'
    },
})