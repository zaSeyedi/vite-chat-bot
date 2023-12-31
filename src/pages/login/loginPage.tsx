import React from 'react';
import ContainerLayout from '../../layout/containerLayout';
import { Link } from "react-router-dom";

interface IProps {
}
const LoginPage: React.FC<IProps> = () => {

    return (
        <ContainerLayout>
            <Link
                className='cursor-pointer font-bold text-md bg-slate-300 flex w-1/2 mt-20 mx-auto p-3 rounded-md justify-center items-center'
                to={`http://78.157.46.108:8080/user/ssoLogin`}
                onClick={() => console.log('link click')}>
                ورود به درگاه یکپارچه دناپ
            </Link>
        </ContainerLayout>
    );
}

export default LoginPage;