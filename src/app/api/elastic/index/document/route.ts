import {NextRequest} from "next/server";
import {env} from "../../../../../../lib/env";

function GET(request: NextRequest) {

    try {

    } catch (e: any) {

        const data = env.NODE_ENV === "production" ? {
            success: false,
            message: e?.meta?.body?.error?.type,
            statusCode: e?.meta?.statusCode
        } : e

        return new Response(JSON.stringify(data))
    }

}