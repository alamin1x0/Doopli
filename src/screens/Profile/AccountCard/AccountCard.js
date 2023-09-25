import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { accountCardStyle } from './AccountCardStyle'
import { useTheme } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const AccountCard = ({onPress,title, CardIcon, NavIcon,exist}) => {
    const {colors} = useTheme();
    const styles = accountCardStyle(colors);
    const {t:trans} =useTranslation();

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.iconTitleContainer}>
          <View style={styles.cardIconContainer}>
             <View>{CardIcon}</View>
              <Text style={styles.title}>{trans(title)}</Text>
              {!exist && 
              <Text style={styles.existText}>({trans('None')})</Text>
              }
          </View>
          <View>{NavIcon}</View>
      </View>
    </TouchableOpacity>
  )
}

export default AccountCard