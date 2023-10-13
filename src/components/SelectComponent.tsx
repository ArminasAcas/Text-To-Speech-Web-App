import "../css/SelectComponent.css"
import { Dispatch, SetStateAction } from "react"

export default function Select(props: {valuesEN: string[], valuesLT: string[], setFunction: Dispatch<SetStateAction<string>>, id: string}) {

    const optionList = props.valuesEN.map( 
        (valueEN, index) => {return <option value={valueEN}>{props.valuesLT[index]}</option>}
    )

    return (
        <select onChange={e => { props.setFunction(e.target.value)}} className="select" id={props.id}>
            {optionList}
        </select>
    )
}