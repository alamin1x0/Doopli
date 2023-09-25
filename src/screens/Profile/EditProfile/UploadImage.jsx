import React from 'react';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import ImageSvg from '../../../assets/svg/user-01.svg';
import Edit from '../../../assets/svg/edit-03.svg';
import DocumentPicker from 'react-native-document-picker';
import {postInfoUsingFormData} from '../../../features/auth/login/loginApi';
import {updateUserInfo} from '../../../features/auth/login/loginSlice';
import {rs} from '../../../utils/styles/responsiveSize';
import {handleToaster} from '../../../utils/CustomAlert/handleAlert';
import {useTranslation} from 'react-i18next';
import config from '../../../../config';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {memo} from 'react';
import { Platform} from 'react-native';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

const UploadImage = ({
  data: { setProfileImage, isConnected, loginUserData},
}) => {
  const {colors} = useTheme();
  const {token} = loginUserData || {};
  const {t:trans} = useTranslation();
  const {Preferences} = useSelector(state => state.getPreferences);
  const dispatch = useDispatch();
  const {user:{picture,name}} = useSelector(state => state.loginUserReducer);
  
  const handleFileUpload = async () => {
    try {
      const granted=await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((result)=>{
        return result;
      });

      if(granted === RESULTS.UNAVAILABLE){
        handleToaster(
          trans('This feature is not available on this device'),
          'warning',
          colors,
        );
      }
      
      else if (granted === RESULTS.GRANTED || granted === RESULTS.LIMITED ) {
        try {
          const res = await DocumentPicker.pickSingle({
            type: [DocumentPicker.types.images],
          });
  
          if (res.size / 1000000 <= Number(Preferences[0].preference.file_size) && isConnected) {
            setProfileImage(res.uri);
            const URL = `${config.BASE_URL}/user/openai/profile`;
            const formData = new FormData();
            formData.append('image', {
              name: res?.name,
              type: res?.type,
              uri:
                Platform.OS === 'android'
                  ? res.uri
                  : res.uri.replace('file://', ''),
            });
            formData.append('name', name);
            const result = await postInfoUsingFormData(
              formData,
              URL,
              token,
              'POST',
            );
    
            if (result) {
              if (result?.response?.status?.code === 200) {
                const updateLoginInfo = {...loginUserData, picture: res?.uri};
                dispatch(updateUserInfo(updateLoginInfo));
                handleToaster(
                  trans('Successfully uploaded Profile Picture'),
                  'success',
                  colors,
                );
              } else {
                handleToaster(
                  trans(result?.response?.status?.message),
                  'warning',
                  colors,
                );
              }
            }
          } else {
            isConnected &&
              handleToaster(
                trans('Profile image size must be less than or equal to {{x}} MB',{x: Preferences[0]?.preference.file_size}),
                'warning',
                colors,
              );
          }
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
          }
        }
      }
    } catch (err1) {}
  };
  return (
    <ProfileImage
      imageURL={
        picture ? (
          picture
        ) : (
          <ImageSvg
            height={rs(50)}
            width={rs(50)}
            fill={colors.bgTertiaryVariant}
          />
        )
      }
      badgeIconBgSize={rs(28)}
      defaultColor={colors.green}
      imageSize={rs(100)}
      onPress={() => handleFileUpload()}
      badgeIcon={<Edit height={rs(14)} fill={colors.white} />}
      badgeIconBg={colors.bgQuaternaryVariant}
      svgBg={colors.borderSeptenary}
    />
  );
};

export default memo(UploadImage);
