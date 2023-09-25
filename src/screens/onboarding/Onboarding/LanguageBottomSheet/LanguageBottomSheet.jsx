import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomBottomSheet from '../../../components/CustomBottomSheet/CustomBottomSheet';
import {Fragment} from 'react';
import {useTheme} from '@react-navigation/native';
import {languageBottomSheetStyle} from './languageBottomSheet.style';
import {useDispatch} from 'react-redux';
import {updateLanguage} from '../../../../features/slices/languageReducer/languageReducer';
import {useTranslation} from 'react-i18next';
import { I18nManager } from 'react-native';
import RNRestart from "react-native-restart";

const LanguageBottomSheet = ({bottomSheetRef, data, selectItem}) => {
  const {colors} = useTheme();
  const style = languageBottomSheetStyle(colors);
  const dispatch = useDispatch();
  const setLanguage =async item => {
    if(item.direction === 'rtl'.toLowerCase()){
     await I18nManager.forceRTL(true);
    }
    else{
      await I18nManager.forceRTL(false);
    }
    dispatch(updateLanguage(item.shortName));
    RNRestart.Restart();
  };
  const {t:trans} = useTranslation();
  return (
    <CustomBottomSheet
      style={style.alignCenter}
      bgColor={colors.bottomSheetBg}
      bottomSheetRef={bottomSheetRef}
      snapPoint={[]}>
      <Text style={style.title}>{trans(data?.title)}</Text>
      <ScrollView>
        {data?.value.map((item, index) => {
          return (
            <Fragment key={index}>
              {index !== 0 && <View style={style.textBottomBorder}></View>}
              <TouchableOpacity
                key={item}
                style={style.textContainer}
                onPress={() => {
                  setLanguage(item);
                  bottomSheetRef.current.close();
                }}>
                <Text
                  style={
                    languageBottomSheetStyle(
                      colors,
                      item?.shortName,
                      selectItem,
                    ).textStyle
                  }>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            </Fragment>
          );
        })}
      </ScrollView>
    </CustomBottomSheet>
  );
};

export default LanguageBottomSheet;
