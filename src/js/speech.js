window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.interimResults = true;
recognition.lang = "es-CO";

recognition.addEventListener("result", e => {
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join("");
  let sentence = transcript;
  if (e.results[0].isFinal) {
    sentence = normalize(sentence);
    filterCommand(sentence.toLowerCase());
    console.log(sentence);
  }
});

recognition.addEventListener("end", recognition.start);
recognition.start();
