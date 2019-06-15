function speechRecognize() {
  //document.getElementById("title").innerHTML = "Hellowww!";

  window.SpeechRecognition =
    window.webkitSpeechRecognition || window.SpeechRecognition;

  if ("SpeechRecognition" in window) {
    console.log("supported");
    const recognition = new window.SpeechRecognition();
    var languange = recognition.lang;
    console.log("language: " + languange);
    recognition.continous = false;

    recognition.onresult = event => {
      const speechToText = event.results[0][0].transcript;
      console.log(speechToText);
      document.getElementById("result").innerHTML = speechToText;
      var buttonImg = document.querySelector("img");
      buttonImg.setAttribute("src", "./img/record_icon.png");

      var speech = new SpeechSynthesisUtterance(speechToText);
      var synth = window.speechSynthesis;
      var voices = synth.getVoices();
      speech.lang = "en-US";
      console.log(voices);
      speech.voice = voices[4];
      speech.rate = 0.9;
      speech.pitch = 1; // 1 by default

      synth.speak(speech);
    };

    recognition.start();
  } else {
    // speech recognition API not supported
    console.log("not supported");
    alert(
      "Speech Module is not supported in this browser! Open Chrome or Firefox."
    );
  }
}
