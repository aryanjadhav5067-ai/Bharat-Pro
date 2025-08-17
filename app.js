// --- Google Login Callback ---
function onSignIn(response) {
  // You get user info from the response. For demonstration:
  const token = response.credential;
  // TODO: Verify on backend for real prod usage
  document.querySelector('#openChatbot').textContent = "Hello, Brilliant User!";
  document.querySelector('#openChatbot').disabled = false;
}

// --- Chatbot Toggle Logic ---
const chatbot = document.getElementById('chatbot');
document.getElementById('openChatbot').onclick = () => {
  chatbot.classList.remove('chatbot-hidden');
};
document.getElementById('closeChatbot').onclick = () => {
  chatbot.classList.add('chatbot-hidden');
};

// --- Chatbot Conversation ---
const chatForm = document.getElementById('chatForm');
const chatbox = document.getElementById('chatbox');

function appendMsg(role, content) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-msg ' + (role === 'user' ? 'user' : 'ai');
  const contentDiv = document.createElement('div');
  contentDiv.className = 'msg-content';
  contentDiv.textContent = content;
  msgDiv.appendChild(contentDiv);
  chatbox.appendChild(msgDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// --- Replace with your OpenAI API details or a backend endpoint ---
const OPENAI_API_KEY = "sk-REPLACE_THIS_WITH_YOURS";
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

async function getAIReply(message) {
  // For demo: Use OpenAI GPT-3.5 Turbo (Be sure to secure your key)
  const body = {
    model: "gpt-3.5-turbo",
    messages: [
      {"role": "system", "content": "You are a powerful AI assistant focused on brilliant answers about trading, science, and technology."},
      {"role": "user", "content": message}
    ]
  };
  const res = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + OPENAI_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  return data.choices[0].message.content;
}

chatForm.onsubmit = async (e) => {
  e.preventDefault();
  const input = document.getElementById('userInput');
  const msg = input.value.trim();
  if(msg === "") return;
  appendMsg('user', msg);
  input.value = "";
  appendMsg('ai', "Thinking...");
  try {
    const aiReply = await getAIReply(msg);
    chatbox.lastChild.querySelector('.msg-content').textContent = aiReply;
  } catch (err) {
    chatbox.lastChild.querySelector('.msg-content').textContent = "Sorry, AI is unavailable now.";
  }
};

// --- Fetch trading and tech/science news ---
async function fetchNews() {
  // Use NewsAPI.org demo endpoint (replace with your key for live mode)
  // You can use "trading" and "technology" as query
  const url = `https://newsapi.org/v2/top-headlines?category=technology&q=trading&apiKey=YOUR_NEWS_API_KEY&pageSize=6`;
  const res = await fetch(url);
  const data = await res.json();
  if(!data.articles) return;
  const newsContainer = document.getElementById('newsContainer');
  newsContainer.innerHTML = "";
  data.articles.forEach(art => {
    const card = document.createElement('div');
    card.className = "news-card";
    card.innerHTML = `
      <div class="news-title">${art.title}</div>
      <div class="news-desc">${art.description || ''}</div>
      <a href="${art.url}" target="_blank">Read more</a>
    `;
    newsContainer.appendChild(card);
  });
}

// Run news on page load
window.onload = fetchNews;
