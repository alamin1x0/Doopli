import { View, Text, ScrollView, Modal, RefreshControl } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation, useTheme } from '@react-navigation/native';
import GradientText from '../../../utils/Gradient/GradientText';
import { SubscriptionPlanSyle } from './SubscriptionPlanSyle';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import { ALLPLANS, CURRENTPLAN } from '../../../navigation/routeName/routeName';
import RightArrow from '../../../assets/svg/rightArrow.svg';
import {rs} from '../../../utils/styles/responsiveSize';
import MyProfile from '../../components/MyProfile/MyProfile';
import {profileStyle} from '../../Profile/profileStyle';
import { useDispatch, useSelector} from 'react-redux';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { handleToaster } from '../../../utils/CustomAlert/handleAlert';
import { getInfo, postInfo } from '../../../features/auth/login/loginApi';
import config from '../../../../config';
import { CloseAppStyle } from '../../Home/CloseAppStyle';
import { useState } from 'react';
import { modalBottomSheetStyle } from '../../components/components/Modals/ModalBottomSheet/modalBottomSheet.style';
import ButtonOutline from '../../components/Buttons/ButtonOutline/ButtonOutline';
import Loader from '../../../utils/Loader/Loader';
import { getSubscription } from '../../../features/slices/subscription/getSubscription';

const SUB_URL =`${config.BASE_URL}/user/subscriptions`;
const SubscriptionPlan = () => {
    const {user: {token}} = useSelector(state => state.loginUserReducer) || {};
    const {subscriptionInfo} = useSelector(state => state.getSubscription) || {};
    const {currentSubscription} = useSelector(state => state.getCurrentPlan) || {};
    const {subscriptionSetting} = useSelector(state => state.getSubscriptionSetting) || {};
    const {t:trans}= useTranslation();
    const navigation = useNavigation(); 
    const {colors} = useTheme();
    const styles= SubscriptionPlanSyle(colors);
    const closeModalStyle = CloseAppStyle(colors);
    const bsExtraStyle = modalBottomSheetStyle(colors);
    const [closeModal, setCloseModal] = useState(false);
    const [cacelLoader, setCancelLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const handlePlan=()=>{
        navigation.navigate(CURRENTPLAN,{currentPlan: currentSubscription});
    }
 
    const profileSyles = profileStyle(colors);
    const {
      user: {name, email, picture},
    } = useSelector(state => state.loginUserReducer);
    const {data, features} = subscriptionInfo;
    const imageResolutionFeature = features["image-resolution"];
 
    const handleCancel = async()=>{
      (!data.cancelable)? 
      handleToaster(trans('Cancellable plan are limited to only active subscriptions'),'warning',colors):
      setCloseModal(true);       
    }

    const CancelSubscription =async () => {
      setCancelLoader(true);
      let res, URL= `${config.BASE_URL}/user/subscriptions/cancel`;
      res = await postInfo(null, URL, token, "POST");
      if(res?.response?.status?.code == 200){
        await dispatch(getSubscription({token, URL: SUB_URL}));
        setCloseModal(false); 
        handleToaster(trans('The Package Subscription has been successfully canceled.'),'success',colors);
        setCancelLoader(false);
      }
    };

    const handleRefresh=async()=>{
      setRefreshing(true);
      const data= await dispatch(getSubscription({token, URL: SUB_URL}));
      if(data?.payload.response?.status?.code == 200){
        setRefreshing(false);
      }
     
    }

    const handleAllPlans=()=>{
      subscriptionSetting &&
      navigation.navigate(ALLPLANS);
    }
    
  return (
    <ScrollView
        style={profileSyles.scroll_view}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        >
      <View style={styles.pb_20} >
        <View style={[styles.container, styles.bg_29]}>
            <Text style={styles.heading_3}>{trans('Subscription')}</Text>
            <View style={styles.Subs_contain}>
                <GradientText 
                    colors={["#E60C84", "#FFCF4B"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    locations={[0, 1]}
                    style={styles.subStatus}
                >
                  {trans(data?.package_name)}
                </GradientText>
                <Text style={styles.heading_4}>{trans(data?.status)}</Text>
            </View>
            {Object.keys(features).length>0  && 
             <View style={styles.mt_20}>
                <View>
                    <Text style={styles.heading_4}>{trans('Words')}</Text>
                    <ProgressBar used={features?.word?.used} limit={features?.word?.limit} percentage={100 - features?.word?.percentage} />
                </View>
                <View style={styles.mt_24}>
                    <View style={styles.Subs_contain}>
                      <Text style={styles.heading_4}>{trans('Images')}</Text>
                      <Text style={styles.heading_4}>{trans('Max Resolution  ')}{ imageResolutionFeature?.limit}</Text>
                    </View>
                    <ProgressBar  used={features?.image?.used} limit={features?.image?.limit} percentage={100 - features?.image?.percentage} />
                </View>
             </View>
             }
           
        </View>
        <View style={styles.container}>
          <View >
              <MyProfile
                name={name}
                color={colors.bottomSheetTitle}
                rightImage={
                  <ProfileImage
                    imageURL={picture}
                    badgeIconBg={colors.cornflowerBlue}
                    badgeIconBgSize={rs(21)}
                    defaultColor={colors.green}
                    imageSize={rs(52)}
                  />
                }
                email={email}
                subscription={true}
              />
          </View>

          <View style={[styles.flexContain, styles.mt_20]}>
            <View style={styles.flexView}>
              <Text style={styles.heading_2}>{trans('Billing Price')}</Text>
              <Text style={[styles.heading_1, styles.pb_16]}>{data?.billing_price}</Text>
            </View>

            <View style={styles.flexView}>
              <Text style={styles.heading_2}>{trans('Billing Cycle')}</Text>
              <Text style={[styles.heading_1, styles.pb_16]}>{trans(data?.billing_cycle)}</Text>
            </View>

            <View style={styles.flexView}>
              <Text style={styles.heading_2}>{trans('Payment Status')}</Text>
              <Text style={styles.heading_1}>{trans(data?.status)}</Text>
            </View>

            <View style={styles.flexView}>
              <Text style={styles.heading_2}>{trans('Next Billing Date')}</Text>
              <Text style={styles.heading_1}>{data?.next_billing_date}</Text>
            </View>
          </View>

          <View style={styles.mt_20}>
            <LinearGradient
                      colors={['#A26EF7', '#763CD4']}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                      style={styles.br_8}
                      >
                <CustomButton
                  onPress={handlePlan}
                  title={trans('Renew Plan')}
                  color={colors.white}
                  />
            </LinearGradient>
          </View>
        </View>

        <View style={styles.container}>
            <Text style={{ ...styles.title }}>
                {trans('Running out of credits too soon')}?
            </Text>
            <Text style={{ ...styles.subTitle }}>
              {trans('Upgrade to our more featured plans for more credits & benefits.')}
            </Text>

            <View style={styles.mt_20}>
              <LinearGradient
                        colors={['#141414', '#141414']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}  
                        style={styles.br_8}
                        >
                  <CustomButton
                    title={trans('See All Plans')}
                    color={colors.white}
                    icon={<RightArrow style={profileSyles.navIcon} fill={'#fff'} height={rs(12)} width={rs(12)}/>}
                    onPress={handleAllPlans}
                  />
              </LinearGradient>
          </View>
        </View>

        <View style={styles.container}>
            <Text style={{ ...styles.title }}>
                {trans('Unsubscribe')}
            </Text>
            <Text style={{ ...styles.subTitle }}>
              {trans('Cancelling your subscription will not cause you to lose all your credits and plan benefits. But you can subscribe again anytime and get to keep all your saved documents & history.')}
            </Text>
           
            <View style={styles.mt_20}>
              <LinearGradient
                        colors={['#fff', '#fff']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.br_8}
                        >
                  <CustomButton onPress={handleCancel} style={styles.borderContain}
                    title={trans('Cancel Subscription')}
                    color={colors.bottomSheetTitle}
                  />
              </LinearGradient>
          </View>
        </View>
      </View>
       <View style={closeModalStyle.centeredView}>
          <Modal animationType="fade" transparent={true} visible={closeModal}>
            <View style={closeModalStyle.centeredView}>
              <View style={closeModalStyle.modalView}>
                <Text style={bsExtraStyle.deleteConfirmationText}>
                  {trans('Are you sure to cancel the subscription')}?
                </Text>
                <View>
                  <View style={bsExtraStyle.btnCont}>
                    <ButtonOutline
                      style={bsExtraStyle.btnCancel}
                      title={trans('Cancel')}
                      onPress={() => {
                        setCloseModal(false);
                      }}
                    />
                    <ButtonOutline
                      style={bsExtraStyle.btnDelete}
                      title={ !cacelLoader ? trans('OK') :
                      <Loader
                        source={require('../../../assets/lottie/loader.json')}
                        size={{width: rs(47), height: rs(47)}}
                        color={colors.white}
                      />}
                      onPress={CancelSubscription}
                      bgColor={colors.sunshade}
                      borderColor={colors.sunshade}
                      color={colors.gunPowder}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
    </ScrollView>
  )
}

export default SubscriptionPlan