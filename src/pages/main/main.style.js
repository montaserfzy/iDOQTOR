import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import fonts from "../../config/fonts";
import colors from "../../config/colors";
// window.lang = 'ar'
const {width, height} = Dimensions.get('window');


const styles = EStyleSheet.create({
    container: {
        borderWidth: 0,
        flex: 1,
        backgroundColor:colors.white
    },
    content: {
        borderWidth: 0,
        borderColor: 'red',
        flex: 2,
        overflow:'hidden'
    },
    background: {
        width: '100%',
        height: '100%',
        // resizeMode: 'cover'
    },
    phoneContent: {
        borderWidth: fonts.size(0),
        borderColor: 'green',
        aspectRatio: 1.6,
        paddingTop: fonts.size(80)
    },
    inputGroup: {
        borderWidth: 0,
        height: fonts.size(35),
        width: '85%',
        maxWidth: fonts.size(400),
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.primary
    },
    countryInput: {
        display: 'flex',
        borderWidth: 0,
        width: '30%',
        paddingVertical: 0,
        height:fonts.getFontSize(35),
        // flexDirection:'row-reverse'
    },
    countryText: {
        fontWeight: fonts.getFontWeight(),
        fontFamily: fonts.getFont('regular'),
        fontSize: fonts.size(18),
        height:fonts.getFontSize(35),
        paddingVertical: 0,
        color:colors.gray,
        borderWidth: 0,
    },
    countryFlag: {
        width: fonts.size(30),
        height: fonts.size(17),
        paddingVertical: 0
    },
    phoneInput: {
        display: 'flex',
        fontWeight: fonts.getFontWeight(),
        fontFamily: fonts.getFont('regular'),
        fontSize: fonts.size(18),
        borderWidth: 0,
        width: '70%',
        paddingVertical: 0,
        color:colors.gray
    },
    linkView: {
        display: 'flex',
        flexDirection: 'row',
        width: '81%',
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
        color: colors.primary,
        fontWeight: '500',
        fontFamily: fonts.getFont('regular'),
    },
    linearGradient: {},
    logoStringView: {
        width:250,
        height:130,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start',
        alignSelf:'center',
        borderWidth:0,
    },
    logoString:{
        width:250,
        height:60,
        margin:'auto',
        resizeMode: 'contain',
        // position:'absolute',
        // top:-(height/2),
        borderWidth:0,
        zIndex:99999
    },
    logoView:{
        borderWidth:0,
        height: (height/1.7),
        width:width,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden'
    },
    slogan:{
        width:'100%',
        borderWidth:0,
        height:30,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignSelf:'center',
        fontFamily:fonts.getFont(),
        fontWeight: fonts.getFontWeight('bold'),
        fontSize: fonts.getFontSize(16),
        lineHeight: fonts.getFontSize(30),
        color: colors.lightDark,
        textAlign: 'left',
        left:5
    },
    inputGroupTitle:{
        display:'flex',
        width:'86%',
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'flex-start',
        textAlign:'left',
        fontSize:fonts.getFontSize(18),
        fontWeight:fonts.getFontWeight('light'),
        color:colors.darkGray,
        marginBottom:25,
        borderWidth:0
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        padding: 15,
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    loop_text:{
        minHeight:40,
        position:'relative',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:5
    }
});


export default styles;