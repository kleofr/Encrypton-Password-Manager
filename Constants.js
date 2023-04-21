import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export const Colours = {
    primary:'#865dff',
    secondary:'#e384ff',
    background:'#191825',
    dark_gray:'#2b2b2a',
}
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