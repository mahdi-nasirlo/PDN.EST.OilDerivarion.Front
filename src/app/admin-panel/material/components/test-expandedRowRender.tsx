import { useEffect, useState } from "react";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import { Table, TableColumnsType } from "antd";
import StatusColumn from "../../../../../components/CustomeTable/StatusColumn";
import { addAlphabetToData } from "../../../../../lib/addAlphabetToData";

const TestExpandedRowRender = ({ material }: { material: Material }) => {
    const [activeExpRow, setActiveExpRow] = useState<string[]>();


    const [open, setOpen] = useState<boolean>(false);

    const [recordToDelete, setRecordToDelete] = useState();

    const defaultValue = {
        materialUid: material.Uid,
        testItemUid: null,
        IsActive: null,
    };


    const { data, isLoading, mutate } = useSWR<any[]>(
        ["/MaterialTestItem/GetAll", defaultValue],
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

            setOpen(false);
        }
    };

    useEffect(() => {
        if (!isLoading) {
            mutate();
        }
    }, [material]);

    const expandColumns: TableColumnsType<any> = [
        { title: "#", dataIndex: "Row", key: "1", width: "5%" },
        { title: "نام فاکتور آزمون", dataIndex: "TestItemName", key: "2" },
        {
            title: "فعال/غیر فعال",
            dataIndex: "IsActive",
            key: "4",
            render: (_, record: any) => <StatusColumn record={record} />
        },
        // {
        //   title: "عملیات",
        //   dataIndex: "2",
        //   key: "upgradeNum",
        //   align: "center",
        //   fixed: "right",
        //   width: "10%",
        //   render: (_, record) => (
        //     <Space size="small">
        //       <Button
        //         type="link"
        //         className="text-red-500 font-bold"
        //         onClick={() => {
        //           setOpen(true);
        //           setRecordToDelete(record);
        //         }}
        //       >
        //         حذف
        //       </Button>
        //     </Space>
        //   ),
        // },
    ];

    return (
        <>
            <Table
                columns={expandColumns}
                dataSource={addAlphabetToData(data)}
                loading={isLoading || isMutating}
                expandable={{
                    expandedRowKeys: activeExpRow,
                }}
                pagination={false}
            />
            {/* <ConfirmDeleteModal
                loading={isMutating}
                open={open}
                setOpen={setOpen}
                handleDelete={deleteProductFactor}
                title={"فاکتور آزمون ماده اولیه"}
            /> */}
        </>
    );
};

export default TestExpandedRowRender;