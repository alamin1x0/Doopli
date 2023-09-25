import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import BillingHistory from './BillingHistory/BillingHistory';
import EmptyBilling from './EmptyBilling/EmptyBilling';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import config from '../../../config';
import { getBillingHistory } from '../../features/slices/billing/getBillingHistory';
import { rs } from '../../utils/styles/responsiveSize';
const URL= `${config.BASE_URL}/user/subscriptions/history`;

const Billing = () => {
  const data=true;
  const {user:{token}}= useSelector(state=>state.loginUserReducer) || {};
  const {billingHistory,loading,}= useSelector(state=>state.getBillingHistory) || {};
  const dispatch = useDispatch();
  useEffect(()=>{
    async function checkBillingHistory(){
      await dispatch(getBillingHistory({token, URL}));
    }
   
    checkBillingHistory(data);
  },[])

  return (
    <>
      {loading && billingHistory.length==0 &&
      <ActivityIndicator style={styles.mt_15} size={"large"}/>
      }
     { !loading && billingHistory.length==0?
      <EmptyBilling/>:
      <BillingHistory />
      }
    </>
  )
}

export default Billing

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  mt_15:{
    marginTop: rs(15)
  }
});