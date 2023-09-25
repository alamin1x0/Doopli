import { View, StyleSheet, Image } from "react-native";
import React from "react";
import { useState } from "react";
import { memo } from "react";
const preview = {
    uri: Image.resolveAssetSource(
        require("../../assets/image/image-loader-icon.png"),
    ).uri,
};

import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";

const ProgressiveImage = ({ source = preview, style = {} }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const handleLoadImage = () => {
        setIsImageLoaded(true);
    };
    return (
        <View style={styles.container}>
            {!isImageLoaded && (
                <Placeholder style={style} Animation={Fade}>
                    <PlaceholderLine style={style} />
                    {source.uri && <Image
                      source={source}
                      style={styles.placeholderImg}
                      onLoad={handleLoadImage}
                    />}
                </Placeholder>
            )}
            {source.uri ? (isImageLoaded && <Image
                source={source}
                style={[
                    style,
                    styles.imageDisplay(isImageLoaded)
                ]}
                onLoad={handleLoadImage}
            /> ): null}
        </View>
    );
};

export default memo(ProgressiveImage);

const styles = StyleSheet.create({
    container: {
        borderRadius: 6,
    },
    imageOverlay: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "#FFFFFF",
    },
    imageDisplay: (isImageLoaded) => ({
        display: !isImageLoaded ? "none" : "flex",
    }),
    placeholderImg:{
        height : 1,
        width : 1,
        opacity: 0
    }
});
