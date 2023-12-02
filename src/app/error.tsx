'use client'

import reportLog from "../../lib/logger/reportLog";
import deleteLog from "../../lib/logger/deleteLog";
import {reportLogEnum} from "../../lib/logger/reportLogEnum";
import {Button} from "antd";
import ThemeProvider from "../../provider/theme-provider";

interface PropsType {
    error: Error & { digest?: string },
    reset: () => void
}

export default function GlobalError(props: PropsType) {

    const data = {
        message: props.error.message,
        type: reportLogEnum.ui_error,
        cause: props.error.stack
    }

    const loggedStatus = reportLog(data)


    const handleClearLog = async () => {

        const res = await deleteLog()

        if (res) {
            alert("یا ابلفضضضضضضضل")
        }

    }

    return (
        <html>
        <body>
        <h2>Something went wrong!</h2>
        <ThemeProvider>
            <Button onClick={() => props.reset()}>Try again</Button>
            <Button onClick={handleClearLog}>clear asfd</Button>
        </ThemeProvider>
        </body>
        </html>
    )
}