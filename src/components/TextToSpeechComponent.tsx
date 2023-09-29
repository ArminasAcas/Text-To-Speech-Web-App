import { useState } from "react"
import "../css/TextToSpeechComponent.css"

export default function TextToSpeech() {

    const [gender, setGender] = useState("Male");
    const [text, setText] = useState("");
    const [language, setLanguage] = useState("English");
    const [warning, setWarning] = useState(false);

    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        if(text && text.length > 0) 
        {
            const FormData = {
                text: text,
                language: language,
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

            if(warning) setWarning(false);
        }
        else if (!warning) setWarning(true);
    };

    return (
        <>
        <form className="generation-form">
            <div className="generation-form__options">
                <label htmlFor="language">Balso kalba</label>
                <select onChange={e => {setLanguage(e.target.value)}} className="generation-form__select" id="language">
                    <option value="English">Anglų</option>
                    <option value="Lithuanian">Lietuvių</option>
                </select>

                {language === "English" ?
                (
                    <>
                        <label htmlFor="gender">Balso lytis</label>
                        <select onChange={e => {setGender(e.target.value)}} className="generation-form__select" id="gender">
                        <option value="MALE">Vyras</option>
                        <option value="FEMALE">Moteris</option>
                        </select>
                    </>
                ) : null}
                
            </div>

            <div className="generation-form__text-block">
                <div>
                    <label htmlFor="text">Tekstas</label>
                    {warning ? <span className="generation-form__warning"> [Tusčias teksto laukas !]</span> : null}
                </div>
                <textarea onChange={e => {setText(e.target.value)}} maxLength={300} className="generation-form__text-area" id="text"></textarea>
                <button className="generation-form__button" onClick={handleClick} >Generuoti balso takelį</button>
            </div>
        </form>
        </>
    )
}