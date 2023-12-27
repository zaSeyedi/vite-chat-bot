import React, { useState, useEffect, Children } from 'react';

interface IProps {
    children: JSX.Element
}
const ContainerLayout: React.FC<IProps> = ({children}) => {

    return (
        <div className="w-full h-screen md:p-8 items-center">
            <div className='md:border h-full mx-auto rounded-2xl w-full md:max-w-md'>
                {children}
            </div>

        </div>
    );
}

export default ContainerLayout;