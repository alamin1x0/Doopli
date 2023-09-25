import {combineReducers} from '@reduxjs/toolkit';
import loginUserReducer from '../features/auth/login/loginSlice';
import registrationReducer from '../features/auth/registration/registrationSlice';
import themeReducer from '../features/slices/themeReducer/themeReducer';
import languageReducer from '../features/slices/languageReducer/languageReducer';
import getImageHistory from '../features/slices/imageHistoryReducer/getImageHistory';
import getUseCase from '../features/slices/useCaseReducer/getUseCase';
import getPreferences from '../features/slices/Preferences/getPreferences';
import getTextPreference from '../features/slices/TextPreference/getTextPreference';
import getTextHistory from '../features/slices/textHistoryReducer/getTextHistory';
import getImagePreference from '../features/slices/ImagePreference/getImagePreference';
import PackageInfoReducer from '../features/slices/PackageInfoReducer/PackageInfoReducer';
import messagesReducer from "../features/slices/chat/messages";
import conversationsReducer from "../features/slices/chat/conversation";
import deleteConversationReducer from "../features/slices/chat/deleteConversation";
import editConversationReducer from "../features/slices/chat/editConversation";
import getCodePreference from '../features/slices/CodePreference/getCodePreference';
import getCodeHistory from '../features/slices/codeHistoryReducer/getCodeHistory';
import getSubscription from '../features/slices/subscription/getSubscription';
import getBillingHistory from '../features/slices/billing/getBillingHistory';
import getAllPlans from '../features/slices/subscription/getAllPlans';
import getCurrentPlan from '../features/slices/subscription/getCurrentPlan';
import getSubscriptionSetting from '../features/slices/subscription/getSubscriptionSetting';
export const rootReducer = combineReducers({
  loginUserReducer,
  registrationReducer,
  themeReducer,
  languageReducer,
  getImageHistory,
  getUseCase,
  getPreferences,
  getTextPreference,
  getTextHistory,
  getImagePreference,
  PackageInfoReducer,
  messages: messagesReducer,
  conversations: conversationsReducer,
  deleteConversation: deleteConversationReducer,
  editConversation: editConversationReducer,
  getCodePreference,
  getCodeHistory,
  getSubscription,
  getBillingHistory,
  getAllPlans,
  getCurrentPlan,
  getSubscriptionSetting
});
