import { View, Text, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import CustomInput from '../components/CustomInput/CustomInput'
import SelectInput from '../components/CustomTextInput/SelectInput/SelectInput'
import { createImageGeneratorStyle } from '../ImageGenerator/CreateImageGeneratorStyle'
import { createTextGeneratorStyle } from '../TextGenerator/CreateTextGeneratorStyle'
import RightIcon from '../../assets/svg/rightArrow.svg';
import { useNavigation, useTheme } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import LinearGradient from 'react-native-linear-gradient'
import CustomButton from '../components/Buttons/CustomButton/CustomButton'
import { useState } from 'react'
import Loader from '../../utils/Loader/Loader'
import { useContext } from 'react'
import { NetworkContext } from '../../utils/Network/NetworkProvider'
import { handleSetInfo } from '../utilities/handleFromData/handleFromData'
import { useRef } from 'react'
import LanguageStyleSheet from './Bottomsheets/Language/LanguageStyleSheet'
import CodeLabelSheet from './Bottomsheets/CodeLabel/CodeLabelSheet'
import { useSelector } from 'react-redux'
import { DISPLAY_CODE_GENERATOR } from '../../navigation/routeName/routeName'
import { rs } from '../../utils/styles/responsiveSize'
import config from '../../../config'
import { postInfo } from '../../features/auth/login/loginApi'
import { handleToaster } from '../../utils/CustomAlert/handleAlert'
import { profileStyle } from '../Profile/profileStyle'
const URL =`${config.BASE_URL}/user/openai/code`;

const CreateCodeGenerator = () => {
    const {isConnected} = useContext(NetworkContext);
    const {colors} = useTheme();
    const styles = createTextGeneratorStyle(colors);
    const profileStyles = profileStyle(colors);
    const imgGeneratorStyle = createImageGeneratorStyle(colors);
    const {t:trans} = useTranslation();
    const [loader, setLoader]=useState(false);
    const navigation = useNavigation();
    const {codePreferenceLoader, languagePreference: codeLanguagePreference, codeLabelPreference } = useSelector((state) => state.getCodePreference);
    const languageStyleBottomSheetRef = useRef (null);
    const codeLabelBottomSheetRef = useRef (null);
    const [languageLists,setLanguageLists]= useState([]);
    const [codeLevelLists,setCodeLevelLists]= useState([]);

    const {
      user: {token},
    } = useSelector(state => state.loginUserReducer) || {};

    const initialState = {
        description: "",
        language: codeLanguagePreference[0],
        codeLabel: codeLabelPreference[0],
      };
    
      const errorText = {
        description: false,
        language: false,
        codeLabel: false,
      };
    
      const [codeGenerator, setCodeGenerator] = useState(initialState);
      const [error, setError] = useState(errorText);

    const handleLanguageStyleIndex = () => {
      languageStyleBottomSheetRef.current?.snapToIndex(0);
    };
    const handleCodeLabelIndex = () => {
      codeLabelBottomSheetRef.current?.snapToIndex(0);
    };

    useEffect(()=>{
      const timer = setTimeout(() => {
          setLanguageLists(codeLanguagePreference);
          setCodeLevelLists(codeLabelPreference);
      }, 300);
      return () => clearTimeout(timer);
    },[])

    const handleError = () => {
        const {description, language, codeLabel} = codeGenerator;

        const errorDescription = description === '' ? true : false;
        const errorLanguage = language === '' ? true : false;
        const errorCodeLabel = codeLabel === '' ? true : false;
    
        setError({
          ...error,
          description: errorDescription,
          language: errorLanguage,
          codeLabel: errorCodeLabel,
        });
      };
    
     const handleCodeGenerate =async () => {
        Keyboard.dismiss();
        const {description, language, codeLabel} = codeGenerator;
        if (description && language && codeLabel) 
        {
          setLoader(true);
        const data= {
          promt: description,
          language: Object.values(language)[0],
          codeLabel: Object.keys(codeLabel)[0],
        }

        const res = await postInfo(data, URL, token, 'POST');
    
        if(res?.response?.status?.code === 200){
          handleSuccessGenerate(res);
        }
        else{
          handleException(res);
        }
        } 
        else {
           isConnected && handleError();
        }
      };

      const handleSuccessGenerate=(res)=>{
         navigation.navigate(DISPLAY_CODE_GENERATOR,{codeInfo: res?.response?.records?.choices[0]?.message.content })
         setLoader(false);
     }
     
     const handleException=(res)=>{
         const {records,status} = res?.response;
          setLoader(false);
          (Object.keys(records).length>0) ?
          handleToaster(trans(Object.values(records)[0]),'warning',colors)
        :
          handleToaster(trans(status.message), 'warning', colors);
     }

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
                <View style={styles.currencyContainer}>
                    <Text style={styles.inputTitle}>{trans('Code Description')}*</Text>
                    <CustomInput
                        multiline={true}
                        onChangeText={text =>
                        handleSetInfo(
                            'description',
                            text,
                            setCodeGenerator,
                            codeGenerator,
                            setError,
                            error,
                        )
                        }
                        numberOfLines={10}
                        placeholder={trans('Briefly write down the description of the image you have in mind..')}
                        style={{
                        ...styles.contentWidth,
                        ...imgGeneratorStyle.AddNoteheight,
                        }}
                        textAlignVertical={'top'}
                        isError={error.description && !codeGenerator.description}
                        error={error.description ? trans('This field is required.') : ''}
                        value={codeGenerator.description}
                    />
                </View>
                <View style={styles.halfInputAlignment}>
                    <View style={{...styles.currencyContainer, ...styles.mr_20}}>
                        <Text style={styles.inputTitle}>{trans('Language')}*</Text>
                        <SelectInput
                        title={Object.keys(codeGenerator.language)}
                        style={styles.halfWidth}
                        onPress={() => handleLanguageStyleIndex()}
                        icon={<RightIcon style={profileStyles.navIcon} fill={colors.manatee} />}
                        isError={error.language && !codeGenerator.language}
                        error={error.language ? trans('This field is required.') : ''}
                        />
                  </View>
                    <View style={styles.currencyContainer}>
                        <Text style={styles.inputTitle}>
                        {trans('Code Level')}*
                        </Text>
                        <SelectInput
                        title={Object.values(codeGenerator.codeLabel)}
                        style={styles.halfWidth}
                        onPress={() => handleCodeLabelIndex()}
                        icon={<RightIcon style={profileStyles.navIcon} fill={colors.manatee} />}
                        isError={error.codeLabel && !codeGenerator.codeLabel}
                        error={error.codeLabel ? trans('This field is required.') : ''}
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
                        onPress={!loader ? handleCodeGenerate: null}
                        title={!loader ? trans('Write Code'):
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
        <LanguageStyleSheet
          data={{
            title: trans('Select Language'),
            value: codeLanguagePreference
          }}
          bottomSheetRef={languageStyleBottomSheetRef}
          setSelectedItem={setCodeGenerator}
          selectedItem={codeGenerator}
          setError={setError}
          error={error}
          handleSetInfo={handleSetInfo}
          name={'language'}
       />}
      { codeLevelLists.length>0 &&
       <CodeLabelSheet
          data={{
            title: trans('Select Label'),
            value: codeLabelPreference
          }}
          bottomSheetRef={codeLabelBottomSheetRef}
          setSelectedItem={setCodeGenerator}
          selectedItem={codeGenerator}
          setError={setError}
          error={error}
          handleSetInfo={handleSetInfo}
          name={'codeLabel'}
       />}
    </>
  )
}

export default CreateCodeGenerator