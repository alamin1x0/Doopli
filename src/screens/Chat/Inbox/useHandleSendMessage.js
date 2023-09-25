import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../../../features/slices/chat/conversation";
import config from "../../../../config";
import { handleToaster } from "../../../utils/CustomAlert/handleAlert";
import { setHeaderOptions } from "../../../helper/setHeaderOptions";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export const useHandleSendMessage = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const {user: {token}} = useSelector(state => state.loginUserReducer) || {};
    const {t:trans} = useTranslation();
    const conversationUrl = `${config.BASE_URL}/user/openai/chat/conversation`;
    const {colors} = useTheme();

    const handleMessage = ({status, records}) => {
        if(status?.code == 200) {
            dispatch(getConversations({token, url: conversationUrl}))
        }
         else if(status?.code == 500) {
            handleToaster(trans(records), 'error', colors);
            setHeaderOptions(navigation, "New Chat");
        } else {
            records?.response?.length>0 ?
            handleToaster(trans(records?.response), 'error', colors):
            handleToaster(trans("Server Error"), 'error', colors);
        }
    };

    return handleMessage;
};