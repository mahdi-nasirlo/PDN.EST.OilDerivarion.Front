"use client";

import AppLayout from "@/components/layout/layout";
import React from "react";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AppLayout>{children}</AppLayout>
        </>
    );
}
