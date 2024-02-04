import { Button, Input } from "antd";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { workflowApi } from "constance/workflow";

interface PropsType {
  loading?: boolean;
  choices: z.infer<typeof workflowApi.choices>[] | undefined;
  onClick: (key: string) => any;
}

const Index = (props: PropsType) => {
  if (!props?.choices && !props?.choices?.length) {
    return <></>;
  }

  const containerStyle = () => {
    let len = props.choices?.length ?? 0;

    const repeat = len % 2 == 0 ? 2 : len;

    return {
      gridTemplateColumns: `repeat(${repeat}, minmax(0, 1fr))`,
      gridTemplateRows: "auto",
    };
  };

  return (
    <>
      <div style={containerStyle()} className="grid grid-cols-2 gap-2 ">
        {props.choices.map((btn, index) => {
          return (
            <div
              style={{ height: "fit-content" }}
              className="flex justify-center"
              key={index}
            >
              <Button
                danger={btn.color == "false"}
                loading={props.loading}
                disabled={props.loading}
                onClick={() => {
                  props?.onClick(btn.choice_Key);
                }}
                className="w-full"
                size="large"
                type="primary"
              >
                {btn.label}
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Index;
