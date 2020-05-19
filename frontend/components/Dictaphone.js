import React, {Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'

class Dictaphone extends Component {
  constructor(props) {
    super(props);
    this.state = {
        script:"", 
    }
  } 
  handleChange = (e) => {
    console.log("ahihi");
    
  }
  render() {
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null;
    }


    return (
      <div>
        <button onClick={resetTranscript}>Reset</button>
        <span>{transcript}</span>
        <input type="text" value={transcript} onChange={this.handleChange}/>
      </div>
    )
  }
}

export default SpeechRecognition(Dictaphone)