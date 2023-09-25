import {View} from 'react-native';
import React from 'react';
import CustomInput from '../../components/CustomInput/CustomInput';
import {useTheme} from '@react-navigation/native';
import {editProfileStyle} from './editProfileStyle';
import {useTranslation} from 'react-i18next';;
import {memo} from 'react';
import { useSelector } from 'react-redux';
const InputComponent = ({
  data: {
    name,
    setName,
    error
  },
}) => {
  const {colors} = useTheme();
  const styles = editProfileStyle(colors);
  const {t:trans} = useTranslation();
  const {user} = useSelector(state => state.loginUserReducer);

  return (
    <>
      <View>
        <CustomInput
          label={trans('Email Address') + '*'}
          value={user?.email}
          editable={false}
          style={styles.mb_16}
        />
        <CustomInput
          label={trans('Name')}
          value={name}
          onChangeText={text => setName(text)}
          isError={error.name && !name}
          error={trans('This field is required.')}
        />
      </View>
    </>
  );
};

export default memo(InputComponent);
