import { useState } from "react";
import "./App.css";
import AudioTests from "./components/AudioTest";

function App() {
  const [showAudio, setShowAudio] = useState(false);
  return (
    <div className="App">
      {showAudio && <AudioTests />}
      <div className="floating-header">
        <h1>Three Tests</h1>
        <button onClick={() => setShowAudio(!showAudio)}>Audio Tests</button>
      </div>
    </div>
  );
}

export default App;
