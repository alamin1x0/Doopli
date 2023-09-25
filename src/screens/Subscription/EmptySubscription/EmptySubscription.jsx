import { View, Text, Image } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation, useTheme } from '@react-navigation/native';
import { emptySubscriptionStyle } from './EmptySubscriptionStyle';
import EmptySublogo from '../../../assets/image/images/blue_robot_sub.png';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import RightArrow from '../../../assets/svg/rightArrow.svg';
import { SUBSCRIBEPLANS } from '../../../navigation/routeName/routeName';
import { profileStyle } from '../../Profile/profileStyle';



const EmptySubscription = () => {
    const {t:trans}= useTranslation();
    const navigation = useNavigation(); 
    const {colors} = useTheme();
    const styles= emptySubscriptionStyle(colors);
    const profileStyles= profileStyle(colors);

    const handlePlan=()=>{
       navigation.navigate(SUBSCRIBEPLANS);
    }
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.text_center, ...styles.title }}>{trans('No Subscription')}</Text>
      <Text style={{ ...styles.text_center, ...styles.subTitle }}>{trans('Subscribe to our more featured plans for more credits & benefits.')}</Text>
      <View style={styles.emptyImgContainer}>
        <Image
        source={EmptySublogo}
        style={styles.emptyImg}
        />
      </View>
      <View style={styles.seePlanBtn}>
        <LinearGradient
                  colors={['#A26EF7', '#763CD4']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.br_8}
                  >
            <CustomButton
              onPress={handlePlan}
              title={trans('See Plans')}
              color={colors.white}
              icon={<RightArrow style={profileStyles.navIcon} fill={'white'} height={12} width={12}/>}
            />
        </LinearGradient>
      </View>
    
    </View>
  )
}

export default EmptySubscription