import {View, Text, Dimensions,Image, ScrollView} from 'react-native';
import React from 'react';
import {onboardingStyle} from '../onboarding.style';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import LanguageTranslator from '../LanguageTranslator';
import { useDispatch, useSelector } from 'react-redux';
import allLanguage from '../../../../utils/language/LanguageElements.json';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { updateLanguage } from '../../../../features/slices/languageReducer/languageReducer';


const { width, height} = Dimensions.get('window');

const OnboardingDisplay = ({
  item: {image, title, subtitle, description},
  index,
  handleToCurrencyBottomSheet
} = {}) => {
  const {colors} = useTheme();
  const styles = onboardingStyle(colors,width,index);
  const {t:trans} = useTranslation();
  const {language} = useSelector(state => state.languageReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!language) {
      dispatch(updateLanguage('en'));
    }
  }, []);
  const memorizedLanguage = useCallback(() => {
    const exits = allLanguage?.value.find(
      item => item.shortName?.toLowerCase() === language?.toLowerCase(),
    );
    return exits?.name || 'English';
  }, [language]);

  return (
    <>
    <View style={styles.onboardingContainer}>
        <LanguageTranslator
            openBottomSheetModal={handleToCurrencyBottomSheet}
            language={memorizedLanguage()}
          />
      <View style={styles.onboardingImageContainer}>
        <Image style={index==1 ? styles.containImg: index==2 ? styles.coverImg :  styles.repeatImg} source={image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{trans(title)}</Text>
        <Text style={styles.subtitle}>{trans(subtitle)}</Text>
        <Text style={styles.description}>{trans(description)}</Text>
      </View>
    </View>
    </>
  );
};
export default OnboardingDisplay;
