var accessToken = config.AccessToken;
var baseUrl = "https://api.api.ai/v1/";

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
      send(speechToText);
      //readOutLoud(speechToText);
    };

    function readOutLoud(message) {
      //var sendmessage = messsage;
      var speech = new SpeechSynthesisUtterance(message);
      // var svoice = new window.SpeechSynthesisVoice();
      // svoice.name = "Microsoft Zira Desktop - English (United States)";
      // svoice.voiceURI = "Microsoft Zira Desktop - English (United States)";
      // svoice.lang = "en-US";
      // speech.voice = svoice;

      speech.lang = "en-US";
      speech.rate = 1;
      speech.pitch = 1; // 1 by default

      var synth = window.speechSynthesis;
      var voices = synth.getVoices();
      //console.log(voices);
      //speech.voice = voice[4];
      console.log(voices);

      synth.speak(speech);
    }

    function send(message) {
      var text = message;
      $.ajax({
        type: "POST",
        url: baseUrl + "query?v=20150910",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
          Authorization: "Bearer " + accessToken
        },
        data: JSON.stringify({
          query: text,
          lang: "en",
          sessionId: "somerandomthing"
        }),
        success: function(data) {
          var jresult = data.result.fulfillment.speech;
          //result.innerHTML = jresult;
          readOutLoud(jresult);
          setResponse(jresult);
        },
        error: function() {
          setResponse("Internal Server Error");
        }
      });
      setResponse("Loading...");
    }

    function setResponse(val) {
      console.log(val);
    }
  } else {
    // speech recognition API not supported
    console.log("not supported");
    alert("Speech Module is not supported in this browser! Open Chrome.");
  }
}
