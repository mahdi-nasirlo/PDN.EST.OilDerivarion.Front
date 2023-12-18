'use client'

import {Button} from "antd";
import ThemeProvider from "../../provider/theme-provider";

interface PropsType {
    error: Error & { digest?: string },
    reset: () => void
}

export default function GlobalError(props: PropsType) {

    console.log(props)

    // const data = {
    //     message: props.error.message,
    //     type: reportLogEnum.ui_error,
    //     cause: props.error.stack
    // }



    return (
        <html>
        <body>
        <h2>Something went wrong!</h2>
        <ThemeProvider>
            <Button onClick={() => props.reset()}>Try again</Button>
            {/*<Button onClick={handleClearLog}>clear asfd</Button>*/}
        </ThemeProvider>
        </body>
        </html>
    )
}