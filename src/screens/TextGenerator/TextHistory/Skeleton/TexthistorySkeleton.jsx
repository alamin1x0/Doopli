import { View, Text, FlatList } from 'react-native'
import React from 'react'
import SkeletonElement from '../../../../utils/Skeleton/SkeletonElement';
import { useTheme } from '@react-navigation/native';
import { textHistorySkeletonStyle } from './TexthistorySkeletonStyle';


const RenderItem = ({ index , styles}) => {
    return (
        <View
            key={`key-${index}`}
            style={styles.container}
        >     
             <View style={styles.timeDateContainer}>
                <SkeletonElement wrapperStyle={styles.skeletonWrapperStyle1} />
                <SkeletonElement wrapperStyle={styles.skeletonWrapperStyle1} />
              </View>
            
              <SkeletonElement wrapperStyle={styles.skeletonWrapperStyle2} />
              <SkeletonElement wrapperStyle={styles.skeletonWrapperStyle3} />
        </View>
    );
};


const TexthistorySkeleton = () => {
    const {colors} = useTheme();
    const styles= textHistorySkeletonStyle(colors);
    return (
        <FlatList
        data={[1, 2, 3,4,5,6,7]}
        renderItem={(_, index) => <RenderItem index={index}  styles={styles}/>}
        keyExtractor={(_, i) => "key" + i}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
       />
      )
}

export default TexthistorySkeleton