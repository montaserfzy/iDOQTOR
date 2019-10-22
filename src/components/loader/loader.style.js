import {Dimensions, StyleSheet} from 'react-native';
import {colors, fonts} from "../../config/index";
import EStyleSheet from "react-native-extended-stylesheet";

const {width, height} = Dimensions.get('window');


const styles = EStyleSheet.create({
    container: {
        borderWidth: 0,
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        backgroundColor: colors.darkRGBA,
        zIndex: 9999999999
    },
    loaderView: {
        width: 90,
        height: 90,
        left: ((width / 2) - 45),
        top: ((height / 2) - 45),
        backgroundColor: colors.white,
        borderColor: colors.sliver,
        shadowColor: colors.dark,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:5,
        elevation: 2
    },
    loader:{
        width:50,
        height:50
    },
    loadingText:{
        color:colors.gray,
        fontSize:fonts.getFontSize(12),
        fontWeight:fonts.getFontWeight(''),
        lineHeight:fonts.getFontSize(14),
        display:'flex',
        justifyContent:'center',
        alignSelf:'center'
    }
});


export default styles;
