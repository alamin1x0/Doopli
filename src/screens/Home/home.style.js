import {StyleSheet} from 'react-native';
import {rs} from '../../utils/styles/responsiveSize';
export const homeStyle = (colors, closeModal,theme) =>
  StyleSheet.create({
    background: {
      backgroundColor: colors.pageBg,
      zIndex: 0,
      opacity: !closeModal ? 1 : 0.7,
    },
    container: {
      flex: 1,
      paddingHorizontal: rs(20),
      paddingTop: rs(10),
      zIndex: 2,
    },
    actionsCont: {
      flexDirection: 'row',
      marginTop: rs(20),
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    headerBackground: {
      backgroundColor: theme==='dark' ? '#333332': "#141414",
      zIndex: 1,
      width: '100%',
      height: rs(83),
      position: 'absolute',
      alignItems: 'center',
    },
    safeAreaProvider: {
      flex: 1,
    },
    br_12:{
      borderRadius: 12
    }
  });
