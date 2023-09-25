import {Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {customButtonStyle} from './customButtonStyle';

const CustomButton = ({
  icon,
  title,
  onPress,
  disabled = false,
  bgColor,
  color,
  textColor,
  style,
}) => {
  const {colors} = useTheme();
  const btnStyle = customButtonStyle(
    colors,
    bgColor,
    color,
    textColor,
    disabled,
    icon,
    title,
  );
  return (
    <View style={style}>
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View style={btnStyle.btnCont}>
          {typeof title === 'string' ? (
            <Text style={btnStyle.btnText}>{title}</Text>
          ) : (
            title
          )}
          <Text style={btnStyle.iconStyle}>{icon && icon}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
