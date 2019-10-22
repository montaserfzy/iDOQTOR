import {colors, fonts} from "../../config/index";
import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from "react-native";
const {width, height} = Dimensions.get('window');


const styles = EStyleSheet.create({
    container: {
        borderColor: colors.white,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: colors.darkWhite,
        padding: 0,
        width: '100%',
        color: colors.dark,
        position: 'relative'
    },
    content:{

    },

    listSeparator:{
        height:30,
        backgroundColor: colors.darkWhite,
    },
    listTitle:{
        fontSize: fonts.getFontSize(14),
        lineHeight: fonts.getFontSize(52),
        fontWeight: fonts.getFontWeight('bold'),
        fontFamily: fonts.getFont(),
        color: colors.coolGray
    },

    itemText:{
        fontSize: fonts.getFontSize(14),
        fontWeight: fonts.getFontWeight(),
        fontFamily: fonts.getFont(),
        textAlign: 'left'
    },

    listView:{
        backgroundColor: colors.white
    },
    listItem:{
        backgroundColor: colors.white
    },
    icon:{
        fontFamily: fonts.getFont('FARegular'),
        fontSize:fonts.getFontSize(14),
        color: colors.coolGray
    },
    selectedText:{
        fontSize: fonts.getFontSize(12),
        fontWeight: fonts.getFontWeight('bold'),
        fontFamily: fonts.getFont(),
    },
    termsBtn:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        alignSelf:'center',
        paddingTop:10
    },
    termsText:{
        fontSize: fonts.getFontSize(13),
        fontWeight: fonts.getFontWeight('bold'),
        color: colors.dark,
    },
    listFooter:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        alignSelf:'center',
        backgroundColor:colors.darkWhite,
        marginTop:20,
        marginBottom:30,
    },
    appVersion:{
        fontSize: fonts.getFontSize(11),
        fontWeight: fonts.getFontWeight(),
        color: colors.gray,
    },
    overlayView:{
        width:width,
        height: height,
        marginTop:0,
        top:0,
        left:0,
        zIndex:10,

        backgroundColor:'rgba(222,222,222,0.03)',
        borderWidth:1,
    },
    genderPickerView:{
        // width:'100%',
        // height: fonts.size(200),
        // backgroundColor:colors.darkWhite,
        // justifyContent:'center',
        // alignItems:'center',
        // flexDirection:'column',
        // display:'flex',
        // borderWidth:1,
        // borderTopColor:colors.primary,
        // position:'absolute',
        // bottom:0,
        // left:0,
    },
    genderPickerTitle:{
        width:'100%',
        height:35,
        fontSize: fonts.getFontSize(16),
        fontFamily: fonts.getFont(),
        fontWeight: fonts.getFontWeight('bold'),
        textAlign: 'center',
        display:'flex',

    }
});

export default styles;