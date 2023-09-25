import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react'
import WebView from 'react-native-webview'
import { SUBSCRIPTION } from '../../../navigation/routeName/routeName';
import { ActivityIndicator, StyleSheet } from 'react-native';
import config from '../../../../config';
import { useState } from 'react';
import { handleToaster } from '../../../utils/CustomAlert/handleAlert';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscription } from '../../../features/slices/subscription/getSubscription';
import { getPackageInfo } from '../../../features/slices/PackageInfoReducer/PackageInfoReducer';
const URL =`${config.BASE_URL}/user/subscriptions`;
const RenewWebView = ({route}) => {
   const navigation = useNavigation();
   const {user: {token}} = useSelector(state => state.loginUserReducer) || {};
   const {colors} = useTheme();
   const [load, setLoad] = useState(true);
   const dispatch = useDispatch();
    const getResponseFromView = (event) => {
      let paymentData = event.nativeEvent.data;
      paymentData = parseJson(paymentData);
      if(paymentData.status == 'success'){
         dispatch(getSubscription({token, URL}));
         handleToaster(paymentData.message, 'success',colors);
         dispatch(getPackageInfo({token}));
         navigation.navigate(SUBSCRIPTION);
      }
  };
  const parseJson = (parsableString) => {
    try {
        parsableString = JSON.parse(parsableString);
    } catch (e) {}
    return parsableString;
};
  const style= styles();
  return (
    <>
      {load &&  <ActivityIndicator style={style.activeIncatorStyle} size={"large"}/>}
       <WebView
          onLoadEnd={() => setLoad(false)}
          onMessage={getResponseFromView}
          source={{  uri: route.params.payment_link}}
          incognito={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}

        />
    </>
  )
}

export default RenewWebView

const styles=()=>{
  return StyleSheet.create({
   activeIncatorStyle:{
    backgroundColor:'white', 
    paddingTop: 15 
   }
  })
}