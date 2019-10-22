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
        borderWidth: fonts.size(0),
        paddingTop: fonts.size(20),
        justifyContent: 'flex-start',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        alignSelf: 'center',
        marginBottom: fonts.size(40)
    },
    inputGroup: {
        borderWidth: 0,
        height: fonts.size(38),
        maxWidth: fonts.size(400),
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.sliver,
        backgroundColor:colors.darkWhite,
        marginTop: 10
    },
    title: {
        color: colors.darkGray,
        fontSize: fonts.getFontSize(18),
        fontFamily: fonts.getFont('bold'),
        fontWeight: fonts.getFontWeight(),
        textAlign: 'left',
        display: 'flex',
        alignSelf: 'flex-start',
        margin: 'auto',
        borderWidth: 0,
        marginBottom: fonts.getFontSize(20)
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
    },
    descriptionText: {
        fontFamily: fonts.getFont('regular'),
        fontWeight: fonts.getFontWeight(),
        fontSize: fonts.getFontSize(14),
        lineHeight: fonts.getFontSize(20),
        color: colors.gray,
        textAlign: 'left',
        display: 'flex',
        alignSelf: 'flex-start',
        borderWidth: 0,
        paddingTop: 0
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
    disabled:{
      opacity:0.5
    },
    nextBtnText:{
        color:colors.white,
        fontSize: fonts.getFontSize(18),
        fontWeight: fonts.getFontWeight(),
        fontFamily: fonts.getFont(),
    },
    nextIcon: {
        fontSize: fonts.getFontSize(18),
        lineHeight: fonts.getFontSize(22),
        color: colors.white,
        display:'flex',
        alignSelf: 'center',
    },
    countryInput: {
        display: 'flex',
        borderWidth: 0,
        width: '30%',
        paddingTop:5,
        borderBottomLeftRadius:3,
        borderTopLeftRadius:3,
    },
    countryText: {
        fontWeight: fonts.getFontWeight(),
        fontFamily: fonts.getFont(),
        fontSize: fonts.size(16),
        height: fonts.size(38),
        paddingVertical:0,
        borderWidth:0
    },
    countryFlag: {
        width: fonts.size(28),
        height: fonts.size(15),
        marginLeft:5,
    },
    phoneInput: {
        display: 'flex',
        fontWeight: fonts.getFontWeight(),
        fontFamily: fonts.getFont(),
        fontSize: fonts.size(16),
        borderWidth: 0,
        width: '70%',
        paddingTop:5,
        borderBottomRightRadius:3,
        borderTopRightRadius:3,
        overflow:'hidden',
        justifyContent: 'flex-start',
        height: fonts.size(38),
        paddingVertical:0
    },
    linkView: {
        display: 'flex',
        flexDirection: 'row',
        width: '85%',
        maxWidth: fonts.size(400),
        textAlign: 'left',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        marginTop: 20,
        borderWidth: 0,
        height: 35
    },
    link: {
        fontSize: fonts.size(14),
        color: colors.dark,
        fontWeight: '400',
        fontFamily: fonts.getFont('regular'),
    },
    linkBold: {
        fontSize: fonts.size(14),
        color: colors.dark,
        fontWeight: '500',
        fontFamily: fonts.getFont('regular'),
    },
    linearGradient: {}
});

export default styles;