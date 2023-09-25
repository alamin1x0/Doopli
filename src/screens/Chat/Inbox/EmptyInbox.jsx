import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { rs } from "../../../utils/styles/responsiveSize";

const data = [
    {
        id: 1,
        text: 'Explain quantum computing in simple terms'
    },
    {
        id: 2,
        text: 'Got any creative ideas for a 10 year old’s birthday?'
    },
    {
        id: 3,
        text: 'How do I make an HTTP request in Javascript?'
    },
    {
        id: 4,
        text: 'Explain quantum computing in simple terms'
    },
    {
        id: 5,
        text: 'Got any creative ideas for a 10 year old’s birthday?'
    },
    {
        id: 6,
        text: 'How do I make an HTTP request in Javascript?'
    },
]

const EmptyInbox = () => {
    const {colors} = useTheme();
    const emptyInputStyle = EmptyInboxStyle(colors);
  return (
    <View style={emptyInputStyle.cont}>
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <Text style={emptyInputStyle.text}>{item?.text}</Text>}
            keyboardShouldPersistTaps={'always'}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
        />
    </View>
  );
};

export default EmptyInbox;

const EmptyInboxStyle = (colors) => StyleSheet.create({
    cont: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        backgroundColor: colors.bgQuinaryVariant,
        padding: rs(16),
        borderRadius: 8,
        marginTop: rs(12),
        color: colors.bottomSheetItem,
        fontFamily: 'Gilroy-Light',
        fontSize: rs(15),
        lineHeight: rs(20)
    }
});
