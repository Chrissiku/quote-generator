const text = document.querySelector(".quote");
const button = document.querySelector("button");
const author = document.querySelector(".name");
const voice = document.querySelector(".speech");
const copy = document.querySelector(".copy");
const twitter = document.querySelector(".twitter");

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

generateQuote();
button.addEventListener("click", generateQuote);
