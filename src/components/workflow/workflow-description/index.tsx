import React from 'react';
import {z} from "zod";
import {workflowApi} from "../../../constance/workflow";

const Index = ({data}: { data: z.infer<typeof workflowApi.dataTable.response.shape.data.shape.tasks.shape.Model> }) => {
    return (
        <div>
            
        </div>
    );
};

export default Index;