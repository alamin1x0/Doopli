import { View, Text, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useTheme } from '@react-navigation/native';
import { imageDetailsStyle } from './ImageDetailsStyle';
import { useTranslation } from 'react-i18next';
import CreateImg from '../../../../assets/svg/create-image.svg';
import { imageHistoryStyle } from '../ImageHistoryStyle';
import CustomButton from '../../../components/Buttons/CustomButton/CustomButton';
import useImageDownload from '../../Customhooks/useImageDownload';
import { CREATE_IMAGE_GENERATOR } from '../../../../navigation/routeName/routeName';
import moment from 'moment/moment';
import LinearGradient from 'react-native-linear-gradient';
const ImageHistoryDisplay = ({route}) => {
    const {colors}=useTheme();
    const styles= imageHistoryStyle(colors);
    const imgDetailsStyles= imageDetailsStyle(colors);
    const {t:trans}=useTranslation();
    const imgInfo=route?.params?.imgInfo;
    const [checkPermission]=useImageDownload();
    const navigation= useNavigation();
    const handleSimilarImage=()=>{
      navigation.navigate(CREATE_IMAGE_GENERATOR,{promt:imgInfo.name, 
        artStyle:{[imgInfo.artStyle || imgInfo.art_style]: imgInfo.artStyle || imgInfo.art_style}, lightingStyle:{[imgInfo.lightingStyle || imgInfo.lighting_style]: imgInfo.lightingStyle || imgInfo.lighting_style}, resolution: {[imgInfo.size]: imgInfo.size} });
    }

    return (
      <KeyboardAvoidingView
          style={imgDetailsStyles.pageVisibility}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity onPress={handleSimilarImage} style={styles.createImageContainer}>
                  <CreateImg fill={colors.textSecondary}/>
                  <Text style={styles.newImageText}>{trans('Generate Similar Image')}</Text>
                </TouchableOpacity>
           <View style={imgDetailsStyles.container}>
            <View style={imgDetailsStyles.imgContainer}>
                  <Image style={imgDetailsStyles.img} source={{uri: imgInfo.imageUrl || imgInfo.url }}  />
            </View>
            <View style={imgDetailsStyles.imgPromtContainer}>
                 <Text style={imgDetailsStyles.imgPromtText}>{trans('Image Promt')}</Text>
                 <Text style={imgDetailsStyles.promtDescription}>{trans(imgInfo.name)}</Text>
            </View>
            <View style={imgDetailsStyles.imgAttribute}>
                 <View style={{ ...imgDetailsStyles.singleAttribute, ...imgDetailsStyles.mr_right }}>
                    <Text style={imgDetailsStyles.attributeTitle}>{trans('Image Style')}</Text>
                    <Text style={imgDetailsStyles.attributeValue}>{trans(imgInfo.artStyle || imgInfo.art_style)}</Text>
                 </View>
                 <View style={imgDetailsStyles.singleAttribute}>
                    <Text style={imgDetailsStyles.attributeTitle}>{trans('Lighting Effects')}</Text>
                    <Text style={imgDetailsStyles.attributeValue}>{trans(imgInfo.lightingStyle || imgInfo.lighting_style)}</Text>
                 </View>
                 <View style={{ ...imgDetailsStyles.singleAttribute, ...imgDetailsStyles.mr_right }}>
                    <Text style={imgDetailsStyles.attributeTitle}>{trans('Resolution')}</Text>
                    <Text style={imgDetailsStyles.attributeValue}>{trans(imgInfo.size)}</Text>
                 </View>
                 <View style={imgDetailsStyles.singleAttribute}>
                    <Text style={imgDetailsStyles.attributeTitle}>{trans('Created On')}</Text>
                    <Text style={imgDetailsStyles.attributeValue}>{moment(imgInfo.created_at).format('DD-MM-YYYY')}</Text>
                 </View>
            </View>
            <View style={imgDetailsStyles.downloadImageSection}>
                 <LinearGradient
                            colors={['#A26EF7', '#763CD4']}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={styles.br_8}
                            >
                      <CustomButton onPress={()=>checkPermission(imgInfo.imageUrl)} title={trans('Download Image')}/>
                  </LinearGradient>
            </View>
          </View>
          
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }

export default ImageHistoryDisplay