import { View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Animated, Clipboard } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
// import Clipboard from '@react-native-clipboard/clipboard';

import React, { useState } from 'react'
import { Colours, Dim } from '../Constants'

export default function Dropdown({domainName, username, password}) {

    const [iconName, seticonName] = useState('eye')
    const [viewPass, setviewPass] = useState(true)
    const [isExpanded, setIsExpanded] = useState(false);
    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [viewHeight, setviewHeight] = useState()
    const handleViewPassword = () => {
        viewPass == true ? (setviewPass(false), seticonName('eye-slash')):(setviewPass(true), seticonName('eye'));
    }
    // const domainName = 'http://www.google.com'
    // const username = 'morehimanish@gmail.com'
    // const password = '#himanish@123'
    let firstLetter;

    // Remove the "https://" or "www." part from the domain name
    const trimmedDomain = domainName.replace(/^(https?:\/\/)?(www\.)?/i, '');

    // Extract the first letter of the domain name
    if (trimmedDomain.length > 0) {
        firstLetter = trimmedDomain.charAt(0);
    } else {
        firstLetter = null; // Handle empty domain name case
    }
    const toggleAccordion = () => {
        setIsExpanded(!isExpanded);
        Animated.timing(animation, {
          toValue: isExpanded ? 0 : 1.2,
          duration: 300,
          useNativeDriver: false,
        }).start();
    };
    const interpolatedHeight = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100]
    });
    const containerStyle = {
        height: interpolatedHeight,
        overflow: 'hidden'
      };
    
    
  return (
    <View>
      <View style={{
        width: Dim.imgWidth/1.1,
        backgroundColor: '#0a0a0a',
        borderRadius:10,
        marginBottom:10,
      }}>
        <View style={styles.InnerBox}>
            <View style={styles.InnerBoxMaterial}>
                <View style={{
                    flex:1,
                    backgroundColor:Colours.primary,
                    width:Dim.imgWidth,
                    height:Dim.imgHeight/12,
                    borderRadius:20,
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                    <Text style={{
                        color:'#2f2059',
                        fontFamily:'intertbold',
                        fontSize:20,
                    }}>{firstLetter.toUpperCase()}</Text>
                </View>
                <View style={{
                    flex:2,
                    paddingLeft:10,
                    paddingTop:10,
                }}>
                    <Text numberOfLines={1} style={{
                        color:'white',
                        fontFamily:'intertmedium',
                        fontSize:13,
                    }}>{domainName}</Text>
                    <Text numberOfLines={1} style={{
                        color:'gray',
                        fontFamily:'intertregular',
                        fontSize:12,
                    }}>{username}</Text>
                    
                </View>
                <View style={{
                    flex:1,
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                    <TouchableOpacity onPress={toggleAccordion}>
                        {isExpanded ? (<Icon name="chevron-up" size={20} color={Colours.primary} />) : (<Icon name="chevron-down" size={20} color={Colours.primary} />)}
                    </TouchableOpacity>
                </View>
            </View>
            {/* {isVisible ? ( */}
                <Animated.View style={containerStyle}>
                <View style={{
                    paddingLeft:5,
                    paddingRight:5,
                    justifyContent: 'center',
                    display:'flex',
                    flexDirection:'column'
                }}>
                    <View style={{
                        // flex:3,
                        flexDirection:'row',
                        justifyContent:'space-between',
                        height:40,
                        borderWidth:1,
                        borderStyle:'solid',
                        borderColor:'gray',
                        marginTop:10,
                        borderRadius:10,
                        paddingLeft:10,
                        paddingRight:10,
                        backgroundColor:Colours.dark_gray,
                        alignItems:'center',
                    }}>
                        <TextInput secureTextEntry={viewPass} style={{
                            color:'white',
                            fontSize:16,
                        }}>
                            {password}
                        </TextInput>
                        <TouchableWithoutFeedback onPress={handleViewPassword}>
                            <Icon name={iconName} size={20} color={'white'}/>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{
                        marginTop:10,
                        paddingBottom:10,
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'space-around',
                    }}>
                        <TouchableOpacity onPress={()=>Clipboard.setString(password)} style={{
                            height:40,
                            margin:5,
                            flex:1,
                            backgroundColor:'#1c1c1c',
                            borderRadius:20,
                            // flex:1,
                            justifyContent:'center',
                            alignItems:'center',
                        }}>
                            <Icon name='copy' size={20} color={'white'}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            height:40,
                            margin:5,
                            flex:1,
                            backgroundColor:'#1c1c1c',
                            borderRadius:30,
                            // flex:1,
                            justifyContent:'center',
                            alignItems:'center',
                        }}>
                            <Icon name='edit' size={20} color={'white'}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            height:40,
                            margin:5,
                            flex:1,
                            backgroundColor:'#1c1c1c',
                            borderRadius:30,
                            // flex:1,
                            justifyContent:'center',
                            alignItems:'center',
                        }}>
                            <Icon name='remove' size={20} color={'white'}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
            {/* ):null} */}
        </View>
      </View>
      
    </View>
    
  )
}
const styles = StyleSheet.create({
    OuterBox:{
        
    },
    InnerBox:{
        flex:1,
    },
    InnerBoxMaterial:{
        display:'flex',
        flexDirection:'row',
    },
    InnerBoxDropdown:{
        
    },
});