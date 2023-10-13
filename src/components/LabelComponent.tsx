export default function Label(props: {label: string, for: string}) {
    return <label htmlFor={props.for}>{props.label}</label>
}