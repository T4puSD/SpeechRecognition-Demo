function speechRecognize() {
  var result = document.getElementById("result");
  var buttonImg = document.querySelector("img");

  window.SpeechRecognition =
    window.webkitSpeechRecognition || window.SpeechRecognition;

  if ("SpeechRecognition" in window) {
    console.log("supported");
    const recognition = new window.SpeechRecognition();

    var speechToText = "Can't understand you!";

    recognition.start();

    recognition.onstart = event => {
      console.log(event);
      result.innerHTML = "Speak!";
    };

    recognition.onaudioend = function() {
      console.log("Audio capturing ended");
      buttonImg.setAttribute("src", "./img/record_icon.png");
    };

    recognition.onend = function() {
      console.log("Speech recognition service disconnected");
      if (speechToText == "Can't understand you!") {
        console.log("No voice input");
        readOutLoud(speechToText);
        result.innerHTML = speechToText + "</br> Try Again!";
      }
    };

    recognition.onresult = event => {
      speechToText = event.results[0][0].transcript;
      console.log(speechToText);
      result.innerHTML = speechToText;

      readOutLoud(speechToText);
    };

    function readOutLoud(message) {
      var speech = new SpeechSynthesisUtterance(message);
      speech.lang = "en-US";
      speech.rate = 0.9;
      speech.pitch = 1; // 1 by default

      var synth = window.speechSynthesis;
      var voices = synth.getVoices();
      //console.log(voices);
      speech.voice = voices[4];

      synth.speak(speech);
    }
  } else {
    // speech recognition API not supported
    console.log("not supported");
    alert("Speech Module is not supported in this browser! Open Chrome.");
  }
}
