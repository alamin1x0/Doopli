import { View, Pressable, StyleSheet,Keyboard, Platform } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import { useSelector } from "react-redux";
import SendIcon from '../../../assets/svg/send.svg'
import { rs } from "../../../utils/styles/responsiveSize";
import { useTranslation } from "react-i18next";
import { profileStyle } from "../../Profile/profileStyle";
import { useTheme } from "@react-navigation/native";

const Footer = ({
    text,
    setText,
    handleContentSizeChange,
    handleSend,
    inputHeight
}) => {
    const {colors}= useTheme();
    const {t:trans} = useTranslation();
    const [isOpenKeyboard, setIsOpenKeyboard]= useState(false);
    const profileStlyles= profileStyle(colors)

    const { loading } = useSelector((state) => state.messages);

    const footerStyle = FooterStyle(text, loading, inputHeight,isOpenKeyboard);
  return (
    <View style={footerStyle.inputCont}>
        <CustomInput
            style={footerStyle.input} 
            placeholder={trans("Type your message..")}
            onChangeText={(text) => setText(text)}
            value={text}
            multiline={true}
            numberOfLines={5}
            textAlignVertical="top"
            onContentSizeChange={handleContentSizeChange}
        />
        <Pressable
            style={footerStyle.sendIcon} 
            onPress={handleSend}
            disabled={!text || loading}
        >
            <SendIcon style={profileStlyles.navIcon} fill="#FFF" />
        </Pressable>
    </View>
  );
};

export default Footer;

const FooterStyle = (text, loading, inputHeight,isOpenKeyboard) => StyleSheet.create({
    inputCont: {
        paddingHorizontal: rs(20),
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: rs(10),
        marginBottom: Platform.OS ==='ios' && isOpenKeyboard ?  rs(110): Platform.OS ==='ios' ? rs(20) : rs(10)
    },
    input: {
        width: rs('wf') - rs(80),
        minHeight: rs(37),
        height: rs(inputHeight) + rs(3),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: rs(10),
        borderRadius: 8,
        fontSize: rs(20),
    },
    sendIcon: {
        width: rs(40),
        height: rs(40),
        backgroundColor: !text || loading ? "#D9D9D9" : "#a572f2",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
})
