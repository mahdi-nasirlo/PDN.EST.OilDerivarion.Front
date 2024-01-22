import { useContext } from "react";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";
import Method1 from "@/app/producer/dashboard/request/steps/step3/method1";
import Method2 from "@/app/producer/dashboard/request/steps/step3/method2";

const Index = () => {
  const processController = useContext(StepContext);

  const method = processController.requestMaster.productionMethodId;

  return <>{method === 1 ? <Method1 /> : <Method2 />}</>;
};

export default Index;
