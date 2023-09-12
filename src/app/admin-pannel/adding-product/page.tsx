"use client";

import React, { useState } from "react";
import PrimaryAddingProductForm from "./components/primary-adding-product-form";
import PrimaryAddingProductTable from "./components/primary-adding-product-table";
import PrimaryAddingProductModal from "./components/primary-adding-product-modal";

export default function Page() {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <PrimaryAddingProductForm />
            <PrimaryAddingProductTable setModalVisible={setModalVisible} />
            <PrimaryAddingProductModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </>
    );
}