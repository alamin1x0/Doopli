import {Dimensions, StyleSheet} from 'react-native';
import { rs } from '../../../utils/styles/responsiveSize';

const {width,height} = Dimensions.get('screen');
export const imageHistoryStyle = colors => {
  return StyleSheet.create({
   pageVisibility: {
      flex: 1,
      alignItems:'center',
      backgroundColor: colors.pageBg
   },
    scroll_view: {
      width: width - rs(40),
    },
    createImageContainer: {
      alignItems: 'center',
      width: width-rs(200),
      flexDirection:'row',
      marginHorizontal: rs(20),
      marginTop: rs(10)
    },
    newImageText:{
      marginLeft: rs(10),
      fontFamily:'Gilroy-Semibold',
      color: colors.textSecondary
    },
    container:{
     alignItems: 'center',
     marginBottom: rs(140),
     position: 'relative',
    },
    tableHeader:{
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems:'flex-start',
      width: width-rs(60),
      backgroundColor: colors.bgDenary,
      borderRadius: 6,
      padding: rs(10),
      marginTop: rs(10)
    },
    imgContainer:{
      marginTop: rs(20),
    },
    img:{
      height: width/2 - rs(40),
      width: width/2 - rs(40),
      borderRadius: 6,
      marginHorizontal: rs(10),
      marginVertical: rs(10),
    },
    promt:{
      width: rs(150),
      color: colors.textSecondary,
    },
    downloadIcon:{
      borderWidth: 1,
      borderColor: colors.borderQuaternary,
      borderRadius: rs(8),
      paddingHorizontal: rs(12),
      paddingTop: rs(12),
      paddingBottom: rs(11)
    },
    headerText:{
      color: colors.textSecondary,
      fontFamily: 'Gilroy-Semibold',
    },
    screenHeight:{
      height: height,
      marginTop: rs(15)
    },
    slugName:{
      width: rs(100),
      color: colors.textSecondary,
    },
    editTranshIconContainer:{
      flexDirection:'row', 
      justifyContent:'space-between', 
      width: rs(70)
    },
    editTranshIcon:{
      borderWidth: 1,
      borderColor: colors.borderQuaternary,
      padding: rs(4),
      borderRadius: 6 
    },
    bookmarksField:{
      width: rs(80)
    },
    contentWidth: {
      width: width - rs(60),
    },
    btnContainer:{
      alignItems:'center',
      marginTop: rs(20),
    },
    actionIcon:{
      position: 'absolute', 
      top: rs(25), 
      right: rs(20),
      backgroundColor: 'rgba(20, 20, 20, 0.35)',
      padding: rs(8),
      borderRadius: 5,
    },
    loaderCont: {
      marginTop: rs(26),     
      marginBottom: rs(-10),
      justifyContent:'center',
      alignContent:'center',
      flexDirection:'row'
    },
    br_8:{
      borderRadius: 8
    }
  });
};
