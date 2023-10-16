import "../css/InformationComponent.css"
import "../css/Container.css"

export default function Information(props: {text: string}) {
    return <span className="information-block container--small">{props.text}</span>
}