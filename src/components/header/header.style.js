import {StyleSheet, Dimensions} from 'react-native';
import fonts from "../../config/fonts";
import colors from "../../config/colors";
import EStyleSheet from "react-native-extended-stylesheet";
const {width, height} = Dimensions.get('window');


const backHeader = EStyleSheet.create({
    container:{
        borderWidth:0,
        justifyContent:'flex-start',
        display:'flex',
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor: colors.sliver,
        backgroundColor:colors.white,
        minHeight:45,
    },
    backBtn:{
        borderWidth:0,
        width:50,
        height:50,
        alignSelf:'flex-start',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth:'30%'
    },
    backBtnAr:{
        transform: [{ rotate: '180deg'}]
    },
    backIcon:{
        borderWidth:0,
        resizeMode: 'contain',
        height:18,
        width:35
    },
    titleView:{
        width:'70%',
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center',
        borderWidth:0
    },
    titleText:{
        display:'flex',
        borderWidth:0,
        fontSize:fonts.getFontSize(20),
        fontWeight: fonts.getFontWeight(),
        height:30,
        color: colors.darkGray
    }
});

const mapHeader = EStyleSheet.create({
    container:{
        borderWidth:0,
        justifyContent:'space-between',
        display:'flex',
        flexDirection:'row',
        width:'90%',
        alignSelf:'center'
    },
    navBtn:{
        borderWidth:0,
        width:50,
        height:50,
        alignSelf:'flex-start',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    navIcon:{
        borderWidth:0,
        width:25,
        height:25,
        alignSelf:'flex-start',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
    },
    linearGradientView: {
        position:'absolute',
        top:0,
        left: 0,
        height:100,
        width:width,
        zIndex:210,
        borderWidth:0
    },
    onRequestedView:{
        position: 'absolute'
    },
});


const onRequest = EStyleSheet.create({
    container:{
        borderWidth:0,
        justifyContent:'space-between',
        display:'flex',
        flexDirection:'row',
        width:'90%',
        alignSelf:'center',
        alignItems:'stretch'
    },
    backBtn:{
        borderWidth:0,
        width:50,
        height:50,
        display:'flex',
        alignSelf:'flex-start',
        flexDirection:'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start'
    },
    backIcon:{
        borderWidth:0,
        resizeMode: 'contain',
        height:18,
        width:35
    },
    linearGradientView: {
        position:'absolute',
        top:0,
        left: 0,
        height:100,
        width,
        zIndex:110,
        borderWidth:0
    },
    onRequestedView:{
        position: 'absolute'
    },
    cancelBtn:{
        borderWidth:0,
        borderColor:'red',
        height:30,
        display:'flex',
        alignSelf:'flex-end',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelBtnText:{
        borderWidth:0,
        display:'flex',
        alignSelf:'flex-start',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight:25,
        color:colors.gray,
        fontWeight: fonts.getFontWeight(),
        fontFamily: fonts.getFont()
    },
    btnView:{
        display:'flex',
        width:'50%',
        justifyContent:'center',
        alignItems:'center',
    }
});


export {backHeader};
export {mapHeader};
export {onRequest};

