import React, { useEffect } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigation from '../drawerNavigation/DrawerNavigation';
import {
  DRAWER_NAVIGATION,
  EDIT_PROFILE,
  SETTINGS,
  CREATE_TEXT_GENERATOR,
  TEXT_HISTORY,
  IMAGE_HISTORY,
  DISPLAY_TEXT_GENERATOR,
  DISPLAY_IMAGE_GENERATOR,
  HISTORY_DISPLAY,
  IMAGE_HISTORY_DISPLAY,
  CHAT,
  INBOX,
  SUBSCRIPTION,
  SUBSCRIPTIONPLAN,
  CURRENTPLAN,
  CREATE_CODE_GENERATOR,
  DISPLAY_CODE_GENERATOR,
  BILLING,
  CODE_HISTORY,
  CODE_HISTORY_DISPLAY,
  BILLING_DETAILS,
  ALLPLANS,
  RENEWWEBVIEW,
  SUBSCRIBEPLANS,
} from '../routeName/routeName';
import {screenOptions} from '../navigationStyles/navigationStyles';
import { useTheme} from '@react-navigation/native';
import EditProfile from '../../screens/Profile/EditProfile/EditProfile';
import Settings from '../../screens/Settings/Settings';
import {useTranslation} from 'react-i18next';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import CreateTextGenerator from '../../screens/TextGenerator/CreateTextGenerator';
import CreateImageGenerator from '../../screens/ImageGenerator/CreateImageGenerator';
import {CREATE_IMAGE_GENERATOR} from '../routeName/routeName';
import TextHistory from '../../screens/TextGenerator/TextHistory/TextHistory';
import ImageHistory from '../../screens/ImageGenerator/ImageHistory/ImageHistory';
import DisplayTextGenerator from '../../screens/TextGenerator/DisplayTextGenerator';
import DisplayImageGenerator from '../../screens/ImageGenerator/DisplayImageGenerator';
import HistoryDisplay from '../../screens/TextGenerator/TextHistory/HistoryDisplay/HistoryDisplay';
import ImageHistoryDisplay from '../../screens/ImageGenerator/ImageHistory/ImageHistoryDisplay/ImageHistoryDisplay';
import { useDispatch, useSelector } from 'react-redux';
import { getPreferences } from '../../features/slices/Preferences/getPreferences';
import { getuseCase } from '../../features/slices/useCaseReducer/getUseCase';
import { getTextPreferences } from '../../features/slices/TextPreference/getTextPreference';
import { getImagePreferences } from '../../features/slices/ImagePreference/getImagePreference';
import { getPackageInfo } from '../../features/slices/PackageInfoReducer/PackageInfoReducer';
import Inbox from '../../screens/Chat/Inbox/Inbox';
import BackBtn from './BackBtn';
import Subscription from '../../screens/Subscription/Subscription';
import SubscriptionPlan from '../../screens/Subscription/SubscriptionPlan/SubscriptionPlan';
import CurrentPlan from '../../screens/Subscription/CurrentPlan/CurrentPlan';
import CreateCodeGenerator from '../../screens/CodeGenerator/CreateCodeGenerator';
import { getCodePreferences } from '../../features/slices/CodePreference/getCodePreference';
import DisplayCodeGenerator from '../../screens/CodeGenerator/DisplayCodeGenerator';
import BillingHisty from '../../screens/BillingHistory/BillingHistory/BillingHistory';
import CodeHistory from '../../screens/CodeGenerator/CodeHistory/CodeHistory';
import CodeHistoryDisplay from '../../screens/CodeGenerator/CodeHistory/CodeHistoryDisplay/CodeHistoryDisplay';
import Billing from '../../screens/BillingHistory/Billing';
import BillingDetails from '../../screens/BillingHistory/BillingDetails/BillingDetails';
import AllPlans from '../../screens/Subscription/AllPlans/AllPlans';
import RenewWebView from '../../screens/Subscription/CurrentPlan/RenewWebView';
import SubscribePlans from '../../screens/Subscription/AllPlans/SubscribePlans';

const Stack = createNativeStackNavigator();
const MainStack = () => {
  const {colors} = useTheme();
  const {t:trans} = useTranslation();
  const {theme} = useSelector(state => state.themeReducer);
  const dispatch = useDispatch();
  const {
    user: {token},
  } = useSelector(state => state.loginUserReducer) || {};

  useEffect(()=>{
    dispatch(getPackageInfo({token}));
    dispatch(getPreferences({token}));
    dispatch(getuseCase({token}));
    dispatch(getImagePreferences({token}));
    dispatch(getTextPreferences({token}));
    dispatch(getCodePreferences({token}));
  },[])
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions(colors,theme),
        headerBackTitleVisible: false,
        headerLeft: (props) => <BackBtn props={props} />
      }}>
      <Stack.Screen
        name={DRAWER_NAVIGATION}
        component={DrawerNavigation}
        options={{headerShown: false}}
      />
      <Stack.Group>
        <Stack.Screen
          name={CREATE_IMAGE_GENERATOR}
          options={{title: trans('Image Generator')}}>
          {props => (
            <PrivateRoute>
              <CreateImageGenerator {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={DISPLAY_IMAGE_GENERATOR}
          options={{title: trans('Image Display')}}>
          {props => (
            <PrivateRoute>
              <DisplayImageGenerator {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name={IMAGE_HISTORY}
          options={{title: trans('Image History')}}>
          {props => (
            <PrivateRoute>
              <ImageHistory {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={IMAGE_HISTORY_DISPLAY}
          options={{title: trans('Image Details')}}>
          {props => (
            <PrivateRoute>
              <ImageHistoryDisplay {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name={CREATE_TEXT_GENERATOR}
          options={{title: trans('Text Generator')}}>
          {props => (
            <PrivateRoute>
              <CreateTextGenerator {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen
          name={DISPLAY_TEXT_GENERATOR}
          options={{title: trans('Text Display')}}>
          {props => (
            <PrivateRoute>
              <DisplayTextGenerator {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name={TEXT_HISTORY} options={{title: trans('Text History')}}>
          {props => (
            <PrivateRoute>
              <TextHistory {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name={HISTORY_DISPLAY} options={{title: trans('Text Details')}}>
          {props => (
            <PrivateRoute>
              <HistoryDisplay {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name={CREATE_CODE_GENERATOR} options={{title: trans('Code Generator')}}>
          {props => (
            <PrivateRoute>
              <CreateCodeGenerator {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name={DISPLAY_CODE_GENERATOR} options={{title: trans('Code Display')}}>
          {props => (
            <PrivateRoute>
              <DisplayCodeGenerator {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name={CODE_HISTORY} options={{title: trans('Code History')}}>
        {props => (
            <PrivateRoute>
              <CodeHistory {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name={CODE_HISTORY_DISPLAY} options={{title: trans('Code Details')}}>
        {props => (
            <PrivateRoute>
              <CodeHistoryDisplay {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name={EDIT_PROFILE} options={{title: trans('Edit Profile')}}>
          {props => (
            <PrivateRoute>
              <EditProfile {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name={SUBSCRIPTION} options={{title: trans('Subscription')}}>
          {props => (
            <PrivateRoute>
              <Subscription {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name={SUBSCRIPTIONPLAN} options={{title: trans('Subscription Plan')}}>
          {props => (
            <PrivateRoute>
              <SubscriptionPlan {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name={CURRENTPLAN} options={{title: trans('Current Plan')}}>
          {props => (
            <PrivateRoute>
              <CurrentPlan {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name={ALLPLANS} options={{title: trans('All Plans')}}>
          {props => (
            <PrivateRoute>
              <AllPlans {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name={SUBSCRIBEPLANS} options={{title: trans('All Plans')}}>
          {props => (
            <PrivateRoute>
              <SubscribePlans {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name={RENEWWEBVIEW} options={{title: trans('Payment')}}>
          {props => (
            <PrivateRoute>
              <RenewWebView {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name={BILLING} options={{title: trans('Billing History')}}>
          {props => (
            <PrivateRoute>
              <Billing {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name={BILLING_DETAILS} options={{title: trans('Billing Details')}}>
          {props => (
            <PrivateRoute>
              <BillingDetails {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>

      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name={SETTINGS} options={{title: trans('Settings')}}>
          {props => (
            <PrivateRoute>
              <Settings {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen 
          name={INBOX} 
          options={({route}) => ({title: trans(route.params?.title)})}
        >
          {props => (
            <PrivateRoute>
              <Inbox {...props} />
            </PrivateRoute>
          )}
        </Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainStack;
