import {StyleSheet} from "react-native";
import colors from "../config/colors";
import fonts from "../config/fonts";
import EStyleSheet from 'react-native-extended-stylesheet';
const styles = EStyleSheet.create({
    container: {
        borderWidth: 0,
        borderColor: colors.white,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: colors.white,
        padding: 0,
        width: '100%',
        color: colors.dark
    },
    image: {
        borderWidth: 0,
        backgroundColor: 'transparent',
        height: 65,
        width: 65,
        borderRadius: (65 / 2),
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 70,
        marginBottom: 20,
        resizeMode: 'cover',
        borderColor:colors.sliver,
        shadowColor:colors.coolGray,
        shadowOffset: {width: 1, height: 3},
        shadowOpacity: 0.72,
        shadowRadius: 4,
    },
    title: {
        display:'flex',
        alignSelf:'center',
        color: colors.darkGray,
        fontSize: fonts.getFontSize(18),
        fontFamily: fonts.getFont(''),
        fontWeight: fonts.getFontWeight(),
        letterSpacing:0.4,
        paddingHorizontal: 20
    },
    icon: {
        width: 25,
        height: 25,
        borderWidth: 0,
        justifyContent: 'center',
        resizeMode: 'cover',
        display: 'flex',
        alignSelf: 'center',
        marginLeft: 20
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        width:'100%',
        justifyContent: 'flex-start',
        alignSelf:'flex-start',
        borderWidth: 0,
        height: 50
    },
    footerView: {
        borderTopWidth: 1,
        borderTopColor: colors.sliver,
        height:100,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        flexDirection:'column'
    },
    footerBtn:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        display:'flex',
        borderWidth:0,
    },
    medicalToolIcon:{
        width:15,
        height:15,
        display:'flex',
        alignSelf:'center',
        resizeMode:'contain',
        borderWidth:0,
        marginRight:0
    },
    footer: {
        borderWidth:0,
        textAlign: 'center',
        display:'flex',
        justifyContent:'center',
        alignSelf:'center',
        color:colors.primary,
        fontFamily: fonts.getFont('bold'),
        fontSize: fonts.getFontSize(12),
        fontWeight: fonts.getFontWeight('bold'),
        letterSpacing:0.4,
        lineHeight: fonts.getFontSize(20),
    },
    username: {
        display: 'flex',
        textAlign: 'center',
        width: '100%',
        fontFamily: fonts.getFont('bold'),
        fontSize: fonts.getFontSize(22),
        fontWeight: fonts.getFontWeight('bold'),
        letterSpacing:0.4,
        lineHeight: fonts.getFontSize(26),
        color: colors.darkGray
    },
    navView: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    sep: {
        borderBottomWidth: 1,
        borderBottomColor: colors.sliver,
        width: '100%',
        marginTop: 10,
        marginBottom: 20,
    },
    walletBox:{
        borderWidth:0,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width:'100%',
        height:30,
        marginTop:10
    },

    walletView:{
        borderWidth:0,
        borderColor:'rgba(0,0,0,0.05)',
        borderRadius:10,
        overflow:'hidden',
        alignSelf:'center',
        display:'flex',
    },
    walletText:{

        backgroundColor:colors.gray,
        color:colors.dark,
        borderRadius:10,
        overflow:'hidden',
        paddingHorizontal:15,
        paddingVertical:5,
        fontWeight:'400',
        fontSize:16,
        lineHeight:22,
    },
    sendEmailView:{
        borderWidth:0,
        marginTop:15,
        borderColor:'rgba(0,0,0,0.05)',
        borderRadius:10,
        overflow:'hidden',
        alignSelf:'center',
        display:'flex',
        height:32,
    },
    sendEmailText:{
        backgroundColor:colors.gray,
        borderRadius:10,
        overflow:'hidden',
        paddingHorizontal:15,
        paddingVertical:5,
        fontWeight:'400',
        fontSize:16,
        lineHeight:22,
    }
});

export default styles;