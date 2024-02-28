"use client"

import { Typography } from 'antd'
import React from 'react'

export default function Page({ params: { uid } }: { params: { uid: string } }) {
    return (
        <Typography>lab_invoice {uid}</Typography>
    )
}
