import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import GradientText from '../../../utils/Gradient/GradientText';
import TickIcon from '../../../assets/svg/tick-mark.svg';
import RightArrow from '../../../assets/svg/rightArrow.svg';
import { useNavigation, useTheme } from '@react-navigation/native';
import { currentPlanStyle } from '../CurrentPlan/CurrentPlanStyle';
import { planstyles } from './AllPlans';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';
import { rs } from '../../../utils/styles/responsiveSize';
import { postInfo } from '../../../features/auth/login/loginApi';
import { RENEWWEBVIEW } from '../../../navigation/routeName/routeName';
import config from '../../../../config';
import { allPlansStyle } from './AllPlansStyle';
import { textHistoryStyle } from '../../TextGenerator/TextHistory/TextHistoryStyle';
import { useState } from 'react';
import Loader from '../../../utils/Loader/Loader';
import { profileStyle } from '../../Profile/profileStyle';
const Renew_Plan_URL= `${config.BASE_URL}/user/subscriptions/store`;
const SubscribePlans = () => {
    const {allSubscriptionsPlans, plansloader,max_price} = useSelector(state => state.getAllPlans) || {};
    const {user: {token}} = useSelector(state => state.loginUserReducer) || {};
    const {colors} = useTheme();
    const navigation = useNavigation();
    const {t:trans} = useTranslation();
    const {theme} = useSelector(state => state.themeReducer);
    const [webViewLoader, setWebViewLoader] = useState(false);
    const styles= currentPlanStyle(colors);
    const profileStyles= profileStyle(colors);
    const allPlanStyle = allPlansStyle(colors);
    const textHisstyles = textHistoryStyle(colors);
    const [selectedplan, setSelectedPlan] = useState(null);

    const handleRenewPlan=async(id)=>{
      setSelectedPlan(id);
      setWebViewLoader(true);
      const res =await postInfo({package_id: id}, Renew_Plan_URL, token, 'POST');
      if(res?.response?.status?.code ==200){
         navigation.navigate(RENEWWEBVIEW,{payment_link: res?.response?.records?.data?.payment_link});
         setWebViewLoader(false);
      }
    }
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
                     title={(!webViewLoader || selectedplan!=item?.id) ? trans('Subscribe Plan'):
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

export default SubscribePlans