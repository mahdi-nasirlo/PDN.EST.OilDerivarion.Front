type WindowActions = {
    type: "OPEN" | "CLOSE" | "TOGGLE"
}

const windowsStatusAction = (value: boolean, action: WindowActions) => {

    if (action.type === "OPEN")
        return true

    if (action.type === "CLOSE")
        return false

    if (action.type === "TOGGLE")
        return !value
    
    return value

}

export default windowsStatusAction