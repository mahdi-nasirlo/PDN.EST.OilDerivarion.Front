"use client"

import { Card, Col } from 'antd';
import React, { useState } from 'react'
import RenderFirstCard from './components/render-First-Card';
import RenderOtherCard from './components/render-Other-Card';


const CardGrid = () => {

    const [status, setStatus] = useState(true);

    const cards = new Array(5).fill(null).map((_, index) => {
        const isFirstCard = index === 0;
        const cardStyle = isFirstCard
            ? 'shadow-none border-dashed rounded-xl border-primary-500'
            : 'shadow-md border-solid rounded-xl';

        return (
            <Col key={index} xs={24} sm={12} lg={8} xl={6}>
                <Card
                    className={`py-2 font-bold text-lg border-1 ${cardStyle}`}
                    bodyStyle={{ width: '100%' }}
                >
                    {isFirstCard
                        ? <RenderFirstCard />
                        : <RenderOtherCard index={index} status={status} />
                    }
                </Card>
            </Col>
        );
    });

    return <>{cards}</>;
};

export default CardGrid;
