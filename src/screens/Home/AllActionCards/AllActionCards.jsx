import {Dimensions, Text, View} from 'react-native';
import React, {memo, useCallback} from 'react';
import {
  CREATE_TEXT_GENERATOR,
  CREATE_IMAGE_GENERATOR,
  TEXT_HISTORY,
  IMAGE_HISTORY,
  CREATE_CODE_GENERATOR,
  CODE_HISTORY,
} from '../../../navigation/routeName/routeName';
import ActionsCard from '../../components/ActionsCard/ActionsCard';
import TextGeneratorIcon from '../../../assets/svg/text-gen-icon.svg';
import ImgGeneratorIcon from '../../../assets/svg/img-gen-icon.svg';
import CodeGeneratorIcon from '../../../assets/svg/code-gen-icon.svg';
import {rs} from '../../../utils/styles/responsiveSize';
import {useTranslation} from 'react-i18next';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { handleToaster } from '../../../utils/CustomAlert/handleAlert';
import Balance from '../Balance/Balance';
import { allActionsCardStyle } from './AllActionCardsStyle';
const {width} = Dimensions.get('screen');
const AllActionCards = ({style, isNavigate, navigation}) => {
  const {t:trans} = useTranslation();
  const {Preferences} = useSelector(state => state.getPreferences);
  const {languagePreference } = useSelector((state) => state.getTextPreference);
  const {artStylePreference } = useSelector((state) => state.getImagePreference);
  const {codePreferenceLoader, languagePreference: codeLanguagePreference, codeLabelPreference } = useSelector((state) => state.getCodePreference);
  const { useCaseList } = useSelector((state) => state.getUseCase);
  const {packageInfo,loading} = useSelector(state => state.PackageInfoReducer);

  const {colors}=useTheme();
  const handleNavigation = useCallback(route => {
    if (!isNavigate.current) {
      isNavigate.current = 1;
      navigation.navigate(route);
      setTimeout(() => {
        isNavigate.current = '';
      }, 1000);
    }
  }, []);
  const styles = allActionsCardStyle(colors);

  return (
    <View style={style}>
      <View style={styles.balanceCard}>
        <Balance text={trans('Words left')} remain={packageInfo?.word?.remain} used={packageInfo?.word?.used}/>
      </View>
      <View style={styles.balanceCard}>
        <Balance text={trans("Images left")} remain={packageInfo?.image?.remain} used={packageInfo?.image?.used}/>
      </View>
      <ActionsCard
        icon={<TextGeneratorIcon  
        width={rs(36)}
        height={rs(32)}
        />
      }
        text={trans('Text')}
        onPress={() => Preferences?.length>0 && useCaseList?.length && languagePreference?.length>0 ? handleNavigation(CREATE_TEXT_GENERATOR): handleToaster(trans('You dont have permission to access this page.'), 'warning', colors)}
        fixedWidth={width / 2 - rs(26)}
      />
       <ActionsCard
        icon={<ImgGeneratorIcon 
        width={rs(36)}
        height={rs(32)}
        />}
        text={trans('Image')}
        onPress={() => Preferences?.length>0 && artStylePreference?.length>0 ?  handleNavigation(CREATE_IMAGE_GENERATOR) : handleToaster(trans('You dont have permission to access this page.'), 'warning', colors)}
        fixedWidth={width / 2 - rs(26)}
      />

       <ActionsCard
        icon={<CodeGeneratorIcon 
        width={rs(36)}
        height={rs(32)}
        />}
        text={trans('Code Generator')}
        onPress={() => Preferences?.length>0 && codeLanguagePreference?.length>0 ?  handleNavigation(CREATE_CODE_GENERATOR) : handleToaster(trans('You dont have permission to access this page.'), 'warning', colors)}
        fixedWidth={width  - rs(40)}
        isOneLine={true}
      />

      <ActionsCard
        text={trans('Text History')}
        onPress={() => handleNavigation(TEXT_HISTORY)}
        fixedWidth={width / 2 - rs(26)}
      />
      <ActionsCard
        text={trans('Image History')}
        onPress={() => handleNavigation(IMAGE_HISTORY)}
        fixedWidth={width / 2 - rs(26)}
      />
      <ActionsCard
        text={trans('Code History')}
        onPress={() => handleNavigation(CODE_HISTORY)}
        fixedWidth={width / 2 - rs(26)}
      />
    </View>
  );
};

export default memo(AllActionCards);
