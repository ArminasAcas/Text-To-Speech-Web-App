import { useState } from "react"
import "../css/TextToSpeechComponent.css"
import AudioPlayer from "./AudioPlayerComponent";
import "../css/Container.css"

export default function TextToSpeech() {

    const [gender, setGender] = useState("Male");
    const [text, setText] = useState("");
    const [language, setLanguage] = useState("English");
    const [warning, setWarning] = useState(false);
    const [audio, setAudio] = useState("");
    const [success, setSuccess] = useState(false);
  
    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        if(text && text.length > 0) 
        {
            const FormData = 
            {
                text: text,
                language: language,
                gender: gender
            };
            
            try
            {
                fetch
                (
                    "http://localhost:4000/send-data", 
                    {
                        method: "POST",
                        headers: { "Content-Type" : "application/json"},
                        body: JSON.stringify({FormData}),
                    }
                )
                .then(async (res) => {
                    if (res.ok) 
                    {
                        const audioData = await res.blob();
                        if(audio) URL.revokeObjectURL(audio);
                        setAudio(URL.createObjectURL(audioData));
                        setSuccess(true);
                    }
                    else alert("Įvyko klaida !");
                });
            } 
            catch (error){
                alert("Įvyko klaida !");
            }
            
            if(warning) setWarning(false);
        }
        else if (!warning) setWarning(true);
    };

    if(success){
        setTimeout(() => {
            setSuccess(false);
        }, 3000);
    }

    return (
        <>
        <div >
            <form className="generation-form container">
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
                        {warning ? <span className="generation-form__warning"> [Tuščias teksto laukas !]</span> : null}
                        {success ? <span className="generation-form__success"> [Sėkmingai sugeneruotas garso takelis]</span> : null}
                    </div>
                    <textarea onChange={e => {setText(e.target.value)}} maxLength={500} className="generation-form__text-area" id="text"></textarea>
                    <button className="generation-form__button" onClick={handleClick} >Generuoti balso takelį</button>
                </div>
            </form>
        </div>

        <div className="generation-audio">
            {audio ?  <AudioPlayer audio={audio}></AudioPlayer>: null }
        </div>
        </>
        
    )
}