"use client";

import FinalReview from "@/app/(dashboard)/request/final-review/components/index"

export default function Page({params: {uid}}: { params: { uid: string } }) {

    return <FinalReview package_UID={uid}/>
}
