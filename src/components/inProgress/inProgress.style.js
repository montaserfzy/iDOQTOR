import {Dimensions} from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import {colors, fonts} from "../../config";

const {width, height} = Dimensions.get('window');

const styles = EStyleSheet.create({
    container: {
        justifyContent: 'space-around',
        display: 'flex',
        position: 'absolute',
        zIndex: 120,
        bottom: 30,
        width: (width - 40),
        height: 140,
        maxWidth: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.sliver,
        shadowColor: colors.dark,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 4,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf:'center',
        borderRadius: 5,
        padding: 5,
    },
    detailsView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60%',
        borderWidth: 0,
        width: '100%',
        borderBottomWidth:1,
        borderBottomColor:colors.sliver
    },
    detailsImageView: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems:'flex-start',
        justifyContent: 'flex-start',
        width: '20%',
        height: '100%',
        borderWidth: 0
    },
    detailsImage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 45 / 2,
        height: 50,
        width: 50,
        borderWidth: 0
    },
    doctorInfoView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '70%',
    },
    doctorName: {
        color: colors.coolGray,
        fontSize: fonts.getFontSize(16),
        lineHeight: fonts.getFontSize(24),
        fontFamily: fonts.getFont('bold'),
        fontWeight: fonts.getFontWeight('extraBold'),
        borderWidth: 0,
        height: 30,
        width: '100%',
    },
    doctorId: {
        color: colors.gray,
        fontSize: fonts.getFontSize(12),
        lineHeight: fonts.getFontSize(18),
        fontFamily: fonts.getFont(),
        fontWeight: fonts.getFontWeight('bold'),
        borderWidth: 0,
        height: '40%',
        alignSelf: 'flex-start'
    },
    contactInfoView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '30%',
        borderWidth:0,
        width: '100%',
        overflow:'hidden'
    },
    contactBtn: {
        width: '45%',
        height: 35,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        overflow:'hidden',
        borderWidth:0,
    },
    separatedView:{
        display: 'flex',
        height:'100%',
        width:1,
        backgroundColor:colors.sliver
    },
    contactBtnText: {
        display: 'flex',
        height: 20,
        fontSize: fonts.getFontSize(12),
        fontFamily: fonts.getFont(),
        fontWeight: fonts.getFontWeight('bold'),
        borderWidth:0,
        overflow:'hidden',
    },
    shareBtn: {
        width: '45%',
        height: 35,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        overflow:'hidden',
        borderWidth:0,
        textAlign: 'center'
    },
    shareBtnText: {
        display: 'flex',
        height: 20,
        fontSize: fonts.getFontSize(12),
        fontFamily: fonts.getFont(),
        fontWeight: fonts.getFontWeight('bold'),
        borderWidth:0,
        overflow:'hidden',
        alignSelf:'center'
    },
    rate: {
        color: colors.coolGray,
        fontSize:fonts.getFontSize(12)
    },
    rateIcon: {
        color: colors.coolGray,
        fontSize: fonts.getFontSize(12)
    },

    contactIcon: {
        display:'flex',
        color: colors.coolGray,
        fontSize: 16,
        borderWidth:0
    }


});

export default styles;