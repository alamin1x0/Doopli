import React, { useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Animated, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const ProgressBar = ({ duration = 1000, percentage = 0, backgroundColor = '#E22861', textColor = 'white', progressBarColor = '#474746', progressBarHeight = 6, progressBarBorderRadius = 10 , used, limit}) => {
  let animation = useRef(new Animated.Value(0));
  const {t:trans}= useTranslation();
  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: percentage,
      duration,
      useNativeDriver: false,
    }).start();
  }, [duration, percentage]);

  const statusBarHeight = StatusBar.currentHeight || 0;

  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.mt_8}>
      <View style={[styles.progressBar, { backgroundColor: progressBarColor, borderRadius: progressBarBorderRadius, height: progressBarHeight }]}>
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor, width, borderRadius: progressBarBorderRadius }]} />
      </View>
      <View style={[styles.container, styles.mt_8]}>
        <Text style={{ color: textColor }}>{trans('Credits used')}: {used}/{limit}</Text>
        <Text style={{ color: textColor }}>{`${percentage}%`}</Text>
      </View>
    </View>
  );
};

ProgressBar.propTypes = {
  duration: PropTypes.number, // Duration of the animation (in milliseconds)
  percentage: PropTypes.number.isRequired, // Progress percentage value (0 to 100)
  backgroundColor: PropTypes.string, // Background color of the progress bar
  textColor: PropTypes.string, // Color of the percentage text
  progressBarColor: PropTypes.string, // Color of the progress bar
  progressBarHeight: PropTypes.number, // Height of the progress bar
  progressBarBorderRadius: PropTypes.number, // Border radius of the progress bar
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  mt_8:{
    marginTop:8
  },
  progressBar: {
    flexDirection: 'row',
    width: '100%',
  },
});
