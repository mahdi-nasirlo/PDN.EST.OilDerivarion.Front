'use client'

import reportLog from "../../lib/logger/reportLog";
import deleteLog from "../../lib/logger/deleteLog";
import {Button} from "antd";

interface PropsType {
    error: Error & { digest?: string },
    reset: () => void
}

export default function GlobalError(props: PropsType) {

    const data = {
        message: props.error.message,
        type: props.error.name,
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
        <Button onClick={() => props.reset()}>Try again</Button>
        <Button onClick={handleClearLog}>clear logs</Button>
        </body>
        </html>
    )
}