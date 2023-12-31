import React from 'react';
import ContainerLayout from '../../layout/containerLayout';
import { Link } from "react-router-dom";

interface IProps {
}
const BotsListPage: React.FC<IProps> = () => {

    return (
        <ContainerLayout>
            <div>
                <Link
                    className='cursor-pointer font-bold text-md bg-slate-300 flex w-1/2 mt-20 mx-auto p-3 rounded-md justify-center items-center'
                    to={`/bots/بات-تست-عملکرد-رایمن-۲`}
                    onClick={() => console.log('link click')}>
                    بات ۱
                </Link>
                <Link
                    className='cursor-pointer font-bold text-md bg-slate-300 flex w-1/2 mt-20 mx-auto p-3 rounded-md justify-center items-center'
                    to={`/bots/تست`}
                    onClick={() => console.log('link click')}>
                    بات ۲
                </Link>
            </div>
        </ContainerLayout>
    );
}

export default BotsListPage;