import {colors, fonts} from "../../config/index";
import EStyleSheet from 'react-native-extended-stylesheet';
const styles = EStyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: colors.darkWhite,
        padding: 0,
        width: '100%',
        color: colors.dark
    },










    /**
     * Items View
     * **/

    itemView:{
        width:'98%',
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'column',
        borderWidth:0,
        alignSelf:'center',
        paddingBottom:10,
        paddingTop:10,
        borderColor:colors.sliver,
        shadowColor:colors.coolGray,
        shadowOffset: {width: 1, height: 3},
        shadowOpacity: 0.12,
        shadowRadius: 4,

    },
    iCard:{
        borderRadius:5,
        overflow:'hidden'
    },
    iImage:{
        height: 200,
        width: null,
        flex: 1
    },
    iHeader:{
        width:'95%',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'flex-start',
        flexDirection:'row',
        height:50,
        borderWidth:0,
        paddingHorizontal:10,
        paddingVertical:7
    },
    iDate:{
        width:'20%',
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
        flexDirection:'column',
        color:colors.coolGray,
        fontSize: fonts.getFontSize(16),
        fontFamily: fonts.getFont(),
        fontWeight: fonts.getFontWeight(),
        borderWidth:0
    },
    iTitle:{
        width:'80%',
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        textAlign: 'left',
        fontSize: fonts.getFontSize(16),
        fontFamily: fonts.getFont(),
        fontWeight: fonts.getFontWeight('bold'),
        borderWidth:0,
    },
    iBody:{
        width:'100%',
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:10,
        paddingTop:0,
        paddingBottom: 5
    },
    iDescription:{
        width:'90%',
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'column',
        fontSize: fonts.getFontSize(12),
        lineHeight: fonts.getFontSize(14),
        fontFamily: fonts.getFont(),
        fontWeight: fonts.getFontWeight('bold'),
        color:colors.gray,
    },
    iFooter:{
        display:'flex',
        alignSelf:'center',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        borderWidth:0,
        minWidth:'91%',
        paddingBottom:10
    },
    iReadMoreBtn:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'flex-start',
        flexDirection:'column',
        borderWidth:0,
        width:'30%',
    },
    iReadMoreText:{
        display:'flex',
        alignSelf:'flex-start',
        borderWidth:0,
        fontSize: fonts.getFontSize(12),
        fontFamily: fonts.getFont(),
        fontWeight: fonts.getFontWeight('bold'),
        color:colors.primary
    }
});

export default styles;