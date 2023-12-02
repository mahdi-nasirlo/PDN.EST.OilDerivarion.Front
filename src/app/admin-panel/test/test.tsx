import React, { useEffect } from 'react'
import type { NextPage } from "next";
import { useState } from "react";
import axios from 'axios';
import Image from 'next/image';
import { Typography } from 'antd';

const Test: NextPage = () => {

    const [base64Image, setBase64Image] = useState('');

    useEffect(() => {
        // Make your API request to get the base64 image string
        // Replace 'your-api-endpoint' with your actual API endpoint
        axios.get('your-api-endpoint')
            .then(response => {
                setBase64Image(response.data.base64String);
            })
            .catch(error => {
                console.error('Error fetching image:', error);
            });
    }, []);
    return (
        <>
            <div>
                <Typography>Base64 Image Example</Typography>
                {base64Image && (
                    <Image
                        src={`data:image/png;base64,${base64Image}`}
                        alt="Base64 Image"
                        width={40}
                        height={40}
                    />
                )}
            </div>
        </>
    );
};

export default Test;