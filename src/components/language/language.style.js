import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors, fonts} from "../../config/index";

const {width, height} = Dimensions.get('window');

const barWidth = (width - 40);

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        top: 0,
        left: 0,
        zIndex: 120,
        width: width,
        height: '100%',
        display: 'flex',
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.darkRGBA
    },


    outsideView: {
        height:250,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        display: 'flex',
    },
    pickerView: {
        height: '40%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: colors.white,
        borderTopWidth:2,
        borderTopColor: colors.primary,
        paddingTop:20
    },
    pickerBox: {
        width: 250,
        height: 'auto',
        display: 'flex',
        alignSelf: 'center',
        marginTop: -10
    },
    submit: {
        width: '90%',
        height: 40,
        backgroundColor: colors.primary,
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        marginBottom:35

    },
    submitText: {
        display: 'flex',
        fontFamily: fonts.getFont(),
        fontSize: fonts.getFontSize(18),
        fontWeight: fonts.getFontWeight('bold'),
        alignSelf: 'center',
        color:colors.white,
    },
    title:{
        display: 'flex',
        fontFamily: fonts.getFont(),
        fontSize: fonts.getFontSize(18),
        lineHeight: fonts.getFontSize(40),
        fontWeight: fonts.getFontWeight('bold'),
        alignSelf: 'center',
        color:colors.dark,
        height:40,
        borderWidth:0,
        marginTop:5
    }

});

export default styles;