import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { currentPlanStyle } from './CurrentPlanStyle';
import { useNavigation, useTheme } from '@react-navigation/native';
import GradientText from '../../../utils/Gradient/GradientText';
import TickIcon from '../../../assets/svg/tick-mark.svg';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import RightArrow from '../../../assets/svg/rightArrow.svg';
import { rs } from '../../../utils/styles/responsiveSize';
import { useEffect } from 'react';
import config from '../../../../config';
import { getCurrentSubscription } from '../../../features/slices/subscription/getCurrentPlan';
import { postInfo } from '../../../features/auth/login/loginApi';
import { RENEWWEBVIEW } from '../../../navigation/routeName/routeName';
import { useState } from 'react';
import Loader from '../../../utils/Loader/Loader';
const Curr_Plan_URL= `${config.BASE_URL}/user/subscriptions/plan`;
const Renew_Plan_URL= `${config.BASE_URL}/user/subscriptions/store`;

const CurrentPlan = () => {
  const {t:trans} = useTranslation();
  const {user: {token}} = useSelector(state => state.loginUserReducer) || {};
  const {colors} = useTheme();
  const dispatch  = useDispatch();
  const styles= currentPlanStyle(colors);
  const {theme} = useSelector(state => state.themeReducer);
  const navigation = useNavigation();
  const [webViewLoader, setWebViewLoader] = useState(false);
  const {currentSubscription: currentPlan} = useSelector(state => state.getCurrentPlan) || {};

  useEffect(()=>{
    async function checkCurrentPlan(){
      await dispatch(getCurrentSubscription({token, URL: Curr_Plan_URL}));
    }
   checkCurrentPlan();
  },[])
  const handleRenewPlan=async()=>{
    setWebViewLoader(true);
    const res =await postInfo({package_id: currentPlan.id}, Renew_Plan_URL, token, 'POST');
    if(res?.response?.status?.code ==200){
       navigation.navigate(RENEWWEBVIEW,{payment_link: res?.response?.records?.data?.payment_link});
       setWebViewLoader(false);
    }
  }
  
  return (
   
      <ScrollView showsVerticalScrollIndicator={false}>
         <View style={styles.container}>
            <Text style={styles.planName}>{trans(currentPlan?.name)}</Text>
            <View style={styles.gradientContainer}>
              <GradientText colors={theme==='light' ? ["#FD7F57", "#E22861", "#763CD4"] : ["#E60C84", "#FFCF4B"]} style={styles.price}>{currentPlan?.sale_price}</GradientText>
               <Text style={styles.billingCycle}>/ {trans(currentPlan?.billing_cycle)}</Text> 
            </View>
            <View>
              {
              currentPlan &&
              Object.keys(currentPlan?.features).length>0 &&
              Object.keys(currentPlan?.features).map((featureKey) => {
                const feature = currentPlan.features[featureKey];
                return (
                  <View key={featureKey} style={styles.featuresContainer}>
                     <TickIcon/>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureTitle}> {feature?.value}</Text>
                  </View>
                );
             })}
            </View>
            <View style={styles.renewPaymentBtn}>
              <LinearGradient
                          colors={['#A26EF7', '#763CD4']}
                          start={{ x: 0, y: 0.5 }}
                          end={{ x: 1, y: 0.5 }}
                          style={styles.br_8}
                          >
                    <CustomButton
                      style={{...styles.contentWidth}}
                      onPress={!webViewLoader && handleRenewPlan}
                      title={!webViewLoader ? trans('Renew Payment'):
                      <View>
                        <Loader
                          source={require('../../../assets/lottie/loader.json')}
                          size={{width: rs(65), height: rs(55)}}
                          color={colors.white}
                        />
                    </View>}
                      color={colors.white}
                      icon={!webViewLoader ?<RightArrow fill={'#fff'} height={rs(12)} width={rs(12)}/> : null}
                    />
                </LinearGradient>
            </View>
         </View>
      </ScrollView>

  )
}

export default CurrentPlan