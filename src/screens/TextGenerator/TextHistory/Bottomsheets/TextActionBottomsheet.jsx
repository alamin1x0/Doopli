import { View, Text, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native'
import React from 'react'
import {  useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import CustomBottomSheet from '../../../components/CustomBottomSheet/CustomBottomSheet';
import { imageActionBottomSheetStyle } from '../../../ImageGenerator/ImageHistory/Bottomsheets/ImageActionBottomsheet/ImageActionBottomsheetStyle';
import { inputFieldStyle } from '../../../components/components/InputField/inputFieldStyle';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import { handleToaster } from '../../../../utils/CustomAlert/handleAlert';
import Clipboard from '@react-native-clipboard/clipboard';



const TextActionBottomsheet = ({
  textInfo,
  content,
  bottomSheetRef,
  updateContent
}) => {
  
  const {colors} = useTheme();
  const style= imageActionBottomSheetStyle(colors);
  const inputFieldStyles = inputFieldStyle(colors);
  const {t:trans}=useTranslation();


  async function createPDF(htmlText, filename) {
    let options = {
      html: htmlText,
      fileName: filename,
      directory: Platform.OS==='android' ? RNFS.DownloadDirectoryPath : RNFS.DocumentDirectoryPath,
    };
  
    try {
      const granted = Platform.OS==='android' && await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'App needs access to your storage to save the document.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if ( Platform.OS==='android' ? granted === PermissionsAndroid.RESULTS.GRANTED : Platform.OS==='ios') {
        let file = await RNHTMLtoPDF.convert(options);
        const filePath = file.filePath;
        const destinationPath = `${Platform.OS==='android' ? RNFS.DownloadDirectoryPath : RNFS.DocumentDirectoryPath}/${filename}.pdf`;
        await RNFS.moveFile(filePath, destinationPath);
        handleToaster(trans("PDF downloaded successfilly"), 'success', colors);
      }
      else {
        handleToaster(trans('System permissions denied'), 'warning',colors);
      }
     
    } catch (error) {
      handleToaster(trans('Failed to create and save PDF.'),'warning', colors);
    }
  }
  
  const handleCreatePdf = () => {
    let date = new Date(); 
    const htmlText = textInfo;
    const filename = 'new_document' + Math.floor(date.getTime() + date.getSeconds() / 2);

    createPDF(htmlText, filename);
  }

  const generateWordDocument = async () => {
    const regexTags = /(<([^>]+)>)/gi;
    const content = textInfo.replace(regexTags, '');

  try {
    let date = new Date();
    const directoryPath = Platform.OS==='android' ?  RNFS.DownloadDirectoryPath : RNFS.DocumentDirectoryPath;
    const filePath = `${directoryPath}/MyWordDocument${Math.floor(date.getTime() + date.getSeconds() / 2)}.docx`;
    const granted = Platform.OS==='android' && await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission Required',
        message: 'App needs access to your storage to save the document.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );

    if (Platform.OS==='android' ? granted === PermissionsAndroid.RESULTS.GRANTED : Platform.OS==='ios') {
      await RNFS.writeFile(filePath, content, 'utf8');
      handleToaster(trans("Docs downloaded successfully"), 'success',colors);
    } else {
      handleToaster(trans('System permissions denied'), 'warning',colors);
    }
  } catch (error) {
    handleToaster(trans('Error generating Word document:'), "error",colors);
  }
  };

  const copyToClipboard = () => {
    if(content){
      Clipboard.setString(content);
    }
    else{
      Clipboard.setString(textInfo.replace(/(<([^>]+)>)/gi,''));
    }
    handleToaster(trans('Copied to clipboard.'), 'copied', colors);
  };


  return (
    <CustomBottomSheet
      style={style.alignCenter}
      bgColor={colors.bgQuaternary}
      bottomSheetRef={bottomSheetRef}
      snapPoint={[]}>
      <Text style={style.title}>
        {trans('Select Action')}
      </Text>
      <View style={style.textBottomBorder}></View>
      <TouchableOpacity
        style={style.textContainer}
        onPress={() => {
          bottomSheetRef.current.close(),
          handleCreatePdf();
        }}>
        <Text style={[inputFieldStyles.btmSheet, style.textStyle]}>
          {trans('Download Pdf')}
        </Text>
      </TouchableOpacity>
      <View style={style.textBottomBorder}></View>
        <TouchableOpacity style={style.textContainer}
         onPress={() => {
          bottomSheetRef.current.close(),
          generateWordDocument()
        }}>
          <Text style={[inputFieldStyles.btmSheet, style.textStyle]}>
          {trans('Download Docs')}
          </Text>
        </TouchableOpacity>
      <View style={style.textBottomBorder}></View>
      <TouchableOpacity  style={style.textContainer}
        onPress={() => {
        bottomSheetRef.current.close(),
        updateContent(textInfo)
      }}>
        <Text style={[inputFieldStyles.btmSheet, style.textStyle]}>
        {trans('Update Content')}
        </Text>
      </TouchableOpacity>
      <View style={style.textBottomBorder}></View>
        <TouchableOpacity  style={style.textContainer}
         onPress={() => {
          copyToClipboard(textInfo),
          bottomSheetRef.current.close();
        }}>
          <Text style={[inputFieldStyles.btmSheet, style.textStyle]}>
          {trans('Copies to clipboard')}
          </Text>
        </TouchableOpacity>
    
    </CustomBottomSheet>
  )
}

export default TextActionBottomsheet