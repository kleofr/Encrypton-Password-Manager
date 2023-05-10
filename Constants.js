import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export const Colours = {
    primary:'#865dff',
    secondary:'#e384ff',
    background:'#191825',
    dark_gray:'#2b2b2a',
}
export const splashImg = [
    {key:1, img:require('./assets/1bg.png')},
    {key:2, img:require('./assets/2bg.png')},
    {key:3, img:require('./assets/3bg.png')},
]
export const Logo = {

    logo:require('./assets/logo_white.png'),
    bgtext:require('./assets/bgtext.png'),
    bgwithsvg:require('./assets/bgwithsvg.png')
}

    const {width,height} = Dimensions.get('screen')
export const Dim = {
    imgWidth:width,
    imgHeight:height
}

export const Icons = {
    login:<Icon name='arrow-right' size={20} color={'white'}/>,
    signup:<Icon name='address-card' size={20} color={'white'}/>
}

export const data = [
    {domain:'http://www.google.com', username:'kleo24@gmail.com', password:'Himanish@123'},
    {domain:'http://www.facebook.com', username:'8390897087', password:'Himanish123'},
    {domain:'http://www.github.com', username:'kleocode', password:'kleo@24'},
    {domain:'http://www.instagram.com', username:'2kleo', password:'Himanish@240978'},
    {domain:'http://www.tinder.com', username:'HimanishMore', password:'Himanish123'},
    {domain:'http://www.epicgames.com', username:'kleololxdded', password:'Himanish@123'}

]