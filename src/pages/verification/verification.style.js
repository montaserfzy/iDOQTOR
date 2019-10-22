import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import fonts from "../../config/fonts";
import colors from "../../config/colors";
// window.lang = 'ar'
const {width, height} = Dimensions.get('window');


const styles = EStyleSheet.create({
    container: {
        borderWidth: 0,
        flex: 1
    },
    content: {
        borderWidth: 0,
        borderColor: 'red',
        flex: 1,
        flexDirection: 'column',
        display: 'flex'
    },
    background: {
        width: width,
        height: height,
        resizeMode: 'cover'
    },
    phoneContent: {
        paddingTop: fonts.size(20),
        justifyContent: 'flex-start',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        alignSelf: 'center',
        marginBottom: fonts.size(5),
        borderWidth:0
    },
    inputGroup: {
        borderWidth:0,
        borderRadius:3,
        height: fonts.size(35),
        maxWidth: fonts.size(400),
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        overflow:'hidden',
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
        minHeight:40
    },
    title: {
        color: colors.gray,
        fontSize: fonts.getFontSize(18),
        lineHeight: fonts.getFontSize(22),
        fontFamily: fonts.getFont(),
        fontWeight: fonts.getFontWeight('medium'),
        textAlign: 'left',
        display: 'flex',
        // alignSelf: 'flex-start',
        margin: 'auto',
        borderWidth: 0,
        width:'100%',
        marginBottom: fonts.getFontSize(20),
        paddingTop:5,

    },
    descriptionView: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '100%',
        overflow: 'hidden',
        borderWidth: 0,
        marginTop:fonts.getFontSize(20),
    },
    descriptionText: {
        fontFamily: fonts.getFont('regular'),
        fontWeight: fonts.getFontWeight(),
        fontSize: fonts.getFontSize(14),
        lineHeight: fonts.getFontSize(16),
        color: colors.dark,
        textAlign: 'left',
        display: 'flex',
        width: '100%',
        maxWidth: 300,
        alignSelf: 'flex-start',
        borderWidth: 0,
        paddingTop: 5,
    },
    nextIconView: {
        width: '20%',
        minWidth: 50,
        display: 'flex',
        alignSelf: 'center',
        borderWidth: 0,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    nextIconBtn: {
        display: 'flex',
        width: '90%',
        height: 45,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: colors.primary,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center'
    },
    nextIcon: {
        fontSize: fonts.getFontSize(18),
        lineHeight: fonts.getFontSize(22),
        color: colors.white,
        display:'flex',
        alignSelf: 'center',
    },
    inputCode: {
        display: 'flex',
        fontWeight: fonts.getFontWeight(),
        fontFamily: fonts.getFont('regular'),
        fontSize: fonts.size(16),
        width: 120,
        textAlign:'center',
        backgroundColor: colors.darkWhite,
        fontVariant:['small-caps'],
        height: fonts.size(35),
        letterSpacing: 3,
        paddingVertical:0
    },

    linkView: {
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        maxWidth: fonts.size(400),
        textAlign: 'left',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        minHeight: 30,
        borderWidth:0
    },
    arStyle : {
        textAlign: 'right',
        justifyContent: 'flex-end',
        alignItems:'flex-end',
        display: 'flex',
        // alignSelf: 'flex-end',
    },
    link: {
        fontSize: fonts.size(14),
        color: colors.blue,
        fontWeight: '400',
        fontFamily: fonts.getFont('regular'),
        borderWidth:0,
        textAlign:'left'
    },
    warning:{
        color:colors.warning
    },
    resendAt:{
        color:colors.sliver,
        fontSize:fonts.getFontSize(13),
        fontFamily: fonts.getFont('regular'),
        textAlign:'left'
    },
    nextBtnText:{
        color:colors.white,
        fontSize: fonts.getFontSize(18),
        fontWeight: fonts.getFontWeight(),
        fontFamily: fonts.getFont(),
    },
    disabled:{
        opacity:0.5
    },
});

export default styles;