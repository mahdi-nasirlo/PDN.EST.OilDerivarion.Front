import useGetAllState from "@/hooks/basic/use-get-all-state";
import useAddRequest from "@/hooks/license/use-add-request";
import useDelRequest from "@/hooks/license/use-del-request";
import useGetAvailbleTypes from "@/hooks/license/use-get-availble-types";
import useGetProducerInfo from "@/hooks/license/use-get-producer-info";
import useGetRequestList from "@/hooks/license/use-get-request-list";
import { useState } from "react";

const  useProducerInfo = ()=>{

    const [delUid ,setDelUid]=useState<string>()
  
 const producerInfo = useGetProducerInfo()
 const License = useGetAvailbleTypes()
 const addLicense = useAddRequest()
 const state = useGetAllState()
 const list = useGetRequestList()
 const del = useDelRequest(delUid)

 const handleDelete =(uid? :string)=>{
    del.mutateAsync
    setDelUid(uid)
 } 

 return {producerInfo,License,addLicense,state,list,handleDelete}
}

export default useProducerInfo;
