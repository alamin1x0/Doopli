import {View, Text, Pressable} from 'react-native';
import React, {memo} from 'react';
import {myProfileStyle} from './myProfile.style';
import {useTheme} from '@react-navigation/native';
import CardButton from '../Buttons/CardButton/CardButton';
import RightIcon from '../../../assets/svg/rightArrow.svg';
import {rs} from '../../../utils/styles/responsiveSize';
import {useTranslation} from 'react-i18next';
const MyProfile = ({
  onPress,
  name,
  leftImage,
  rightImage,
  home = false,
  buttonTitle,
  style,
  email,
  header,
  subscription
}) => {
  const {colors} = useTheme();
  const {t:trans} = useTranslation();
  const {
    container,
    header: headerS,
    profileCont,
    profileName,
    viewProfileCont,
    profileEmail,
    rightIcon
  } = myProfileStyle(colors, home, rightImage, leftImage, subscription);
  return (
    <Pressable onPress={onPress} style={[container, style, home]}>
      {rightImage}
      <View style={profileCont}>
        {home && <Text style={headerS}>{header || trans('Welcome')}</Text>}
        <Text style={profileName}>{name}</Text>
        {email && <Text style={profileEmail}>{email}</Text>}
        {home && (
          <View style={viewProfileCont}>
            <CardButton
              title={buttonTitle}
              onPress={onPress}
              rightIcon={
                <RightIcon style={rightIcon} fill={'#fff'} width={rs(9)} height={rs(9)} />
              }
            />
          </View>
        )}
      </View>
      {leftImage}
    </Pressable>
  );
};

export default memo(MyProfile);
