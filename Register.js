import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native'
import React from 'react'
import { Colours } from './Constants';
import TextInp from './TextInp';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';


export default function Register() {
    const navigation = useNavigation();
    const handleLoginPress = () => {
        navigation.navigate('Login')
    };
  return (
    <View style={styles.container}>
        <View style={styles.title}>
            <Text style={{
                color:'white',
                fontFamily:'intersemibold',
                fontSize:30,
            }}>Register with your details</Text>
        </View>
        <View style={styles.body}>
            <TextInp name={'Name'} placeholder={'Your name here'} type={'default'}></TextInp>
            <TextInp name={'Email'} placeholder={'Your email here'} type={'email-address'}></TextInp>
            <TextInp name={'Password'} placeholder={'Your password here'} type={'default'}></TextInp>
            <TextInp name={'Confirm password'} placeholder={'Repeat password'} type={'default'}></TextInp>
            
        </View>
        <View style={styles.footer}>
            <View style={{
                marginTop:20,
            }}>
                <Button btnText='Register'></Button>
            </View>
            <Text style={{
                color:'white',
            }}>Already have an account? 
                <Text onPress={handleLoginPress} style={{
                    color:Colours.primary,
                }}> Log in</Text>
            </Text>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#000',
    },
    title:{
        flex:3,
        marginStart:20,
        justifyContent: 'center',
        //backgroundColor: 'gray',
    },
    body:{
        flex:5,
        alignItems:'center',
        justifyContent: 'center',
        //backgroundColor: 'gray',
    },
    footer:{
        flex:2,
        alignItems:'center',
        justifyContent: 'center',
    }
    
});