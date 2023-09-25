import { View, Text, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React from 'react'
import { displayTextGeneratorStyle } from './DisplayImageGeneratorStyle'
import { useNavigation, useTheme } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import ProgressiveImage from '../../utils/ProgressiveImage/ProgressiveImage'
import { IMAGE_HISTORY_DISPLAY } from '../../navigation/routeName/routeName'

const DisplayImageGenerator = ({route}) => {
  const {colors}=useTheme();
  const navigation = useNavigation();
  const styles= displayTextGeneratorStyle(colors);
  const ImageInfo=route.params.imageInfo;
  const {t: trans}=useTranslation();
  
  const navigateToDetails=(item)=>{
    navigation.navigate(IMAGE_HISTORY_DISPLAY,{imgInfo: item})
 }
  return (
    <KeyboardAvoidingView
        style={styles.pageVisibility}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imgContainer}>
              {[...ImageInfo].reverse().map((img, index) => {
              return <View key={index}>
                       {img.url.length>0 &&
                       <View>
                           <Text style={{ ...styles.textAlignment, ...styles.imgTitle }}>
                              {trans('Image Promt')}</Text>
                            <Text style={{ ...styles.textAlignment, ...styles.imgDescription,...styles.mr_9 }}>{trans(img.promt)}</Text>
                            
                            {
                            img?.url.map((item, index) =>{
                              return  <TouchableOpacity onPress={()=>navigateToDetails(item)}>
                               <ProgressiveImage  key={index} style={styles.img} source={{uri:item.url }} />
                              </TouchableOpacity>
                            })}
                           
                       </View>
                       }
                      
                     </View>;
              })}
        </View>
        
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default DisplayImageGenerator