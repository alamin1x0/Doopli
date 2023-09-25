import { StyleSheet, View, ActivityIndicator, VirtualizedList,KeyboardAvoidingView, Platform } from "react-native";
import React,{ useRef, useMemo } from "react";
import SingleMessage from "./SingleMessage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { rs } from "../../../utils/styles/responsiveSize";
import { getMessages, getMoreMessages, postMessage, storeMessage } from "../../../features/slices/chat/messages";
import { useState } from "react";
import config from "../../../../config";
import Typing from "./Typing";
import { useNavigation, useTheme } from "@react-navigation/native";
import { setHeaderOptions } from "../../../helper/setHeaderOptions";
import { useHandleSendMessage } from "./useHandleSendMessage";
import EmptyInbox from "./EmptyInbox";
import Footer from "./Footer";

const Inbox = (props) => {
    const {id} = props?.route?.params || {};
    const postMessageUrl = `${config.BASE_URL}/user/openai/chat`;
    const msgHistoryUrl = `${config.BASE_URL}/user/openai/chat/history/${id}`;

    const dispatch = useDispatch();
    const {colors} = useTheme();
    const navigation = useNavigation();
    const {user: {token}} = useSelector(state => state.loginUserReducer) || {};
    const { 
        messages, 
        initialLoading, 
        loading, 
        next_page_url, 
        loadMore 
    } = useSelector((state) => state.messages);

    const handleMessage = useHandleSendMessage();
    const [text, setText] = useState("");
    let initialInputHeight = rs(37)
    const inputHeight = useRef(initialInputHeight);

    useEffect(() => {
        if(id) {
            dispatch(getMessages({url: msgHistoryUrl, token}))
        }
    }, [id]);
    
    const handleSend = async () => {
        const body = {
            chatId: id ? id : "",
            promt: text,
        }
        dispatch(storeMessage(body));
        if(messages?.length == 0) {
            const title = text?.length > 20 ? text?.substring(0, 20)+'...' : text
            setHeaderOptions(navigation, title);
        }
        setText("");
        inputHeight.current = initialInputHeight;
        let res = await dispatch(postMessage({
            url: postMessageUrl,
            access_token: token,
            data: body
        }));
        let {status, records} = res?.payload?.response || {};
        handleMessage({status, records})
    };

    const handleMoreMessages = () => {
        let isMounted = true;
        if (isMounted && next_page_url && !loadMore) {
            dispatch(getMoreMessages({token, url: next_page_url}));
        }
        return () => isMounted = false;
    };

    const handleContentSizeChange = (e) => {
        const height = e.nativeEvent?.contentSize?.height;
        if(height <= rs(120)) {
            inputHeight.current = height
        }
    }

    const getItem = (data, index) => data[index];
    const getItemCount = (data) => data.length;

    const memorizeMessage = useMemo(
        () =>
            ({ item }) =>
                <SingleMessage item={item} />,
        []
    );

    const messageStyle = MessageStyle(colors, text, loading, inputHeight.current);
    return (
        <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}>
            <View style={messageStyle.container}>
                {loadMore && <ActivityIndicator size={"large"} />}
                {
                    initialLoading ? 
                    <ActivityIndicator 
                        style={messageStyle.loading} 
                        size={"large"} 
                    /> : 
                    <>
                        {messages.length > 0 ? 
                            <VirtualizedList
                                inverted
                                data={messages}
                                getItem={getItem}
                                getItemCount={getItemCount}
                                keyExtractor={(_, i) => i}
                                renderItem={memorizeMessage}
                                contentContainerStyle={messageStyle.cont}
                                showsVerticalScrollIndicator={false}
                                initialNumToRender={10}
                                windowSize={10}
                                onEndReachedThreshold={0}
                                onEndReached={handleMoreMessages}
                                keyboardShouldPersistTaps={"always"}
                            /> :
                            <View style={messageStyle.cont}>
                                <EmptyInbox />
                            </View>
                        }
                        {loading && <Typing />}
                    </>
                }
                <Footer
                    text={text}
                    setText={setText}
                    handleContentSizeChange={handleContentSizeChange}
                    handleSend={handleSend}
                    inputHeight={inputHeight.current}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

export default Inbox;

const MessageStyle = (colors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.pageBg,
        },
        cont: {
            flexGrow: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingHorizontal: rs(20),
        },
        initialLoad: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        loading: {
            flex: 1,
            marginTop: rs(20)
        }
    });
