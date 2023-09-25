import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {drawerStyle} from './drawerStyle';
import {useSelector} from 'react-redux';
import ProfileImage from '../../screens/components/ProfileImage/ProfileImage';
import {rs} from '../../utils/styles/responsiveSize';

const DrawerHeader = () => {
  const {colors} = useTheme();
  const drawerStyles = drawerStyle(colors);
  const {
    user: {name, email, picture},
  } = useSelector(state => state.loginUserReducer);
  return (
    <View style={drawerStyles.header}>
      <ProfileImage imageURL={picture} imageSize={rs(58)} />
      <View style={drawerStyles.headerTextCont}>
        <Text style={drawerStyles.headerNameText}>
          {name}
        </Text>
        <Text style={drawerStyles.headerEmailText}>{email}</Text>
      </View>
    </View>
  );
};

export default DrawerHeader;
