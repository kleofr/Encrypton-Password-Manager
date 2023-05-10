import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native'
import React from 'react'
import { Colours } from './Constants';
import TextInp from './components/TextInp';
import Button from './components/Button';
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
                fontFamily:'intertbold',
                fontSize:30,
            }}>Register with your details.</Text>
        </View>
        <View style={styles.body}>
            <TextInp icon={'user'} name={'Name'} placeholder={'Your name here'} type={'default'}></TextInp>
            <TextInp icon={'inbox'} name={'Email'} placeholder={'Your email here'} type={'email-address'}></TextInp>
            <TextInp icon={'lock'} name={'Password'} placeholder={'Your password here'} type={'default'} pass={true}></TextInp>
            <TextInp icon={'lock'} name={'Confirm password'} placeholder={'Repeat password'} type={'default'} pass={true}></TextInp>
            
        </View>
        <View style={styles.footer}>
            <View style={{
                //marginTop:20,
            }}>
                <Button btnText='Register'></Button>
            </View>
            <Text style={{
                color:'white',
                marginTop:10,
                fontFamily:'intertmedium'
            }}>Already have an account? 
                <Text onPress={handleLoginPress} style={{
                    color:Colours.primary,
                    fontFamily:'intertbold'
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
        flex:6,
        alignItems:'center',
        justifyContent: 'center',
        //backgroundColor: 'gray',
    },
    footer:{
        flex:2,
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        backgroundColor:'#1C1C1C',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
    
});