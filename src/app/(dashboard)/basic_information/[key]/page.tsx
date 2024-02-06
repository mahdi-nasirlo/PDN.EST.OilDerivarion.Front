import React from 'react';
import Resource from "@/components/resource";

const Page = ({params}: { params: { key: string } }) => {
    return (
        <>
            <Resource categoryKey={params.key}/>
        </>
    );
};

export default Page;