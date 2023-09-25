import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TickIcon from '../../../assets/svg/tick-mark.svg';
import RightArrow from '../../../assets/svg/rightArrow.svg';
import { useNavigation, useTheme } from '@react-navigation/native';
import { currentPlanStyle } from '../CurrentPlan/CurrentPlanStyle';
import GradientText from '../../../utils/Gradient/GradientText';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';
import { rs } from '../../../utils/styles/responsiveSize';
import { useEffect } from 'react';
import { getAllSubscriptionsPlans } from '../../../features/slices/subscription/getAllPlans';
import config from '../../../../config';
import { getSubscriptionSetting } from '../../../features/slices/subscription/getSubscriptionSetting';
import { postInfo } from '../../../features/auth/login/loginApi';
import { RENEWWEBVIEW } from '../../../navigation/routeName/routeName';
import { textHistoryStyle } from '../../TextGenerator/TextHistory/TextHistoryStyle';
import { allPlansStyle } from './AllPlansStyle';
import { useState } from 'react';
import Loader from '../../../utils/Loader/Loader';
import { profileStyle } from '../../Profile/profileStyle';

const All_Plan_URL = `${config.BASE_URL}/plans`;
const settingSURl= `${config.BASE_URL}/user/subscriptions/setting`;
const Renew_Plan_URL= `${config.BASE_URL}/user/subscriptions/store`;
const AllPlans = () => {
  const {colors} = useTheme();
  const {t:trans} = useTranslation();
  const navigation = useNavigation();
  const {theme} = useSelector(state => state.themeReducer);
  const styles= currentPlanStyle(colors);
  const profileStyles= profileStyle(colors);
  const textHisstyles= textHistoryStyle(colors);
  const allPlanStyle = allPlansStyle(colors);
  const {allSubscriptionsPlans, plansloader,max_price} = useSelector(state => state.getAllPlans) || {};
  const {user: {token}} = useSelector(state => state.loginUserReducer) || {};
  const {currentSubscription} = useSelector(state => state.getCurrentPlan) || {};
  const {subscriptionSetting} = useSelector(state => state.getSubscriptionSetting) || {};
  const [webViewLoader, setWebViewLoader] = useState(false);
  const [selectedplan, setSelectedPlan] = useState(null);

  const dispatch = useDispatch();
  useEffect(()=>{
    async function checkAllPlan(){
      await dispatch(getAllSubscriptionsPlans({token, URL: All_Plan_URL}));
      await dispatch(getSubscriptionSetting({token, URL: settingSURl}))
    }
    checkAllPlan()
  },[max_price])

  const handleRenewPlan=async(id)=>{
    setSelectedPlan(id);
    setWebViewLoader(true);
    const res =await postInfo({package_id: id}, Renew_Plan_URL, token, 'POST');
    if(res?.response?.status?.code ==200){
       navigation.navigate(RENEWWEBVIEW,{payment_link: res?.response?.records?.data?.payment_link});
       setWebViewLoader(false);
    }
  }
  const {downgrade: dp, change_plan: cp} = subscriptionSetting?.data;
 
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {allSubscriptionsPlans.length>0 ? allSubscriptionsPlans.map((item,index) =>{
        return (
          <View key={index} style={[styles.container, planstyles(max_price,parseFloat(item.sale_price.replace(/[^0-9.-]+/g, '')))]}>
            <Text style={styles.planName}>{trans(item?.name)}</Text>
            <View style={styles.gradientContainer}>
              <GradientText colors={theme==='light' ? ["#FD7F57", "#E22861", "#763CD4"] : ["#E60C84", "#FFCF4B"]} style={styles.price}>{parseFloat(item?.discount_price.replace(/[^0-9.-]+/g, '')) > 0 ? item?.discount_price : parseFloat(item?.sale_price.replace(/[^0-9.-]+/g, ''))==0 ? 'Free': item?.sale_price}</GradientText>
              <Text style={styles.billingCycle}>/ {trans(item?.billing_cycle)}</Text>
            </View>
            <View>
                {Object.keys(item?.features).length>0 && 
                Object.keys(item?.features).map((featureKey, index)=>{
                  const features = item?.features[featureKey];
                  return(
                    <View key={index} style={styles.featuresContainer}>
                        <TickIcon/>
                          <Text style={styles.featureTitle}>{features.title}</Text>
                          <Text style={styles.featureTitle}> {features?.value}</Text>
                    </View>
                  )
                }
                )}
            </View>
            { item?.id== currentSubscription?.id || cp && dp || (cp && !dp && parseFloat(currentSubscription?.sale_price.replace(/[^0-9.-]+/g, '')) < parseFloat(item?.sale_price.replace(/[^0-9.-]+/g, ''))) ?
             <View style={styles.renewPaymentBtn}>
             <LinearGradient
                         colors={['#A26EF7', '#763CD4']}
                         start={{ x: 0, y: 0.5 }}
                         end={{ x: 1, y: 0.5 }}
                         style={styles.br_8}
                         >
                   <CustomButton
                     style={{...styles.contentWidth}}
                     onPress={()=> !webViewLoader && handleRenewPlan(item?.id)}
                     title={(!webViewLoader || selectedplan != item?.id) ? item?.id== currentSubscription?.id ? trans('Renew Plan'):  parseFloat(currentSubscription?.sale_price.replace(/[^0-9.-]+/g, '')) < parseFloat(item?.sale_price.replace(/[^0-9.-]+/g, ''))  ? trans('Upgrade Plan') : trans('Downgrade Plan'): 
                     selectedplan == item?.id &&
                      <View>
                        <Loader
                          source={require('../../../assets/lottie/loader.json')}
                          size={{width: rs(65), height: rs(55)}}
                          color={colors.white}
                        />
                     </View>
                     }
                     color={colors.white}
                     icon={!webViewLoader ?<RightArrow style={profileStyles.navIcon} fill={'#fff'} height={rs(12)} width={rs(12)}/> : null}
                   />
               </LinearGradient>
           </View>
           :
           <></>
            }
           
         </View>
        )
      }
     
      ):
      <View style={allPlanStyle.emptyPageAlignment}>
        <View style={textHisstyles.EmptyDataContainer}>
                <Text style={textHisstyles.emptyText}>{trans('No Plan is available to be displayed')}</Text>
        </View>
      </View>
      }
      
    </ScrollView>
  )
}

export default AllPlans

export const planstyles=(max_price,salePrice)=>{
 return StyleSheet.create({
    borderWidth: max_price==salePrice ?1:0,
    borderColor: '#763CD4'
  })
}