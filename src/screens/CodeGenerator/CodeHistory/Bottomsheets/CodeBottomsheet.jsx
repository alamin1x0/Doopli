import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useTheme } from '@react-navigation/native';
import { imageActionBottomSheetStyle } from '../../../ImageGenerator/ImageHistory/Bottomsheets/ImageActionBottomsheet/ImageActionBottomsheetStyle';
import { inputFieldStyle } from '../../../components/components/InputField/inputFieldStyle';
import { useTranslation } from 'react-i18next';
import CustomBottomSheet from '../../../components/CustomBottomSheet/CustomBottomSheet';
import { CODE_HISTORY_DISPLAY } from '../../../../navigation/routeName/routeName';

const CodeBottomsheet = ({
    codeInfo,
    bottomSheetRef,
    deleteCode
}) => {
  
  const {colors} = useTheme();
  const style= imageActionBottomSheetStyle(colors);
  const inputFieldStyles = inputFieldStyle(colors);
  const {t:trans}=useTranslation();
  const navigation=useNavigation();

  return (
    <CustomBottomSheet
      style={style.alignCenter}
      bgColor={colors.bottomSheetBg}
      bottomSheetRef={bottomSheetRef}
      snapPoint={[]}>
      <Text style={style.title}>
        {trans('Select Action')}
      </Text>
      <TouchableOpacity
        style={style.textContainer}
        onPress={() => {
          navigation.navigate(CODE_HISTORY_DISPLAY,{item:codeInfo});
          bottomSheetRef.current.close();
        }}>
        <Text style={[inputFieldStyles.btmSheet, style.textStyle]}>
          {trans('View Content')}
        </Text>
      </TouchableOpacity>
      <View style={style.textBottomBorder}></View>
      <TouchableOpacity
        style={style.textContainer}
        onPress={() => {
            deleteCode(codeInfo.id)
            bottomSheetRef.current.close();
          }}>
        <Text style={[inputFieldStyles.btmSheet, style.textStyle]}>
          {trans('Remove from history')}
        </Text>
      </TouchableOpacity>
    
    </CustomBottomSheet>
  )
}

export default CodeBottomsheet