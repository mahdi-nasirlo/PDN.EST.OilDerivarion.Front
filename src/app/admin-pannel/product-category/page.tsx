"use client";

import React, { useState } from "react";
import PrimaryProductCategoryForm from "./components/primary-product-category-form";
import PrimaryProductCategoryTable from "./components/primary-product-category-table";
import PrimaryProductCategoryModal from "./components/primary-product-category-modal";

export default function Page() {

    const [modalVisible, setModalVisible] = useState(false);




    return (
        <>
            <PrimaryProductCategoryForm />
            <PrimaryProductCategoryTable setModalVisible={setModalVisible} />
            <PrimaryProductCategoryModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </>
    );
}
