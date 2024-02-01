import { useMeasureGetPage } from "@/hooks/basic/measure/use-measure-get-page";

const useMeasureGet = () => {
  const list = useMeasureGetPage();

  return { list };
};
export default useMeasureGet;
