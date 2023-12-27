import React from 'react';
import { Search, Victory, Clock, BackIcon } from '../../assets/icons/AppIcons'

interface IProps {
    onclick(): void
}
const ChatHeader: React.FC<IProps> = ({ onclick }) => {

    return (
        <div className="p-6 border-b flex flex-row justify-between w-full items-center">
            <div className='flex flex-row'>
                <Search />
                <Victory />
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Clock />
                <div>2:23</div>
            </div>
            <div className='flex flex-row items-center'>
                <div className='border w-8 h-8 rounded-full '></div>
                <div className='cursor-pointer' onClick={onclick}>
                    <BackIcon />
                </div>
            </div>
        </div>
    );
}

export default ChatHeader;