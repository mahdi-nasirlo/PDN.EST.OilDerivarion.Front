"use client";

import { Collapse } from 'antd';
import FilterForm from './components/filter-form'
import React from 'react'
import Breadcrumb from "@/components/breadcrumb";
import { UserPlusIcon } from '@heroicons/react/24/solid';
import { useGetUserBySearch } from '@/hooks/basic/role_determination/use-get-user-by-search';
import DataTable from "@/app/(dashboard)/(admin-panel)/role_determination/components/data-table";

export default function Page() {

  const users = useGetUserBySearch();

  return (
    <>
      <Breadcrumb
        titleIcon={<UserPlusIcon className="w-8" />}
        pages={[
          { label: "خانه", path: "/" }
        ]}
        currentPage={"تعیین نقش کاربران"}
      />

      <Collapse
        size="large"
        items={[{
          label: 'جستجو',
          children: <FilterForm onFinish={users.setFilter} />
        }]}
      />
      <DataTable
        data={users.data}
        setPaginate={users.setFilter}
        isLoading={users.isLoading || users.isFetching}
      />
    </>
  )
}