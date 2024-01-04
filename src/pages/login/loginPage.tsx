import React from 'react';
import ContainerLayout from '../../layout/containerLayout';
import { Link } from "react-router-dom";
import axios from "axios";

interface IProps {
}
const LoginPage: React.FC<IProps> = () => {

    // const [url, setUrl] = useState('');
    // const handleSSOLogin = async () => {
    //     try {
    //         const response = await axios.get('http://78.157.46.108:8080/user/ssoLogin');
    //         window.location.href = response.data.redirectUrl;
    //     } catch (error) {
    //         console.error('Error during SSO login:', error);
    //     }
    // };

    return (
        <ContainerLayout>
            <div>
                <Link
                    className='cursor-pointer font-bold text-md bg-slate-300 flex w-1/2 mt-20 mx-auto p-3 rounded-md justify-center items-center'
                    to={`http://78.157.46.108:8080/user/ssoLogin`}
                    // onClick={() => handleSSOLogin()}
                    >
                    ورود به درگاه یکپارچه دناپ
                </Link>
                <Link
                    className='cursor-pointer font-bold text-md bg-slate-300 flex w-1/2 mt-20 mx-auto p-3 rounded-md justify-center items-center'
                    to={`/bots`}
                    onClick={() => console.log('link click')}>
                    ورود به بات ها
                </Link>
            </div>

        </ContainerLayout>
    );
}

export default LoginPage;