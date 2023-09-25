import React, {useRef} from 'react';
import AnimatedLottieView from 'lottie-react-native';
import { Animated} from 'react-native';

const Loader = ({
  source,
  size,
  color='#000000',
  onAnimationFinish,
  autoplay = true,
  loop = true,
  speed = 1.5,
  keypath='loader'
}) => {
  const animationProgress = useRef(new Animated.Value(0))
  return (
    <AnimatedLottieView
      source={source}
      autoPlay={autoplay}
      loop={loop}
      style={size}
      speed={speed}
      colorFilters={[{keypath: keypath, color: color}]}
      onAnimationFinish={onAnimationFinish}
      progress={animationProgress.current}
    />
  );
};

export default Loader;
