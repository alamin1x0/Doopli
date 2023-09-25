import {
  View,
  StatusBar,
  BackHandler,
  Modal,
  Text,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import {PROFILE} from '../../navigation/routeName/routeName';
import {useIsFocused, useTheme} from '@react-navigation/native';
import MyProfile from '../components/MyProfile/MyProfile';
import ProfileImage from '../components/ProfileImage/ProfileImage';
import AllActionCards from './AllActionCards/AllActionCards';
import {rs} from '../../utils/styles/responsiveSize';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useRef} from 'react';
import {useCallback} from 'react';
import {handleLogOut} from '../utilities/handleLogout/handleLogout';
import {useState} from 'react';
import {modalBottomSheetStyle} from '../components/components/Modals/ModalBottomSheet/modalBottomSheet.style';
import ButtonOutline from '../components/Buttons/ButtonOutline/ButtonOutline';
import {homeStyle} from './home.style';
import { CloseAppStyle } from './CloseAppStyle';
import LinearGradient from 'react-native-linear-gradient';


const Home = ({navigation}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const {t:trans} = useTranslation();
  const {theme} = useSelector(state => state.themeReducer);
  const isNavigate = useRef('');
  const isFocused = useIsFocused();
  const [closeModal, setCloseModal] = useState(false);
  const closeModalStyle = CloseAppStyle(colors);
  const bsExtraStyle = modalBottomSheetStyle(colors);
  const {container, actionsCont, background, headerBackground,br_12} = homeStyle(
    colors,
    closeModal,
    theme
  );

  const {
    user: {name, picture},
  } = useSelector(state => state.loginUserReducer);

  const handleNavigation = useCallback(route => {
    if (!isNavigate.current) {
      isNavigate.current = 1;
      navigation.navigate(route);
      setTimeout(() => {
        isNavigate.current = '';
      }, 1000);
    }
  }, []);

  const handleBackButtonPress = () => {
    if (isFocused) {
      setCloseModal(true);
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonPress,
    );
    return () => backHandler?.remove();
  }, [isFocused]);

  const CloseApp = () => {
    setCloseModal(false);
    BackHandler.exitApp();
    handleLogOut(dispatch);
  };
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        style={background}
        showsVerticalScrollIndicator={false}>
        <View style={container}>
          <LinearGradient
            colors={['#A26EF7', '#763CD4']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={ br_12}
          >
            <MyProfile
              name={name}
              home={1}
              textColor="white"
              onPress={() => {
                handleNavigation(PROFILE);
              }}
              leftImage={
                <ProfileImage
                  imageURL={picture}
                  imageSize={rs(68)}
                  onPress={() => {
                    handleNavigation(PROFILE);
                  }}
                />
              }
              buttonTitle={trans('View Profile')}
            />
            </LinearGradient>
          
          <AllActionCards
            style={actionsCont}
            navigation={navigation}
            isNavigate={isNavigate}
            colors={colors}
          />
        </View>
        <View style={closeModalStyle.centeredView}>
          <Modal animationType="fade" transparent={true} visible={closeModal}>
            <View style={closeModalStyle.centeredView}>
              <View style={closeModalStyle.modalView}>
                <Text style={bsExtraStyle.deleteConfirmationText}>
                  {trans('Close Aritifism App?')}
                </Text>
                <View>
                  <View style={bsExtraStyle.btnCont}>
                    <ButtonOutline
                      style={bsExtraStyle.btnCancel}
                      title={trans('Cancel')}
                      onPress={() => {
                        setCloseModal(false);
                      }}
                    />
                    <ButtonOutline
                      style={bsExtraStyle.btnDelete}
                      title={trans('Ok')}
                      onPress={CloseApp}
                      bgColor={colors.sunshade}
                      borderColor={colors.sunshade}
                      color={colors.gunPowder}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View style={headerBackground}></View>
      </ScrollView>
    </>
  );
};

export default Home;
