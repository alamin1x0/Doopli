import { View, Text, ScrollView, Keyboard } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { historyDisplayStyle } from './HistoryDisplayStyle';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { useRef } from 'react';
import { Dimensions } from 'react-native';
import { useState } from 'react';
import { displayTextGeneratorStyle } from '../../DisplayTextGeneratorStyle';
import DownloadIcon from '../../../../assets/svg/img-download.svg';
import TextActionBottomsheet from '../Bottomsheets/TextActionBottomsheet';
import config from '../../../../../config';
import { postInfo } from '../../../../features/auth/login/loginApi';
import { useDispatch, useSelector } from 'react-redux';
import { handleToaster } from '../../../../utils/CustomAlert/handleAlert';
import { getTextHistory } from '../../../../features/slices/textHistoryReducer/getTextHistory';
import { rs } from '../../../../utils/styles/responsiveSize';
import { convertTextToHtml } from '../../utils/htmlConverter';


const {height}=Dimensions.get('screen');
const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>;
const HistoryDisplay = ({route}) => {
    const {colors}=useTheme();
    const styles = displayTextGeneratorStyle(colors);
    const displayStyles= historyDisplayStyle(colors);
    const {t:trans} = useTranslation();
    const dispatch= useDispatch();
    const {user: {token}} = useSelector(state => state.loginUserReducer) || {};
    const [content, setContent] = useState('');
    const [textInfo, setTextInfo]=useState({});
    const [updatedHtml, setUpdatedHtml] = useState();
    const richText = useRef();
    const textActionBottomSheetRef = useRef(null);
    const {item,setTextHistory }=route.params;
    let html = convertTextToHtml( item.content);
   
    const handleTextActionIndex = (text) => {
      richText.current.dismissKeyboard();
      setTextInfo(text);
      textActionBottomSheetRef.current?.snapToIndex(0);
    };
    const handleEdit=(descriptionText)=>{
      setUpdatedHtml(descriptionText);
      const regexTags = /(<([^>]+)>)/gi;
      const plainText = descriptionText.replace(regexTags, '');
      setContent(plainText);
    }
  
    const updateContent=async (textInfo)=>{
      const updateContentUrl= `${config.BASE_URL}/user/openai/content/edit/${item.slug}`;
      const data={
        content: textInfo
      }
      const res = await postInfo(data, updateContentUrl, token, 'POST' );
      const {records, status} = res?.response;
      if(status?.code==200){
        handleToaster(trans(status.message), 'success', colors);
        const data= await dispatch(getTextHistory({token}));
        if (data.payload.response.status.code===200){
          setTextHistory(data.payload.response.records.data)
        } 
      }
      else{
        setLoader(false);
        (Object.keys(records).length>0) ?
        handleToaster(trans(Object.values(records)[0]),'warning',colors)
        :
        handleToaster(trans(status.message), 'warning', colors);
      }
    }

  return (
         <>
             <View style={displayStyles.actionIconContainer}>
                <Text style={displayStyles.contentInfo}>{trans('Content of ')} {trans(item.slug)} {trans('Total Words')} : {trans(item.words)}</Text>
                <TouchableOpacity onPress={()=>handleTextActionIndex(item)}  style={displayStyles.actionIcon }>      
                  <DownloadIcon fill={colors.textSecondary}/>
                </TouchableOpacity>
              </View>
            <ScrollView usecontainer = {true} style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <RichEditor
                    ref={richText}
                    onChange={ descriptionText => {
                      handleEdit(descriptionText);
                    }}
                    androidHardwareAccelerationDisabled={true}
                    initialHeight={height - rs(200)}
                    initialContentHTML={html}
                    editorStyle={styles.richEditor}
                />
            </ScrollView>
            <RichToolbar 
                style={styles.richBar}
                editor={richText}
                actions={[ actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1,actions.insertBulletsList, actions.insertOrderedList, actions.setStrikethrough, actions.checkboxList,actions.undo, actions.redo ]}
                iconMap={{ [actions.heading1]: handleHead }}
            />

          <TextActionBottomsheet
            textInfo={updatedHtml?.length>0 ? updatedHtml : html}
            content={content}
            bottomSheetRef={textActionBottomSheetRef}
            updateContent={updateContent}
          />
    
        </>
  )
}

export default HistoryDisplay