import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { textHistoryStyle } from '../../TextGenerator/TextHistory/TextHistoryStyle';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const EmptyBilling = () => {
  const {colors}= useTheme();
  const {t: trans} = useTranslation();
  const textHistoryStyles= textHistoryStyle(colors);
  const style= styles();
  return (
    <View style={style.pageAlignment}>
      <View style={textHistoryStyles.EmptyDataContainer}>
              <Text style={textHistoryStyles.emptyText}>{trans('No data is available to be displayed')}</Text>
      </View>
    </View>
  )
}

export default EmptyBilling

const styles=()=>{
  return StyleSheet.create({
    pageAlignment: {
      alignItems: 'center'
    }
  })
}