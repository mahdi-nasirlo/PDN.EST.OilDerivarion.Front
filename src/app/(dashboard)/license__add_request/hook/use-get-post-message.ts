import useSetLocation from "@/hooks/map/use-set-location";
import { notification } from "antd/lib";
import React, { useEffect } from "react";

export default function useGetPostMessage(uid: string) {
  // useEffect(() => {
  //   window.addEventListener("message", setLocationHandle);
  //   return () => {
  //     window.addEventListener("message", setLocationHandle);
  //   };
  // }, []);
}
// const setLocationHandle = async (event: any) => {
//   // console.log(event, selectedLabUid);

//   if (event.origin === process.env.NEXT_PUBLIC_MAP_LAB_URL) {
//     // console.log(selectedLabUid);

//     const data = JSON.parse(event.data);
//     if (selectedLabUid) {
//     //   console.log(selectedLabUid);

//     await setLocation.mutateAsync({
//       uid: selectedLabUid,
//       address_Lat: data.latitude,
//       address_Long: data.longitude,
//       type: 1,
//     });
//     }
//   }
// };

// useEffect(() => {
//   window.addEventListener("message", setLocationHandle);
//   return () => {
//     window.removeEventListener("message", setLocationHandle);
//   };
// }, []);
