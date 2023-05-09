
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, ScrollView } from 'react-native';
import { Colours, Icons, Logo, splashImg, Dim } from './Constants';
import Button from './components/Button';
import React from 'react'
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
    const { width, height } = Dimensions.get('window');
    const imageWidth = width;
    const imageHeight = height;
    const navigation = useNavigation();
    const [Dots,setDots] = useState([1,1,1])
    const [currentIndex, setCurrentIndex] = useState(0);

    const  handleLoginPress = () => {
        navigation.navigate('Login');
    }
    const handleSignInPress = () => {
        navigation.navigate('Register');
    }
    const [index, setIndex] = useState(0);
  return (
    // Main Container
    <View style={styles.container}>
    <View style={styles.header}>
        <Image source={Logo.logo} style={{
            //backgroundColor:'gray',
            width:imageWidth*0.6,
            height:imageWidth*0.1,
            resizeMode:'contain',  
        }}></Image>
    </View>
    {/* Curve Background */}
    {/* <View style={styles.header}>
        <Image source={Logo.bgwithsvg} style={{
            width:Dimensions.get('screen').width,
            height:Dimensions.get('screen').height/1.8,
            //backgroundColor:'white',
            resizeMode:'cover'
        }}/>
    </View> */}
    

    {/* Custom Text */}
    <View style={styles.main}>
        <View>
            <ScrollView horizontal pagingEnabled scrollIndicatorInsets={false} onScroll={
                e => {
                const x = e.nativeEvent.contentOffset.x;
                setCurrentIndex((x / width).toFixed(0));
            }}>
                {splashImg.map((img)=>(
                    <Image key={img.key} source={img.img} style={{width:Dim.imgWidth, height:Dim.imgHeight/2, resizeMode:'center'}}></Image>
                ))}
            </ScrollView>
        </View>
        <View
        style={{
          flexDirection: 'row',
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {Dots.map((item, index) => {
          return (
            <View key={index}
              style={{
                marginTop:30,
                width: currentIndex == index ? 40 : 8,
                height: currentIndex == index ? 8 : 8,
                borderRadius: currentIndex == index ? 5 : 4,
                backgroundColor: currentIndex == index ? Colours.primary : 'gray',
                marginLeft: 5,
              }}></View>
          );
        })}
      </View>

        <View style={styles.group_bg}>
            
            {/* <Image source={Logo.bgtext} style={{
                // marginLeft:15,
                marginTop:10,
                resizeMode:'center',
                //backgroundColor:Colours.dark_gray,
                width:imageWidth*0.7,
                height:imageHeight*0.1
            }}/> */}
        </View>
    </View>

    {/* Buttons */}
    <View style={styles.body}>
        <View style={{
            width:Dim.imgWidth,
            height:Dim.imgHeight/8,
            alignItems:'center',
            //backgroundColor:'gray',
            justifyContent:'space-between',
        }}>
            <Button btnText={'Get Started'} btnPress={handleLoginPress}/>
            <Text style={{
                color:'white',
                fontFamily:'intertregular'
                
            }}>Don't have an account? 
                <Text style={{
                    color:Colours.primary,
                    fontFamily:'intertbold'
                }}> Register</Text>
            </Text>
        </View>
    </View>
      <StatusBar style="auto" />
    </View>
  )
}

// Stylesheets
const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    header:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        //backgroundColor:'gray'
    },
    main:{
        flex:3,
        //backgroundColor:'gray' ,
    },  
    body:{
        display:'flex',
        flexDirection:'row',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        backgroundColor:'#1C1C1C',
        flex:1,
        alignItems: 'center',
    },
    group_bg:{
        alignItems:'flex-start',
        justifyContent: 'space-between',
        margin:20,
        //backgroundColor: 'red',
        marginTop:120
    },
});