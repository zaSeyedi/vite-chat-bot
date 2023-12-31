import React, { useState, useEffect } from 'react';
import ContainerLayout from '../../layout/containerLayout';
import axios from "axios";
import { getDate } from '../../helpers/getDateAndTime';
import { Link } from "react-router-dom";

interface IProps {
}
type MessageInfo = {
    _id: string;
    startStepId: string;
    name: string,
    description: string,
    createdById: {
        _id: string,
        firstName: string,
        lastName: string,
    },
    createdAt: string,
    time: number
};
const BotDetails: React.FC<IProps> = ({ }) => {
    const [post, setPost] = useState<MessageInfo>();
    const [loading, setLoading] = useState(true);
    let urlElements = window.location.pathname.split('/')

    useEffect(() => {
        getBotData()
    }, []);

    async function getBotData() {
        axios.get(`http://78.157.46.108:8080/bot/view/${urlElements[2]}`).then((data) => {
            setLoading(false)
            setPost(data.data.data);
        });
    }

    return (
        <ContainerLayout>
            {!loading ?
                <div>
                    <div className="p-6 border-b flex flex-row justify-center w-full items-center">
                        <div>رایمن</div>
                    </div>
                    <div className='p-6 flex flex-col items-end'>
                        <div className='flex flex-row-reverse justify-between w-full'>
                            <div className='border w-20 h-20 rounded-lg'>
                                <img className='flex-1' src='/assets/icons/typing.png' />

                            </div>
                            <Link
                                className='cursor-pointer font-bold text-xl bg-slate-300 flex w-20 h-20 rounded-full justify-center items-center'
                                to={`chat`}
                                onClick={() => console.log('link click')}>
                                Start
                            </Link>
                        </div>

                        <div className='mt-2'>ربات ۱</div>
                        <div className='flex flex-row-reverse mt-4'>
                            <div className='ml-1'>{':موضوع'}</div>
                            <div>{post?.name}</div>
                        </div>
                        <div className='flex flex-row-reverse mt-2'>
                            <div className='ml-1'>{':درس'}</div>
                            <div>{post?.name}</div>
                        </div>
                        <div className='flex flex-row-reverse mt-2'>
                            <div className='ml-1'>{':معرفی'}</div>
                            <div>{post?.description}</div>
                        </div>
                        <div className='flex flex-row-reverse mt-2'>
                            <div className='ml-1'>{':پیش‌نیاز(ها)'}</div>
                            <div>آزمایشی</div>
                        </div>
                        <div className='flex flex-row-reverse mt-2'>
                            <div className='ml-1'>{':سازنده'}</div>
                            <div>{post?.createdById?.firstName + " " + post?.createdById?.lastName}</div>
                        </div>
                        <div className='flex flex-row-reverse mt-2'>
                            <div className='ml-1'>{':مهلت انجام'}</div>
                            <div>{post?.time}</div>
                        </div>
                        <div className='flex flex-row-reverse mt-2'>
                            <div className='ml-1'>{':تاریخ انتشار'}</div>
                            <div>{getDate(post?.createdAt as string)}</div>
                        </div>
                    </div>
                </div> :
                <div></div>}
        </ContainerLayout>

    );
}

export default BotDetails;