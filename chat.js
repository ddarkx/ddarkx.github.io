const chat = document.getElementById("chat");
const input = document.getElementById("userInput");

// ВСТАВЬ СЮДА СВОЙ API КЛЮЧ
const API_KEY = "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";

function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = "msg " + type;
  msg.innerText = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;
  
  addMessage(text, "user");
  input.value = "";

  addMessage("Typing…", "bot");
  
  const lastMsg = chat.lastChild;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + API_KEY
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }]
    })
  });

  const data = await response.json();
  const botAns = data.choices[0].message.content;

  lastMsg.remove();
  addMessage(botAns, "bot");
}

input.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});
