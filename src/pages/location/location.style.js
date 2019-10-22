import {Dimensions, StyleSheet} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import fonts from "../../config/fonts";
import colors from "../../config/colors";
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        backgroundColor: colors.white,
        height: '100%',
        width: '100%',
        margin: 'auto',
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingBottom: 30
    },
    searchBox: {
        borderWidth: 0,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.white
    },
    searchItemBox: {
        borderWidth: 0,
        width: '100%',
        height: 50,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    searchIcon: {
        width: 40,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10,
        color: colors.dark
    },
    searchInput: {
        width: (width - 40),
        flexDirection: 'column',
        justifyContent: 'center',
        color: colors.dark,
        fontSize: 15,
        fontFamily: fonts.regular,
        fontWeight: '400'
    },
    searchList: {
        minHeight: 'auto',
        width: '100%',
        borderWidth: 0,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    list: {
        flex: 1,
        borderWidth: 0,
        backgroundColor: colors.white
    },
    separator: {
        height: 40,
        backgroundColor: colors.lightRGBA
    },
    separatorText: {
        fontSize: 14,
        lineHeight: 16,
        textAlign:'left'
    },
    titleMessage: {
        color: colors.dark,
        fontSize: 16,
        fontFamily: fonts.getFontSize(),
        fontWeight: '400',
        display: 'flex',
        overflow: 'hidden',
        textAlign: 'left',
        width: '85%',
        justifyContent: 'flex-start'
    },
    title: {
        color: colors.dark,
        fontSize: 16,
        fontFamily: fonts.getFontSize(),
        fontWeight: '400',
        display: 'flex',
        overflow: 'hidden',
        textAlign: 'left',
        width: '100%',
        justifyContent: 'flex-start'
    },
    description: {
        color: colors.black,
        fontSize: 14,
        fontFamily: fonts.getFontSize(),
        fontWeight: '300',
        display: 'flex',
        width: '100%',
        overflow: 'hidden',
        textAlign: 'left'
    },
    addressItem: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        overflow: 'hidden',
        width: width,
        height: 60
    },
    addressView:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 0,
        display: 'flex'
    },
    addressBtn: {
        width: (width - 85),
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        overflow: 'hidden',
        borderWidth: 0,
        display: 'flex'
    },
    addressLike: {
        width: 45,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 0,
        display: 'flex',
        height: '100%',
    },
    imageStyle: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    locationIconView: {
        width: 20,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 0,
        display: 'flex',
        height: '100%'
    },
    locationIcon: {
        fontSize: 15,
        alignSelf: 'flex-start'
    },
    contentMap: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mapView: {
        shadowColor: colors.gray,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.6,
        shadowRadius: 3,
        elevation: 2,
        borderRadius: 5,
        width: '97%',
        height: 150,
        borderWidth: 0,
        marginTop: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '97%',
        height: 100,
        borderColor: colors.white,
        overflow: 'hidden',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    saveAddressItem: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        width: '97%',
        height: 50,
        backgroundColor: colors.white,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        overflow: 'hidden',
    },
    savedTitle: {
        color: colors.dark,
        fontSize: 18,
        lineHeight: 22,
        fontFamily: fonts.getFontSize(),
        fontWeight: '400',
        display: 'flex',
        overflow: 'hidden',
        textAlign: 'left',
        width: '100%',
        justifyContent: 'flex-start'
    },
    savedDescription: {
        color: colors.black,
        fontSize: 16,
        fontFamily: fonts.getFontSize(),
        fontWeight: '300',
        display: 'flex',
        width: '100%',
        overflow: 'hidden',
        textAlign: 'left'
    },
    pointerBox: {
        width: 40,
        height: 50,
        borderWidth: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pointer: {
        height: 10,
        width: 10,
        borderRadius: (10 / 2),
        borderColor: colors.red,
        borderWidth: 2,

        overflow: 'visible',
        shadowColor: colors.gray,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },


    formBox: {
        flexDirection: "column",
        justifyContent: 'center',
        marginTop: 10,
        borderWidth: 0,
        width: "97%",
        alignSelf: 'center'
    },
    inputBox: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0
    },
    inputForm: {
        width: '95%',
        height: 45,
        alignSelf: 'center',
        borderBottomWidth: 0,
        justifyContent: 'center',
        marginTop: 5

    },
    input: {
        fontSize: 16,
        lineHeight: 18,
        fontFamily: fonts.getFontSize(),
        color: colors.black,
        fontWeight: '600',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: colors.red,
        padding: 1
    },

    actionView: {
        alignSelf: 'flex-end',
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        borderWidth: 0,
        marginTop: 100
    },
    SaveBtn: {
        width: 200,
        borderRadius: 5,
        height: 40,
        backgroundColor: colors.red,
    },
    SaveBtnText: {
        color: colors.white,
        fontSize: 20,
        lineHeight: 40,
        fontWeight: '600',
        fontFamily:fonts.getFontSize(),
        textAlign:'center',
    }
});

export default styles