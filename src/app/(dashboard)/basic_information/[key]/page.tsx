import React from 'react';
import Resource from "@/components/resource";
import FormBuilderHistory from "@/components/form-builder/form-builder-history";
import {Card} from "@/components/card";

const Page = ({params}: { params: { key: string } }) => {
    return (
        <>
            <FormBuilderHistory formKey={params.key}/>
            <Card>
                <Resource categoryKey={params.key}/>
            </Card>
        </>
    );
};

export default Page;