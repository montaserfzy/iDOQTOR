import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import fonts from "../../config/fonts";
import colors from "../../config/colors";
const {width, height} = Dimensions.get('window');

const styles = EStyleSheet.create({
    container:{

    },
    tabsBtnView:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height: 45,
        borderBottomColor: colors.sliver,
        borderBottomWidth: 1
    },
    tabBtn:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width:'50%',
        height: 45,
        borderBottomColor:colors.transparent,
        borderBottomWidth:1
    },
    tabText:{
        display:'flex',
        fontSize: fonts.getFontSize(14),
        fontWeight: fonts.getFontWeight(),
        fontFamily: fonts.getFont(),
        borderWidth:0
    },
    active:{
        borderBottomWidth:1,
        borderBottomColor:colors.primary
    },
    activeTabText:{
        color: colors.primary
    },
    tabsView:{
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        width:'100%',
        height:'100%',
        borderWidth:0
    },


    /**
     * Items View
     * **/

    itemView:{
        width:'100%',
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'column',
        borderWidth:0,
        alignSelf:'center',
        paddingBottom:10,
        paddingTop:10,
        borderBottomWidth:1,
        borderBottomColor:colors.sliver
    },
    listItem:{
        width:'100%',
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'column',
        borderWidth:0,
        alignSelf:'center',
    },
    iHeader:{
        width:'95%',
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        height:30
    },
    iDate:{
        width:'50%',
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'column',
        fontSize: fonts.getFontSize(16),
        fontFamily: fonts.getFont(),
        fontWeight: fonts.getFontWeight('bold'),
    },
    iTotal:{
        width:'50%',
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
        flexDirection:'column',
        textAlign: 'right',
        fontSize: fonts.getFontSize(16),
        fontFamily: fonts.getFont(),
        fontWeight: fonts.getFontWeight('bold'),
    },
    iBody:{
        width:'95%',
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
    },
    iAddress:{
        width:'100%',
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'column',
        fontSize: fonts.getFontSize(12),
        fontFamily: fonts.getFont(),
        fontWeight: fonts.getFontWeight('bold'),
        color:colors.gray
    },
    iTargetView:{
        maxWidth:'10%',
        width:25,
        height:30,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        borderWidth:0
    },
    iTarget:{
        width:10,
        height:10,
        borderRadius: (10/2),
        backgroundColor: colors.white,
        borderColor:colors.primary,
        shadowColor:colors.dark,
        shadowOpacity:0.23,
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 1,
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'column',
        borderWidth:1
    },
    expandContainer:{
        padding:10,
        width:'100%',
        maxWidth: 400,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        borderWidth:0
    },
    expandView:{
        paddingHorizontal:10,
        maxWidth: 450,
        minWidth:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderTopColor:colors.sliver,
        borderTopWidth:1,
        paddingTop: 10,
        textAlign: 'left'
    },
    expandText:{
        minWidth:'98%',
        display:'flex',
        borderWidth:0,
        paddingBottom: 5,
        fontFamily:fonts.getFont(),
        fontWeight: fonts.getFontWeight(),
        fontSize:fonts.getFontSize(14),
        color:colors.gray
    }
});

export default styles;