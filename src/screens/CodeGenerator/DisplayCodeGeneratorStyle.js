import { Dimensions, StyleSheet } from "react-native";
import { rs } from "../../utils/styles/responsiveSize";
const {width}=Dimensions.get('screen');

export const displayCodeGeneratorStyle = (colors) => {
    return StyleSheet.create({
           scrollView:{
              margin: rs(16)
           },
          container: {
              padding: 16,
            },
          codeBlock: {
            backgroundColor: '#333332',
            padding: 8,
            borderRadius: 4,
            color: '#ffffff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: width- rs(40)
          },
          codeText:{
           color: colors.textSecondary
          },
          codeDescription:{
            color: colors.textSecondary
          },
          codeContainer:{
            backgroundColor: '#333332',
            width: width - rs(100)
          },
          copyIcon:{
            height: 20
          },
          DownloadCodeContainer:{
            flexDirection: 'row',
            justifyContent:  'space-between',
            marginBottom: rs(20)
          }
  
    });
  };