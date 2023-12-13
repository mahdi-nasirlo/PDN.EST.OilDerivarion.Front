import { useEffect, useState } from "react";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import { Button, Space, Table, TableColumnsType } from "antd";
import StatusColumn from "../../../../../components/CustomeTable/StatusColumn";
import { addAlphabetToData } from "../../../../../lib/addAlphabetToData";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";

const TestExpandedRowRender = ({ Laboratory, TableMutate }: { Laboratory: Laboratory, TableMutate: () => void }) => {

    const [open, setOpen] = useState<boolean>(false);

    const [recordToDelete, setRecordToDelete] = useState<
        any | undefined
    >();

    const defaultValue = {
        labUid: Laboratory.uid,
        testItemUid: null,
        IsActive: null,
    };

    const { data, isLoading, mutate } = useSWR<any[]>(
        ["/LabTestItem/GetAll", defaultValue],
        ([url, arg]: [url: string, arg: any]) => listFetcher(url, { arg })
    );

    const { trigger, isMutating } = useSWRMutation(
        "/LabTestItem/Delete",
        mutationFetcher
    );

    const deleteProductFactor = async () => {
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
    }, [Laboratory]);

    const expandColumns: TableColumnsType<any> = [
        { title: "#", dataIndex: "Row", key: "1", width: "5%" },
        { title: "نام فاکتور آزمون", dataIndex: "TestItemName", key: "2" },
        {
            title: "فعال/غیر فعال",
            dataIndex: "IsActive",
            key: "4",
            render: (_, record: any) => <StatusColumn record={record} />
        },
        {
            title: "عملیات",
            dataIndex: "2",
            key: "upgradeNum",
            align: "center",
            fixed: "right",
            width: "10%",
            render: (_, record: any) => (
                <Space size="small">
                    <Button
                        type="link"
                        className="text-red-500 font-bold"
                        onClick={() => {
                            setOpen(true);
                            setRecordToDelete(record);
                        }}
                    >
                        حذف
                    </Button>
                </Space>
            ),
        },
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
                title={"فاکتور آزمون ماده اولیه"}
            />
        </>
    );
};

export default TestExpandedRowRender;