import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { rs } from "../../../utils/styles/responsiveSize";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";

const EndShadow = () => {
    const {theme} = useSelector(state => state.themeReducer);
    return (
        <View style={styles.shadow}>
            <LinearGradient 
                colors={theme == 'dark' ? [
                    "rgba(51, 51, 50, 0.2)",
                    "rgba(51, 51, 50, 0.4)",
                    "rgba(51, 51, 50, 0.6)",
                    "rgba(51, 51, 50, 0.8)",
                    "rgba(51, 51, 50, 1)",
                ] : [
                    "rgba(255, 255, 255, 0.2)",
                    "rgba(255, 255, 255, 0.4)",
                    "rgba(255, 255, 255, 0.6)",
                    "rgba(255, 255, 255, 0.8)",
                    "rgba(255, 255, 255, 1)",
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <Text />
            </LinearGradient>
        </View>
    );
};

export default EndShadow;

const styles = StyleSheet.create({
    shadow: {
        width: rs(35),
        position: 'absolute',
        right: 0,
    },
});
