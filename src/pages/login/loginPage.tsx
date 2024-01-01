import React from 'react';
import ContainerLayout from '../../layout/containerLayout';
import axios from "axios";

interface IProps {
}
const LoginPage: React.FC<IProps> = () => {

    
    const handleSSOLogin = async () => {
        try {
          const response = await axios.get('http://78.157.46.108:8080/user/ssoLogin');
          window.location.href = response.data.redirectUrl;
          console.log(response)
        } catch (error) {
          console.error('Error during SSO login:', error);
        }
      };

    return (
        <ContainerLayout>
            <button
                className='cursor-pointer font-bold text-md bg-slate-300 flex w-1/2 mt-20 mx-auto p-3 rounded-md justify-center items-center'
                onClick={handleSSOLogin}>
                ورود به درگاه یکپارچه دناپ
            </button>
        </ContainerLayout>
    );
}

export default LoginPage;