import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import { rs } from "../../../utils/styles/responsiveSize";
import Clipboard from '@react-native-clipboard/clipboard';
import ClipboardIcon from "../../../assets/svg/copy.svg"
import { handleToaster } from "../../../utils/CustomAlert/handleAlert";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { memo } from "react";
import { botImage } from "../../../constant/constant";

const SingleMessage = ({ item}) => {
    const {user} = useSelector(state=>state.loginUserReducer);
    const {user_message, bot_message} = item || {};

    const {t:trans} = useTranslation();
    const {colors} = useTheme();

    const handleClipboard = async () => {
        await Clipboard.setString(user_message || bot_message);
        handleToaster(trans('Copied to clipboard.'), 'copied', colors);
    };

    const singleMsgStyle = SingleMsgStyle(colors, item);
    return (
        <View style={singleMsgStyle.cont}>
            <View style={singleMsgStyle.subCont}>
                <Image 
                    source={{uri: !user_message 
                        ? botImage 
                        : user?.picture
                    }}
                    style={singleMsgStyle.image}
                />
                <Text style={singleMsgStyle.text}>{user_message || bot_message}</Text>
            </View>
            <Pressable onPress={handleClipboard} style={singleMsgStyle.textAction}>
                <ClipboardIcon fill={colors.tabIconUnfocused} />
            </Pressable>
        </View>
    );
};

export default memo(SingleMessage);

const SingleMsgStyle = (colors, item) =>
    StyleSheet.create({
        cont: {
            marginTop: rs(15),
            alignItems: item?.user_message ? "flex-end" : "flex-start",
        },
        subCont: {
            width: "85%",
            flexDirection:item?.user_message ? "row-reverse" : "row",
            alignItems: "flex-end",
        },
        image: {
            height: rs(30),
            width: rs(30),
            borderRadius: 50,
            marginLeft: item?.user_message ? rs(10) : 0,
            marginRight: item?.user_message ? 0 : rs(10),
        },
        text: {
            padding: rs(12),
            color: item?.user_message ? colors.white : colors.bottomSheetItem,
            fontFamily: 'Gilroy-Semibold',
            fontSize: rs(16),
            lineHeight: rs(20),
            minHeight: rs(40),
            minWidth: rs(100),
            backgroundColor: item?.user_message ? colors.purpleHeart : colors.bgSenaryVariant,
            borderRadius: 8,
        },
        textAction: {
            paddingTop: rs(5),
            paddingHorizontal: rs(10),
            alignItems: item?.user_message ? "flex-end" : "flex-start",
            width: "12%",
            height: rs(30),
            marginLeft: item?.user_message ? 0 : rs(30),
            marginRight: item?.user_message ? rs(30) : 0,
        }
    });
