import React from 'react';
import {Card} from "@/components/card";
import Resource from "@/components/resource";

const Page = ({params}: { params: { key: string } }) => {
    return (
        <Card>
            <Resource categoryKey={params.key}/>
        </Card>
    );
};

export default Page;