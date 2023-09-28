import { useState } from "react"
import "../css/TextToSpeechComponent.css"

export default function TextToSpeech() {

    const [gender, setGender] = useState("Male");
    const [text, setText] = useState("");

    function handleClick() {
        if(text) 
        {
            const FormData = {
                text: text,
                gender: gender
            };
    
            fetch("http://localhost:4000/send-data", 
            {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({FormData}),
            })
            .then((res) => res.json ());
        }
    };

    return (
        <>
        <form className="generation-form">
            <div className="generation-form__options">
                <label htmlFor="gender">Generuojamo balso lytis</label>
                <select onChange={e => {setGender(e.target.value)}} className="generation-form__select" id="gender">
                    <option value="MALE">Vyras</option>
                    <option value="FEMALE">Moteris</option>
                    <option value="NEUTRAL">Neutralus</option>
                </select>
            </div>

            <div className="generation-form__text-block">
                <label htmlFor="text">Generuojamas tekstas</label>
                <textarea onChange={e => {setText(e.target.value)}} className="generation-form__text-area" id="text"></textarea>
                <button className="generation-form__button" onClick={handleClick} >Generuoti balso takelį</button>
            </div>
        </form>
        </>
    )
}