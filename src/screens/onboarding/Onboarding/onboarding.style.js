import {Dimensions, StyleSheet, Platform} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {height, width} = Dimensions.get('window');
export const onboardingStyle = (colors, dWidth, index) =>
  StyleSheet.create({
    onboardingPage: {
      flex: 1,
      backgroundColor: "#141414"
    },
    bgImage:{
      flex: 1,
      justifyContent: 'center',
    },
    languageTranslator: {
      flexDirection: 'row',
      justifyContent: 'center',
      zIndex: 3
    },
    languageTranslatorContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop:
        Platform.OS === 'ios'
          ? 0
          : height > 700
          ? rs(14)
          : height > 590
          ? rs(12)
          : rs(8),
    },
    languageText: {
      fontFamily: 'Gilroy-Semibold',
      color: colors.white,
      marginHorizontal: rs(6),
      fontSize: rs(16),
      lineHeight: rs(20),
    },
    onboardingContainer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: height > 700 ? rs(14) : height > 590 ? rs(12) : rs(8),
    },
    onboardingImageContainer:{
      marginTop: index!=2 ? rs(20) : 0,
    },
    containImg:{
      resizeMode: 'contain',
      height: height* 0.3,
      width: rs(300),
    },
    coverImg:{
      resizeMode: 'stretch',
      width: width,
      height: height * 0.7,
      marginTop: rs(-50),
      zIndex: 1
    },
    repeatImg:{
      resizeMode: 'stretch',
      height:  height* 0.3,
      width: width,
    },
    textContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: index!=2 ? rs(1) : rs(-170),
      zIndex: 2,
    },
    title: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: height > 700 ? rs(20) : height > 590 ? rs(14) : rs(16),
      color: colors.white,
    },
    subtitle: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: height > 700 ? rs(34) : height > 590 ? rs(24) : rs(26),
      lineHeight: height > 700 ? rs(49) : height > 590 ? rs(41) : rs(33),
      color: colors.white,
    },
    description: {
      textAlign: 'center',
      fontFamily: 'Gilroy-Semibold',
      marginTop: height > 700 ? rs(15) : height > 590 ? rs(13) : rs(11),
      fontSize: height > 700 ? rs(15) : height > 590 ? rs(16) : rs(13),
      lineHeight: height > 700 ? rs(24) : height > 590 ? rs(20) : rs(20),
      width: width - rs(80),
      color: colors.white,
    },
    buttonContainer: {
      width: width,
      alignItems: 'center',
      marginBottom: Platform.OS === 'ios' ? 0 : rs(36),
    },
    registerButton: {
      width: width - rs(80),
    },
    signinButton: {
      width: width - rs(80),
      marginTop: rs(16),
    },
    dynamicWidth: {
      width: dWidth,
    },
    br_8:{
      borderRadius: 8
    },
     inputWidth: {
      width: width - rs(80),
    },
    scrollingBannerContainer:{
      position: 'absolute',
      height: rs(70), 
      top: height/2- 80,
      zIndex: 1
    },
    scrollingBanner:{
      backgroundColor:'#424AF9', 
      zIndex:1, 
      transform: [{rotateX: '-2deg'}, {rotateZ: '-2deg'}], 
      height: rs(35), 
      width: width,
    },
    reverseScrollingBanner:{
      backgroundColor:'#3238BD', 
      marginTop: -16, 
      transform: [{rotateX: '1.62deg'}, {rotateZ: '1.62deg'}], 
      height: rs(35), 
      width: width,
    },
    scrollingBannerContent:{
     flexDirection: 'row',
     alignItems: 'center',
     marginLeft: rs(10)
    },
    scrollingBannerText:{
      marginHorizontal: rs(10),
      fontFamily: "Gilroy-Semibold",
      fontSize: rs(14),
      color: '#FFFFFF'
    },
    diamond: {
      width: rs(5),
      height: rs(5),
      backgroundColor: "#FFFFFF",
      transform: [{ rotate: "45deg" }],
    },
  });
