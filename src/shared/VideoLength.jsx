import React from "react";
import moment from "moment";

const VideoLength = ({ time }) => {
    const videoLengthInSeconds = moment()
        ?.startOf("day")
        ?.seconds(time)
        ?.format("h:mm:ss");
        const min = moment()
        ?.startOf("day")
        ?.seconds(time)
        ?.format("mm:ss");
    return (
        <span className="absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md">
            {time>3600? videoLengthInSeconds : min}
        </span>
    );
};

export default VideoLength;