import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";

interface IProps {
}
const Test: React.FC<IProps> = () => {
    const [url, setUrl] = useState('');

    useEffect(() => {
        getUrl()
    },[]);

    const getUrl = () => {
        axios.get(`http://78.157.46.108:8080/user/ssoCallback`)
            .then(x => {
                console.log(x);
            });
    }

    return (
        <div>
            <a href={url}>Google Link</a>
        </div>
    );
}

export default Test;