import React from 'react';
import { useEffect } from 'react';
import axios from "axios";

interface IProps {
}

const Test: React.FC<IProps> = () => {
    console.log('ssoCalback')

    const handleSSOCallback = async () => {
        try {
            const code = new URLSearchParams(window.location.search).get('code');
            if (code) {
                const response = await axios.get(`http://78.157.46.108:8080/user/ssoCallback?code=${code}`);
                console.log('SSO Callback Response:', response.data);
            } else {
                console.error('SSO Callback: Code parameter is missing.');
            }
        } catch (error) {
            console.error('Error during SSO callback:', error);
        }
    };

    useEffect(() => {
        handleSSOCallback();
    }, []);

    return (
        <div>
          <h1>SSO Callback Page</h1>
          <p>Handling SSO callback...</p>
        </div>
      );
}

export default Test;