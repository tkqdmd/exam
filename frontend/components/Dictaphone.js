import React, {Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'

const recognition = new SpeechRecognition()

recognition.continous = true
recognition.interimResults = true
recognition.lang = 'ja-JP' 

class Dictaphone extends Component {
  constructor(props) {
    super(props);
    this.answer = "";
  } 

  
  render() {
    const { handleChangeParent, transcript, resetTranscript, browserSupportsSpeechRecognition, lang} = this.props
    handleChangeParent(transcript);

    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    if(transcript.toLowerCase().includes("reset") ||
      transcript.toLowerCase().includes("end")
    ) { 
      resetTranscript();
    }

    
    return (
      <div>
        <button onClick={resetTranscript}>Reset</button>
        <span>{transcript}</span>
        {/* <input type="text" value={transcript} onChange={e => (console.log(e.target.value))}/> */}
      </div>
    )
  }
}

export default SpeechRecognition(Dictaphone)