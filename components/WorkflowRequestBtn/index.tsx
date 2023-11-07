import {Choice} from "../../interfaces/requestDetail";
import {Button, Empty, Input, Spin} from "antd";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../lib/server/mutationFetcher";

interface PropsType {
    hasDescription?: boolean,
    loading?: boolean,
    choices: Choice[],
    nextStepUrl: string,
    taskId: string,
}

const Index = (props: PropsType) => {

    const getNextStep = useClickWorkFlowBtn({apiUrl: props.nextStepUrl, taskId: props.taskId})

    if (props.loading) {
        return <div className="w-full"><Spin/></div>
    }

    if (!props?.choices && !props?.choices?.length) {
        return <Empty/>
    }

    const containerStyle = () => {

        const repeat = props.choices.length >= 4 ? props.choices.length : 2

        return {gridTemplateColumns: `repeat(${repeat}, minmax(0, 1fr))`, gridTemplateRows: "auto"}
    }

    return (
        <>
            {props.hasDescription && <Input.TextArea className="mt-2 mb-4"/>}
            <div style={containerStyle()}
                 className="grid grid-cols-4 gap-4 ">
                {
                    props.choices.map((btn, index) => <div
                        style={{height: "fit-content"}}
                        className="flex justify-center"
                        key={index}
                    >
                        <Button onClick={() => getNextStep.trigger(btn.choice_Key, "")} className="w-full"
                                type="primary">
                            {btn.label}
                        </Button>
                    </div>)
                }
            </div>
        </>
    );
};


interface HookType {
    apiUrl: string,
    taskId: string,
}

interface HookReturn {
    isMutating: boolean,
    data: any,
    trigger: (choiceKey: string, description: string) => void
}

const useClickWorkFlowBtn = ({apiUrl, taskId}: HookType): HookReturn => {

    const {trigger, isMutating, data} = useSWRMutation(apiUrl || null, mutationFetcher)

    const handleTrigger = async (choiceKey: string, description?: string) => {

        await trigger({
            "taskId": taskId,
            "choiceKey": choiceKey,
            "description": description
        })

    }

    return {trigger: handleTrigger, isMutating, data}
}

export default Index;
