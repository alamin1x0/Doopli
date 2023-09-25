import { Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');

export const balanceStyle = (colors,theme) =>
  StyleSheet.create({
    balanceContainer:{
        backgroundColor: theme !== 'dark' ? '#292929' : '#3A3A39',
        borderColor: colors.ifSecondary,
        borderWidth: 1,
        borderRadius: 8,
        padding: rs(15),
        marginBottom: rs(10),
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    textColor:{
        color: '#FFFFFF',
        fontFamily: "Gilroy-bold",
        fontSize: rs(13),
        lineHeight: rs(18)
    },
    usedContent:{
        fontFamily: "Gilroy-bold",
        fontSize: rs(32),
        color: '#FFFFFF',
    },
    remainingContent:{
        fontFamily: "Gilroy-Semibold",
        fontSize: rs(14),
        lineHeight: rs(32),
        color: "#C1C1C1",
    },
    balanceLayout:{
        marginBottom: rs(5),
        width: width/2 - rs(50),
    }
  });
