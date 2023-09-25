import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { trigger } from "react-native-haptic-feedback";
import TextIcon from '../../../assets/svg/message.svg'
import { rs } from "../../../utils/styles/responsiveSize";
import { useNavigation, useTheme } from "@react-navigation/native";
import { INBOX } from "../../../navigation/routeName/routeName";
import EditIcon from "../../../assets/svg/edit-03.svg";
import CheckIcon from "../../../assets/svg/tick-mark.svg";
import TimesIcon from "../../../assets/svg/cross-icon.svg";
import DeleteIcon from "../../../assets/svg/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteConversationFromFront, editConversationFromFront } from "../../../features/slices/chat/conversation";
import config from "../../../../config";
import { deleteConversation } from "../../../features/slices/chat/deleteConversation";
import Lottie from 'lottie-react-native';
import { editConversation } from "../../../features/slices/chat/editConversation";
import DeleteConfirmation from "./DeleteConfirmation";
import EndShadow from "./EndShadow";
const dotLoader = require("../../../assets/lottie/lf30_editor_15agdwbd.json");
const dotLoaderLight = require("../../../assets/lottie/lf30_editor_15agdwbd_light.json");

const SingleList = ({
    item,
    deleteId,
    setDeleteId,
    editId,
    setEditId,
    longPress,
    setLongPress,
    setFirstBackPress,
    dataLength,
    index
}) => {
    const navigation = useNavigation();
    const {colors} = useTheme();
    const dispatch = useDispatch();

    const {user: {token}} = useSelector(state => state.loginUserReducer);
    const {isLoading} = useSelector(state => state.deleteConversation);
    const {isLoading: editLoading} = useSelector(state => state.editConversation);
    const {theme} = useSelector(state => state.themeReducer);

    const [exitText, setEditText] = useState(item?.title);
    const [openModal, setOpenModal] = useState(false);

    let headerTitle = item?.title?.length > 20 
        ? item?.title?.substring(0, 20)+'...' 
        : item?.title;

    const handlePress = () => {
        navigation.navigate(INBOX, {
        title: headerTitle,
        id: item?.id
        });
    };

    const handleLongPress = () => {
        setLongPress({
            id: item?.id, value: true
        });
        setFirstBackPress(false);
        trigger("impactHeavy");
    }

    const handleEdit = () => {
        setEditId(item?.id);
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditText(item?.title);
    };

    const continueEdit = async () => {
        const url = `${config.BASE_URL}/user/openai/chat/update`;
        const data = {
            chatId: item?.id,
            name: exitText
        };
        const res = await dispatch(editConversation({data, token, url}));
        if(res?.payload?.response?.status?.code == 200) {
            dispatch(editConversationFromFront(data));
        }
        setEditId(null);
        setLongPress({});
    };

    const deleteConfirm = () => {
        setOpenModal(true);
    }

    const handleDelete = async () => {
        const url = `${config.BASE_URL}/user/openai/chat/delete`;
        const data = {
            chatId: item?.id
        }
        setDeleteId(item?.id);
        setOpenModal(false);
        const res = await dispatch(deleteConversation({data, token, url}));
        if(res?.payload?.response?.status?.code == 200) {
            dispatch(deleteConversationFromFront(data.chatId))
        }
    };

    const singleListStyle = SingleListStyle(colors, longPress, item, dataLength, index);
    return (
        <>
            <Pressable 
                onPress={handlePress}
                onLongPress={handleLongPress} 
                style={singleListStyle.cont}
            >
                <View style={singleListStyle.textCont}>
                    <TextIcon 
                        fill={colors.msgIcon}
                        height={rs(20)}
                        width={(rs(20))}
                    />
                    {editId == item?.id ? 
                        <TextInput
                            value={exitText}
                            style={[singleListStyle.input, singleListStyle.listTitle]}
                            onChangeText={(text) => setEditText(text)}
                            autoFocus={true}
                        />
                        : <>
                            <Text
                                style={singleListStyle.listTitle} 
                                numberOfLines={1}
                                ellipsizeMode="clip"
                            >
                                {item?.title}
                            </Text>
                            <EndShadow />
                        </>
                    }
                </View>
                <View style={singleListStyle.actionBtnCont}>
                    {(longPress?.id == item.id && longPress?.value) && (editId == item?.id && editLoading ? 
                        <Lottie
                            source={theme == 'dark' ? dotLoader : dotLoaderLight}
                            autoPlay
                            style={singleListStyle.loader}
                        /> : editId == item?.id ? 
                        <Pressable
                            android_ripple={singleListStyle.ripple}
                            style={singleListStyle.actionBtn}
                            onPress={continueEdit}
                        >
                            <CheckIcon 
                                fill={colors.msgIcon}
                                height={rs(21)}
                                width={rs(20)}
                            />
                        </Pressable> : 
                        <Pressable
                            android_ripple={singleListStyle.ripple}
                            style={singleListStyle.actionBtn}
                            onPress={handleEdit}
                        >
                            <EditIcon 
                                fill={colors.msgIcon}
                                height={rs(21)}
                                width={rs(20)}
                            />
                        </Pressable>)}
                    {(longPress?.id == item.id && longPress?.value) && (deleteId == item?.id && isLoading
                        ? <Lottie
                            source={theme == 'dark' ? dotLoader : dotLoaderLight}
                            autoPlay
                            style={singleListStyle.loader}
                        />
                        : editId == item?.id ? <Pressable
                            android_ripple={singleListStyle.ripple}
                            style={singleListStyle.actionBtn}
                            onPress={cancelEdit}
                        >
                            <TimesIcon 
                                fill={colors.msgIcon}
                                style={singleListStyle.ml}
                                height={rs(16)}
                                width={rs(15)}
                            />
                        </Pressable> : <Pressable
                            android_ripple={singleListStyle.ripple}
                            style={singleListStyle.actionBtn}
                            onPress={deleteConfirm}
                        >
                            <DeleteIcon 
                                fill={colors.msgIcon}
                                style={singleListStyle.ml}
                                height={rs(21)}
                                width={rs(20)}
                            />
                        </Pressable>
                    )}
                </View>
            </Pressable>
            <DeleteConfirmation
                handleDelete={handleDelete}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        </>
    );
};

export default SingleList;

const SingleListStyle = (colors, longPress, item, dataLength, index) => {
    const textWidth = longPress?.id != item?.id 
        ? (rs('wf') - rs(65))
        : (rs('wf') - rs(50)) / 1.34;
    const inputWidth = textWidth - rs(35);
    const actionWidth = rs('wf') - (textWidth + rs(62));
    return StyleSheet.create({
        cont: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: colors.bottomSheetBg,
            borderRadius: 4,
            marginTop: rs(15),
            marginBottom: dataLength - 1 == index ? rs(15) : 0,
            padding: rs(5),
            paddingLeft: rs(15),
        },
        input: {
            height: rs(30),
            padding: 0,
            margin: 0,
            width: inputWidth,
        },
        textCont: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: "center",
            height: rs(41),
            width: textWidth,
        },
        listTitle: {
            marginHorizontal: rs(15),
            fontFamily: 'Gilroy-Semibold',
            color: colors.msgIcon,
            fontSize: rs(14),
            width: inputWidth,
            textAlign: 'left'
        },
        ml: {
            margin: 0,
            padding: 0
        },
        actionBtnCont: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: actionWidth,
        },
        actionBtn: {
            padding: rs(10),
            height: rs(41),
            width: rs(40),
            justifyContent: 'center',
            alignItems: 'center'
        },
        ripple: {
            color: '#999999',
            radius: rs(20)
        },
        loader: {
            height: rs(41),
            width: rs(40),
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: -999
        }
})};
