import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Colours, Dim } from './Constants';

export default function TextInp({placeholder, type, name, value, oCText, pass = false}) {
  return (
    <View>
      <Text
        style={{
          fontFamily: "interlight",
          fontSize: 14,
          color: "white",
          marginStart: 10,
          marginBottom: 5,
        }}
      >
        {name}
      </Text>
      <TextInput
        style={styles.txtinp}
        placeholder={placeholder}
        secureTextEntry={pass}
        value={value}
        keyboardType={type}
        onChangeText={oCText}

        placeholderTextColor={"#595959"}
      ></TextInput>
    </View>
  );
}
const styles = StyleSheet.create({
    txtinp:{
        width:Dimensions.get('window').width/1.1,
        height:50,
        color:'white',
        backgroundColor: '#0a0a0a',
        borderRadius:10,
        paddingLeft: 20,
        marginBottom: 15,
        fontFamily:'interregular',
        fontSize: 13,
    },
});