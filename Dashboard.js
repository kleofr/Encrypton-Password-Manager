import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Colours, data } from './Constants';
import { useNavigation } from '@react-navigation/native';
import Button from './Button';
import PasswordCard from './PasswordCard';

export default function Dashboard() {
    const navigation = useNavigation();
    const handleMorePress = () => {
        navigation.navigate('Passwords');
    }
    const username = 'Himanish'
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={{
                color:'white',
                fontFamily:'intermedium',
                fontSize:25,
                marginLeft:20
            }}>Welcome back! {username}</Text> */}
      </View>
      <View style={styles.body1}>
        <Text
          style={{
            color: "white",
            fontFamily: "intermedium",
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
          }}
        ></View>
      </View>
      <View style={styles.body2}>
        <View style={styles.header_body2}>
          <Text
            style={{
              color: "white",
              fontFamily: "intermedium",
              fontSize: 20,
              marginLeft: 20,
            }}
          >
            Passwords
          </Text>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={handleMorePress}
          >
            <Text
              style={{
                color: Colours.primary,
                fontFamily: "interregular",
                fontSize: 15,
                marginRight: 20,
              }}
            >
              More
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.main_body2}>
          <ScrollView vertical>
          {data.map((a)=>(
            <PasswordCard object={a}></PasswordCard>
          ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'black',
    },
    header:{
        // backgroundColor: 'gray',
        flex: 1,
        justifyContent: 'center',
    },
    body1:{
        // backgroundColor: 'gray',
        flex:2,
        justifyContent:'space-between'
    },
    body2:{
        flex:4,
    },
    header_body2:{
        // height: '10%',
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    main_body2:{
        alignItems: 'center',
        flex:2,
        //backgroundColor: '#141414',
        marginTop: 20,
        borderRadius:30
        
    },
});