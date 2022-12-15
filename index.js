const text = document.querySelector(".quote");
const button = document.querySelector("button");
const author = document.querySelector(".name");
const voice = document.querySelector(".speech");
const copy = document.querySelector(".copy");
const twitter = document.querySelector(".twitter");
const synthesis = speechSynthesis;

const generateQuote = () => {
  button.classList.add("loading");
  button.innerText = "Loading ...";
  fetch("http://api.quotable.io/random")
    .then((response) => response.json())
    .then((result) => {
      text.innerText = result.content;
      author.innerText = result.author;
      button.classList.remove("loading");
      button.innerHTML = "New Quote";
    });
};

copy.addEventListener("click", () => {
  navigator.clipboard.writeText(text.innerText);
  alert("Text copied successfully");
});

twitter.addEventListener("click", () => {
  let url = `https://twitter.com/intent/tweet?url=${text.innerText}`;
  window.open(url, "_blank");
});

voice.addEventListener("click", () => {
  if (!text.classList.contains("loading")) {
    let voices = window.speechSynthesis.getVoices();
    let enunciation = new SpeechSynthesisUtterance(
      `${text.innerText} by ${author.innerText}`
    );
    enunciation.voice = voices[6];
    synthesis.speak(enunciation);
    setInterval(() => {
      !synthesis.speaking
        ? voice.classList.remove("active")
        : voice.classList.add("active");
    }, 10);
  }
});

generateQuote();
button.addEventListener("click", generateQuote);
