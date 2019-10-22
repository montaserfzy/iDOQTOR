import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors, fonts} from "../../config/index";

const {width, height} = Dimensions.get('window');

const barWidth = (width - 40);

const styles = EStyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        width: barWidth,
        maxHeight: 100,
        borderWidth: 1,
        backgroundColor: colors.white,
        shadowColor: colors.dark,
        borderColor: colors.sliver,
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.32,
        shadowRadius: 4,
        borderRadius: 5,
        position: 'absolute',
        marginTop: 0,
        top: 100,
        left: 20,
        zIndex: 120,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressBarView: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressBarPointerView: {
        height: '100%',
        width: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        borderWidth: 0,
        maxWidth:'12%'
    },
    addressBarPointerTarget: {
        height: 10,
        width: 10,
        borderRadius: (10 / 2),
        borderColor: colors.primary,
        borderWidth: 1,
        backgroundColor: colors.white,
        display: 'flex',
        alignSelf: 'center',
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.32,
        shadowRadius: 4,
    },
    addressView:{
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        display: 'flex',
        borderWidth: 0,
        width:'76%',
        minWidth:200
    },
    addressTitle:{
        width: '100%',
        fontSize:fonts.getFontSize(16),
        lineHeight:fonts.getFontSize(24),
        fontWeight:fonts.getFontWeight(),
        fontFamily:fonts.getFont(),
        borderWidth: 0,
        height:20,
        textAlign: 'left'
    },
    addressSubTitle:{
        width: '100%',
        fontSize:fonts.getFontSize(12),
        lineHeight:fonts.getFontSize(18),
        fontWeight:fonts.getFontWeight(),
        fontFamily:fonts.getFont(),
        borderWidth: 0,
        paddingLeft:2,
        height:20,
        color:colors.gray,
        textAlign: 'left'
    },
    addressFavoriteView: {
        height: '100%',
        width: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        borderWidth: 0,
        maxWidth:'12%'
    },
    addressFavoriteIcon: {
        height: 20,
        width: 20,

        borderColor: colors.primary,
        backgroundColor: colors.white,
        display: 'flex',
        alignSelf: 'center',
        shadowColor:colors.dark,
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.92,
        shadowRadius: 2,
        resizeMode: 'contain'
    },



});

export default styles;