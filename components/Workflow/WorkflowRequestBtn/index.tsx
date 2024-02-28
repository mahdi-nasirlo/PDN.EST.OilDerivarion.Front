// import { Choice } from "../../../interfaces/requestDetail";
import { Button, Input } from "antd";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../lib/server/mutationFetcher";
import { useRouter } from "next/navigation";

interface PropsType {
    hasDescription?: boolean;
    loading?: boolean;
    choices: any[];
    nextStepUrl: string;
    taskId: string;
    onClick?: (key: string) => any;
    trigger?: (arg?: any) => any
}

const Index = (props: PropsType) => {

    const getNextStep = useClickWorkFlowBtn({
        apiUrl: props.nextStepUrl,
        taskId: props.taskId,
    });

    const router = useRouter()

    if (!props?.choices && !props?.choices?.length) {
        return <></>;
    }

    const containerStyle = () => {

        let len = props.choices.length

        const repeat = len % 2 == 0 ? 2 : len;

        return {
            gridTemplateColumns: `repeat(${repeat}, minmax(0, 1fr))`,
            gridTemplateRows: "auto",
        };
    };

    const handleOnClick = async (choice_key: string) => {

        let res;
        if (typeof props.trigger === "function") {
            res = await props.trigger()
        } else
            res = await getNextStep.trigger(choice_key, "");

        if (typeof props.onClick === "function" && res)
            props.onClick(choice_key)
    }

    return (
        <>
            {props.hasDescription && <Input.TextArea style={{ resize: "none" }} className="mt-2 mb-4" />}
            <div style={containerStyle()} className="grid grid-cols-4 gap-2 ">
                {/*<div*/}
                {/*  style={{ height: "fit-content" }}*/}
                {/*  className="flex justify-center"*/}
                {/*>*/}
                {/*  <Button*/}
                {/*    loading={getNextStep.isMutating || props.loading}*/}
                {/*    type="default"*/}
                {/*    className="w-full bg-gray-100 text-warmGray-500"*/}
                {/*    onClick={() => router.back()}*/}
                {/*  >*/}
                {/*    بازگشت*/}
                {/*  </Button>*/}
                {/*</div>*/}
                {props.choices.map((btn, index) => {

                    return (
                        <div
                            style={{ height: "fit-content" }}
                            className="flex justify-center"
                            key={index}
                        >
                            <Button
                                danger={btn.color == "false"}
                                loading={getNextStep.isMutating || props.loading}
                                onClick={() => handleOnClick(btn.choice_Key)}
                                className="w-full"
                                type="primary"
                            >
                                {btn.label}
                            </Button>
                        </div>
                    )
                })}
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
        return await trigger({
            taskId: taskId,
            choiceKey: choiceKey,
            description: description,
        });
    };

    return { trigger: handleTrigger, isMutating, data };
};

export default Index;
