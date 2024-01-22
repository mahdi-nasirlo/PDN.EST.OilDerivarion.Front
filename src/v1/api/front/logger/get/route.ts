import {NextRequest, NextResponse} from "next/server";
import {ElasticsearchClientError} from "@elastic/transport/lib/errors";
import {elasticClient} from "../../../../../../lib/logger/elasticClient";
import {env} from "../../../../../../lib/env";

export async function POST(request: NextRequest) {

    const body = await request.json()

    if (!body?.id || typeof body.id !== "string") {
        return NextResponse.json({
            success: false,
            message: "id should be string and not empty",
            data: null,
        })
    }

    try {
        const res = await elasticClient.get({
            index: env.ELASTIC_INDEX_NAME,
            id: body.id
        })

        return NextResponse.json({
            success: true,
            id: body.id,
            data: res
        })
    } catch (e: ElasticsearchClientError | any) {

        return NextResponse.json({
            success: false,
            message: "request field",
            data: {
                name: e?.name,
                status: e?.meta?.statusCode
            }
        })
    }

}