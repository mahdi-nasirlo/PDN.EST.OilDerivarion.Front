import { HtmlHTMLAttributes } from "react"

interface propsType {
    children: React.ReactNode,
    className?: React.HtmlHTMLAttributes<HTMLDivElement>
}

const Card = (props: propsType) => <div className="box-border w-full p-6">{props.children}</div>

export { Card }