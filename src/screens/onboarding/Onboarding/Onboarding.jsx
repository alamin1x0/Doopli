import {View, ScrollView, SafeAreaView, StatusBar, ImageBackground} from 'react-native';
import React, {useRef} from 'react';
import {useTheme} from '@react-navigation/native';
import {onboardingStyle} from './onboarding.style';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';
import LanguageBottomSheet from './LanguageBottomSheet/LanguageBottomSheet';
import ImageCarousel from './ImageCarousel/ImageCarousel';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateLanguage} from '../../../features/slices/languageReducer/languageReducer';
import {useTranslation} from 'react-i18next';
import {SIGN_IN, SIGN_UP} from '../../../navigation/routeName/routeName';
import allLanguage from '../../../utils/language/LanguageElements.json';
import bgImage from '../../../assets/image/images/onboarding-bg.png';
import LinearGradient from 'react-native-linear-gradient';

const CustomImageCarousal = ({navigation}) => {
  const {t:trans} = useTranslation();
  const {colors} = useTheme();
  const styles = onboardingStyle(colors);
  const bottomSheetRef = useRef(null);
  const handleToCurrencyBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };
  const dispatch = useDispatch();
  const {language} = useSelector(state => state.languageReducer);
  useEffect(() => {
    if (!language) {
      dispatch(updateLanguage('en'));
    }
  }, []);
  return (
    <SafeAreaView
    style={styles.onboardingPage}
    >
      <StatusBar
        barStyle={'light-content'}
      />
     <ImageBackground source={bgImage} resizeMode="cover" style={styles.bgImage}>
        <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
          <ImageCarousel handleToCurrencyBottomSheet={handleToCurrencyBottomSheet} />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <LinearGradient
                colors={['#FFFFFF', '#FFFFFF']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{ ...styles.br_8, marginBottom: 15 }}
                >
                <CustomButton
                  onPress={() => navigation.replace('show-always', {screen: SIGN_UP})}
                  title={trans('Register')}
                  bgColor={'red'}
                  color={colors.gunPowder}
                  style={styles.registerButton}
                />
           </LinearGradient>
           <LinearGradient
                colors={['#A26EF7', '#763CD4']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.br_8}
                >
                <CustomButton
                  style={{ ...styles.inputWidth }}
                  onPress={() => navigation.replace('show-always', {screen: SIGN_IN})}
                  title={trans('Sign In')}
                  color={colors.white}
                />
            </LinearGradient>
        </View>
      </ImageBackground>
      <LanguageBottomSheet
        data={allLanguage}
        bottomSheetRef={bottomSheetRef}
        selectItem={language}
      />
    </SafeAreaView>
  );
};

export default CustomImageCarousal;
