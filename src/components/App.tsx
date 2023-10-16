import TextToSpeech from '../components/TextToSpeechComponent'
import Information from './InformationComponent'
import "../css/App.css"

export default function App() {

    return(
        <div className="app">
            <Information text="Teksto įgarsinimo įrankis"></Information>
            <TextToSpeech/>
        </div>
        
    )
}