import {View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity} from 'react-native';
import React from 'react';
import InfoComponent from './infoComponent/InfoComponent';
import {useTheme} from '@react-navigation/native';
import {profileStyle} from './profileStyle';
import MyProfile from '../components/MyProfile/MyProfile';
import ProfileImage from '../components/ProfileImage/ProfileImage';
import {rs} from '../../utils/styles/responsiveSize';
import {EDIT_PROFILE, SUBSCRIPTION, BILLING} from '../../navigation/routeName/routeName';
import { useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import SubscriptionIcon from '../../assets/svg/subscription-card.svg';
import BillingCardIcon from '../../assets/svg/billing-card.svg';
import RightIcon from '../../assets/svg/rightArrow.svg';
import LinearGradient from 'react-native-linear-gradient';
import AccountCard from './AccountCard/AccountCard';
const Profile = ({navigation}) => {
  const {colors} = useTheme();
  const styles = profileStyle(colors);
  const {
    user: {name, email, picture},
  } = useSelector(state => state.loginUserReducer);
  const {t:trans} = useTranslation();
  const [fastLoad, setFastLoad] = useState(true);
  setTimeout(() => {
    setFastLoad(false);
  }, 0);
  if (fastLoad) return <View style={styles.scroll_view} />;

  const handleSubscription=()=>{
    navigation.navigate(SUBSCRIPTION);
  }
  const handleBilling=()=>{
    navigation.navigate(BILLING);
  }
  return (
    <KeyboardAvoidingView
      style={styles.onKeyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <ScrollView
        style={styles.scroll_view}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}>
        <View style={styles.container}>
         <LinearGradient
            colors={['#A26EF7', '#763CD4']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.br_12}
          >
            <MyProfile
              name={name}
              home={1}
              textColor="white"
              rightImage={
                <ProfileImage
                  imageURL={picture}
                  badgeIconBg={colors.cornflowerBlue}
                  badgeIconBgSize={rs(21)}
                  defaultColor={colors.green}
                  imageSize={rs(68)}
                  borderColor={colors.currencyIcon}
                  onPress={() => navigation.navigate(EDIT_PROFILE)}
                />
              }
              email={email}
              onPress={() => navigation.navigate(EDIT_PROFILE)}
              buttonTitle={trans('Edit Profile')}
            />
          </LinearGradient>
          <View style={styles.mrv_10}>
            <AccountCard onPress={handleSubscription} title={trans('Subscriptions')} CardIcon={<SubscriptionIcon/>} NavIcon={<RightIcon style={styles.navIcon} fill={'#898989'} height={rs(14)} width={rs(14)}/>} exist={true}/>
          </View>
          <View>
            <AccountCard onPress={handleBilling} title={trans('Billing History')} CardIcon={<BillingCardIcon/>} NavIcon={<RightIcon style={styles.navIcon} fill={'#898989'} height={rs(14)} width={rs(14)}/>} exist={true}/>
          </View>
          <>
            <InfoComponent info={trans('Name')} infoText={name} />
            <InfoComponent info={trans('Email')} infoText={email} lastElement={true} />
          </>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
