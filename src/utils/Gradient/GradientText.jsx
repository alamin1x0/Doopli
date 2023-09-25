import { View, Text } from 'react-native'
import React from 'react'
import MaskedView from '@react-native-masked-view/masked-view'
import LinearGradient from 'react-native-linear-gradient'

const GradientText = (props) => {
  const colors = props.colors;
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={props.colors.length < 3 ? [colors[0], colors[1]] : [colors[0], colors[1], colors[2]]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        >
        <Text {...props} style={[props.style, {opacity: 0}]} />
      </LinearGradient>
    </MaskedView>
  )
}

export default GradientText