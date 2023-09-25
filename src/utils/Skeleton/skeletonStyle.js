import { StyleSheet } from 'react-native';
import { rs } from '../styles/responsiveSize';

export const skeletonStyle = StyleSheet.create({
    skeleton: {
        backgroundColor: '#ebebeb',
        marginVertical: rs(5),
    },
});
