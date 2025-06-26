// Load environment variables from .env file
require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

/**
 * Discord Utility Bot
 * 
 * Responds to the following commands:
 * - !ping: Check bot latency
 * - !weather <city>: Get current weather from OpenWeather API
 * - !ask <question>: Query OpenAI GPT API for a short response
 * - !gif <term>: Fetch a random gif from Giphy
 */

// Initialize Discord client with necessary intents to read messages
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// Confirm bot is online
client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

// Listen for incoming messages
client.on('messageCreate', async (message) => {
    // Ignore messages from bots
    if (message.author.bot) return;

    // ---------------------------------------
    // !ping command - latency check
    if (message.content === '!ping') {
        message.reply(`🏓 Pong! Latency: ${Date.now() - message.createdTimestamp}ms`);
    }

    // ---------------------------------------
    // !weather command - fetch weather data from OpenWeather API
    if (message.content.startsWith('!weather')) {
        const args = message.content.split(' ').slice(1);
        const city = args.join(' ');

        if (!city) {
            return message.reply('⚠️ Please provide a city name. Example: `!weather London`');
        }

        const apiKey = process.env.OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=imperial`;

        try {
            const response = await axios.get(url);
            const weather = response.data;

            const weatherInfo = `
🌍 **Weather in ${weather.name}**:
☁️ Description: ${weather.weather[0].description}
🌡️ Temperature: ${weather.main.temp}°F
💧 Humidity: ${weather.main.humidity}%
🌬️ Wind Speed: ${weather.wind.speed} mph
            `;
            message.channel.send(weatherInfo.trim());
        } catch (error) {
            console.error(error.response?.data || error.message);
            message.reply('❌ Could not find weather data. Please check the city name.');
        }
    }

    // ---------------------------------------
    // !ask command - use OpenAI's ChatGPT to respond to a prompt
    if (message.content.startsWith('!ask')) {
        const prompt = message.content.replace('!ask', '').trim();

        if (!prompt) {
            return message.reply('❓ Please ask a question. Example: `!ask What is the capital of France?`');
        }

        const apiKey = process.env.OPENAI_API_KEY;
        const url = 'https://api.openai.com/v1/chat/completions';

        try {
            const response = await axios.post(
                url,
                {
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: "system", content: "Be concise. Limit responses to under 100 words unless specified otherwise." },
                        { role: "user", content: prompt }
                    ],
                    max_tokens: 150,
                    temperature: 0.4,
                    stop: ["\n", "User:"],
                },
                {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const reply = response.data.choices[0].message.content.trim();
            message.reply(reply);
        } catch (error) {
            console.error(error.response?.data || error.message);
            message.reply('❌ Sorry, I couldn’t process that. Please try again later.');
        }
    }

    // ---------------------------------------
    // !gif command - fetch a random gif from Giphy based on search term
    if (message.content.startsWith('!gif')) {
        const query = message.content.replace('!gif', '').trim();

        if (!query) {
            return message.reply('❓ Please enter a search term. Example: `!gif cats`');
        }

        const apiKey = process.env.GIPHY_API_KEY;
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=10&rating=g`;

        try {
            const response = await axios.get(url);
            const gifs = response.data.data;

            console.log("🔍 Total gif results:", gifs.length);

            if (gifs.length === 0) {
                return message.reply('❌ No GIFs found for that search term.');
            }

            const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
            message.channel.send(randomGif.url);
        } catch (error) {
            console.error(error.response?.data || error.message);
            message.reply('❌ Could not fetch GIFs. Please try again later.');
        }
    }
});

// Login the bot using token stored in .env file
client.login(process.env.DISCORD_TOKEN);