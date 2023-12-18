import {NextRequest, NextResponse} from "next/server";
import {env} from "../../../../../lib/env";
import {ElasticsearchClientError} from "@elastic/transport/lib/errors";
import {elasticClient} from "../../../../../lib/logger/elasticClient";

export async function POST(request: NextRequest) {

    const body = await request.json()

    if (!body?.data || !body?.type || typeof body.type !== "string") {
        return NextResponse.json({
            success: false,
            message: "data and type should not empty",
            data: null,
        })
    }

    try {

        const currentDate = new Date()

        const res = await elasticClient.index({
            index: "oil-front",
            id: env.ELASTIC_INDEX_NAME + "/***/" + currentDate,
            document: {
                type: body.type,
                "@timestamp": currentDate.toISOString(),
                ...body.data,
            },
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