import React from 'react';

type MessageInfo = {
    text: string;
};

const Message = ({ text }: MessageInfo) => {
    return (
        <div className="">
            <p className="">{text}</p>

        </div>
    );
};

export default Message;