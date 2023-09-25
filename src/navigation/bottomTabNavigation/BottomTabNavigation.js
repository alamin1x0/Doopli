import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home/Home';
import Chat from '../../screens/Chat/Chat';
import Profile from '../../screens/Profile/Profile';
import {CHAT, HOME, PROFILE} from '../routeName/routeName';
import HomeIcon from '../../assets/svg/home.svg';
import MessageIcon from '../../assets/svg/message.svg';
import ProfileIcon from '../../assets/svg/user-01.svg';
import BottomTabBarIcon from './BottomTabBarIcon/BottomTabBarIcon';
import {useTheme} from '@react-navigation/native';
import {bottomTabBarIconStyle} from './BottomTabBarIcon/bottomTabBarIcon.style';
import {useTranslation} from 'react-i18next';
import {rs} from '../../utils/styles/responsiveSize';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const {colors} = useTheme();
  const bottomTabBarStyle = bottomTabBarIconStyle(colors);
  const {t:trans} = useTranslation();
  return (
    <BottomTab.Navigator
      screenOptions={bottomTabBarStyle.bottomTabScreenOptions}
      initialRouteName={HOME}>
      <BottomTab.Screen
        name={HOME}
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <BottomTabBarIcon
                title={trans(HOME)}
                Icon={HomeIcon}
                focused={focused}
                height={rs(22)}
                width={rs(22)}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name={CHAT}
        component={Chat}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <BottomTabBarIcon
                title={trans('Chat')}
                Icon={MessageIcon}
                focused={focused}
                height={rs(22)}
                width={rs(22)}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name={PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <BottomTabBarIcon
                title={trans(PROFILE)}
                Icon={ProfileIcon}
                focused={focused}
                height={rs(22)}
                width={rs(22)}
              />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;
