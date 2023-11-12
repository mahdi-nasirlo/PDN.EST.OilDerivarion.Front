import {env} from "../../../../../../lib/env";
import elasticClient from "../../../../../../lib/logger/elasticClient";
import { NextRequest } from 'next/server';


export async function GET(request: NextRequest) {

    // const testDocument = {test: "test"}

    // try {
    //     const res = await elasticClient.index({
    //         index: env.ELASTIC_INDEX_NAME,
    //         id: env.ELASTIC_DOCUMENT_ID,
    //         document: testDocument
    //     })

    //     return new Response(JSON.stringify(res))
    // } catch (e: any) {

    //     const data = env.NODE_ENV === "production" ? {
    //         success: false,
    //         message: e?.meta?.body?.error?.type,
    //         statusCode: e?.meta?.statusCode
    //     } : e

    //     return new Response(JSON.stringify(data))
    // }

}
