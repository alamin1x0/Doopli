import {Pressable, Text, View} from 'react-native';
import React, {memo} from 'react';
import {useTheme} from '@react-navigation/native';
import {actionsCardStyle} from './actionsCardStyle';
import { useTranslation } from 'react-i18next';
import NavigateIcon from '../../../assets/svg/navigate-icon.svg';
import { useSelector } from 'react-redux';
const ActionsCard = ({
  bg,
  icon,
  text,
  textColor,
  borderColor,
  last,
  onPress,
  fixedWidth,
  isOneLine
}) => {
  const {colors} = useTheme();
  const {theme} = useSelector(state => state.themeReducer);
  const {t:trans}=useTranslation();
  const {container, card, flex, textS,generatorText, iconNavContainer, isOneLineContainer, navIcon} = actionsCardStyle(
    colors,
    bg,
    textColor,
    borderColor,
    last,
    fixedWidth,
    icon,
    theme,
    isOneLine
  );
  return (
    <View style={container}>
      <Pressable
        onPress={onPress}
        android_ripple={{color: colors.btnQuinary}}
        style={card}>
        <View style={!isOneLine ? flex : isOneLineContainer}>
          <View style={isOneLine && isOneLineContainer}>
            {icon}
            <Text style={textS}>{text}</Text>
          </View>
          {isOneLine && <NavigateIcon  style={navIcon} fill={theme !== 'dark' ? '#141414' : '#ffffff'}/>}

        </View>
        {icon && !isOneLine &&
        <View style={iconNavContainer}>
           <Text style={generatorText}>{trans("Generator")}</Text>
           <NavigateIcon style={navIcon} fill={theme !== 'dark' ? '#141414' : '#ffffff'}/>
        </View>
        }
      </Pressable>
    </View>
  );
};

export default memo(ActionsCard);
