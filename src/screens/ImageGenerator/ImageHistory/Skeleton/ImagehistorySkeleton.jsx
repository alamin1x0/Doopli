import { View, Text, FlatList } from 'react-native'
import React from 'react'
import SkeletonElement from '../../../../utils/Skeleton/SkeletonElement';
import {styles} from './ImagehistorySkeletonStyle';

const RenderItem = ({ index }) => {
    return (
        <View
            key={`key-${index}`}
            style={styles.container}
        >
              <SkeletonElement wrapperStyle={styles.skeletonWrapperStyle1} />
              <SkeletonElement wrapperStyle={styles.skeletonWrapperStyle2} />
        </View>
    );
};


const ImagehistorySkeleton = () => {
  return (
    <FlatList
    data={[1, 2, 3,4,5,6,7]}
    renderItem={(_, index) => <RenderItem index={index} />}
    keyExtractor={(_, i) => "key" + i}
    style={styles.flatList}
    showsVerticalScrollIndicator={false}
   />
  )
}

export default ImagehistorySkeleton