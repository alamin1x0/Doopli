import { View, Text, TouchableOpacity, FlatList, Platform, PermissionsAndroid } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BillingSyles } from './BillingSyles';
import { useNavigation, useTheme } from '@react-navigation/native';
import { statusSyles } from './StatusStyle';
import DownloadIcon from '../../../assets/svg/download-01.svg';
import PayNowIcon from '../../../assets/svg/arrow-up-right.svg';
import { BILLING_DETAILS, RENEWWEBVIEW } from '../../../navigation/routeName/routeName';
import { useDispatch, useSelector } from 'react-redux';
import { getBillingHistory, getMoreBillingHistory } from '../../../features/slices/billing/getBillingHistory';
import { textHistoryStyle } from '../../TextGenerator/TextHistory/TextHistoryStyle';
import Loader from '../../../utils/Loader/Loader';
import { useState } from 'react';
import config from '../../../../config';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import { postInfo } from '../../../features/auth/login/loginApi';
import { handleToaster } from '../../../utils/CustomAlert/handleAlert';
const URL= `${config.BASE_URL}/user/subscriptions/history`;
const BillingHisty = () => {
  const {t:trans} = useTranslation();
  const {colors} = useTheme();
  const styles= BillingSyles(colors);
  const textHiststyles= textHistoryStyle(colors);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const {billingHistory,loading, loadmore, nextPageUrl}= useSelector(state=>state.getBillingHistory) || {};
  const {user:{token}}= useSelector(state=>state.loginUserReducer) || {};
  const dispatch = useDispatch();
  const {Preferences} = useSelector(state => state.getPreferences);
  const {user}= useSelector(state=>state.loginUserReducer) || {};
  const {company_logo_light, company_name, company_street, company_city,company_zip_code,company_phone, company_email} = Preferences[0].company;

  const handleNavigateDetails=(item)=>{
      navigation.navigate(BILLING_DETAILS, {item, handleCreatePdf})
  }

  const handlePayNow=async (id)=>{
    const URL = `${config.BASE_URL}/user/subscriptions/history/${id}/bill/pay`
    const res =await postInfo(null, URL, token, 'POST');
    if(res?.response?.status?.code ==200){
       navigation.navigate(RENEWWEBVIEW,{payment_link: res?.response?.records?.data?.payment_link})
    }
  }


  async function createPDF(htmlText, filename) {
    let options = {
      html: htmlText,
      fileName: filename,
      directory: Platform.OS==='android' ? RNFS.DownloadDirectoryPath : RNFS.DocumentDirectoryPath,
    };
  
    try {
      const granted = Platform.OS==='android' && await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'App needs access to your storage to save the document.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if ( Platform.OS==='android' ? granted === PermissionsAndroid.RESULTS.GRANTED : Platform.OS==='ios') {
        let file = await RNHTMLtoPDF.convert(options);
        const filePath = file.filePath;
        const destinationPath = `${Platform.OS==='android' ? RNFS.DownloadDirectoryPath : RNFS.DocumentDirectoryPath}/${filename}.pdf`;
        await RNFS.moveFile(filePath, destinationPath);
        handleToaster(trans("PDF downloaded successfilly"), 'success', colors);
      }
      else {
        handleToaster(trans('System permissions denied'), 'warning',colors);
      }
     
    } catch (error) {
      handleToaster(trans('Failed to create and save PDF.'),'warning', colors);
    }
  }
  
  const handleCreatePdf = (item) => {
    let date = new Date(); 
    const htmlText = `<div id="invoice-view-container" style="padding-top: 12px;">
    <div id="printTable">
        <div>
            <div class="invoice-side" style="width: 50%; float: left;">
                <img class="artifism-logo" src=${company_logo_light} alt="{{ __('Image') }}"
                    style="height: 42px; width: 155px; object-fit: contain;">
            </div>
            <div class="address-side" style="float: right; width: 50%; text-align: left;">
                <div>
                    <p class="name"
                        style="font-family: 'Figtree', sans-serif; font-weight: 400; font-size: 12px; margin: 0px; line-height: 18px; text-align: left; color: #141414;">${company_name}</p>
                </div>
                <div>
                    <p class="phone-email"
                        style="font-family: 'Figtree', sans-serif; font-weight: 400; font-size: 12px; line-height: 18px; margin-bottom: 0px; text-align: left; color: #141414; margin-top: 4px;">
                        ${company_street}, ${company_city}</p>
                    <p class="phone-email"
                        style="font-family: 'Figtree', sans-serif; font-weight: 400; font-size: 12px; line-height: 18px; text-align: left; color: #141414;">${company_zip_code}</p>
                </div>
                <p class="phone-email"
                    style="font-family: 'Figtree', sans-serif; font-weight: 400; font-size: 12px; line-height: 18px; color: #141414;">
                    Web: <a class="company-info-url" href="{{ url('/') }}"
                        style="color: #763CD4;">${config.BASE_URL.replace('/api/V1', '')}</a>
                </p>
            </div>
            <div class="clear-both" style="clear: both;"></div>
        </div>
        <div class="border-1"
            style="border-top: 1px solid #DFDFDF; margin-top: 36px; padding-top: 36px;">
            <p class="invoice"
                style="font-family: 'Figtree', sans-serif; font-style: normal; font-weight: 700; font-size: 22px; padding: 0px; margin-top: 34px; margin-bottom: 0px; line-height: 30px; color: #141414; text-transform: uppercase;">
                invoice</p>
            <p class="code"
                style="font-family: 'Figtree', sans-serif; font-style: normal; font-weight: 400; padding: 0px; margin-top: 10px; margin-bottom: 0px; font-size: 14px; line-height: 22px; color: #141414;">
                Code: ${item?.code}</p>
        </div>
        <div class="mt-36px" style="margin-top: 36px;">
            <div class="invoice-side" style="width: 50%; float: left;">
                <p class="billed-to"
                    style="font-family: 'Figtree', sans-serif; font-style: normal; font-weight: 600; font-size: 11px; line-height: 16px; padding: 0px; text-transform: uppercase; color: #898989; margin-top: 0px; margin-bottom: 0px;">
                    Billed To</p>
                <p class="sub-user-name"
                    style="font-family: 'Figtree', sans-serif; font-style: normal; font-weight: 600; font-size: 20px; line-height: 28px; margin-top: 0px; padding: 0px; margin-bottom: 0px; color: #141414;">
                    ${item?.user_name}</p>
                <p class="sub-user-email"
                    style="font-family: 'Figtree', sans-serif; font-style: normal; font-weight: 400; font-size: 14px; line-height: 22px; padding: 0px; margin-top: 0px; margin-bottom: 0px; color: #141414;">
                    ${user?.email}</p>
                <p class="status"
                    style="font-family: 'Figtree', sans-serif; font-style: normal; font-weight: 600; font-size: 14px; line-height: 22px; color: #3C914F; padding: 0px; margin-top: 0px; margin-bottom: 0px; text-transform: uppercase;">
                    ${item?.payment_status}</p>
            </div>
            <div class="address-side" style="float: right; width: 50%; text-align: left;">
                <p class="subscription"
                    style="font-family: 'Figtree', sans-serif; font-style: normal; font-weight: 600; font-size: 11px; line-height: 16px; text-transform: uppercase; padding: 0px; margin-top: 0px; margin-bottom: 0px; color: #898989;">
                   SUBSCRIPTION
                <p class="btn-{{ $subscription->status == 'Active' ? 'paid' : 'unpaid' }} active-status"
                    style="font-family: 'Figtree', sans-serif; font-style: normal; font-weight: 600; font-size: 14px; line-height: 22px; padding: 0px; margin-top: 10px; margin-bottom: 0px; color: #141414;">
                    Status:${item?.status}
                </p>
                <p class="bill-date"
                    style="font-family: 'Figtree', sans-serif; font-style: normal; font-weight: 600; font-size: 14px; line-height: 22px; padding: 0px; margin-top: 0px; margin-bottom: 0px; color: #141414;">
                   Billing Date: ${item?.billing_date}</p>
                <p class="bill-date"
                    style="font-family: 'Figtree', sans-serif; font-style: normal; font-weight: 600; font-size: 14px; line-height: 22px; padding: 0px; margin-top: 0px; margin-bottom: 0px; color: #141414;">
                    Next Billing Date: ${item?.next_billing_date}</p>
            </div>
            <div class="clear-both" style="clear: both;"></div>
        </div>
    </div>
    <div class="mt-28px" style="margin-top: 28px;">
        <table class="table" style="width: 100%; border-collapse: collapse;">
            <thead  class="thead text-left"
                style="background-color: #F6F3F2; width: 100%; font-family: 'Figtree', sans-serif; font-weight: 600; font-size: 11px; line-height: 16px; background-color: #F6F3F2; color: #898989; text-align: left;">
                <tr>
                  <th class="td width-280 text-left"
                      style="padding: 12px; font-family: 'Figtree', sans-serif; font-weight: 600; font-size: 11px; line-height: 16px;  color: #898989; text-transform: uppercase;">
                      Plan</th>
                  <th class="text-left td width-280"
                      style="padding: 12px; font-family: 'Figtree', sans-serif; font-weight: 600; font-size: 11px; line-height: 16px;  color: #898989;">
                      Billing Cycle</th>
                  <th class="td text-left"
                      style="padding: 12px; font-family: 'Figtree', sans-serif; font-weight: 600; font-size: 11px; line-height: 16px; color: #898989;">
                      Renewable</th>
                  <th class="text-center"
                      style="padding: 12px; font-family: 'Figtree', sans-serif; font-weight: 600; font-size: 11px; line-height: 16px; color: #898989;">
                      Tax</th>
                  <th class="whitespace-nowrap text-right"
                      style="padding: 12px; font-family: 'Figtree', sans-serif; font-weight: 600; font-size: 11px; line-height: 16px;  color: #898989; white-space: nowrap;">
                     Total
                  </th>
               </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="td width-280 text-left"
                        style="padding: 24px 12px; border-bottom: 1px solid #dfdfdf; font-family: 'Figtree', sans-serif; font-weight: 500; font-size: 15px; line-height: 22px; color: #141414; text-transform: uppercase;">
                        ${item?.package_name}</td>
                    <td class="text-left td width-280"
                        style="padding: 24px 12px; border-bottom: 1px solid #dfdfdf; font-family: 'Figtree', sans-serif; font-weight: 500; font-size: 15px; line-height: 22px; color: #141414;">
                        <p>${item?.billing_cycle}</p>
                    </td>
                    <td class="td text-left"
                        style="padding: 24px 12px; border-bottom: 1px solid #dfdfdf; font-family: 'Figtree', sans-serif; font-weight: 500; font-size: 15px; line-height: 22px;  color: #141414;">
                        <p>${trans(item?.renewable ? "Yes" : 'No')}</p>
                    </td>
                    <td class="td text-center"
                        style="padding: 24px 12px; border-bottom: 1px solid #dfdfdf; font-family: 'Figtree', sans-serif; font-weight: 500; font-size: 15px; line-height: 22px; color: #141414; text-align: center;">
                        <p class="text-center">0</p>
                    </td>
                    <td class="td text-right"
                        style="padding: 24px 12px; border-bottom: 1px solid #dfdfdf; font-family: 'Figtree', sans-serif; font-weight: 500; font-size: 15px; line-height: 22px; color: #141414; text-align: right;">
                        <p>${item?.amount_billed}</p>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="footer-text color-89"
                        style="font-family: 'Figtree', sans-serif; font-style: normal; font-weight: 500; font-size: 14px; line-height: 22px; padding: 8px 12px; color: #898989;">
                         Sub Total</td>
                    <td></td>
                    <td class="footer-text color-89 text-right"
                        style="font-family: 'Figtree', sans-serif; font-style: normal; font-weight: 500; font-size: 14px; line-height: 22px; padding: 8px 12px; color: #898989; text-align: right;">
                        ${item?.amount_billed}</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="border-bottom footer-text color-89"
                        style="border-bottom: 1px solid #dfdfdf; font-family: 'Figtree', sans-serif; font-style: normal; font-weight: 500; font-size: 14px; line-height: 22px; padding: 8px 12px; color: #898989;">
                       Other discount</td>
                    <td class="border-bottom"></td>
                    <td class="border-bottom footer-text color-89 text-right"
                        style="border-bottom: 1px solid #dfdfdf; font-family: 'Figtree', sans-serif; font-style: normal; font-weight: 500; font-size: 14px; line-height: 22px; padding: 8px 12px; color: #898989; text-align: right;">
                        0.00</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="footer-text color-14"
                        style="font-family: 'Figtree', sans-serif; font-style: normal; font-weight: 500; font-size: 14px; line-height: 22px; padding: 8px 12px; color: #141414;">
                        Grand Total</td>
                    <td></td>
                    <td class="footer-text color-14 text-right"
                        style="font-family: 'Figtree', sans-serif; font-style: normal; font-weight: 500; font-size: 14px; line-height: 22px; padding: 8px 12px; color: #141414; text-align: right;">
                        ${item?.amount_billed}</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="footer-text color-89"
                        style="font-family: 'Figtree', sans-serif; font-style: normal; font-weight: 500; font-size: 14px; line-height: 22px; padding: 8px 12px; color: #898989;">
                        Paid</td>
                    <td></td>
                    <td class="footer-text color-89 text-right"
                        style="font-family: 'Figtree', sans-serif; font-style: normal; font-weight: 500; font-size: 14px; line-height: 22px; padding: 8px 12px; color: #898989; text-align: right;">
                        ${item?.amount_received}</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="footer-text color-89"
                        style="font-family: 'Figtree', sans-serif; font-style: normal; font-weight: 500; font-size: 14px; line-height: 22px; padding: 8px 12px; color: #898989;">
                        Due</td>
                    <td></td>
                    <td class="footer-text color-89 text-right"
                        style="font-family: 'Figtree', sans-serif; font-style: normal; font-weight: 500; font-size: 14px; line-height: 22px; padding: 8px 12px; color: #898989; text-align: right;">
                        ${parseFloat(item?.billing_price.replace(/[^0-9.-]+/g, ''))- parseFloat(item?.amount_received.replace(/[^0-9.-]+/g, ''))}</td>
                </tr>
            </tfoot>
        </table>
    </div>
    <div>
        <p class="keep-in-touch"
            style="font-family: 'Figtree', sans-serif; font-weight: 700; font-size: 18px; line-height: 26px; text-align: left; text-transform: uppercase; margin-top: 32px; margin-bottom: 0px; color: #141414;">
            Keep in touch</p>
        <p class="concern-queries"
            style="font-family: 'Figtree', sans-serif; font-weight: 500; font-size: 14px; line-height: 22px; text-align: left; margin-top: 12px; margin-bottom: 0px; color: #898989;">
            If you have any queries, concerns or suggestions,</p>
        <p class="concern-queries mt-0"
            style="font-family: 'Figtree', sans-serif; font-weight: 500; font-size: 14px; line-height: 22px; text-align: left; color: #898989; margin-top: 0px;">
            please email us: <span class="email"
                style="color: #763CD4; text-decoration: underline;">${company_email}</span></p>
        <p class="helpline"
            style="font-family: 'Figtree', sans-serif; font-weight: 500; font-size: 12px; line-height: 18px; text-align: left; padding-top: 20px; margin-bottom: 0px; margin-top: 0px; text-transform: uppercase; color: #141414;">
            Helpline</p>
        <p class="phone-number"
            style="font-family: 'Figtree', sans-serif; font-weight: 600; font-size: 18px; line-height: 26px; text-align: left; text-transform: uppercase; color: #141414; margin-top: 7px; margin-bottom: 0px;">
           ${company_phone}</p>
        <p class="copy-right"
            style="font-family: 'Figtree', sans-serif; font-weight: 500; font-size: 11px; line-height: 16px; text-align: center; border-top: 1px solid #dfdfdf; padding-top: 12px; margin-bottom: 12px; margin-top: 20px; color: #898989;">
            ©2023, ${company_name}. All rights reserved.</p>
    </div>
</div>

                     `;
    const filename = 'new_document' + Math.floor(date.getTime() + date.getSeconds() / 2);

    createPDF(htmlText, filename);
  }


  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleNavigateDetails(item)} style={styles.container}>
        <View style={styles.flexView}>
          <View>
            <Text style={item.status !== 'Expired' ? [styles.title] : [styles.title, styles.expiredText]}>
              {item?.package_name}
            </Text>
            <Text style={styles.subTitle}>{item?.billing_date}</Text>
          </View>
          <View>
            <Text style={statusSyles(colors, item.status)}>{item?.status}</Text>
          </View>
        </View>
        <View style={[styles.flexContain, styles.mt_20]}>
          <View>
            <Text style={item.status !== 'Expired' ? [styles.heading_1] : [styles.heading_1, styles.expiredText]}>{item?.billing_price}</Text>
          </View>
          <TouchableOpacity onPress={()=> item?.status =='Pending' ? handlePayNow(item?.id) : handleCreatePdf(item)} style={styles.flexContain}>
            {item.status !== 'Expired' && (
              <>
                {item.status !== 'Pending' ? (
                  <DownloadIcon style={styles.downloadIcon} fill={colors.bottomSheetItem} />
                ) : (
                  item.payable && <PayNowIcon fill={colors.ifTertiaryVariant} style={styles.downloadIcon} />
                )}
                <Text style={item.status !== 'Pending' ? styles.title : styles.payTextColor}>
                  {item.status !== 'Pending' ? trans('Download Bill') : item.payable ? trans('Pay Now'): null}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
   const handleLoadMoreCategory=()=>{
       let isMounted = true;
       if(isMounted && nextPageUrl && !loadmore){
          dispatch(getMoreBillingHistory({token, nextPageUrl}))
       }
       return () => isMounted = false;
   }
   const handleRefresh=async()=>{
    setRefreshing(true);
    const data= await dispatch(getBillingHistory({token, URL}));
    if(data?.payload.response?.status?.code == 200){
      setRefreshing(false);
    }
   } 

  return (
    <FlatList
    data={billingHistory}
    style={styles.mv_7}
    keyExtractor={(item, index) => index.toString()}
    renderItem={renderItem}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="always"
    initialNumToRender={10}
    windowSize={10}
    onEndReachedThreshold={1}
    onEndReached={handleLoadMoreCategory}
    onRefresh={handleRefresh}
    refreshing={refreshing}
    ListFooterComponent={
      loadmore &&
    (
        <View style={textHiststyles.loaderCont}>
          <Loader
            source={require('../../../assets/lottie/loader.json')}
            size={{width: rs(65), height: rs(55)}}
            color={colors.textTertiaryVariant}
            />
        </View>
      )
    }
  />
  )
}

export default BillingHisty