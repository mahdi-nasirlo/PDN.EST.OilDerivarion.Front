import { NextRequest, NextResponse } from "next/server";
import { ElasticsearchClientError } from "@elastic/transport/lib/errors";
import { elasticClient } from "../../../../../../lib/logger/elasticClient";
import { env } from "../../../../../../lib/env";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    ...process.env,
  });
}
