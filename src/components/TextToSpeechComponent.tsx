import { useState } from "react"
import "../css/TextToSpeechComponent.css"
import AudioPlayer from "./AudioPlayerComponent";
import "../css/Container.css"
import Select from "./SelectComponent";
import Label from "./LabelComponent";

const buttonTextOptions = {
    default: "Generuoti balso takelį",
    generated: "Sėkmingai sugeneruotas garso takelis",
    generating: "Generuojamas garso takelis...",
    error: "Įvyko klaida",
    warning: "Tuščias teksto laukas"
};

const languagesEN = ["English","Lithuanian"];
const languagesLT = ["Anglų", "Lietuvių"];
const gendersEN = ["MALE", "FEMALE"];
const gendersLT = ["Vyras", "Moteris"];

export default function TextToSpeech() {

    const [gender, setGender] = useState("MALE");
    const [language, setLanguage] = useState("English");
    const [text, setText] = useState("");
    const [audio, setAudio] = useState("");
    const [warning, setWarning] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [buttonText, setButtonText] = useState(buttonTextOptions.default);
    const maxCharacters = 512;
    
    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        if(!text || text.length <= 0) 
        {
            setWarning(true);
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
            setButtonText(buttonTextOptions.generating);
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
                    setError(true);
                    return;
                }
                
                const audioData = await res.blob();
                if(audio) URL.revokeObjectURL(audio);
                setAudio(URL.createObjectURL(audioData));

                setSuccess(true);
                if (warning) setWarning(false);
                if (error) setError(false);
            })
            .catch(() => {
                setError(true);
            });
        } 
        catch{
            setError(true);
        }
    };

    if (success){
        if (buttonText != buttonTextOptions.generated) setButtonText(buttonTextOptions.generated);
        setTimeout( () => {
            setButtonText(buttonTextOptions.default);
            setSuccess(false);
        }, 3000);
    }

    if (warning){
        if (buttonText != buttonTextOptions.warning) setButtonText(buttonTextOptions.warning);
        setTimeout( () => {
            setButtonText(buttonTextOptions.default);
            setWarning(false);
        }, 3000);
    }

    if (error){
        if (buttonText != buttonTextOptions.error) setButtonText(buttonTextOptions.error);
        setTimeout( () => {
            setButtonText(buttonTextOptions.default);
            setError(false);
        }, 3000);
    }
    
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

    return (
        <div className="generation-block">
            <form className="generation-form container">
                <div className="generation-form__options">
                    {selectLanguage}
                    {language === "English" ? selectVoiceGender : null}
                </div>

                <div className="generation-form__text-block">
                    <Label label={"Tekstas (" + text.length + "/" + maxCharacters + ")"} for="text"></Label>
                    <textarea onChange={e => {setText(e.target.value)}} maxLength={maxCharacters} className="generation-form__text-area" id="text"></textarea>
                    <button 
                    className={
                    `generation-form__button 
                    ${success ? "generation-form__button-success" : null}
                    ${warning ? "generation-form__button-warning" : null}
                    ${error ? "generation-form__button-error" : null}`
                    } 
                    onClick={handleClick}>{buttonText}</button>
                </div>
            </form>

            {audio ?  <AudioPlayer audio={audio}></AudioPlayer>: null }
        </div>
    )
}