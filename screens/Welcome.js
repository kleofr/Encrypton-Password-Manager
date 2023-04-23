
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions, TextInput } from 'react-native';
import { Colours, Icons, Logo } from '../Constants';
import Button from '../components/Button';
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
    const { width, height } = Dimensions.get('window');
    const imageWidth = width;
    const imageHeight = height;
    const navigation = useNavigation();

    const  handleLoginPress = () => {
        navigation.navigate('Login');
    }
    const handleSignInPress = () => {
        navigation.navigate('Register');
    }
  return (
    // Main Container
    <View style={styles.container}>

    {/* Curve Background */}
    <View style={styles.header}>
        <Image source={Logo.bgwithsvg} style={{
            width:Dimensions.get('screen').width,
            height:Dimensions.get('screen').height/1.8,
            //backgroundColor:'white',
            resizeMode:'cover'
        }}/>
    </View>

    {/* Custom Text */}
    <View style={styles.main}>
        <View style={styles.group_bg}>
            <Image source={Logo.logo} style={{
                //backgroundColor:'gray',
                width:imageWidth*0.4,
                height:imageWidth*0.1,
                resizeMode:'contain',
                
            }}></Image>
            <Image source={Logo.bgtext} style={{
                // marginLeft:15,
                marginTop:10,
                resizeMode:'center',
                //backgroundColor:Colours.dark_gray,
                width:imageWidth*0.7,
                height:imageHeight*0.1
            }}/>
        </View>
    </View>

    {/* Buttons */}
    <View style={styles.body}>
        <View>
          <Button btnText={'Get Started'} btnPress={handleLoginPress}/>
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
        flex: 3,
    },
    main:{
        flex:2,
        //backgroundColor:'gray' ,
    },  
    body:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
    },
    group_bg:{
        alignItems:'flex-start',
        justifyContent: 'space-between',
        margin:20,
        //backgroundColor: 'red',
        marginTop:120
    },
});