import {Table} from "antd/lib";

const CardListTable = () => {

    return <Table
        columns={[
            {
                title: "کد درخواست"
            },
            {
                title: "نام محصول"
            }
        ]}
    />
}

export {CardListTable}