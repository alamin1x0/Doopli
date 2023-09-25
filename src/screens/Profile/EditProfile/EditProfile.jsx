import {
  View,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  VirtualizedList,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {editProfileStyle} from './editProfileStyle';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import { postInfoUsingFormData} from '../../../features/auth/login/loginApi';
import Lottie from 'lottie-react-native';
import BottomButton from '../../components/BottomButton/BottomButton';
import {updateUserInfo} from '../../../features/auth/login/loginSlice';
import UploadImage from './UploadImage';
import InputComponent from './InputComponent';
import {useTranslation} from 'react-i18next';
import {handleToaster} from '../../../utils/CustomAlert/handleAlert';
import config from '../../../../config';
import {NetworkContext} from '../../../utils/Network/NetworkProvider';

const initialError = {
  name: false,
};
const EditProfile = () => {
  const {user: loginUserData} = useSelector(state => state.loginUserReducer);
  const {isConnected} = useContext(NetworkContext);
  const {token} = loginUserData || {};
  const {userInfo} = useSelector(state => state.profileReducer) || {};
  const {colors} = useTheme();
  const styles = editProfileStyle(colors);
  const [name, setName] = useState(loginUserData.name);
  const [profileImage, setProfileImage] = useState('');
  const [error,setError]=useState(initialError);
  const dispatch = useDispatch();
  const [updateProfileLoading, setUpdateProfileLoading] = useState(false);
  const {t:trans} = useTranslation();

 
  const handleError = () => {
    const errorName =name  === '' ? true : false;
    setError({
      ...error,
      name: errorName
    });
  };
  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (name &&isConnected) 
    {
      setUpdateProfileLoading(true);
      const URL = `${config.BASE_URL}/user/openai/profile`;
      const formData = new FormData();
      formData.append('name', name);
      const result = await postInfoUsingFormData(
        formData,
        URL,
        token,
        'POST',
      );
      if (result) {
        if (result?.response?.status?.code === 200) {
          const updateLoginInfo = {
            ...loginUserData,
            name: name
          };
          dispatch(updateUserInfo(updateLoginInfo));
          handleToaster(
            trans(result?.response?.status?.message),
            'success',
            colors,
          );
          setUpdateProfileLoading(false);
        } else {
          !result?.response?.message ?
          handleToaster(
            trans(result?.response?.status?.message),
            'warning',
            colors,
          ):
          handleToaster(
            trans(result?.response?.message),
            'warning',
            colors,
          )
          ;
        }
        setUpdateProfileLoading(false);
      }
      
    } else {
      handleError();
    }
  };
  const data = new Array(1).fill().map((_, index) => ({key: index.toString()}));
  const [fastLoad, setFastLoad] = useState(true);
  setTimeout(() => {
    setFastLoad(false);
  }, 0);
  
  if (fastLoad) return <View style={styles.scroll_view} />;
  return (
    <>
      <KeyboardAvoidingView
        style={styles.onKeyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <VirtualizedList
          data={data}
          style={styles.scroll_view}
          showsVerticalScrollIndicator={false}
          renderItem={() => (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.container}>
                <UploadImage
                  data={{
                    profileImage,
                    setProfileImage,
                    isConnected,
                    userInfo,
                    loginUserData,
                  }}
                />
                <View style={styles.inputCont}>
                  <InputComponent
                    data={{
                      name,
                      setName,
                      error,
                      token,
                      setError,
                      isConnected,
                    }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
          getItemCount={() => data.length}
          getItem={(data, index) => data[index]}
          keyExtractor={item => item}
        />
        <BottomButton
          disable={!name ? true : false}
          yes={
            !updateProfileLoading ? (
              trans('Save Changes')
            ) : (
              <Lottie
                source={require('../../../assets/lottie/lf30_editor_15agdwbd.json')}
                autoPlay
              />
            )
          }
          onPress={handleSubmit }
          no={trans('Cancel')}
        />
      </KeyboardAvoidingView>
    </>
  );
};

export default EditProfile;
