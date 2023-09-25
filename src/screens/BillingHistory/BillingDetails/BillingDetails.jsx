import { View, Text, Linking, Pressable , Platform, PermissionsAndroid} from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import { billingDetailsStyle } from './BillingDetailsStyle';
import { useTranslation } from 'react-i18next';
import config from '../../../../config';
import { useSelector } from 'react-redux';
import DownloadIcon from '../../../assets/svg/download-01.svg';
import { useLayoutEffect } from 'react';
import { rs } from '../../../utils/styles/responsiveSize';

const BillingDetails = ({route, navigation}) => {
  const {item, handleCreatePdf} = route.params;
  const {colors} = useTheme();
  const styles = billingDetailsStyle(colors);
  const {t:trans} = useTranslation();
  const {Preferences} = useSelector(state => state.getPreferences);

  const headerRightComponent = (
    <Pressable onPress={()=>handleCreatePdf(item)}>
      <DownloadIcon fill={'#fff'} height={rs(20)} width={rs(20)} />
    </Pressable>
  );
    useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => headerRightComponent,
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.pageContainer}>
        <View style={styles.BillingProfileContainer}>
           <View>
            <Text style={styles.title}>{Preferences[0]?.company?.company_name}</Text>
            <Text style={{ ...styles.lightText, ...styles.mt_4 }}>{Preferences[0]?.company?.company_street}, {Preferences[0]?.company?.company_city}</Text>
            <Text style={[styles.lightText,, styles.mt_4]}>{trans('Web')} : <Text onPress={() => Linking.openURL(config.BASE_URL.replace('/api/V1', ''))} style={styles.darkText}>{config.BASE_URL.replace('/api/V1', '')}</Text> </Text>
           </View>
           <View style={styles.sepSectionAlignment}>
            <Text style={styles.darkText}>{trans('Bill To')}</Text>
            <Text style={styles.title}>{item?.user_name}</Text>
           </View>
           <View>
            <Text style={{ ...styles.sepSectionAlignment, ...styles.darkText }}>{item?.code}</Text>
            <Text style={[styles.lightText,styles.mt_4]}>{trans('Billing Date')} : {item?.billing_date}</Text>
            <Text style={[styles.lightText,styles.mt_4]}>{trans('Next Billing Date') }: {item?.next_billing_date}</Text>
           </View>
        </View>
        <View style={styles.BillingProfileContainer}>
             <View style={styles.SubcriptionPlan}>
               <View style={styles.singlePlan}>
                  <Text style={styles.lightText}>{trans('Plan')}</Text>
                  <Text style={styles.darkText}>{trans(item?.package_name)}</Text>
               </View>
               <View>
                  <Text style={styles.lightText}>{trans('Billing Cycle')}</Text>
                  <Text style={styles.darkText}>{trans(item?.billing_cycle)}</Text>
               </View>
             </View>
             <View style={{ ...styles.SubcriptionPlan, ...styles.align_start }}>
               <View style={styles.singlePlan}>
                 <Text style={styles.lightText}>{trans('Gateway')}</Text>
                  <Text style={styles.darkText}>{trans(item?.payment_method)}</Text>
               </View>
               <View>
                  <Text style={styles.lightText}>{trans('Renewable')}</Text>
                  <Text style={styles.darkText}>{trans(item?.renewable ? "Yes" : 'No')}</Text>
                  <View style={styles.totalContainer}>
                    <Text style={styles.lightText}>{trans('Total')}</Text>
                    <Text style={[styles.darkText, styles.total_price_text]}>{item?.billing_price}</Text>
                  </View>
               </View>
             </View>
            <View style={styles.subGrandTotalSection}>
              <View style={styles.SubcriptionPlan}>
                <View style={styles.singlePlan}>
                    <Text style={styles.lightText}>{trans('Subtotal')}</Text>
                    <Text style={styles.darkText}>{item?.billing_price}</Text>
                </View>
                <View>
                    <Text style={styles.lightText}>{trans('Grand Total')}</Text>
                    <Text style={styles.darkText}>{item?.billing_price}</Text>
                </View>
              </View>
            </View>
            <View style={styles.SubcriptionPlan}>
               <View style={styles.singlePlan}>
                  <Text style={styles.lightText}>{trans('Paid')}</Text>
                  <Text style={styles.darkText}>{item?.amount_received}</Text>
               </View>
               <View>
                  <Text style={styles.lightText}>{trans('Due')}</Text>
                  <Text style={styles.darkText}>${parseFloat(item?.billing_price.replace(/[^0-9.-]+/g, ''))- parseFloat(item?.amount_received.replace(/[^0-9.-]+/g, ''))}</Text>
               </View>
             </View>
            
        </View>
    </ScrollView>
  )
}

export default BillingDetails