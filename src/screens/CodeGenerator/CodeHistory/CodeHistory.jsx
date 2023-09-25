import { View, Text, FlatList, TouchableOpacity, Keyboard } from 'react-native'
import React from 'react'
import { getCodeHistory, getMoreCodeHistory } from '../../../features/slices/codeHistoryReducer/getCodeHistory';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { codeHistoryStyle } from './CodeHistoryStyle';
import moment from 'moment/moment';
import { useTranslation } from 'react-i18next';
import ActionIcon from '../../../assets/svg/action-icon.svg';
import CodeBottomsheet from './Bottomsheets/CodeBottomsheet';
import { useRef } from 'react';
import { CODE_HISTORY_DISPLAY } from '../../../navigation/routeName/routeName';
import { handleToaster } from '../../../utils/CustomAlert/handleAlert';
import config from '../../../../config';
import { deleteInfo } from '../../../features/auth/login/loginApi';
import TexthistorySkeleton from '../../TextGenerator/TextHistory/Skeleton/TexthistorySkeleton';
import Loader from '../../../utils/Loader/Loader';
import { rs } from '../../../utils/styles/responsiveSize';

const CodeHistory = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const [codeHistory, setCodeHistory]=useState([]);
  const {theme} = useSelector(state => state.themeReducer);
  const {t: trans} = useTranslation();
  const codeActionBottomsheetRef = useRef(null);
  const [codeInfo, setCodeInfo] = useState([]);
  const {
    user: {token},
  } = useSelector(state => state.loginUserReducer) || {};
  const dispatch= useDispatch();
  const { codeList, loading, isRefresh, loadMore, nextPageUrl } =
  useSelector((state) => state.getCodeHistory);
  const styles = codeHistoryStyle(colors);
  useEffect(()=>{
    async function checkCodeHistory(){
    const data= await dispatch(getCodeHistory({token}));
     if (data.payload.response.status.code===200){
      setCodeHistory(data?.payload?.response?.records?.data);
     }
     else{
       handleToaster(trans(data?.payload?.response?.message),'warning',colors);
     }
   }
     checkCodeHistory();
   },[])

   const handleCodeActionIndex=(item)=>{
       Keyboard.dismiss();
       setCodeInfo(item);
       codeActionBottomsheetRef.current?.snapToIndex(0);
   }
   
   const navigateToDetails=(item)=>{
    navigation.navigate(CODE_HISTORY_DISPLAY,{item});
 }

 const deleteCode = async (itemId)=>{
    const updatedItems = codeHistory.filter(item=>item.id !== itemId);
    setCodeHistory(updatedItems);
    handleToaster(trans("Content Deleted Successfully"),'success',colors);
    const URL= `${config.BASE_URL}/user/openai/code/delete/${itemId}`;
    const data =await deleteInfo(URL, token);
    if(data.response.status.code!==200){
      handleToaster(trans("oops! The item has not been deleted"),'warning',colors);
      setCodeHistory(codeHistory);
     }
 }
 
 const handleLoadMoreCodes = async ()=>{
  let isMounted = true;
  if (isMounted && nextPageUrl && !loadMore) {
    const data= await  dispatch(getMoreCodeHistory({ token,nextPageUrl }));
    if (data.payload.response.status.code===200){
      setCodeHistory([...codeHistory,...data.payload.response.records.data])
    }
    else{
      handleToaster(data?.payload?.response?.status?.message,'warning',colors);
    }
  }
  
  return () => {
      isMounted = false;
  };
 }
 const handleRefresh = async() => {
  let isMounted = true;
  if (isMounted) {
    const data= await dispatch(getCodeHistory({token}));
      if (data.payload.response.status.code===200){
        setCodeHistory(data.payload.response.records.data)
      }
      else{
        handleToaster(trans(data.payload.response.status.message),'warning',colors);
      }
  }
  return () => {
      isMounted = false;
  };
}
  

  return (
    <>
        <View style={styles.pageVisibility}>
          {loading  && 
           <View>
            <TexthistorySkeleton/>
          </View>
          }
          {codeHistory.length>0 ? 
           <FlatList
              data={codeHistory}
              renderItem={({item}) => (
              <TouchableOpacity onPress={()=>navigateToDetails(item)}  style={styles.specificContain}>
                    <View style={styles.subInfo}>
                      <View style={styles.timeWordContainer}>
                        <Text style={styles.timeText}>{moment(item?.created_at).format('DD-MM-YYYY')}</Text>
                        <Text style={styles.timeText}>{'\u2022'} {trans(item?.language)}</Text>
                      </View>
                      <TouchableOpacity style={styles.actionIcon} onPress={()=>handleCodeActionIndex(item)}>
                        <ActionIcon  fill={theme === 'dark' ? '#FFFFFF' : '#898989'}/>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.slugContainer}>
                        <Text style={styles.slug}>{trans(item?.promt)}</Text>
                    </View>
              </TouchableOpacity>
              )
          }
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, i) => "key" + i}
            refreshing={isRefresh}
            onRefresh={handleRefresh}
            initialNumToRender={10}
            windowSize={10}
            onEndReachedThreshold={1}
            onEndReached={handleLoadMoreCodes}
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
          />:
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
                    <Text style={styles.emptyText}>{trans('No Code is available to be displayed')}</Text>
                  </View>
                </View>
              )}
          />

          }
         
        </View>
      <CodeBottomsheet
        codeInfo={codeInfo}
        bottomSheetRef={codeActionBottomsheetRef}
        deleteCode={deleteCode}
      />
    </>
  )
}

export default CodeHistory