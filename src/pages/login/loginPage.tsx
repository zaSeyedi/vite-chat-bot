import React from 'react';
import ContainerLayout from '../../layout/containerLayout';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";

interface IProps {

}
interface userData {
    active: boolean
    createdAt: string
    deleted: boolean
    firstName: string | null
    lastName: string | null;
    nationalId: number
    phone: string | null | number
    totalScore: number
    role: {
        name: string,
        permissions: string[]
    }
}
const LoginPage: React.FC<IProps> = () => {

    let urlElements = window.location.href.split('?')
    const [loginData, setLoginData] = useState<userData>()
    console.log(localStorage)
    const localStorageToken = JSON.parse(localStorage.getItem('token') as any)
    console.log(localStorageToken)

    useEffect(() => {
        let urlElements = window.location.href.split('?')
        console.log("code:" + urlElements[1])
        console.log('url' + urlElements[0])
        if(urlElements[1]){
            handleSSOLogin(urlElements[1])
        }
    }, [urlElements[1]]);

    const handleSSOLogin = async (token: string) => {
        localStorage.setItem('token', JSON.stringify(token))
        try {
            const response = await axios.get('http://78.157.46.108:8080/user/profile',
                {
                    headers: {
                        "x-token": token
                    }
                });
            console.log(response.data)
            localStorage.setItem('studentData', JSON.stringify(response.data.data))
            setLoginData(response.data.data)
            
        } catch (error) {
            console.error('Error during SSO login:', error);
        }
    };

    return (
        <ContainerLayout>
            <div>
                {!localStorageToken &&
                    <Link
                        className='cursor-pointer font-bold text-md bg-slate-300 flex w-1/2 mt-20 mx-auto p-3 rounded-md justify-center items-center'
                        to={`http://78.157.46.108:8080/user/ssoLogin`}
                        onClick={() => handleSSOLogin(urlElements[1])}
                    >
                        ورود به درگاه یکپارچه دناپ
                    </Link>}
                {localStorageToken &&
                    <div className='p-3'>{loginData?.role.name}خوش آمدید</div>}

                <Link
                    className='cursor-pointer font-bold text-md bg-slate-300 flex w-1/2 mt-20 mx-auto p-3 rounded-md justify-center items-center'
                    to={`/bots`}
                // onClick={() => console.log(loginData)}
                >
                    ورود به بات ها
                </Link>
            </div>

        </ContainerLayout>
    );
}

export default LoginPage;