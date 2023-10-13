import { useState } from "react"
import "../css/TextToSpeechComponent.css"
import AudioPlayer from "./AudioPlayerComponent";
import "../css/Container.css"
import Select from "./SelectComponent";
import Label from "./LabelComponent";

export default function TextToSpeech() {

    const [gender, setGender] = useState("MALE");
    const [language, setLanguage] = useState("English");
    const [text, setText] = useState("");
    const [audio, setAudio] = useState("");
    const [warning, setWarning] = useState(false);
    const [success, setSuccess] = useState(false);

    const languagesEN = ["English","Lithuanian"];
    const languagesLT = ["Anglų", "Lietuvių"];
    const gendersEN = ["MALE", "FEMALE"];
    const gendersLT = ["Vyras", "Moteris"];
  
    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        if(!text || text.length <= 0) 
        {
            if (!warning) setWarning(true);
            return;
        }
        
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
                if (!res.ok) 
                {
                    alert("Įvyko klaida !");
                    return;
                }
                
                const audioData = await res.blob();
                if(audio) URL.revokeObjectURL(audio);
                setAudio(URL.createObjectURL(audioData));
                setSuccess(true);
            });
        } 
        catch (error){
            alert("Įvyko klaida !");
        }
    };
    
    const selectLanguage = (
        <>
            <Label label="Balso kalba" for="language"></Label>
            <Select valuesEN={languagesEN} valuesLT={languagesLT} setFunction={setLanguage} id="language"></Select>
        </>
    );

    const selectVoiceGender = (
        <>
            <Label label="Balso lytis" for="gender"></Label>
            <Select valuesEN={gendersEN} valuesLT={gendersLT} setFunction={setGender} id="gender"></Select>
        </>
    );

    if(success) setTimeout( () => { setSuccess(false); }, 3000);

    return (
        <>
        <div>
            <form className="generation-form container">
                <div className="generation-form__options">
                    {selectLanguage}
                    {language === "English" ? selectVoiceGender : null}
                </div>

                <div className="generation-form__text-block">
                    <div>
                        <Label label="Tekstas" for="text"></Label>
                        {warning ? <span className="generation-form__warning">[Tuščias teksto laukas !]</span> : null}
                        {success ? <span className="generation-form__success">[Sėkmingai sugeneruotas garso takelis]</span> : null}
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