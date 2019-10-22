import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import fonts from "../../config/fonts";
import colors from "../../config/colors";
// window.lang = 'ar'
const {width, height} = Dimensions.get('window');


const styles = EStyleSheet.create({
    container: {
        borderWidth: 0,
        flex: 1
    },
    content: {
        borderWidth: 0,
        borderColor: 'red',
        flex: 2
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
        width: '30%'
    },
    countryText: {
        fontWeight: '400',
        fontFamily: fonts.getFont('regular'),
        fontSize: fonts.size(18),
    },
    countryFlag: {
        width: fonts.size(30),
        height: fonts.size(17)
    },
    phoneInput: {
        display: 'flex',
        fontWeight: '400',
        fontFamily: fonts.getFont('regular'),
        fontSize: fonts.size(18),
        borderWidth: 0,
        width: '70%'
    },
    linkView: {
        display: 'flex',
        flexDirection: 'row',
        width: '85%',
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
    linearGradient: {}
});

export default styles;