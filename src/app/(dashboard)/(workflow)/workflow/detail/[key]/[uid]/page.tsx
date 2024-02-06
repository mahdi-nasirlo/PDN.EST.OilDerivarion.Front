"use client"

import CommonWorkflow from "@/app/(dashboard)/(workflow)/workflow/detail/[key]/[uid]/component/common-workflow";

const Page = ({params: {uid, key}}: { params: { uid: string, key: string } }) => {

    return <CommonWorkflow uid={uid} stepKey={key}/>
};

export default Page;