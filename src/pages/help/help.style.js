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

    listSeparator:{
        height:65,
    },
    listTitle:{
        fontSize: fonts.getFontSize(14),
        lineHeight: fonts.getFontSize(48),
        fontWeight: fonts.getFontWeight('bold'),
        fontFamily: fonts.getFont(),
        color: colors.coolGray,
        textAlign: 'left'
    },

    itemText:{
        fontSize: fonts.getFontSize(14),
        fontWeight: fonts.getFontWeight(),
        fontFamily: fonts.getFont(),
        width:'90%',
        textAlign: 'left'
    },

    listView:{
        backgroundColor: colors.white
    },
    listItem:{
        backgroundColor: colors.white
    }
});

export default styles;