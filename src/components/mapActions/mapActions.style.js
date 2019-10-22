import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import fonts from "../../config/fonts";
import colors from "../../config/colors";
const {width, height} = Dimensions.get('window');

const styles = EStyleSheet.create({
    mapActionsView:{
        position:'absolute',
        top: 'auto',
        bottom: 50,
        right:10,
        flexDirection:'column',
        justifyContent:'space-evenly',
        alignItems:'center',
        zIndex:120
    },
    mapActionsViewAr:{
        right:'auto',
        left:10,
    },
    earthBtn:{
        width:fonts.size(35),
        height:fonts.size(35),
        backgroundColor:colors.white,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:0,
        marginBottom:5,
        shadowColor: colors.sliver,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
        borderRadius:4

    },
    earthIcon:{
        width:fonts.size(20),
        height:fonts.size(20),
        display: 'flex',
        alignSelf:'center',
        borderWidth:0,
        resizeMode: 'contain',
    },
    locatedBtn:{
        width:fonts.size(35),
        height:fonts.size(35),
        backgroundColor:colors.white,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:0,
        marginBottom:5,
        shadowColor: colors.sliver,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
        borderRadius:4

    },
    locatedIcon:{
        width:fonts.size(20),
        height:fonts.size(20),
        display: 'flex',
        alignSelf:'center',
        borderWidth:0,
        resizeMode: 'contain',

    },
    semaphoreBtn:{
        width:fonts.size(35),
        height:fonts.size(35),
        backgroundColor:colors.white,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:0,
        marginBottom:5,
        shadowColor: colors.sliver,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
        borderRadius:4

    },
    semaphoreIcon:{
        width:fonts.size(20),
        height:fonts.size(20),
        display: 'flex',
        alignSelf:'center',
        borderWidth:0,
        resizeMode: 'contain'
    }

});

export default styles;