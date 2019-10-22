import {Dimensions} from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet";
import {colors, fonts} from "../../config";

const {width, height} = Dimensions.get('window');

const styles = EStyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 120,
        bottom: 65,
        width: width,
        height: 300,
        maxWidth: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: colors.transparent,
        paddingLeft: 5,
        paddingRight: 5,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
    },
    content: {
        width: (width - 40),
        height: 250,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.sliver,
        shadowColor: colors.dark,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 4,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,

    },
    detailsView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        width: '100%',
        top: -30,
    },
    doctorExperiences:{
        fontSize: fonts.getFontSize(18),
        fontWeight: fonts.getFontWeight('bold'),
        fontFamily: fonts.getFont(),
        lineHeight:27,
        color: colors.black,
        width: '100%',
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        textAlign:'center',
        borderWidth: 0
    },
    detailsImageView: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        height: 70,
        borderWidth: 0,
        top: -30,
        marginTop:0
    },
    dateTimeView: {
        height: 30,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderWidth: 0,
        top: -30,

    },
    dateTimeText: {
        fontSize: fonts.getFontSize(12),
        fontWeight: fonts.getFontWeight('bold'),
        fontFamily: fonts.getFont(),
        color: colors.coolGray,
        height: 30,
        width: '100%',
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        textAlign:'center',
        borderWidth: 0
    },

    detailsImage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 65 / 2,
        height: 65,
        width: 65,
        borderWidth: 0,
        borderColor: colors.sliver,
        shadowColor: colors.dark,
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.9,
        shadowRadius: 1,
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
    footer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '15%',
        borderWidth: 0,
        width: '95%',
        overflow: 'hidden'
    },
    iconView:{
        display: 'flex',
        alignSelf:'flex-start',
        width:'50%',
        borderWidth:0,
        textAlign:'left'
    },
    totalView:{
        display: 'flex',
        alignSelf:'flex-end',
        width:'50%',
        borderWidth:0,
        textAlign:'right'
    },
    totalText:{
        color:colors.coolGray,
        fontSize:fonts.getFontSize(22),
        fontWeight:fonts.getFontWeight('bold'),
        fontFamily: fonts.getFont(),
        textAlign:'right'
    },
    icon:{
        color:colors.coolGray,
        fontSize:fonts.getFontSize(32),
        fontWeight:fonts.getFontWeight('bold'),
        fontFamily: fonts.getFont(),
        textAlign:'left'
    },
    ratingView:{
        borderWidth:0,
        top:-20
    },
    rateSubmitBtn:{
        width:'95%',
        maxWidth:400,
        height:45,
        justifyContent:'center',
        alignSelf:'center',
        alignItems:'center',
        // position: 'absolute',
        // bottom:-10,
        marginTop:10,
        backgroundColor: colors.primary,
        borderRadius:5,
        borderColor: colors.sliver,
        shadowColor: colors.dark,
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.34,
        shadowRadius: 1,
        zIndex: 99999999
    },
    rateSubmitText:{
        color:colors.white,
        fontSize:fonts.getFontSize(22),
        fontWeight:fonts.getFontWeight('bold'),
        fontFamily: fonts.getFont(),
    }


});

export default styles;