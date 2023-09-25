import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabNavigation from '../bottomTabNavigation/BottomTabNavigation';
import {BOTTOM_TAB} from '../routeName/routeName';
import DrawerContainer from './DrawerContainer';
import HeaderTitleFunc from '../utils/HeaderTitleFunc';
import {screenOptions} from '../navigationStyles/navigationStyles';
import {useTheme} from '@react-navigation/native';
import MenuIcon from '../../assets/svg/menu.svg';
import {Dimensions, Pressable} from 'react-native';
import HeaderShadowFunc from '../utils/HeaderShadowFunc';
import {drawerButtonStyle} from './drawerStyle';
import { useSelector } from 'react-redux';
import { I18nManager } from 'react-native';
import HeaderLeftFunc from '../utils/HeaderLeftFunc';

const Drawer = createDrawerNavigator();
const {width} = Dimensions.get('screen');
const DrawerNavigation = () => {
  const {colors} = useTheme();
  const {theme} = useSelector(state => state.themeReducer);
  const styles = drawerButtonStyle(colors);

  return (
    <Drawer.Navigator
      screenOptions={({navigation}) => ({
        headerLeft: () => null,
        ...screenOptions(colors,theme),
        drawerIcon: () => null,
        drawerType: 'front',
        drawerStyle: {
          width: width * 0.7,
        },
        drawerPosition: I18nManager.isRTL?'left' : 'right',
        headerRight: () => (
          <Pressable onPress={navigation.openDrawer} style={styles.p_20}>
            <MenuIcon />
          </Pressable>
        ),
      })}
      drawerContent={props => <DrawerContainer {...props} />}>
      <Drawer.Screen
        name={BOTTOM_TAB}
        component={BottomTabNavigation}
        options={({route}) => ({
          headerTitle: HeaderTitleFunc(route),
          headerShadowVisible: HeaderShadowFunc(route),
          headerLeft: () => <HeaderLeftFunc route={route} />
        })}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
