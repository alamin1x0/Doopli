import {StyleSheet} from 'react-native';
import {rs} from '../../utils/styles/responsiveSize';

export const createImageGeneratorStyle = colors => {
  return StyleSheet.create({
    AddNoteheight: {
      height: rs(100),
    },
  });
};
