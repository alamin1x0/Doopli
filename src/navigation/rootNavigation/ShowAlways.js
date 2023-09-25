import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AddNewPassword from '../../authentication/signin/ResetPassword/AddNewPassword/AddNewPassword';
import PasswordChangeSuccess from '../../authentication/signin/ResetPassword/PasswordChangeSuccess/PasswordChangeSuccess';
import ResetPassword from '../../authentication/signin/ResetPassword/ResetPassword';
import VerifyAccount from '../../authentication/signin/ResetPassword/VerifyAccount/VerifyAccount';
import SignIn from '../../authentication/signin/SignIn';
import SignUp from '../../authentication/signup/SignUp';
import {screenOptions} from '../navigationStyles/navigationStyles';
import MainStack from '../mainStack/MainStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import {
  ACCOUNT_VERIFY,
  ADD_NEW_PASSWORD,
  MAIN_STACK,
  PASSWORD_CHANGE_SUCCESS,
  RESET_PASSWORD,
  SIGN_IN,
  SIGN_UP,
} from '../routeName/routeName';
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';

const ShowAlways = () => {
  const {colors} = useTheme();
  const {user} = useSelector(state => state.loginUserReducer);
  const {theme} = useSelector(state => state.themeReducer);
  const {t:trans}=useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: !I18nManager.isRTL ? 'slide_from_right' : 'slide_from_left',
        animationDuration: 400,
      }}>
      {user !== null ? (
        <Stack.Group>
          <Stack.Screen name={MAIN_STACK} component={MainStack} />
        </Stack.Group>
      ) : (
        <Stack.Group screenOptions={{...screenOptions(colors,theme)}}>
          <Stack.Screen
            name={SIGN_IN}
            component={SignIn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RESET_PASSWORD} 
            component={ResetPassword} 
            options={{title: trans('Reset Password')}}
          />
          <Stack.Screen
            name={ADD_NEW_PASSWORD}
            component={AddNewPassword}
            options={{title: trans('Reset Password')}}
          />
          <Stack.Screen
            name={PASSWORD_CHANGE_SUCCESS}
            component={PasswordChangeSuccess}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ACCOUNT_VERIFY}
            component={VerifyAccount}
            options={{title: trans('Reset Password')}}
          />
          <Stack.Group>
            <Stack.Screen
              name={SIGN_UP}
              component={SignUp}
              options={{headerShown: false}}
            />
          </Stack.Group>
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default ShowAlways;
