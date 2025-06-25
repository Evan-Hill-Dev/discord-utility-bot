# 🤖 Discord Utility Bot

A multipurpose Discord bot built with Node.js and Discord.js, featuring:

- 🔎 AI-powered replies via OpenAI's ChatGPT
- 🌤️ Real-time weather using the OpenWeather API
- 😂 GIF searching via the Giphy API
- 🛠️ Easy to extend with more commands

---

## ✨ Features

### `!ping`
Simple latency test.  
Example:
```
!ping
```
Response:
```
🏓 Pong! Latency: 42ms
```

---

### `!weather <city>`
Fetches the current weather using the OpenWeatherMap API.  
Example:
```
!weather New York
```
Response:
```
🌍 Weather in New York:
☁️ Description: scattered clouds
🌡️ Temperature: 75°F
💧 Humidity: 60%
🌬️ Wind Speed: 10 mph
```

---

### `!ask <question>`
Get an intelligent, concise answer from ChatGPT (via OpenAI API).  
Example:
```
!ask What is the capital of France?
```
Response:
```
The capital of France is Paris.
```

---

### `!gif <search term>`
Searches Giphy and returns a random GIF from the top results.  
Example:
```
!gif cat
```
Response:
*A random cat GIF link*

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or newer)
- A Discord bot token
- API keys for:
  - OpenWeather
  - OpenAI
  - Giphy

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root of the project:

```
DISCORD_TOKEN=your_discord_token_here
OPENAI_API_KEY=your_openai_key_here
OPENWEATHER_API_KEY=your_openweather_api_key_here
GIPHY_API_KEY=your_giphy_api_key_here
```

### Run the Bot

```bash
node index.js
```

---

## 📁 File Structure

```
discord-bot/
├── .env             # Your private API keys (not tracked by git)
├── .gitignore       # Ignores node_modules and .env
├── index.js         # Main bot code
├── package.json     # Project metadata and dependencies
└── README.md        # You're reading it!
```

---

## 🔐 Security Note

Your `.env` file should **never be committed** to GitHub. This project uses a `.gitignore` file to keep secrets safe.

---

## 🧠 Credits

- Discord.js
- Axios
- OpenAI API
- OpenWeather API
- Giphy API

---

## 📜 License

MIT License – Free to use and modify.
