import {
  Text,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useRef} from 'react';
import { RichEditor} from 'react-native-pell-rich-editor';
import { displayTextGeneratorStyle } from './DisplayTextGeneratorStyle';
import { useTheme } from '@react-navigation/native';
import { useState } from 'react';;
import { useEffect } from 'react';
import { convertTextToHtml } from './utils/htmlConverter';
import { useSelector } from 'react-redux';


const {height}=Dimensions.get('screen');
const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>;
const DisplayTextGenerator = ({route}) => {
  const {theme} = useSelector(state => state.themeReducer);
  const {colors}=useTheme();
  const richText = useRef();
  const [content, setContent]=useState('');
  const styles= displayTextGeneratorStyle(colors);
  const generatedText= route.params.textInfo;
  let text="";
 
  useEffect(()=>{
    generatedText.forEach((item) => {
      text=(`${text + item.text }`);
    });
    setContent(text);
  },[])


  let html = convertTextToHtml(content);

  return (
    <SafeAreaView>
      <ScrollView usecontainer = {true} style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}	
        style={{ flex: 1}}
        >
          <RichEditor
              ref={richText}
              onChange={ descriptionText => {
                setContent(descriptionText);
              }}
              initialHeight={height}
              initialContentHTML={html}
              editorStyle={styles.richEditor}
              disabled={true}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DisplayTextGenerator;
