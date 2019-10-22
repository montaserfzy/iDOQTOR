window.local = 'ar';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from "react-native";

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({
    $rem: entireScreenWidth / 340
});

const unitSize = 'rem';

const fonts = {
    ar: {
        bold: 'Dubai-Bold',
        regular: 'Dubai-Bold',//'Dubai-Regular',
        medium: 'Dubai-Medium',
        light: 'Dubai-Light',

        _brands:'FontAwesome5_Brands',

        fw_light:'300',
        fw_medium:'400',
        fw_regular:'600',
        fw_bold:'800',
        fw_extraBold:'bold',
        fw_xxBold:'bolder',
        fw_xxxBold:'bolder',
    },

    en: {
        bold: 'ProximaNova-Bold',
        regular: 'ProximaNova-Regular',
        medium: 'ProximaNova-Light',
        light: 'ProximaNovaT-Thin',
        fa_brands:'FontAwesome5_Brands',
        fa_regular:'FontAwesome5_Regular',

        _brands:'FontAwesome5_Brands',

        fw_light:'100',
        fw_medium:'200',
        fw_regular:'400',
        fw_bold:'600',
        fw_extraBold:'800',
        fw_xxBold:'800',
        fw_xxxBold:'800',
    },




    getFontSize: function (sizePx) {
        // return `${sizePx}${unitSize}`;
        return sizePx;
    },

    size: function (size) {
        // return `${size}${unitSize}`;
        return size;
    },

    getFont: function (type) {
        let _font = this.en;
        if (window.local == 'ar')
            _font = this.ar;

        switch (type) {
            case 'bold':
                return _font.bold;
            case 'light':
                return _font.light;
            case 'medium':
                return _font.medium;
            case 'FABrands':
                return _font.fa_brands;
            case 'FARegular':
                return _font.fa_regular;
            case 'regular':
            default :
                return _font.regular;
        }
    },
    getFontWeight: function (type = '') {
        let fontWeight = fonts.en;
        if (window.local == 'ar')
            fontWeight = fonts.ar;

        switch (type) {
            case 'light':
                return fontWeight.fw_light;
            case 'medium':
                return fontWeight.fw_medium;
            case 'regular':
                return fontWeight.fw_regular;
            case 'bold':
                return fontWeight.fw_bold;
            case 'extraBold':
                return fontWeight.fw_extraBold;
            case 'xxBold':
                return fontWeight.fw_xxBold;
            case 'xxxBold':
                return fontWeight.fw_xxxBold;
            default :
                return fontWeight.fw_regular;
        }
    }
};

export default fonts;