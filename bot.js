const { Telegraf } = require('telegraf');
const { addWordHandler, getWordsHandler } = require('./handlers');
const { initializeDatabase } = require('./database');

require('dotenv').config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

initializeDatabase();

bot.start(ctx => ctx.reply('Welcome! Use /addword to add a word and /showwords to view your words.'));
bot.hears(/\/addword (.+)/, (ctx) => addWordHandler(ctx));
bot.command('showwords', (ctx) => getWordsHandler(ctx, bot));

bot.launch();
