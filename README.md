# BharatAI Ultimate

BharatAI Ultimate is a powerful, beautiful, and animated AI Chatbot web app inspired by advanced AI platforms. It features:

- Google Login integration for secure user authentication
- Google AdSense integration for monetization
- A responsive and animated chatbot interface with closable UI
- Real-time trading, science, and technology news ticker
- Modern design with smooth animations and a friendly user experience

## Features

- **Powerful AI chatbot:** Connects to your backend AI API (e.g., OpenAI, DeepSeek) for intelligent, context-aware conversational responses.
- **Google OAuth Sign-In:** Easily authenticate users with their Google accounts.
- **Google AdSense:** Monetize your platform with responsive ads.
- **News Ticker:** Showcases latest news from trading, science, and technology fields.
- **Responsive Design:** Works great on desktops and mobile devices.
- **User-friendly UI:** Animated header, chatbot with smooth open/close, and real-time messaging experience.

## Getting Started

### Prerequisites

- Google Cloud project with OAuth 2.0 Client ID for web application
- Google AdSense account with valid publisher ID and ad slot
- Backend API providing:
  - `/api/chat` endpoint for chat responses (POST with JSON `{ prompt: string }`)
  - `/api/news` endpoint for news articles (GET returning JSON with `articles`)

### Installation

2. Replace placeholders in the following files:

- **index.html:**
  - Replace `ca-pub-XXXXXXXXXXXX` and `data-ad-slot="YYYYYYYYYYYY"` with your Google AdSense Client ID and Ad Slot.
- **app.js:**
  - Replace `"YOUR-GOOGLE-OAUTH-CLIENT-ID.apps.googleusercontent.com"` with your Google OAuth client ID.

3. Setup a backend with two routes:

- `/api/chat`: POST endpoint accepting `{ prompt: string }`, returning `{ reply: string }` from an AI model (e.g., OpenAI GPT).
- `/api/news`: GET endpoint returning `{ articles: [{ category, title, ... }] }`.

4. Serve static files (`index.html`, `style.css`, `app.js`) on your frontend host or Firebase Hosting.

### Running Locally

You can run a simple HTTP server with:


Then open `http://localhost:8080` in your browser.

### Deployment

Host your frontend on any static hosting platform (Netlify, Vercel, Firebase Hosting) and deploy your backend API separately or as serverless functions.

## Usage

- Users can sign in with Google to personalize their experience.
- Open the chatbot panel and ask questions about trading, science, and technology.
- Ads show dynamically through Google AdSense.
- The news ticker continuously updates to show the latest news headlines.

## Technologies Used

- HTML5, CSS3 (with animations)
- JavaScript (ES6+)
- Google OAuth 2.0 JavaScript SDK
- Google AdSense
- [OpenAI API](https://openai.com/api) or any other AI backend API
- Example news APIs like NewsAPI.org

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Inspired by Deepaksh AI and OpenAI
- Google Developer tools and APIs
- NewsAPI.org for news data

1. Clone this repository:

