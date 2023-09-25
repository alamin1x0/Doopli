import {StyleSheet, Platform, I18nManager} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
export const myProfileStyle = (colors, home, rightImage, leftImage, subscription

  ) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: home ? rs(20) : rs(0),
      paddingVertical: home ? rs(20) : rs(0),
      borderRadius: home ? 12 : 10,
      borderRadius: 12,
      alignItems: home ? 'center' : 'flex-start',
    },
    shadowProp: {
      ...Platform.select({
        ios: {
          shadowColor: colors.cornflowerBlue,
          shadowOffset: {width: 0, height: 7},
          shadowOpacity: 0.15,
          shadowRadius: 24,
        },
        android: {
          shadowColor: colors.cornflowerBlue,
          shadowOffset: {width: 0, height: 7},
          shadowOpacity: 0.15,
          elevation: 24,
        },
      }),
    },
    profileCont: {
      flex: 1,
      marginLeft: rightImage && rs(12),
      marginRight: leftImage && rs(12),
    },
    header: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(14),
      lineHeight: rs(14),
      color: '#fff',
      marginBottom: rs(4),
    },
    profileName: {
      fontFamily: home ? 'Gilroy-Bold' : 'Gilroy-Semibold',
      fontSize: home ? rs(18) : rs(16),
      lineHeight: home ? rs(24) : rs(22),
      color: subscription ? colors.bottomSheetItem : colors.white,

    },
      profileEmail: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(12),
      lineHeight: rs(14),
      marginTop: rs(5),
      color: subscription ? colors.subsEmail : colors.white,
    },
    viewProfileCont: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: home ? rs(10) : rs(12),
    },
    viewProfileText: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(12),
      lineHeight: rs(14),
      color: "#fff",
      marginRight: rs(4),
    },
    imageCont: {
      width: 68,
      height: 68,
      backgroundPosition: 'center',
      backgroundSize: 'center',
      borderRadius: 50,
    },
    rightIcon:{
      transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]
    }
  });
