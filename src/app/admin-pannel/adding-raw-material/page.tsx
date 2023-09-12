"use client";

import React, { useState } from 'react'
import PrimaryAddRawMaterialForm from './components/primary-add-raw-material-form';
import PrimaryAddRawMaterialTable from './components/primary-add-raw-material-table';
import PrimaryAddRawMaterialModal from './components/primary-add-raw-material-modal';

export default function Page() {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <PrimaryAddRawMaterialForm />
            <PrimaryAddRawMaterialTable setModalVisible={setModalVisible} />
            <PrimaryAddRawMaterialModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </>
    );
}


// const MyFormItemContext = React.createContext<(string | number)[]>([]);

// interface MyFormItemGroupProps {
//   prefix: string | number | (string | number)[];
//   children: React.ReactNode;
// }

// function toArr(
//   str: string | number | (string | number)[]
// ): (string | number)[] {
//   return Array.isArray(str) ? str : [str];
// }

// const MyFormItemGroup = ({ prefix, children }: MyFormItemGroupProps) => {
//   const prefixPath = React.useContext(MyFormItemContext);
//   const concatPath = React.useMemo(
//     () => [...prefixPath, ...toArr(prefix)],
//     [prefixPath, prefix]
//   );

//   return (
//     <MyFormItemContext.Provider value={concatPath}>
//       {children}
//     </MyFormItemContext.Provider>
//   );
// };

// const MyFormItem = ({ name, ...props }: FormItemProps) => {
//   const prefixPath = React.useContext(MyFormItemContext);
//   const concatName =
//     name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

//   return <Form.Item name={concatName} {...props} />;
// };