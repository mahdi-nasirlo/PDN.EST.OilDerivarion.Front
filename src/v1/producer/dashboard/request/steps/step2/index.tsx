
import { useContext } from "react";
import StepContext from "../../state-managment/step-context";

const Index = () => {
  const processController = useContext(StepContext);

  // const method = processController.requestMaster.productionMethodId;

  return <></>
  // return <>{[2, 3, 4].includes(method) ? <Method2 /> : <Method1 />}</>;
};

export default Index;
