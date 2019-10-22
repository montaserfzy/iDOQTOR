import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import fonts from "../../config/fonts";
import colors from "../../config/colors";
const {width, height} = Dimensions.get('window');

const styles = EStyleSheet.create({
    mapContainer: {
        borderWidth: 0,
        flex: 1
    },
    mapView:{
        flex: 1,
        aspectRatio: 1,
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        width:width,
        height: height,
        borderWidth: 0,
    },
    markerTimerContainer:{
        width:100,
        height:60,
        zIndex: 110,
        display: 'flex',
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    targetPointView:{
        height: 41,
        width: 71,
        borderRadius:(35/2),
        backgroundColor: colors.white,
        borderWidth: 2,
        borderColor: colors.primary,
        overflow: 'hidden',
        shadowColor: colors.dark,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 1,
        shadowRadius: 4,
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
    },
    targetPoint: {
        height: 40,
        width: 70,
        position: 'relative',
        justifyContent: 'center',
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        alignSelf:'center',
        borderWidth:0
    },
    day: {
        fontFamily: fonts.getFont(),
        fontSize: fonts.size(12),
        height:17,
        fontWeight: fonts.getFontWeight('bold'),
        borderWidth:0,
        width:'100%',
        alignSelf: 'center',
        textAlign:'center',
        color:colors.coolGray,
        backgroundColor:colors.transparent,

    },
    time: {
        fontFamily: fonts.getFont('bold'),
        fontSize: fonts.getFontSize(14),
        fontWeight: fonts.getFontWeight('bold'),
        alignSelf: 'center',
        width:'100%',
        borderWidth:0,
        textAlign:'center',
        backgroundColor:colors.transparent
    },
    savedPositionTimer:{
        backgroundColor:colors.white,
        width:90,
        height:30,
        borderWidth:1,
        borderColor:colors.primary,
        borderRadius:10,
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center',
        display:'flex',
        flexDirection:'column',
    },
    savedTimeText:{
        fontSize: fonts.getFontSize(12),
        fontWeight: fonts.getFontWeight('bold'),
        alignSelf:'center',
        fontFamily: fonts.getFont(),

    },
    targetArrow: {
        width: 1,
        height: 7,
        backgroundColor: colors.primary,
        display: 'flex',
        alignSelf: 'center',
        zIndex: 120
    },
});

export default styles;