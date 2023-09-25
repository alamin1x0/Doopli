import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { Fragment } from 'react'
import { selectLanguageBottomSheetStyle } from '../../../TextGenerator/Bottomsheets/Language/LanguageBottomsheetStyle';
import { useTheme } from '@react-navigation/native';
import CustomBottomSheet from '../../../components/CustomBottomSheet/CustomBottomSheet';

const ImageVariantSheet = ({ 
  data,
  bottomSheetRef,
  setSelectedItem,
  selectedItem,
  setError,
  error,
  handleSetInfo = false,
  name}) => {
    const {colors} = useTheme();
    const style = selectLanguageBottomSheetStyle(colors);
  return (
  <CustomBottomSheet
    style={style.alignCenter}
    bgColor={colors.bgQuaternary}
    bottomSheetRef={bottomSheetRef}
    snapPoint={[]}>
    <Text style={style.title}>{data?.title}</Text>
    <ScrollView>
      {data?.value?.length > 1 &&
        data?.value.map((item, index) => {
          return (
            <Fragment key={index}>
              {index !== 0 && <View style={style.textBottomBorder}></View>}
              <TouchableOpacity
                key={item?.id}
                style={style.textContainer}
                onPress={() => {
                  setSelectedItem(item);
                  handleSetInfo &&
                    handleSetInfo(
                      name,
                      item,
                      setSelectedItem,
                      selectedItem,
                      setError,
                      error,
                    );
                  bottomSheetRef.current.close();
                }}>
                <Text style={Object.values(selectedItem[name])[0] == Object.values(item)[0] ?[style.textStyle, style.activeTextColor]: style.textStyle}>{Object.values(item)}</Text>
              </TouchableOpacity>
            </Fragment>
          );
        })}
    </ScrollView>
</CustomBottomSheet>
  )
}

export default ImageVariantSheet