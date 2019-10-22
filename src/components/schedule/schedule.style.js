import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import fonts from "../../config/fonts";
import colors from "../../config/colors";

const {width, height} = Dimensions.get('window');

const styles = EStyleSheet.create({
    container:{
        width:width,
        height:height,
        top:0,
        bottom:0,
        left:0,
        backgroundColor:colors.darkRGBA,
        alignSelf:'center',
        borderWidth:0,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        position:'absolute',
        zIndex: 315,
    },
    datePickerOut:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'flex-start',
        flexDirection:'column',
        height:'60%',
        width:'100%',
    },
    datePickerOutMessage:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'flex-start',
        flexDirection:'column',
        height:'75%',
        width:'100%',
    },
    datePickerContainer:{
        width:width,
        height:'40%',
        backgroundColor:colors.white,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'flex-end',
        flexDirection:'column',
    },
    datePickerContainerMessage:{
        width:width,
        height:'25%',
        backgroundColor:colors.white,
        display:'flex',
        justifyContent:'space-evenly',
        alignItems:'center',
        alignSelf:'flex-end',
        flexDirection:'column',
    },
    datePickerView:{
        width:width,
        height:'100%',
        backgroundColor:colors.white,
        display:'flex',
        justifyContent:'space-evenly',
        alignItems:'center',
        zIndex: 101,
        borderTopWidth:0,
        borderTopColor:colors.white,
        borderWidth:0,
        borderColor:colors.dark,
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        paddingTop: 10
    },
    datePickerTitle:{
        display:'flex',
        width:'99%',
        textAlign:'center',
        height:40,
        paddingTop:5,
        fontSize: fonts.getFontSize(22),
        fontWeight: fonts.getFontWeight('bold'),
        fontFamily: fonts.getFont(),
        color: colors.dark,
        borderWidth: 0,
    },
    datePickerBtn:{
        display:'flex',
        width:'80%',
        textAlign:'center',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        borderRadius:5,
        height: fonts.size(35),
        backgroundColor: colors.primary,
        marginBottom: 30

    },
    datePickerBtnText:{
        display:'flex',
        fontSize: fonts.getFontSize(18),
        fontWeight: fonts.getFontWeight('bold'),
        fontFamily: fonts.getFont(),
        color: colors.white,
        borderWidth: 0,
    },
    datePickerBox:{
        width:'90%',
        display:'flex',
        alignSelf:'center',
        borderWidth: 0,
    },

    dateMessageTitle:{
        width:'99%',
        textAlign:'center',
        paddingTop:5,
        fontSize: fonts.getFontSize(18),
        lineHeight: fonts.getFontSize(20),
        fontWeight: fonts.getFontWeight('bold'),
        fontFamily: fonts.getFont(),
        color: colors.dark,
        borderWidth: 0,
    },
    dateMessageView:{
        borderWidth:0,
        display:'flex',
        fontSize: fonts.getFontSize(18),
        fontWeight: fonts.getFontWeight('bold'),
        fontFamily: fonts.getFont(),
        color:colors.dark
    },
    dateNoteText:{
        borderWidth:0,
        display:'flex',
        fontSize: fonts.getFontSize(14),
        fontWeight: fonts.getFontWeight('bold'),
        fontFamily: fonts.getFont(),
        color:colors.sliver,
        textAlign:'center'
    }

});

export default styles;