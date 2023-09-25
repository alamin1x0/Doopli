import { View, Text, KeyboardAvoidingView, FlatList, TouchableOpacity, Keyboard } from 'react-native'
import React, { useRef } from 'react'
import { useState } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import { getMoreTextHistory, getTextHistory } from '../../../features/slices/textHistoryReducer/getTextHistory'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import ActionIcon from '../../../assets/svg/action-icon.svg';
import { deleteInfo } from '../../../features/auth/login/loginApi'
import { handleToaster } from '../../../utils/CustomAlert/handleAlert'
import config from '../../../../config'
import { textHistoryStyle } from './TextHistoryStyle'
import TextBottomsheet from './Bottomsheets/TextBottomsheet'
import Loader from '../../../utils/Loader/Loader'
import { rs } from '../../../utils/styles/responsiveSize'
import TexthistorySkeleton from './Skeleton/TexthistorySkeleton'
import { HISTORY_DISPLAY } from '../../../navigation/routeName/routeName'
import moment from 'moment/moment'

const TextHistory = () => {
  const {colors}=useTheme();
  const [textHistory, setTextHistory]=useState([]);
  const {theme} = useSelector(state => state.themeReducer);
  const {t:trans}=useTranslation();
  const dispatch= useDispatch();
  const textActionBottomSheetRef = useRef(null);
  const [textInfo, setTextInfo]=useState({});

  const navigation = useNavigation();
  const {
    user: {token},
  } = useSelector(state => state.loginUserReducer) || {};

  const { contentList, loading, isRefresh, loadMore, nextPageUrl } =
  useSelector((state) => state.getTextHistory);
  const handleTextActionIndex = (text) => {
    Keyboard.dismiss();
    setTextInfo(text);
    textActionBottomSheetRef.current?.snapToIndex(0);
  };

  const styles= textHistoryStyle(colors);
 
  useEffect(()=>{
    async function checkTextHistory(){
    const data= await dispatch(getTextHistory({token}));
     if (data.payload.response.status.code===200){
      setTextHistory(data?.payload?.response?.records?.data);
     }
     else{
       handleToaster(trans(data?.payload?.response?.message),'warning',colors);
     }
   }
     checkTextHistory();
   },[])

   const handleLoadMoreCategory =async () => {
    let isMounted = true;
      if (isMounted && nextPageUrl && !loadMore) {
        const data= await  dispatch(getMoreTextHistory({ token,nextPageUrl }));
        if (data.payload.response.status.code===200){
          setTextHistory([...textHistory,...data.payload.response.records.data])
        }
        else{
          handleToaster(data.payload.response.status.message,'warning',colors);
        }
      }
      
      return () => {
          isMounted = false;
      };
  };

  const handleRefresh = async() => {
    let isMounted = true;
    if (isMounted) {
      const data= await dispatch(getTextHistory({token}));
        if (data.payload.response.status.code===200){
          setTextHistory(data.payload.response.records.data)
        }
        else{
          handleToaster(trans(data.payload.response.status.message),'warning',colors);
        }
    }
    return () => {
        isMounted = false;
    };
  }

  const deleteText=async (textId)=>{
    const updatedItems = textHistory.filter(item => item.id !== textId);
    setTextHistory(updatedItems);
    handleToaster(trans("Content Deleted Successfully"),'success',colors);
    const URL= `${config.BASE_URL}/user/openai/content/delete/${textId}`;
    const data =await deleteInfo(URL, token);
    if(data.response.status.code!==200){
     handleToaster(trans("oops! The content has not been deleted"),'warning',colors);
     setTextHistory(textHistory);
    }
 }

 const navigateToDetails=(item)=>{
    navigation.navigate(HISTORY_DISPLAY,{item, setTextHistory});
 }

  return (
    <>
      <KeyboardAvoidingView
          style={styles.pageVisibility}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
               <View>
                  <View style={styles.textHistoryContainer}>
                          {loading ? 
                          <View>
                            <TexthistorySkeleton/>
                          </View>
                          :
                               <View>
                                  {textHistory.length>0  ?
                                    <FlatList
                                    data={textHistory}
                                    renderItem={({item}) => (
                                    
                                    <TouchableOpacity onPress={()=>navigateToDetails(item)} style={styles.specificContain}>
                                          <View style={styles.subInfo}>
                                            <View style={styles.timeWordContainer}>
                                              <Text style={styles.timeText}>{moment(item.created_at).format('DD-MM-YYYY')}</Text>
                                              <Text style={styles.timeText}>{'\u2022'} {trans(item.words)} {trans('words')}</Text>
                                            </View>
                                            <TouchableOpacity style={styles.actionIcon} onPress={()=>handleTextActionIndex(item)}>
                                              <ActionIcon  fill={theme === 'dark' ? '#FFFFFF' : '#898989'}/>
                                            </TouchableOpacity>
                                          </View>
                                          <View style={styles.slugContainer}>
                                             <Text style={styles.slug}>{trans(item.slug)}</Text>
                                          </View>
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
                                          <View 
                                          style={styles.align_center}
                                          >
                                            <View style={ styles.EmptyDataContainer }
                                            >
                                              <Text style={styles.emptyText}>{trans('No Content is available to be displayed')}</Text>
                                            </View>
                                          </View>
                                        )}
                                    />

                                }

                              </View>
                        }
                        
                  </View>
              </View>
                  
          <View>
          </View>
      </KeyboardAvoidingView>
      <TextBottomsheet
          textInfo={textInfo}
          deleteText={deleteText}
          bottomSheetRef={textActionBottomSheetRef}
          setTextHistory={setTextHistory}
      />
    </>
    
  )
}

export default TextHistory