import React from 'react';
import theme from "../theme/themeConfig";
import fa_IR from "antd/locale/fa_IR";
import StyledComponentsRegistry from "../lib/AntdRegistry";
import {ConfigProvider} from "antd";

function ThemeProvider(props: { children: React.ReactNode }) {
    return (
        <StyledComponentsRegistry>
            <ConfigProvider direction="rtl" theme={theme} locale={fa_IR}>
                {props.children}
            </ConfigProvider>
        </StyledComponentsRegistry>
    );
}

export default ThemeProvider;