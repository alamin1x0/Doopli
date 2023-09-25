import {getFocusedRouteNameFromRoute, useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Image} from 'react-native';
import {signInStyle} from '../../authentication/signin/SignInStyle';
import Logo from '../../assets/image/logo/dark_logo.png';
import { CHAT } from '../routeName/routeName';


const HeaderTitleFunc = route => {
  const {t:trans} = useTranslation();
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  return routeName == CHAT ? "" : routeName !== 'Home' ? trans(routeName) : () => loadSVG();
};

export default HeaderTitleFunc;

const loadSVG = () => {
  const {colors} = useTheme();
  const {headerImageLogo} = signInStyle(colors);
  return <Image style={headerImageLogo} source={Logo} alt="Logo" />;
};
