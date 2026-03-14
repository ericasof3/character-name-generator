function displayCharacterName(response) {
  let answer = response.data.answer.trim();

  let chatElement = document.querySelector("#character-name");
  let uniqueId = `generated-name-${Date.now()}`;

  chatElement.innerHTML += `
    <div class="message assistant">
      <div class="bubble" id="${uniqueId}"></div>
    </div>
  `;

  new Typewriter(`#${uniqueId}`, {
    strings: answer,
    autoStart: true,
    delay: 15,
    cursor: "",
  });
}

function generateCharacterName(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");
  let userText = instructionsInput.value.trim();
  let chatElement = document.querySelector("#character-name");

  if (userText === "") {
    return;
  }

  chatElement.innerHTML = `
    <div class="message user">
      <div class="bubble">${userText}</div>
    </div>
  `;

  let apiKey = "1b440do32d60cet7a14bffc4fcbba27a";
  let context =
    "You are an avid reader who is great at creating character names. Your mission is to generate the name for a character (first and last name) and explain the etymology/train of thought for the name (in no more than 5 lines). The first line must contain ONLY the character name wrapped in a <span class='character-name'> element. The explanation must follow on the next lines. Use basic HTML and separate each line with <br />. Return only the HTML. Do not use Markdown. Do not add ```html or ```. Add no emojis.";
  let prompt = `Generate a character name considering the following user instructions: ${userText}`;
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  axios.get(apiUrl).then(displayCharacterName);

  instructionsInput.value = "";
}

let characterNameForm = document.querySelector(
  "#character-name-generator-form",
);

characterNameForm.addEventListener("submit", generateCharacterName);
