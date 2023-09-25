import { I18nManager, Pressable, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import BackIcon from '../../assets/svg/back.svg';
import { rs } from "../../utils/styles/responsiveSize";

const BackBtn = (props) => {
    const navigation = useNavigation();

    const backBtnStyles = BackBtnStyles();
  return (
    <Pressable  
        style={backBtnStyles.cont}
        {...props}
        onPress={() => navigation.goBack()}
        android_ripple={backBtnStyles.ripple}
    >
        <BackIcon style={backBtnStyles.backBtn} height={rs(20)} width={rs(20)} />
    </Pressable>
  );
};

export default BackBtn;

const BackBtnStyles = () => StyleSheet.create({
    cont: {
        padding: rs(10),
        position: 'absolute',
        left: rs(-10),
        borderRadius: 50,
    },
    ripple: {
        color: '#999999',
        radius: rs(20)
    },
    backBtn:{
        transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]
    }
});
