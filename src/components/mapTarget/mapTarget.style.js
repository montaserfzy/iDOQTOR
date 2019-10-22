import {Dimensions, StyleSheet} from 'react-native';
import colors from "../../config/colors";

const {width, height} = Dimensions.get('window');

const targetSize = 9;

const styles = StyleSheet.create({

    targetPoint: {
        height: targetSize,
        width: targetSize,
        borderRadius: (targetSize / 2),
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.primary,
        position: 'absolute',
        top: ((height - 99) / 2),
        left: ((width - targetSize) / 2),
        zIndex: 110,
        shadowColor: colors.dark,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4
    },
    targetInProgress:{
        backgroundColor: colors.dark,
        borderColor: colors.sliver,
        borderWidth: 0.2
    }
});

export default styles;