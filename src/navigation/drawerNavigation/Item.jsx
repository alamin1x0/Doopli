import {Text, View} from 'react-native';
import React from 'react';
import {DrawerItem} from '@react-navigation/drawer';
import {useTheme} from '@react-navigation/native';
import {drawerStyle} from './drawerStyle';
import {HOME} from '../routeName/routeName';
import { rs } from '../../utils/styles/responsiveSize';

const Item = ({text, routeName, focused = HOME, Icon, onPress, style}) => {
  const {colors} = useTheme();
  const drawerStyles = drawerStyle(colors, focused, routeName);
  return (
    <DrawerItem
      label={() => {
        return (
          <View style={drawerStyles.itemCont}>
            {Icon && (
              <Icon
                style={{transform: [{scaleX:  -1 }]}}
                fill={
                  focused === routeName ? colors.sunshade : colors.lavenderGray
                }
                height={rs(20)}
                width={rs(20)}
              />
            )}
            <Text style={drawerStyles.itemText}>{text}</Text>
          </View>
        );
      }}
      style={[drawerStyles.drawerItemCont, style ? drawerStyles?.mt_8 : null]}
      onPress={onPress}
    />
  );
};

export default Item;
