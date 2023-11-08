import {Choice} from "../../interfaces/requestDetail";
import {Button, Input, Spin} from "antd";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../lib/server/mutationFetcher";

interface PropsType {
  hasDescription?: boolean;
  loading?: boolean;
  choices: Choice[];
  nextStepUrl: string;
  taskId: string;
  onClick?: (key: string) => any;
}

const Index = (props: PropsType) => {
  const getNextStep = useClickWorkFlowBtn({
    apiUrl: props.nextStepUrl,
    taskId: props.taskId,
  });

  if (props.loading) {
    return (
      <div className="w-full">
        <Spin />
      </div>
    );
  }

  if (!props?.choices && !props?.choices?.length) {
    return <></>;
  }

  const containerStyle = () => {
    const repeat = props.choices.length >= 4 ? props.choices.length : 2;

    return {
      gridTemplateColumns: `repeat(${repeat}, minmax(0, 1fr))`,
      gridTemplateRows: "auto",
    };
  };

  const handleOnClick = async (choice_key: string) => {
    if (typeof props.onClick === "function") {
      props.onClick(choice_key);
    } else {
    }

    await getNextStep.trigger(choice_key, "");
  };

  return (
    <>
      {props.hasDescription && <Input.TextArea className="mt-2 mb-4" />}
      <div style={containerStyle()} className="grid grid-cols-4 gap-4 ">
        {props.choices.map((btn, index) => (
          <div
            style={{ height: "fit-content" }}
            className="flex justify-center"
            key={index}
          >
            <Button
              loading={getNextStep.isMutating}
              onClick={() => handleOnClick(btn.choice_Key)}
              className="w-full"
              type="primary"
            >
              {btn.label}
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

interface HookType {
  apiUrl: string;
  taskId: string;
}

interface HookReturn {
  isMutating: boolean;
  data: any;
  trigger: (choiceKey: string, description: string) => any;
}

const useClickWorkFlowBtn = ({ apiUrl, taskId }: HookType): HookReturn => {
  const { trigger, isMutating, data } = useSWRMutation(
    apiUrl || null,
    mutationFetcher
  );

  const handleTrigger = async (choiceKey: string, description?: string) => {
    const res = await trigger({
      taskId: taskId,
      choiceKey: choiceKey,
      description: description,
    });

    return res;
  };

  return { trigger: handleTrigger, isMutating, data };
};

export default Index;
