"use client"

import { useEffect, useState } from "react";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import { Table, TableColumnsType } from "antd";
import { addAlphabetToData } from "../../../../../lib/addAlphabetToData";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import { TestItem } from "../../../../../interfaces/TestItem";

const TestExpandedRowRender = ({ TestItem, TableMutate }: { TestItem: TestItem, TableMutate: () => void }) => {

    const [open, setOpen] = useState<boolean>(false);

    const [recordToDelete, setRecordToDelete] = useState();

    const defaultValue = {
        uid: TestItem.uid,
    };


    const { data, isLoading, mutate } = useSWR<any[]>(
        ["/TestItem/GetTestItemDetails", defaultValue],
        ([url, arg]: [url: string, arg: any]) => listFetcher(url, { arg })
    );

    const { trigger, isMutating } = useSWRMutation(
        "/MaterialTestItem/Delete",
        mutationFetcher
    );

    const deleteProductFactor = async () => {
        // @ts-ignore
        const res = await trigger({ uid: recordToDelete?.Uid });
        if (res) {
            await mutate();
            await TableMutate();
            setOpen(false);
        }
    };

    useEffect(() => {
        if (!isLoading) {
            mutate();
        }
    }, [TestItem]);

    const expandColumns: TableColumnsType<any> = [
        { title: "#", dataIndex: "Row", key: "1", width: "5%" },
        { title: "استاندارد آزمون", dataIndex: "title", key: "2" },
        { title: "شناسه استاندارد", dataIndex: "referenceCode", key: "3" },
    ];

    return (
        <>
            <Table
                columns={expandColumns}
                dataSource={addAlphabetToData(data)}
                loading={isLoading || isMutating}
                pagination={false}
            />
            <ConfirmDeleteModal
                loading={isMutating}
                open={open}
                setOpen={setOpen}
                handleDelete={deleteProductFactor}
                title={"استاندار آزمون"}
            />
        </>
    );
};

export default TestExpandedRowRender;