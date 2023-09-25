import { View, Text } from 'react-native'
import React from 'react'
import { balanceStyle } from './BalanceStyle'
import { useTheme } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import GradientText from '../../../utils/Gradient/GradientText'
import { useTranslation } from 'react-i18next'

const Balance = ({text, remain, used}) => {
    const {colors}=useTheme();
    const {theme} = useSelector(state => state.themeReducer);
    const {t:trans} = useTranslation();
    const styles= balanceStyle(colors,theme); 
    
  return (
    <View style={styles.balanceContainer}>
       <Text> 
        <View style={styles.balanceLayout}> 
          <GradientText colors={["#E60C84", "#FFCF4B"]} style={styles.usedContent}>
            {used ? used: 0}
          </GradientText>
          <Text style={styles.remainingContent}>/{remain ? remain: 0}</Text>
        </View>
        </Text>
      <Text style={styles.textColor}>{trans(text)}</Text>
      
    </View>
  )
}

export default Balance