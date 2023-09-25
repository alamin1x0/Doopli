import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { Pressable, StyleSheet } from "react-native";
import { rs } from "../../../utils/styles/responsiveSize";
import { INBOX } from "../../../navigation/routeName/routeName";
import PlusIcon from "../../../assets/svg/plus.svg"
import { useTranslation } from "react-i18next";

const FloatingBtn = () => {
  const {t:trans} = useTranslation();
  const {colors} = useTheme();
  const headerStyle = HeaderStyle(colors);
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(INBOX, {
      title: trans('New Chat'),
      id: ""
    });
  }
  return (
    <Pressable onPress={handlePress} style={headerStyle.cont}>
      <LinearGradient
        colors={['#A26EF7', '#763CD4']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={headerStyle.buttonCont}
        >
        <PlusIcon fill={"#FFF"} height={rs(30)} width={rs(30)} />
      </LinearGradient>
    </Pressable>
  );
};

export default FloatingBtn;

const HeaderStyle = () => StyleSheet.create({
  cont: {
    position: 'absolute',
    bottom: rs(20),
    right: rs(20),
    zIndex: 9999,
  },
  buttonCont: {
    borderRadius: 50,
    width: rs(50),
    height: rs(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
})
