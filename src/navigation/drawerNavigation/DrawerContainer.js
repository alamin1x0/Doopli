import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import DrawerOptions from './DrawerOptions';
import DrawerHeader from './DrawerHeader';
import {useTheme} from '@react-navigation/native';
import {drawerButtonStyle, drawerStyle} from './drawerStyle';
import DrawerFooter from './DrawerFooter';

const DrawerContainer = props => {
  const {routes, index} = props?.state || {};
  const focused =
    routes[index]?.state?.index === 1
      ? routes[index]?.state?.routeNames[1]
      : routes[index]?.state?.routeNames[0];
  const {colors} = useTheme();
  const drawerStyles = drawerButtonStyle(colors);
  return (
    <>
      <DrawerHeader />
      <DrawerContentScrollView
        style={drawerStyles.drawerCont}
        {...props}
        showsVerticalScrollIndicator={false}>
        <DrawerOptions focused={focused} navigation={props.navigation} />
        <DrawerFooter focused={focused} navigation={props.navigation} />
      </DrawerContentScrollView>
    </>
  );
};

export default DrawerContainer;
