"use client"

import React from 'react';
import {Card} from "@/components/card";
import WorkflowDataTable from "components/workflow/workflow-data-list";

const Page = () => {

    
    return (
        <Card>
            <WorkflowDataTable apiUrl="/License/GetRequestList"/>
        </Card>
    );
};

export default Page;


