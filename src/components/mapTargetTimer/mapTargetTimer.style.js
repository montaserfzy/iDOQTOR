import {Dimensions} from 'react-native';
import colors from "../../config/colors";
import fonts from "../../config/fonts";
import EStyleSheet from 'react-native-extended-stylesheet';
const {width, height} = Dimensions.get('window');

const targetSize = 40;

const styles = EStyleSheet.create({
    container: {
        position: 'absolute',
        height: 52,
        width: 50,
        top: ((height - 199) / 2),
        left: ((width - 50) / 2),
        zIndex: 110,
        display: 'flex',
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center'

    },
    targetPointView: {
        height: targetSize,
        width: targetSize,
        borderRadius: (targetSize / 2),
        backgroundColor: colors.white,
        borderWidth: 3,
        borderColor: colors.primary,
        overflow: 'hidden',
        shadowColor: colors.dark,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 1,
        shadowRadius: 4,
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
    },
    targetPoint: {
        height: 45,
        width: 45,
        position: 'relative',
        justifyContent: 'center',
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        alignSelf:'center'
    },
    targetInProgress: {
        height: 0,
        width: 0,
        overflow: 'hidden',
        opacity: 0
    },
    targetArrow: {
        width: 1,
        height: 7,
        backgroundColor: colors.primary,
        display: 'flex',
        alignSelf: 'center',
        zIndex: 120
    },
    number: {
        fontFamily: fonts.getFont('medium'),
        fontSize: fonts.size(16),
        lineHeight: fonts.size(26),
        fontWeight: fonts.getFontWeight('bold'),
        borderWidth:0,
        height:22,
        width:30,
        display:'flex',
        alignSelf: 'center',
        textAlign:'center',
    },
    text: {
        fontFamily: fonts.getFont('medium'),
        fontSize: fonts.getFontSize(10),
        lineHeight: fonts.size(13),
        fontWeight: fonts.getFontWeight(),
        display:'flex',
        alignSelf: 'center',
        height:18,
        width:30,
        borderWidth:0,
        textAlign:'center',
    }
});

export default styles;