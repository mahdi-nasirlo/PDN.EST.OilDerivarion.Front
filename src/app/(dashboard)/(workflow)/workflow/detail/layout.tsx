import React from 'react';
import WorkflowProvider from "@/providers/workflow-provider";

const Layout = ({children}: { children: React.ReactNode }) => {

    return <WorkflowProvider>
        {children}
    </WorkflowProvider>
};

export default Layout;