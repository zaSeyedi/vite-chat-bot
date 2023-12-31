import React from 'react';

type MessageInfo = {
    text: string;
};

const Message = ({ text }: MessageInfo) => {
    return (
        <div className="">
            <div className="">
                {text}
            </div>

        </div>
    );
};

export default Message;