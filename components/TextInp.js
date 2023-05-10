import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colours, Dim } from '../Constants';


export default function TextInp({placeholder, type, name, value, oCText, pass = false, icon}) {
  const [iconName, seticonName] = useState('eye')
  const [viewPass, setviewPass] = useState(true)
  const handleViewPassword = () => {
    viewPass == true ? (setviewPass(false), seticonName('eye-slash')):(setviewPass(true), seticonName('eye'));
  }
  return (
    <View>
      <Text
        style={{
          fontFamily: "intertmedium",
          fontSize: 14,
          color: "white",
          marginStart: 10,
          marginBottom: 5,
        }}
      >
        {name}
      </Text>
      <View style={styles.txtinp}>
        <View style={{
          width:Dim.imgWidth/1.3,
          // backgroundColor:'gray',
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-between'
          
        }}>
          <View style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center'
          }}>
            <Icon name={icon} size={20} color={'white'} />
            <TextInput
              placeholder={placeholder}
              secureTextEntry={pass ? (viewPass):(false)}
              value={value}
              keyboardType={type}
              onChangeText={oCText}
              placeholderTextColor={"#595959"}
              style={{
                paddingLeft:10,
                color:'white',
                fontFamily:'intertmedium'
              }}
            ></TextInput>
          </View>
          {pass ? (
            <TouchableOpacity onPress={handleViewPassword}>
              <Icon name={iconName} size={20} color={'white'}/>
            </TouchableOpacity>
            ):(null)}
        </View>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
    txtinp:{
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        width:Dimensions.get('window').width/1.1,
        height:50,
        color:'white',
        backgroundColor: '#0a0a0a',
        borderRadius:10,
        paddingLeft: 20,
        marginBottom: 15,
        fontFamily:'intertregular',
        fontSize: 13,
    },
});