import { View, Text, KeyboardAvoidingView, Platform, FlatList, TouchableOpacity, Image ,Keyboard} from 'react-native'
import React from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import { imageHistoryStyle } from './ImageHistoryStyle';
import { useTranslation } from 'react-i18next';
import DownloadIcon from '../../../assets/svg/action-icon.svg';
import { CREATE_IMAGE_GENERATOR, IMAGE_HISTORY_DISPLAY } from '../../../navigation/routeName/routeName';
import { useRef } from 'react';
import ImageActionBottomsheet from './Bottomsheets/ImageActionBottomsheet/ImageActionBottomsheet';
import { useEffect } from 'react';
import { getImageHistory, getMoreImageHistory } from '../../../features/slices/imageHistoryReducer/getImageHistory';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { handleToaster } from '../../../utils/CustomAlert/handleAlert';
import { deleteInfo } from '../../../features/auth/login/loginApi';
import config from '../../../../config';
import useImageDownload from '../Customhooks/useImageDownload';
import ProgressiveImage from '../../../utils/ProgressiveImage/ProgressiveImage';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';
import { rs } from '../../../utils/styles/responsiveSize';
import Loader from '../../../utils/Loader/Loader';
import ImagehistorySkeleton from './Skeleton/ImagehistorySkeleton';
import LinearGradient from 'react-native-linear-gradient';
import { textHistoryStyle } from '../../TextGenerator/TextHistory/TextHistoryStyle';


const ImageHistory = () => {
  const {colors}=useTheme();
  const styles= imageHistoryStyle(colors);
  const textHistoryStyles= textHistoryStyle(colors);
  const navigation=useNavigation();
  const {t:trans}=useTranslation();
  const dispatch = useDispatch();
  const imageActionBottomSheetRef = useRef(null);
  const [imgHistory, setImgHistory]=useState([]);
  const [imgInfo, setImgInfo]=useState({});
  const {
    user: {token},
  } = useSelector(state => state.loginUserReducer) || {};

  const { imageList, loading, isRefresh, loadMore, nextPageUrl } =
  useSelector((state) => state.getImageHistory);
  const handleCreateNewImage=() => {
    navigation.navigate(CREATE_IMAGE_GENERATOR)
  }
   const handleImageActionIndex = (img) => {
    Keyboard.dismiss();
    setImgInfo(img);
    imageActionBottomSheetRef.current?.snapToIndex(0);
  };
  useEffect(()=>{
   async function checkImageHistory(){
    const data= await dispatch(getImageHistory({token}));
    if (data.payload.response.status.code===200){
      setImgHistory(data?.payload?.response?.records?.data)
    }
    else{
      handleToaster(data?.payload?.response?.message,'warning',colors);
    }
  }
    checkImageHistory();
  },[])

  const deleteImage=async (imgId)=>{
     const updatedItems = imgHistory.filter(item => item.id !== imgId);
     setImgHistory(updatedItems);
     handleToaster(trans("Image Deleted Successfully"),'success',colors);
     const URL= `${config.BASE_URL}/user/openai/image/delete?id=${imgId}`;
     const data =await deleteInfo(URL, token);
     if(data.response.status.code!==200){
      handleToaster(trans("oops! The image has not been deleted"),'warning',colors);
      setImgHistory(imgHistory);
     }
  }

  const [checkPermission]=useImageDownload();

  const handleRefresh = async() => {
    let isMounted = true;
    if (isMounted) {
      const data= await dispatch(getImageHistory({token}));
        if (data.payload.response.status.code===200){
          setImgHistory(data.payload.response.records.data)
        }
        else{
          handleToaster(data.payload.response.status.message,'warning',colors);
        }
    }
    return () => {
        isMounted = false;
    };
  };
  
  const handleLoadMoreCategory =async () => {
    let isMounted = true;
      if (isMounted && nextPageUrl && !loadMore) {
        const data= await  dispatch(getMoreImageHistory({ token,nextPageUrl }));
        if (data.payload.response.status.code===200){
          setImgHistory([...imgHistory,...data.payload.response.records.data])
        }
        else{
          handleToaster(data.payload.response.status.message,'warning',colors);
        }
      }
      
      return () => {
          isMounted = false;
      };
  };

  const navigateToDetails=(item)=>{
    navigation.navigate(IMAGE_HISTORY_DISPLAY,{imgInfo: item})
 }

  return (
    <>
      <KeyboardAvoidingView
          style={styles.pageVisibility}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View style={styles.scroll_view}>
                      <View style={styles.btnContainer}>
                          <LinearGradient
                            colors={['#A26EF7', '#763CD4']}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={styles.br_8}
                            >
                            <CustomButton
                              style={{...styles.contentWidth}}
                              onPress={handleCreateNewImage}
                              title={  '+' +" "+trans('Create New Image')}
                              color={colors.white}
                            />
                          </LinearGradient>
                      </View>
                      
                      <View style={styles.container}>
                          {loading ? 
                          <View style={styles.screenHeight}>
                            <ImagehistorySkeleton/>
                          </View>
                          :
                              <View style={styles.imgContainer}>
                                  {imgHistory.length>0  ?
                                    <FlatList
                                    data={imgHistory}
                                    numColumns={2}
                                    key={'_'}
                                    renderItem={({item}) => (
                                    
                                    <TouchableOpacity onPress={()=>navigateToDetails(item)}>
                                      <ProgressiveImage 
                                      style={styles.img} 
                                      source={{uri: item.imageUrl}} 
                                      />
                                      <TouchableOpacity style={styles.actionIcon} onPress={()=>handleImageActionIndex(item)}>
                                        <DownloadIcon height={rs(10)} width={rs(10)}  fill={'white'}/>
                                      </TouchableOpacity>
                                    </TouchableOpacity>
                                    
                                    )}
                                    keyExtractor={(_, i) => "key" + i}
                                    refreshing={isRefresh}
                                    onRefresh={handleRefresh}
                                    showsVerticalScrollIndicator={false}
                                    initialNumToRender={10}
                                    windowSize={10}
                                    onEndReachedThreshold={1}
                                    onEndReached={handleLoadMoreCategory}
                                    ListFooterComponent={
                                      loadMore &&
                                    (
                                        <View style={styles.loaderCont}>
                                          <Loader
                                            source={require('../../../assets/lottie/loader.json')}
                                            size={{width: rs(65), height: rs(55)}}
                                            color={colors.textTertiaryVariant}
                                            />
                                          <View>
                                      </View>
                                        </View>
                                      )
                                    }
                                  />
                                  :
                                    <FlatList
                                        refreshing={isRefresh}
                                        onRefresh={handleRefresh}
                                        showsVerticalScrollIndicator={false}
                                        ListHeaderComponent={() => (
                                            <View style={textHistoryStyles.EmptyDataContainer}>
                                              <Text style={textHistoryStyles.emptyText}>{trans('No image is available to be displayed')}</Text>
                                            </View>
                                        )}
                                    />

                                }
                              </View>
                          }
                      </View>
              </View>
                  
      </KeyboardAvoidingView>
      <ImageActionBottomsheet
            imgInfo={imgInfo}
            deleteImage={deleteImage}
            checkPermission={checkPermission}
            bottomSheetRef={imageActionBottomSheetRef}
        />
    </>
  )
}

export default ImageHistory