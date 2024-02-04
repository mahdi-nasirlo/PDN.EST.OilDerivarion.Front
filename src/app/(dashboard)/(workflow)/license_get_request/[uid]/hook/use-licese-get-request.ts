import useGetRequest from "@/hooks/license/use-get-request";
import useSetRequest from "@/hooks/license/use-set-request";
import { useValidation } from "@/hooks/use-validation";
import { useForm } from "antd/lib/form/Form";
import { from } from "jalali-moment";
import { useEffect } from "react";

export default function useLicenseGetRequest(uid: string) {
  const setRequest = useSetRequest();

  const request = useGetRequest(uid);

  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(request.data?.producer);

    console.log(request.data?.producer);
  }, [request.data?.producer]);

  return { ...request, form, setRequest };
}
