import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { rs } from "../../../utils/styles/responsiveSize";
import { useTranslation } from "react-i18next";

const EmptyList = () => {
    const {colors} = useTheme()
    const emptyListStyle = EmptyListStyle(colors);
    const {t:trans} = useTranslation();
  return (
    <View style={emptyListStyle.emptyCont}>
      <Text style={emptyListStyle.emptyText}>{trans('You Have No History Yet')}!</Text>
    </View>
  );
};

export default EmptyList;

const EmptyListStyle = (colors) => StyleSheet.create({
    emptyCont: {
        alignItems: 'center',
        backgroundColor: colors.emptyBg,
        marginTop: rs(20),
        paddingVertical: rs(60),
        borderRadius: rs(8)
    },
    emptyText: {
        color: colors.bottomSheetItem,
        fontFamily: 'Gilroy-Semibold',
        fontSize: rs(16)
    }
});
