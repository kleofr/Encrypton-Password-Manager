import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colours, Dim, data } from './Constants';
import { useNavigation } from '@react-navigation/native';
import ButtonDash from './components/ButtonDash';
import Button from './components/Button'
import Dropdown from './components/Dropdown';
import AddPasswordModal from './components/AddPassword';

export default function Dashboard() {
    const navigation = useNavigation();
    const [isVisible, setisVisible] = useState(false);
    
    const handleNewPassword = () => {
      setisVisible(true)
    }
    const handleMorePress = () => {
        navigation.navigate('Passwords');
    }
  return (
    <View style={styles.container}>
      <View style={{
        flex:0.5
      }}>

      </View>
      <View style={styles.body1}>
        <Text
          style={{
            color: "white",
            fontFamily: "intertbold",
            fontSize: 20,
            marginLeft: 20,
          }}
        >
          Dashboard
        </Text>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
          <ScrollView horizontal pagingEnabled={true} centerContent={true} style={{
            width:Dim.imgWidth,
            // marginBottom:15
          }}>
            <ButtonDash upperText={'Password Generator'} lowerText={'Generates new password!'}></ButtonDash>
            <ButtonDash upperText={'View All Passwords'} lowerText={'Where all the treasure is stored'}></ButtonDash>
          </ScrollView>
        </View>
      </View>
      <View style={styles.body2}>
        <View style={styles.header_body2}>
          <Text
            style={{
              color: "white",
              fontFamily: "intertbold",
              fontSize: 20,
              marginLeft: 15,
            }}
          >
            Passwords
          </Text>
          <TouchableOpacity
            style={{
              borderRadius:20,
              alignItems: "center",
              height:35,
              width:60,
              justifyContent: "center",
              backgroundColor:Colours.primary,
              marginRight: 15,
            }}
            onPress={handleMorePress}
          >
            <Text
              style={{
                color: 'white',
                fontFamily: "intertmedium",
                fontSize: 15,
              }}
            >
              More
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.main_body2}>
          <ScrollView vertical>
          {data.map((a, index)=>(
            <Dropdown key={index} domainName={a.domain} username={a.username} password={a.password} />
          ))}
          </ScrollView>
        </View>
        <AddPasswordModal visible={isVisible}/>
      </View>
      <View style={styles.footer}>
        <Button onPress={handleNewPassword} btnText={'Add a new Password'}/>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'black',
    },
    body1:{
        //backgroundColor: 'gray',
        flex:2,
        justifyContent:'space-evenly'
    },
    body2:{
        flex:4,
    },
    header_body2:{
        // borderRadius: 20,
        // marginLeft: 10,
        // marginRight: 10,
        // height: 50,
        // backgroundColor: '#0a0a0a',
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    main_body2:{
        
        alignItems: 'center',
        flex:2,
        //backgroundColor: '#141414',
        marginTop: 20,
        borderRadius:30
        
    },
    footer:{
      flex:1,
      backgroundColor:'#c',
      borderTopRightRadius:30,
      borderTopLeftRadius:30,
      justifyContent: 'center',
      alignItems: 'center',
    },
});