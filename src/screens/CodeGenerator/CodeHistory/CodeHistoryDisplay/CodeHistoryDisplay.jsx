import { View, Text, ScrollView, TouchableHighlight } from 'react-native'
import React from 'react'
import { displayCodeGeneratorStyle } from '../../DisplayCodeGeneratorStyle';
import CodeHighlighter from 'react-native-code-highlighter';
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useTheme } from '@react-navigation/native';
import ClipboardIcon from '../../../../assets/svg/copy.svg';
import Clipboard from '@react-native-clipboard/clipboard';
import { handleToaster } from '../../../../utils/CustomAlert/handleAlert';
import { useTranslation } from 'react-i18next';
import { imageDetailsStyle } from '../../../ImageGenerator/ImageHistory/ImageHistoryDisplay/ImageDetailsStyle';
import moment from 'moment/moment';
import { codeHistoryDisplayStyle } from './CodeHistoryDisplayStyle';


const CodeHistoryDisplay = ({route}) => {
  const {item}= route.params;
  const {colors} = useTheme();
  const {t:trans}= useTranslation();
  const styles = displayCodeGeneratorStyle(colors);
  const codeDisplayStyles = codeHistoryDisplayStyle(colors);
  const imgDetailsStyles= imageDetailsStyle(colors);
  
  const highlightCodeBlocks = (text) => {
    const codeBlockRegex = /```(.+?)```/gs;
    const parts = text.split(codeBlockRegex);
    
    const hanldeCopy=(code)=>{
        Clipboard.setString(code);
        handleToaster(trans('Copied to clipboard.'), 'copied', colors);
      }

    return parts.map((part, index) => {
      if (index % 2 === 0) {
        const pattern = /\n\n(?!.)/;
        const match = part.match(pattern);
        const isMatch = match ? true : false;
        return <Text style={styles.codeDescription} key={index}>{isMatch ? part : part+'\n'}</Text>;
      } else {
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
            <View style={codeDisplayStyles.codePromtContainer}>
                    <Text style={imgDetailsStyles.imgPromtText}>{trans('Title')}</Text>
                    <Text style={imgDetailsStyles.promtDescription}>{trans(item.promt)}</Text>
            </View>
            <View style={codeDisplayStyles.codeAttribute}>
                 <View style={{ ...imgDetailsStyles.singleAttribute, ...imgDetailsStyles.mr_right }}>
                    <Text style={imgDetailsStyles.attributeTitle}>{trans('Language')}</Text>
                    <Text style={imgDetailsStyles.attributeValue}>{trans(item.language)}</Text>
                 </View>
                 <View style={imgDetailsStyles.singleAttribute}>
                    <Text style={imgDetailsStyles.attributeTitle}>{trans('Code Level')}</Text>
                    <Text style={imgDetailsStyles.attributeValue}>{trans(item.code_label)}</Text>
                 </View>
                 <View style={imgDetailsStyles.singleAttribute}>
                    <Text style={imgDetailsStyles.attributeTitle}>{trans('Created On')}</Text>
                    <Text style={imgDetailsStyles.attributeValue}>{moment(item.created_at).format('DD-MM-YYYY')}</Text>
                 </View>
             </View>
      <Text>{highlightCodeBlocks(item.code)}</Text>
    </ScrollView>
  )
}

export default CodeHistoryDisplay