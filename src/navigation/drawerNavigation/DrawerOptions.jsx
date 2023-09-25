import React, {useCallback} from 'react';
import Item from './Item';
import DashboardIcon from '../../assets/svg/drawer-dashboard.svg';
import {
  CHAT,
  HOME,
  SETTINGS,
} from '../routeName/routeName';
import SettingIcon from '../../assets/svg/drawer-setting.svg';
import MessageIcon from '../../assets/svg/message.svg';
import {useTranslation} from 'react-i18next';

const DrawerOptions = ({focused, navigation}) => {
  const {t:trans} = useTranslation();
  let isNavigate;
  const handleNavigation = useCallback(route => {
    if (!isNavigate) {
      isNavigate = 1;
      navigation.navigate(route);
      setTimeout(() => {
        isNavigate = '';
        navigation.closeDrawer();
      }, 1000);
    }
  }, []);
  return (
    <>
      <Item
        text={trans('Dashboard')}
        routeName={HOME}
        focused={focused}
        navigation={navigation}
        Icon={DashboardIcon}
        onPress={() => handleNavigation(HOME)}
        style={1}
      />
      <Item
        text={trans('Settings')}
        routeName={SETTINGS}
        focused={focused}
        navigation={navigation}
        Icon={SettingIcon}
        onPress={() => handleNavigation(SETTINGS)}
      />
      <Item
        text={trans('Chat')}
        routeName={CHAT}
        focused={focused}
        navigation={navigation}
        Icon={MessageIcon}
        onPress={() => handleNavigation(CHAT)}
      />
    </>
  );
};

export default DrawerOptions;
