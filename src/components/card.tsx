
const Card = (props: React.HtmlHTMLAttributes<HTMLDivElement>) =>
    <div
        {...props}
        className={`box-border w-full p-6 ${props.className}`}
    >
        {props.children}
    </div>

export { Card }