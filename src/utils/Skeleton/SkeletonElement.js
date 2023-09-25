
import React from "react";
import { skeletonStyle } from "./skeletonStyle";
import { Placeholder, PlaceholderLine, Fade } from "rn-placeholder";

const SkeletonElement = ({ wrapperStyle }) => {
    return (
        <Placeholder
            style={[skeletonStyle.skeleton, wrapperStyle]}
            Animation={Fade}
        >
            <PlaceholderLine style={wrapperStyle} />
        </Placeholder>
    );
};

export default SkeletonElement;
