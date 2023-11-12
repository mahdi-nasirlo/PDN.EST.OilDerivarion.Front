import {env} from "../../../../../../lib/env";
import elasticClient from "../../../../../../lib/logger/elasticClient";
import { NextRequest } from 'next/server';


export async function GET(request: NextRequest) {

    try {
        const res = await elasticClient.indices.create({index: env.ELASTIC_INDEX_NAME})

        return new Response(JSON.stringify(res))
    } catch (e: any) {

        const data = env.NODE_ENV === "production" ? {
            success: false,
            message: e?.meta?.body?.error?.type,
            statusCode: e?.meta?.statusCode
        } : e

        return new Response(JSON.stringify(data))
    }

} 
