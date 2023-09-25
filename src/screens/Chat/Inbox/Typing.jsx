import { StyleSheet, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
const loadingView = require('../../../assets/lottie/AI Chat loader.json');
import { rs } from "../../../utils/styles/responsiveSize";
import { useTheme } from "@react-navigation/native";

const Typing = () => {
    const {colors} = useTheme();
    const typingStyle = TypingStyle(colors);
  return (
    <View style={typingStyle.loadingCont}>
        <LottieView source={loadingView} autoPlay style={typingStyle.loading} />
    </View>
  );
};

export default Typing;

const TypingStyle = (colors) => StyleSheet.create({
    loadingCont: {
        backgroundColor: colors.bgSenaryVariant, 
        height: rs(40),
        width: '25%',
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: rs(15),
        borderRadius: 8,
    },
    loading: {
        height: rs(40),
        width: '25%',
    },
});
