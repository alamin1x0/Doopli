import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {createTextGeneratorStyle} from '../TextGenerator/CreateTextGeneratorStyle';
import {DISPLAY_IMAGE_GENERATOR} from '../../navigation/routeName/routeName';
import RightIcon from '../../assets/svg/rightArrow.svg';
import {useTranslation} from 'react-i18next';
import CustomButton from '../components/Buttons/CustomButton/CustomButton';
import SelectInput from '../components/CustomTextInput/SelectInput/SelectInput';
import CustomInput from '../components/CustomInput/CustomInput';
import {createImageGeneratorStyle} from './CreateImageGeneratorStyle';
import { useState } from 'react';
import { handleSetInfo } from '../utilities/handleFromData/handleFromData';
import { useContext } from 'react';
import { NetworkContext } from '../../utils/Network/NetworkProvider';
import { useRef } from 'react';
import ImageStyleSheet from './Bottomsheets/ImageStyle/ImageStyleSheet';
import ImageVariantSheet from './Bottomsheets/ImageVariants/ImageVariantSheet';
import LightingEffectsSheet from './Bottomsheets/LightingEffects/LightingEffectsSheet';
import ResolutionSheet from './Bottomsheets/ResolutionSheet/ResolutionSheet';
import { useDispatch, useSelector } from 'react-redux';
import config from '../../../config';
import {  postInfo } from '../../features/auth/login/loginApi';
import { useEffect } from 'react';
import { handleToaster } from '../../utils/CustomAlert/handleAlert';
import Loader from '../../utils/Loader/Loader';
import { rs } from '../../utils/styles/responsiveSize';
import LinearGradient from 'react-native-linear-gradient';
import { getPackageInfo } from '../../features/slices/PackageInfoReducer/PackageInfoReducer';
import { profileStyle } from '../Profile/profileStyle';

const URL =`${config.BASE_URL}/user/openai/image`;


const CreateImageGenerator = ({route}) => {
  const {isConnected} = useContext(NetworkContext);
  const {colors} = useTheme();
  const {t:trans} = useTranslation();
  const dispatch = useDispatch();
  const styles = createTextGeneratorStyle(colors);
  const profileStyles = profileStyle(colors);
  const imgGeneratorStyle = createImageGeneratorStyle(colors);
  const navigation = useNavigation();
  const [imageInfo, setImageInfo]=useState([]);
  const {
    user: {token},
  } = useSelector(state => state.loginUserReducer) || {};
 const [loader, setLoader]=useState(false);
  const variantBottomSheetRef = useRef(null);
  const resolutionBottomSheetRef = useRef(null);
  const lightingStyleBottomSheetRef = useRef(null);
  const artStyleBottomSheetRef = useRef(null);
  const [artLists, setArtLists]=useState([]);
  const [lightingLists, setLightingLists]=useState([]);
  const [variantLists, setVariantLists]=useState([]);
  const [resolutionLists, setResolutionLists]=useState([]);

  const { resulationPreference,artStylePreference,variantPreference,lightingStylePreference,imagePreferenceLoader } = useSelector((state) => state.getImagePreference);
  const initialState = {
    promt: "",
    variant: variantPreference[0],
    resolution: resulationPreference[0],
    lightingStyle: lightingStylePreference[0],
    artStyle: artStylePreference[0],
  };

  const errorText = {
    promt: false,
    variant: false,
    resolution: false,
    lightingStyle: false,
    artStyle: false,
  };

  const [imageGenerator, setImageGenerator] = useState(initialState);
  const [error, setError] = useState(errorText);


  useEffect(()=>{
    if(route.params){
      setImageGenerator({...imageGenerator, ...route.params});
    }
  },[route.params])


  const handleArtStyleIndex = () => {
    Keyboard.dismiss();
    artStyleBottomSheetRef.current?.snapToIndex(0);
  };
  const handleLightingStyleIndex = () => {
    Keyboard.dismiss();
    lightingStyleBottomSheetRef.current?.snapToIndex(0);
  };
  const handleResolutionIndex = () => {
    Keyboard.dismiss();
    resolutionBottomSheetRef.current?.snapToIndex(0);
  };
  const handleVariantsIndex = () => {
    Keyboard.dismiss();
    variantBottomSheetRef.current?.snapToIndex(0);
  };

  useEffect(()=>{
    const timer = setTimeout(() => {
        setArtLists(artStylePreference);
        setLightingLists(lightingStylePreference);
        setResolutionLists(resulationPreference);
        setVariantLists(variantPreference);
    }, 300);
    return () => clearTimeout(timer);
  },[])

  useEffect(()=>{
   if(imageInfo[0]?.url?.length>0) {
    setLoader(false);
    navigation.navigate(DISPLAY_IMAGE_GENERATOR,{imageInfo});
   }
  },[imageInfo])


  const handleError = () => {
    const {promt, variant, resolution, lightingStyle, artStyle} = imageGenerator;
    const errorPromt = promt === '' ? true : false;
    const errorVariant = variant === '' ? true : false;
    const errorResolution = resolution === '' ? true : false;
    const errorLightingStyle = lightingStyle === '' ? true : false;
    const errorArtStyle = artStyle === '' ? true : false;

    setError({
      ...error,
      promt: errorPromt,
      variant: errorVariant,
      resolution: errorResolution,
      lightingStyle:errorLightingStyle,
      artStyle:errorArtStyle,
    });
  };

  const handleImageGenerate =async () => {
    Keyboard.dismiss();
    const {promt, variant, resolution, lightingStyle, artStyle} = imageGenerator;
    if (promt && variant && resolution && lightingStyle && artStyle) 
    {
      setLoader(true);
      const data= {
        promt,
        artStyle: Object.values(artStyle)[0],
        resulation: Object.values(resolution)[0],
        lightingStyle: Object.values(lightingStyle)[0],
        variant: Object.values(variant)[0]
      }
      const res = await postInfo(data, URL, token, 'POST');
      if(res?.response?.status?.code === 200){
        handleSuccessGenerate(res,promt);
      }
      else{
        handleException(res);
      }
    } 
    else {
       isConnected && handleError();
    }
  };

  const handleSuccessGenerate=(res,promt)=>{
     setImageInfo([...imageInfo,{promt:promt, url:res.response.records}]);
     dispatch(getPackageInfo({token}));
  }
  
  const handleException=async(res)=>{
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
                <Text style={styles.inputTitle}>{trans('Image Description')}*</Text>
                <CustomInput
                  multiline={true}
                  onChangeText={text =>
                    handleSetInfo(
                      'promt',
                      text,
                      setImageGenerator,
                      imageGenerator,
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
                  isError={error.promt && !imageGenerator.promt}
                  error={error.promt ? trans('This field is required.') : ''}
                  value={imageGenerator.promt}
                />
              </View>
              <View style={styles.halfInputAlignment}>
                <View style={{...styles.currencyContainer, ...styles.mr_20}}>
                  <Text style={styles.inputTitle}>{trans('Image Style').length>15 ? trans('Image Style').substring(0,15)+'...' :  trans('Image Style')}*</Text>
                  <SelectInput
                    title={Object.keys(imageGenerator.artStyle)}
                    style={styles.halfWidth}
                    onPress={() => handleArtStyleIndex()}
                    icon={<RightIcon style={profileStyles.navIcon} fill={colors.manatee} />}
                    isError={error.artStyle && !imageGenerator.artStyle}
                    error={error.artStyle ? trans('This field is required.') : ''}
                  />
                </View>
                <View style={styles.currencyContainer}>
                  <Text style={styles.inputTitle}>
                    {trans('Lighting Effects')}*
                  </Text>
                  <SelectInput
                    title={Object.keys(imageGenerator.lightingStyle)}
                    style={styles.halfWidth}
                    onPress={() => handleLightingStyleIndex()}
                    icon={<RightIcon style={profileStyles.navIcon} fill={colors.manatee} />}
                    isError={error.lightingStyle && !imageGenerator.lightingStyle}
                    error={error.lightingStyle ? trans('This field is required.') : ''}
                  />
                </View>
              </View>
              <View style={styles.halfInputAlignment}>
                <View style={{...styles.currencyContainer, ...styles.mr_20}}>
                  <Text style={styles.inputTitle}>
                    {trans('Number of Variants')}*
                  </Text>
                  <SelectInput
                    title={Object.values(imageGenerator.variant)}
                    style={styles.halfWidth}
                    onPress={() => handleVariantsIndex()}
                    icon={<RightIcon style={profileStyles.navIcon} fill={colors.manatee} />}
                    isError={error.variant && !imageGenerator.variant}
                    error={error.variant ? trans('This field is required.') : ''}
                  />
                </View>
                <View style={styles.currencyContainer}>
                  <Text style={styles.inputTitle}>{trans('Resolution')}*</Text>
                  <SelectInput
                    title={Object.values(imageGenerator.resolution)}
                    style={styles.halfWidth}
                    onPress={() => handleResolutionIndex()}
                    icon={<RightIcon style={profileStyles.navIcon} fill={colors.manatee} />}
                    isError={error.resolution && !imageGenerator.resolution}
                    error={error.resolution ? trans('This field is required.') : ''}
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
                        onPress={!loader ? handleImageGenerate: null}
                        title={!loader ? trans('Create Image'):
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
      {artLists.length > 0 && 
        <ImageStyleSheet
          data={{
            title: trans('Select Image Style'),
            value: artStylePreference,
          }}
          bottomSheetRef={artStyleBottomSheetRef}
          setSelectedItem={setImageGenerator}
          selectedItem={imageGenerator}
          setError={setError}
          error={error}
          handleSetInfo={handleSetInfo}
          name={'artStyle'}
       />
      }
     
     {lightingLists.length >0 && 
      <LightingEffectsSheet
          data={{
          title: trans('Select Lighting Effects'),
          value: lightingStylePreference,
        }}
        bottomSheetRef={lightingStyleBottomSheetRef}
        setSelectedItem={setImageGenerator}
        selectedItem={imageGenerator}
        setError={setError}
        error={error}
        handleSetInfo={handleSetInfo}
        name={'lightingStyle'}
     />
     }
     
     {variantLists.length > 0 && 
       <ImageVariantSheet
        data={{
          title: trans('Number of Variants'),
          value: variantPreference,
        }}
        bottomSheetRef={variantBottomSheetRef}
        setSelectedItem={setImageGenerator}
        selectedItem={imageGenerator}
        setError={setError}
        error={error}
        handleSetInfo={handleSetInfo}
        name={'variant'}
      />
     }

     {resolutionLists.length > 0 &&   
      <ResolutionSheet
         data={{
          title: trans('Resolution'),
          value: resulationPreference,
        }}
        bottomSheetRef={resolutionBottomSheetRef}
        setSelectedItem={setImageGenerator}
        selectedItem={imageGenerator}
        setError={setError}
        error={error}
        handleSetInfo={handleSetInfo}
        name={'resolution'}
      />
     }
    

    </>
  );
};

export default CreateImageGenerator;
