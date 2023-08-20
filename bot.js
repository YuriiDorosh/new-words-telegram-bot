require('dotenv').config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
