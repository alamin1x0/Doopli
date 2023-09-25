import React from 'react';
import Lottie from 'lottie-react-native';
import {View} from 'react-native';
import {customLoaderStyle} from './customLoader.style';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const CustomLoader = () => {
  const {colors} = useTheme();
  const {theme} = useSelector(state => state.themeReducer);
  const styles = customLoaderStyle(colors);
  return (
    <View style={styles.container}>
      <View style={styles.loader}>
        <Lottie
          source={
            theme === 'light'
              ? require('../../../assets/lottie/transactions_light_loader.json')
              : require('../../../assets/lottie/transactions_dark_loader.json')
          }
          autoPlay
        />
      </View>
      {/* Will me utilized later */}
      {/* <View style={styles.backgroundLoader}></View> */}
    </View>
  );
};

export default CustomLoader;
