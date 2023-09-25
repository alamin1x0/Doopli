import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomBottomSheet from '../../../../components/CustomBottomSheet/CustomBottomSheet';
import { useNavigation, useTheme } from '@react-navigation/native';
import { imageActionBottomSheetStyle } from './ImageActionBottomsheetStyle';
import { useTranslation } from 'react-i18next';
import { inputFieldStyle } from '../../../../components/components/InputField/inputFieldStyle';
import { IMAGE_HISTORY_DISPLAY } from '../../../../../navigation/routeName/routeName';

const ImageActionBottomsheet = ({
  imgInfo,
  deleteImage,
  checkPermission,
  bottomSheetRef
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
          navigation.navigate(IMAGE_HISTORY_DISPLAY,{imgInfo});
          bottomSheetRef.current.close();
        }}>
        <Text style={[inputFieldStyles.btmSheet, style.textStyle]}>
          {trans('View Image')}
        </Text>
      </TouchableOpacity>
      <View style={style.textBottomBorder}></View>
      <TouchableOpacity
        style={style.textContainer}
        onPress={() => {
          bottomSheetRef.current.close();
          checkPermission(imgInfo.imageUrl)
        }}>
        <Text style={[inputFieldStyles.btmSheet, style.textStyle]}>
          {trans('Download')}
        </Text>
      </TouchableOpacity>
      <View style={style.textBottomBorder}></View>
        <TouchableOpacity style={style.textContainer}
         onPress={() => {
          bottomSheetRef.current.close();
          deleteImage(imgInfo.id)
        }}>
          <Text style={[inputFieldStyles.btmSheet, style.textStyle]}>
            {trans('Remove from History')}
          </Text>
        </TouchableOpacity>
    
    </CustomBottomSheet>
  )
}

export default ImageActionBottomsheet