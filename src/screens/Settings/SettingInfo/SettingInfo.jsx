import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import RightArrow from '../../../assets/svg/rightArrow.svg';
import {settingInfoStyle} from './settingInfo.style';
import { profileStyle } from '../../Profile/profileStyle';

const SettingInfo = ({features, onPress, featuresText, last}) => {
  const {colors} = useTheme();
  const styles = settingInfoStyle(colors, last);
  const profileStyles= profileStyle(colors);
  return (
    <Pressable onPress={onPress}>
      <View style={styles.featuresCont}>
        <Text style={styles.featuresText}>{features}</Text>
        <View style={styles.featuresTextCont}>
          {featuresText && <Text style={styles.features}>{featuresText}</Text>}
          <View style={styles.rightArrow}>
            <RightArrow style={profileStyles.navIcon} fill={colors.stormGray} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default SettingInfo;
