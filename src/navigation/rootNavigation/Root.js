import React, {useContext, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useState} from 'react';
import ShowAlways from './ShowAlways';
import {preloadedData} from './preloadedData';
import {NetworkContext} from '../../utils/Network/NetworkProvider';
import {handleToaster} from '../../utils/CustomAlert/handleAlert';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import { ONBOARDING } from '../routeName/routeName';
import Onboarding from '../../screens/onboarding/Onboarding/Onboarding';
import { I18nManager } from 'react-native';

const Stack = createNativeStackNavigator();

const Root = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const {isConnected} = useContext(NetworkContext);
  const [restored, setRestored] = useState(false);
  const {colors} = useTheme();
  const {t:trans} = useTranslation();
  preloadedData(setIsFirstLaunch);
  useEffect(() => {
    if (!isConnected) {
      handleToaster(trans('No internet connection'), 'internet-warning', colors);
      setRestored(true);
    } else if (isConnected && restored) {
      handleToaster(trans('Back to online'), 'internet-success', colors);
    }
  }, [isConnected]);
  const {fetch: originalFetch} = window;
  window.fetch = async (...args) => {
    let [resource, config] = args;
    let response = await originalFetch(resource, config);
    return response;
  };
  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: !I18nManager.isRTL ? 'slide_from_right' : 'slide_from_left',
          animationDuration: 400,
        }}>
        {isFirstLaunch === true && (
          <Stack.Group>
            <Stack.Screen name={ONBOARDING} component={Onboarding} />
          </Stack.Group>
        )}
        <Stack.Group>
          <Stack.Screen name="show-always" component={ShowAlways} />
        </Stack.Group>
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Group>
          <Stack.Screen name="show-always" component={ShowAlways} />
        </Stack.Group>
      </Stack.Navigator>
    );
  }
};

export default Root;
