import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from 'react-native';
import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {createTextGeneratorStyle} from './CreateTextGeneratorStyle';
import SelectInput from '../components/CustomTextInput/SelectInput/SelectInput';
import {useTranslation} from 'react-i18next';
import CustomButton from '../components/Buttons/CustomButton/CustomButton';
import {TouchableWithoutFeedback} from 'react-native';
import {DISPLAY_TEXT_GENERATOR} from '../../navigation/routeName/routeName';
import CustomInput from '../components/CustomInput/CustomInput';
import { useState } from 'react';
import LanguageBottomsheet from './Bottomsheets/Language/LanguageBottomsheet';
import { useRef } from 'react';
import { handleSetInfo } from '../utilities/handleFromData/handleFromData';
import ToneBottomsheet from './Bottomsheets/ToneBottomsheet/ToneBottomsheet';
import VariantsBottomsheet from './Bottomsheets/Variants/VariantsBottomsheet';
import CreativityLevelSheet from './Bottomsheets/CreativityLevel/CreativityLevelSheet';
import { useContext } from 'react';
import { NetworkContext } from '../../utils/Network/NetworkProvider';
import UseCaseBottomsheet from './Bottomsheets/UseCaseBottomsheet/UseCaseBottomsheet';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import config from '../../../config';
import { postInfoUsingFormData } from '../../features/auth/login/loginApi';
import { handleToaster } from '../../utils/CustomAlert/handleAlert';
import Loader from '../../utils/Loader/Loader';
import RightIcon from '../../assets/svg/rightArrow.svg';
import { rs } from '../../utils/styles/responsiveSize';
import LinearGradient from 'react-native-linear-gradient';
import { getPackageInfo } from '../../features/slices/PackageInfoReducer/PackageInfoReducer';
import { profileStyle } from '../Profile/profileStyle';



const CreateTextGenerator = () => {
  const {isConnected} = useContext(NetworkContext);
  const {colors} = useTheme();
  const {t:trans} = useTranslation();
  const styles = createTextGeneratorStyle(colors);
  const profileStyles = profileStyle(colors);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const languageBottomSheetRef = useRef(null);
  const toneBottomSheetRef = useRef(null);
  const variantsBottomSheetRef = useRef(null);
  const creativityBottomSheetRef = useRef(null);
  const useCaseBottomSheetRef = useRef(null);
  const [languageLists, setLanguageLists]=useState([]);
  const [toneLists, setToneLists]=useState([]);
  const [variantLists, setVariantLists]=useState([]);
  const [creativityLists, setCreativityLists]=useState([]);
  const [useCaseLists, setUseCaseLists]=useState([]);
  const [loader, setLoader]=useState(false);
  const [textInfo, setTextInfo]=useState([]);
  const [placeholderCollection, setPlaceholderCollection] = useState('');
  const {
    user: {token},
  } = useSelector(state => state.loginUserReducer) || {};
  const { useCaseList, loading } =
  useSelector((state) => state.getUseCase);
  const {Preferences} = useSelector(state => state.getPreferences);
  const {languagePreference,tonePreference,variantPreference,temperaturePreference, textPreferenceLoader } = useSelector((state) => state.getTextPreference);
  const textAreaLength= Number(Preferences[0]?.openai?.long_desc_length);
  const textInputLength= Number(Preferences[0]?.openai?.short_desc_length);


  const initialState = {
    language: languagePreference[0],
    tone: tonePreference[0],
    useCase:useCaseList[0],
    number_of_variants: variantPreference[0],
    creativity_level: temperaturePreference[0],
  };
  const errorText = {
    language: false,
    tone: false,
    useCase: false,
    number_of_variants:false,
    creativity_level: false,
  };

  const [textGenerator, setTextGenerator] = useState(initialState);
  const [error, setError] = useState(errorText);
  
  const handleLanguageIndex = () => {
    Keyboard.dismiss();
    languageBottomSheetRef.current?.snapToIndex(0);
  };
  const handleToneIndex = () => {
    Keyboard.dismiss();
    toneBottomSheetRef.current?.snapToIndex(0);
  };
  const handleUseCaseIndex = () => {
    Keyboard.dismiss();
    useCaseBottomSheetRef.current?.snapToIndex(0);
  };
  const handleVariantsIndex = () => {
    Keyboard.dismiss();
    variantsBottomSheetRef.current?.snapToIndex(0);
  };
  const handleCreativityLevelIndex = () => {
    Keyboard.dismiss();
    creativityBottomSheetRef.current?.snapToIndex(0);
  };
  
  useEffect(()=>{
    const timer = setTimeout(() => {
        setLanguageLists(languagePreference);
        setToneLists(tonePreference);
        setUseCaseLists(useCaseList);
        setVariantLists(variantPreference);
        setCreativityLists(temperaturePreference);
    }, 300);
    return () => clearTimeout(timer);
  },[])

  useEffect(()=>{
    setLoader(false);
    if(textInfo[0]?.text?.length>0) {
     navigation.navigate(DISPLAY_TEXT_GENERATOR,{textInfo});
    }
   },[textInfo])

  function compareObjectsKeys(obj1, obj2) {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
  
    const differentKeys = [];
  
    for (let key of obj1Keys) {
      if (!obj2Keys.includes(key)) {
        differentKeys.push(key);
      }
    }
  
    for (let key of obj2Keys) {
      if (!obj1Keys.includes(key)) {
        differentKeys.push(key);
      }
    }
  
    return differentKeys;
  }
  
  function checkDynamicValues(obj) {
    for (var key in obj) {
      if (obj[key] === "" || obj[key] === null) {
        return false;
      }
    }
    return true;
  }

  useEffect(()=>{
    const differentKeys = compareObjectsKeys(initialState, textGenerator);
    for (let key of differentKeys) {
      delete textGenerator[key];
    }
    const placeholder=[], dynamicKey ={};
    if(textGenerator.useCase){
      textGenerator?.useCase?.option.forEach(option => {
        dynamicKey[option.key]='';
        const optionMeta = option.option_meta.find(meta => meta.key === "placeholder");
        if (optionMeta) {
          placeholder.push(optionMeta.value);
        }
      });
    }
    setPlaceholderCollection(placeholder);
    setTextGenerator({...textGenerator, ...dynamicKey })
  },[textGenerator.useCase])


  const handleError = (questions) => {
    const {language, tone, useCase, number_of_variants,creativity_level} = textGenerator;
    const errorLanguage = language === '' ? true : false;
    const errorTone = tone === '' ? true : false;
    const errorUseCase = useCase === '' ? true : false;
    const errorNumber_of_variants = number_of_variants === '' ? true : false;
    const errorCreativity_level = creativity_level === '' ? true : false;
   
     for (var key in questions) {
      if (questions[key] === "" || questions[key] === null) {
        questions[key]=true;
      }
      else{
        questions[key]=false;
      }
    }
    setError({
      ...error,
      ...questions,
      language: errorLanguage,
      tone: errorTone,
      useCase: errorUseCase,
      number_of_variants:errorNumber_of_variants,
      creativity_level: errorCreativity_level,
    });
  };
  const handleTextGenerate = async() => {
    Keyboard.dismiss();
    const {language, tone, useCase, number_of_variants,creativity_level} = textGenerator;
    const generatedvalue={
      ...textGenerator,
      useCase: useCase.slug
    }
   
    const excludedKeys = ["language", "tone", "useCase", "number_of_variants", "creativity_level"];

    const postGenerator = {};

    for (let key in generatedvalue) {
      if (!excludedKeys.includes(key)) {
        postGenerator.questions = postGenerator.questions || {};
        postGenerator.questions[key] = generatedvalue[key];
      } else {
        postGenerator[key] = generatedvalue[key];
      }
    }
    const check=postGenerator.questions && checkDynamicValues(postGenerator.questions);
    if(language && tone && useCase && number_of_variants && creativity_level && check){
      setLoader(true);
      const formData = new FormData();

      formData.append('temperature', Object.values(postGenerator.creativity_level)[0]);
      formData.append('variant', Object.values(postGenerator.number_of_variants)[0]);
      formData.append('tone', Object.values(postGenerator.tone)[0]);
      formData.append('language', Object.values(postGenerator.language)[0]);
      formData.append('useCase', postGenerator.useCase);
      formData.append('model', "text-davinci-003");
      formData.append('max_tokens', 200);
      formData.append('frequency_penalty', 0.2);
      formData.append('presence_penalty', 0);
      formData.append('questions', JSON.stringify(postGenerator.questions));

  
      const URL =`${config.BASE_URL}/user/openai/ask`;
      const res = await postInfoUsingFormData(formData, URL, token,'POST');
      const {records, status} = res?.response;
      if(status?.code==200){
        setTextInfo([...textInfo, ...records.choices]);
        dispatch(getPackageInfo({token}));
      }
      else{
        setLoader(false);
        (Object.keys(records).length>0) ?
        handleToaster(trans(Object.values(records)[0]),'warning',colors)
        :
        handleToaster(trans(status.message), 'warning', colors);
      }
    }
    else {
      isConnected && handleError(postGenerator.questions);
   }
    
  };

  return (
    <>
      <KeyboardAvoidingView
        style={styles.pageVisibility}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scroll_view}
          keyboardShouldPersistTaps={'always'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.halfInputAlignment}>
                <View style={{...styles.currencyContainer, ...styles.mr_20}}>
                  <Text style={styles.inputTitle}>{trans('Select Language')}*</Text>
                  <SelectInput
                    title={textGenerator.language && Object.keys(textGenerator.language)}
                    style={styles.halfWidth}
                    onPress={() => handleLanguageIndex()}
                    isError={error.language && !textGenerator.language}
                    error={error.language ? trans('This field is required.') : ''}
                    icon={<RightIcon style={profileStyles.navIcon} fill={colors.manatee} /> }
                  />
                </View>
                <View style={styles.currencyContainer}>
                  <Text style={styles.inputTitle}>{trans('Select Tone')}*</Text>
                  <SelectInput
                    title={textGenerator.tone && Object.keys(textGenerator.tone)}
                    style={styles.halfWidth}
                    onPress={() => handleToneIndex()}
                    isError={error.tone && !textGenerator.tone}
                    error={error.tone ? trans('This field is required.') : ''}
                    icon={<RightIcon style={profileStyles.navIcon} fill={colors.manatee} /> }
                  />
                </View>
              </View>
              <View style={styles.currencyContainer}>
                <Text style={styles.inputTitle}>{trans('Choose Use Case')}*</Text>
                <SelectInput
                   title={textGenerator?.useCase?.name}
                   style={styles.contentWidth}
                   onPress={() => handleUseCaseIndex()}
                   isError={error.useCase && !textGenerator.useCase}
                   error={error.useCase ? trans('This field is required.') : ''}
                   icon={
                    loading || textPreferenceLoader ? (
                      <View>
                      <Loader
                        source={require('../../assets/lottie/loader.json')}
                        size={styles.lottie}
                        color={colors.textTertiaryVariant}
                      />
                    </View>
                    ) : (
                      <RightIcon style={profileStyles.navIcon} fill={colors.manatee} />
                    )
                  }
                />
              </View>
              {textGenerator?.useCase?.option?.map((item,index)=>{
                return  (<View key={index} style={styles.currencyContainer}>
                            <Text style={styles.inputTitle}>
                              {item.option_meta.map((item, index)=>{
                                return <View key={index}>
                                  <Text style={styles.inputTitle}>{item.key.includes('label') && item.value+'*'}</Text>
                                </View>
                              })}
                            </Text>
                        
                            {item.type =='textarea' ? 
                            <>
                            <CustomInput
                            style={styles.textAreaWidth}
                            multiline={true}
                            numberOfLines={10}
                            placeholder={placeholderCollection[index]}
                            isError={error[item.key] && !textGenerator[item.key]}
                            error={error[item.key] ? trans('This field is required.') : ''}
                            onChangeText={text =>
                              handleSetInfo(
                                item.key,
                                text,
                                setTextGenerator,
                                textGenerator,
                                setError,
                                error,
                              )
                            }
                            textAlignVertical={'top'}
                            maxLength={textAreaLength}
                            value={textGenerator[item.key]}
                          />
                          <Text style={styles.remainingText}>{trans(textAreaLength-textGenerator[item.key]?.length)} <Text>{trans('characters remaining')}</Text> </Text>
                          </>
                          :
                          <>
                          <CustomInput
                            style={{...styles.contentWidth}}
                            placeholder={placeholderCollection[index]}
                            isError={error[item.key] && !textGenerator[item.key]}
                            error={error[item.key] ? trans('This field is required.') : ''}
                            onChangeText={text =>
                              handleSetInfo(
                                item.key,
                                text,
                                setTextGenerator,
                                textGenerator,
                                setError,
                                error,
                              )
                            }
                            maxLength={textInputLength}
                            value={textGenerator[item.key]}
                          />
                          <Text style={styles.remainingText}>{trans(textInputLength-textGenerator[item.key]?.length)} <Text>{trans('characters remaining')}</Text> </Text>
                          </>
                            }
                        </View>)
                     })}
             
            
              <View style={styles.halfInputAlignment}>
                <View style={{...styles.currencyContainer, ...styles.mr_20}}>
                  <Text style={styles.inputTitle}>
                    {trans('Number of Variants')}*
                  </Text>
                  <SelectInput
                    title={textGenerator.number_of_variants && Object.values(textGenerator.number_of_variants)}
                    style={styles.halfWidth}
                    onPress={() => handleVariantsIndex()}
                    isError={error.number_of_variants && !textGenerator.number_of_variants}
                    error={error.number_of_variants ? trans('This field is required.') : ''}
                    icon={<RightIcon style={profileStyles.navIcon} fill={colors.manatee} /> }
                  />
                </View>
                <View style={styles.currencyContainer}>
                  <Text style={styles.inputTitle}>
                    {trans('Creativity level')}*
                  </Text>
                  <SelectInput
                     title={textGenerator.creativity_level && Object.keys(textGenerator.creativity_level)}
                     style={styles.halfWidth}
                     onPress={() => handleCreativityLevelIndex()}
                     isError={error.creativity_level && !textGenerator.creativity_level}
                     error={error.creativity_level ? trans('This field is required.') : ''}
                     icon={<RightIcon style={profileStyles.navIcon} fill={colors.manatee} /> }
                  />
                </View>
              </View>
              <View style={styles.magicButton}>
                <LinearGradient
                            colors={['#A26EF7', '#763CD4']}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={styles.br_8}
                            >
                    <CustomButton
                      style={{...styles.contentWidth}}
                      onPress={!loader ? handleTextGenerate: null}
                      title={!loader ? trans('Show the Magic'):
                      <View>
                        <Loader
                          source={require('../../assets/lottie/loader.json')}
                          size={{width: rs(65), height: rs(55)}}
                          color={colors.white}
                        />
                    </View>}
                      color={colors.white}
                    />
                </LinearGradient>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
      {languageLists.length>0 &&  
       <LanguageBottomsheet
          data={{
            title: trans('Select Language'),
            value: languagePreference,
          }}
          bottomSheetRef={languageBottomSheetRef}
          setSelectedItem={setTextGenerator}
          selectedItem={textGenerator}
          setError={setError}
          error={error}
          handleSetInfo={handleSetInfo}
          name={'language'}
        />
      }
     {toneLists.length>0 &&  
       <ToneBottomsheet
          data={{
            title: trans('Select Tone'),
            value: tonePreference,
          }}
          bottomSheetRef={toneBottomSheetRef}
          setSelectedItem={setTextGenerator}
          selectedItem={textGenerator}
          setError={setError}
          error={error}
          handleSetInfo={handleSetInfo}
          name={'tone'}
        />}
     
     {variantLists.length>0 &&  
       <VariantsBottomsheet
          data={{
            title: trans('Number of Variants'),
            value: variantPreference,
          }}
          bottomSheetRef={variantsBottomSheetRef}
          setSelectedItem={setTextGenerator}
          selectedItem={textGenerator}
          setError={setError}
          error={error}
          handleSetInfo={handleSetInfo}
          name={'number_of_variants'}
        />}
      {creativityLists.length>0 && 
        <CreativityLevelSheet
          data={{
            title: trans('Creativity Level'),
            value: temperaturePreference,
          }}
          bottomSheetRef={creativityBottomSheetRef}
          setSelectedItem={setTextGenerator}
          selectedItem={textGenerator}
          setError={setError}
          error={error}
          handleSetInfo={handleSetInfo}
          name={'creativity_level'}
       />
      }
      
      {useCaseLists.length>0 && 
        <UseCaseBottomsheet
        data={{
          title: trans('Use Case'),
          value: useCaseList,
        }}
        bottomSheetRef={useCaseBottomSheetRef}
        setSelectedItem={setTextGenerator}
        selectedItem={textGenerator}
        setError={setError}
        error={error}
        handleSetInfo={handleSetInfo}
        name={'useCase'}
      />
      }
    
    </>
  );
};

export default CreateTextGenerator;
