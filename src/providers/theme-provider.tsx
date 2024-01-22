"use client"
import React from 'react';
import fa_IR from "antd/locale/fa_IR";
import { ConfigProvider } from "antd";
import StyledComponentsRegistry from './ant-registery';
import theme from '@/lib/theme-config';
import { AppProgressBar } from 'next-nprogress-bar';

function ThemeProvider(props: { children: React.ReactNode }) {
    return (
        <>
            <StyledComponentsRegistry>
                <ConfigProvider theme={theme} direction="rtl" locale={fa_IR}>
                    <AppProgressBar
                        height="3px"
                        color="#18948a"
                        options={{ showSpinner: false }}
                    />
                    {props.children}
                </ConfigProvider>
            </StyledComponentsRegistry>
        </>
    );
}

export default ThemeProvider;