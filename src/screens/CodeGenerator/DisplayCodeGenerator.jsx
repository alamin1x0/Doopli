import { View, Text, ScrollView, TouchableHighlight, Platform, PermissionsAndroid } from 'react-native'
import React from 'react'
import CodeHighlighter from "react-native-code-highlighter";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useTheme } from '@react-navigation/native';
import { displayCodeGeneratorStyle } from './DisplayCodeGeneratorStyle';
import { useTranslation } from 'react-i18next';
import ClipboardIcon from "../../assets/svg/copy.svg";
import Clipboard from '@react-native-clipboard/clipboard';
import { handleToaster } from '../../utils/CustomAlert/handleAlert';
import RNFS from 'react-native-fs';

const DisplayCodeGenerator = ({route}) => {
   const {colors} = useTheme();
   const styles = displayCodeGeneratorStyle(colors);
   const {t:trans} = useTranslation();
   const generatedCode= route.params.codeInfo;
   let downloadedContent= '';
    const hanldeCopy=(code)=>{
      Clipboard.setString(code);
      handleToaster(trans('Copied to clipboard.'), 'copied', colors);
    }

    const manageDownload = async () => {
    try {
      let date = new Date();
      const directoryPath = Platform.OS==='android' ?  RNFS.DownloadDirectoryPath : RNFS.DocumentDirectoryPath;
      const filePath = `${directoryPath}/MyCodes${Math.floor(date.getTime() + date.getSeconds() / 2)}.txt`;
      const granted = Platform.OS==='android' && await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: trans('Storage Permission Required'),
          message: trans('App needs access to your storage to save the document.'),
          buttonNeutral: trans('Ask Me Later'),
          buttonNegative: trans('Cancel'),
          buttonPositive: trans('OK'),
        }
      );
  
      if (Platform.OS==='android' ? granted === PermissionsAndroid.RESULTS.GRANTED : Platform.OS==='ios') {
        await RNFS.writeFile(filePath, downloadedContent, 'utf8');
        handleToaster(trans("Codes downloaded successfully"), 'success',colors);
      } else {
        handleToaster(trans('System permissions denied'), 'warning',colors);
      }
    } catch (error) {
      handleToaster(trans('Error generating Word document:'), "error",colors);
    }
    };

    const handleDownload=()=>{
      downloadedContent.length>0?
      manageDownload():
      handleToaster(trans('Nothing to download.'), 'warning', colors);
    }


    const highlightCodeBlocks = (text) => {
        const codeBlockRegex = /```(.+?)```/gs;
        const parts = text.split(codeBlockRegex);
    
        return parts.map((part, index) => {
          if (index % 2 === 0) {
            return <Text style={styles.codeDescription} key={index}>{part}</Text>;
          } else {
            downloadedContent += part;
            return (
              <View key={index} style={styles.codeBlock}>
                <CodeHighlighter
                hljsStyle={monokai}
                containerStyle={styles.codeContainer}
                textStyle={styles.codeText}
                language="typescript"
		             >
			          {part}
		          </CodeHighlighter>
                <TouchableHighlight style={styles.copyIcon} onPress={()=>hanldeCopy(part)}><Text  style={styles.codeText}> <ClipboardIcon fill={'#fff'}/> </Text></TouchableHighlight>
              </View>
            );
          }
        });
      };
    
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
         <View style={styles.DownloadCodeContainer}>
            <Text style={styles.codeText}>{trans("Code Writer")}</Text>
            <TouchableHighlight onPress={handleDownload}>
               <Text style={styles.codeText}>{trans("Download Code")}</Text>
            </TouchableHighlight>
         </View>
        {highlightCodeBlocks(generatedCode)}
    </ScrollView>
  )
}

export default DisplayCodeGenerator

