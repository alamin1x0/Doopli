import { View, Text, ScrollView, TouchableOpacity, Pressable, Keyboard } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';
import { selectLanguageBottomSheetStyle } from '../Language/LanguageBottomsheetStyle';
import CustomBottomSheet from '../../../components/CustomBottomSheet/CustomBottomSheet';
import { Fragment } from 'react';
import { useCaseSheetStyle } from './useCaseBottomsheetStyle';
import { useState } from 'react';
import Search from '../../../../assets/svg/search.svg';
import Cancel from '../../../../assets/svg/cross-icon.svg';
import SearchFile from '../../../../assets/svg/searchFile.svg';
import { selectCurrencyBottomSheetStyle } from '../../../Profile/EditProfile/BottomSheet/SelectCurrency/selectCurrencyBottomSheet.style';
import CustomInput from '../../../components/CustomInput/CustomInput';
import { rs } from '../../../../utils/styles/responsiveSize';
import { useTranslation } from 'react-i18next';

const UseCaseBottomsheet = ({ 
    data,
    bottomSheetRef,
    setSelectedItem,
    selectedItem,
    setError,
    error,
    handleSetInfo = false,
    name}) => {
      const {colors} = useTheme();
      const {t:trans} = useTranslation();
      const style = selectLanguageBottomSheetStyle(colors);
      const currstyle = selectCurrencyBottomSheetStyle(colors);
      const useCaseStyle= useCaseSheetStyle(colors);
      const [searchUseCase, setSearchUseCase] = useState('');
      const [searchParam] = useState(['name']);
      let allUseCases = Object.values(data.value);
      function search(items) {
        return items.filter(item => {
          return searchParam.some(newItem => {
            return (
              item[newItem]
                ?.toString()
                ?.toLowerCase()
                ?.indexOf(searchUseCase?.toLowerCase()) > -1
            );
          });
        });
      }
      const handleCancelSearchText = () => {
        Keyboard.dismiss();
        setSearchUseCase('');
      };
    return (
      <CustomBottomSheet
          style={style.alignCenter}
          bgColor={colors.bgQuaternary}
          bottomSheetRef={bottomSheetRef}
          snapPoint={['90%']}
          contentHeight={false}
          header={
            <View style={currstyle.pt_18}>
              <Text style={[currstyle.title, currstyle.mb_24]}>{data?.title}</Text>
              <CustomInput
                onChangeText={text => setSearchUseCase(text)}
                bgColor={colors.bgQuaternary}
                value={searchUseCase}
                leftIcon={
                  <Search fill={colors.btnPrimary} height={rs(15)} width={rs(15)} />
                }
                style={currstyle.textInput}
                placeholder={trans('Type here')}
                rightIcon={
                  searchUseCase && (
                    <Pressable
                      onPress={handleCancelSearchText}
                      style={currstyle.cancelBtn}>
                      <Cancel
                        fill={colors.btnPrimary}
                        height={rs(9)}
                        width={rs(9)}
                      />
                    </Pressable>
                  )
                }
              />
           </View>
          }
          >
      
        <ScrollView keyboardShouldPersistTaps={'always'}>
            {data?.value?.length > 1 &&
            search(allUseCases)?.map((item, index) => {
                return (
                <Fragment key={index}>
                    {index !== 0 && <View style={style.textBottomBorder}></View>}
                    <TouchableOpacity
                    key={item?.id}
                    style={useCaseStyle.textContainer}
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
                    <Text style={Object.values(selectedItem[name])[0] == Object.values(item)[0] ?[style.textStyle, style.activeTextColor]: style.textStyle}>{item.name}</Text>
                    </TouchableOpacity>
                </Fragment>
                );
            })}
        </ScrollView>
    </CustomBottomSheet>
    )
  }

export default UseCaseBottomsheet