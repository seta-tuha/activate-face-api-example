import React from "react";
import "./App.css";
import { Activate, ANY } from "@veritone/activate";
import { Camera } from "@veritone/activate-camera";
import { Faceapi } from "@veritone/activate-face-api.js";

import {
  WebkitSpeechRecognition,
  Modes as SpeechModes,
} from "@veritone/activate-webkit-speech-recognition";

function App() {
  const [videoSrc, setVideoSrc] = React.useState(null);
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    const activate = new Activate();
    activate.addModule(Camera, {
      fps: 5,
    });

    activate.addModule(Faceapi);

    activate.addRule({
      on: "image",
      do: (res) => {
        console.log(res.getData());
        setVideoSrc(res.getData().videoSrcObject);
      },
    });
    activate.addRule({
      on: "face",
      do: (res) => {
        console.log(res.getData().object);
      },
    });

    activate.start().then(() => {
      console.log("activate started!!!");
    });
  }, []);

  React.useEffect(() => {
    if (videoSrc && videoRef.current) {
      videoRef.current.srcObject = videoSrc;
    }
  }, [videoSrc]);

  return (
    <div className="App">
      <h5>test activate</h5>
      {videoSrc ? <video ref={videoRef} autoPlay height={280}></video> : null}
    </div>
  );
}

export default App;
