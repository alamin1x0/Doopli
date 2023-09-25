import React from 'react';
import {LogBox, StatusBar} from 'react-native';
// As we don't use deep link to the screen which accepts functions in params
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
import {NavigationContainer, useTheme} from '@react-navigation/native';
import Root from './src/navigation/rootNavigation/Root';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {darkTheme} from './src/utils/theme/darkTheme';
import {defaultTheme} from './src/utils/theme/defaultTheme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import translator from './translator';
import {useTranslation} from 'react-i18next';
import {useEffect} from 'react';
import FlashMessage from 'react-native-flash-message';
import Network from './src/utils/Network/NetworkProvider';
import {homeStyle} from './src/screens/Home/home.style';
import { getPreferences } from './src/features/slices/Preferences/getPreferences';
const initI18n = translator;
const App = () => {
  const {theme} = useSelector(state => state.themeReducer);
  const {i18n} = useTranslation();
  const {language} = useSelector(state => state.languageReducer);
  const {colors} = useTheme();
  const style = homeStyle(colors);
  const dispatch= useDispatch();

  useEffect(() => {
    async function checkPreferences(){
      dispatch(getPreferences('token'));
    }
    if (language) {
      i18n.changeLanguage(language);
    }
    checkPreferences();
  }, [language]);
  return (
    <SafeAreaProvider style={style.safeAreaProvider}>
      <StatusBar
        backgroundColor={theme === 'dark' ? '#333332' : '#141414'}
        barStyle={'light-content'}
      />
      <GestureHandlerRootView style={style.safeAreaProvider}>
        <Network>
          <NavigationContainer
            theme={theme === 'dark' ? darkTheme : defaultTheme}
            >
            <Root />
          </NavigationContainer>
        </Network>
        <FlashMessage position="bottom" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
