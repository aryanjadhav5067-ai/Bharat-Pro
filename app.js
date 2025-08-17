// Demo news data (you can expand these as you like)
const demoNews = [
  {cat: "Trading", headline: "Nifty breaches 20,000 as foreign investors return to Indian markets."},
  {cat: "Tech", headline: "ISRO unveils new quantum satellite for secure communications."},
  {cat: "Science", headline: "IIT scientists discover ultra-light material for solar cells."},
  {cat: "Trading", headline: "SEBI issues new advisory to protect retail investors."},
  {cat: "Tech", headline: "India's AI startup ecosystem attracts $1B in funding this quarter."},
  {cat: "Science", headline: "Breakthrough in water purification gets global recognition."}
];

// Demo currency data
const demoCurrency = {
  base: "INR", rates: [
    {c: "USD", r: 0.012},
    {c: "EUR", r: 0.011},
    {c: "JPY", r: 1.77},
    {c: "GBP", r: 0.0095},
    {c: "BTC", r: 0.00000017}
  ]
};

function fillNews() {
  const el = document.getElementById('ticker-news');
  el.innerHTML = demoNews.map(n =>
    `<span><b>[${n.cat}]</b> ${n.headline}</span>`
  ).join(' | ');
}
function fillCurrency() {
  const el = document.getElementById('ticker-currency');
  el.innerHTML =
    `<b>Live INR:</b> ` +
    demoCurrency.rates.map(rc => `1 INR = ${rc.r} ${rc.c}`).join(' | ');
}

window.addEventListener('DOMContentLoaded', () => {
  // Fill local demo data instantly
  fillNews();
  fillCurrency();

  // Chatbot open/close logic
  const modal     = document.getElementById('chatbot-modal');
  const showBot   = document.getElementById('show-bot');
  const closeBot  = document.getElementById('close-bot');
  showBot.onclick = () => { modal.style.display = "flex"; setTimeout(()=>scrollChat(),100);}
  closeBot.onclick= () => { modal.style.display = "none"; }
  
  // Basic chatbot demo
  const chatWin = document.getElementById('chat-window');
  const sendBtn = document.getElementById('send-btn');
  const input   = document.getElementById('user-input');
  function appendMsg(text, cls) {
    const div = document.createElement('div');
    div.className = `chatbot-msg ${cls}`;
    div.innerHTML = text;
    chatWin.appendChild(div);
    scrollChat();
  }
  function scrollChat() {
    chatWin.scrollTop = chatWin.scrollHeight;
  }

  sendBtn.onclick = handleMsg;
  input.onkeydown = function(e){if(e.key==="Enter") handleMsg();};

  function handleMsg() {
    const userText = input.value.trim();
    if (!userText) return;
    appendMsg(userText, "user-msg");
    input.value = "";
    // Simulate AI typing
    appendMsg('<span class="typing-indicator">Thinking…</span>', "bot-msg");
    setTimeout(() => {
      document.querySelectorAll('.typing-indicator').forEach(el=>el.parentNode.remove());
      appendMsg(genAIResponse(userText), "bot-msg");
    }, 1200 + Math.random()*1200);
  }

  // Demo AI reply logic — expand responses for your own domain!
  function genAIResponse(userText) {
    const q = userText.toLowerCase();
    if (q.includes("nifty") || q.includes("market")) return "Nifty recently crossed 20,000 due to strong FII inflows. Would you like a technical or fundamental analysis?";
    if (q.includes("ai") || q.includes("openai") || q.includes("future")) return "AI is shaping India's future with robust investments and innovation, especially in healthcare, fintech, and education.";
    if (q.includes("science")) return "Latest in science: IIT's new solar cell material promises high efficiency at low cost!";
    if (q.includes("currency") || q.includes("usd")) return "As of today, 1 INR ≈ 0.012 USD. Would you like insights on FOREX strategy?";
    if (q.includes("hello") || q.includes("namaste")) return "Namaste! How can FuturesAI India help you today?";
    if (q.includes("tech")) return "Tech hot news: ISRO's quantum satellite boosts India's secure communications ambitions.";
    return "That's an interesting question! I can give you news, explain trading, technology, or science topics. What would you like to know?";
  }
});
