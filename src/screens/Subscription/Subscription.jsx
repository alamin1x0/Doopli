import { View, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import EmptySubscription from './EmptySubscription/EmptySubscription'
import SubscriptionPlan from './SubscriptionPlan/SubscriptionPlan';
import config from '../../../config';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rs } from '../../utils/styles/responsiveSize';
import { getSubscription } from '../../features/slices/subscription/getSubscription';
import { getAllSubscriptionsPlans } from '../../features/slices/subscription/getAllPlans';
import { getCurrentSubscription } from '../../features/slices/subscription/getCurrentPlan';
import { getSubscriptionSetting } from '../../features/slices/subscription/getSubscriptionSetting';

const URL =`${config.BASE_URL}/user/subscriptions`;
const Curr_Plan_URL= `${config.BASE_URL}/user/subscriptions/plan`;
const All_Plan_URL = `${config.BASE_URL}/plans`;
const settingSURl= `${config.BASE_URL}/user/subscriptions/setting`;

const Subscription = () => {
  const {user: {token}} = useSelector(state => state.loginUserReducer) || {};
  const {subscriptionInfo, loading} = useSelector(state => state.getSubscription) || {};
  
  const dispatch = useDispatch();

  useEffect(()=>{
   async function checkSubscriptionInfo(){
      await dispatch(getSubscription({token, URL}));
      await dispatch(getAllSubscriptionsPlans({token, URL: All_Plan_URL}));
      await dispatch(getCurrentSubscription({token, URL: Curr_Plan_URL}));
      await dispatch(getSubscriptionSetting({token, URL: settingSURl}))
   }

    checkSubscriptionInfo();
  },[])
  
  
  return (
    <View style={styles.container}>
      <>
        {loading &&  !subscriptionInfo?
        <ActivityIndicator style={styles.mt_15} size={"large"}/>
        :
        !subscriptionInfo  ?
        <EmptySubscription/>:
        <SubscriptionPlan/>
        }      
      </>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  mt_15:{
    marginTop: rs(15)
  }
});

export default Subscription