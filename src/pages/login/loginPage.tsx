import React from 'react';
import ContainerLayout from '../../layout/containerLayout';
import { Link, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState<userData>()
    const [token, setToken] = useState('')


    useEffect(() => {
        let urlElements = window.location.href.split('?')
        if (urlElements[1]) {
            handleSSOLogin(urlElements[1])
        }
    }, [urlElements[1]]);

    useEffect(() => {
        const localStorageToken = localStorage.getItem('token') as any
        const localStorageUserData = localStorage.getItem('studentData') as any
        if (localStorageUserData) {
            setLoginData(JSON.parse(localStorageUserData))
        }
        if (localStorageToken) {
            setToken(localStorageToken)
        }

    }, []);

    const handleSSOLogin = async (token: string) => {
        try {
            const response = await axios.get('http://78.157.46.108:8080/user/profile',
                {
                    headers: {
                        "x-token": token
                    }
                });
            if (response && response.data.code === 0) {
                setLoginData(response.data.data)
                setToken(token)
                localStorage.setItem('studentData', JSON.stringify(response.data.data))
                localStorage.setItem('token', token)
                navigate("/", { replace: true })
            }

        } catch (error) {
            console.error('Error during SSO login:', error);
        }
    };

    return (
        <ContainerLayout>
            <div>
                {!token &&
                    <Link
                        className='cursor-pointer font-bold text-md bg-slate-300 flex w-1/2 mt-20 mx-auto p-3 rounded-md justify-center items-center'
                        to={`http://78.157.46.108:8080/user/ssoLogin`}
                    >
                        ورود به درگاه یکپارچه دناپ
                    </Link>}
                {token &&
                    <div className='p-3'>{loginData?.role.name}خوش آمدید</div>}

                <Link
                    className='cursor-pointer font-bold text-md bg-slate-300 flex w-1/2 mt-20 mx-auto p-3 rounded-md justify-center items-center'
                    to={`/bots`}
                >
                    ورود به بات ها
                </Link>
                {token &&
                    <button
                        className='cursor-pointer font-bold text-md bg-slate-300 flex w-1/2 mt-20 mx-auto p-3 rounded-md justify-center items-center'
                        onClick={() => {
                            localStorage.removeItem('token')
                            setToken('')
                        }}
                    >
                        خروج
                    </button>}
            </div>

        </ContainerLayout>
    );
}

export default LoginPage;